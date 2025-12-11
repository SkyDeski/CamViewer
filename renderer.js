const fs = require('fs');
const path = require('path');
const os = require('os');

// Config file path in user's home directory
const configPath = path.join(os.homedir(), 'camviewer-config.json');

let config = {
    urls: [
        "https://www.google.com",
        "https://www.bing.com",
        "https://www.wikipedia.org",
        "https://www.github.com"
    ],
    refreshInterval: 180
};

let refreshTimer = null;

function loadConfig() {
    try {
        if (fs.existsSync(configPath)) {
            const data = fs.readFileSync(configPath, 'utf8');
            const newConfig = JSON.parse(data);

            // Validate basic structure
            if (newConfig.urls && Array.isArray(newConfig.urls)) {
                config = newConfig;

                // Ensure labels exist
                if (!config.labels || !Array.isArray(config.labels)) {
                    console.log('Adding missing labels to config');
                    config.labels = ["", "", "", ""];
                    // Save the updated config back to disk
                    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
                }

                console.log('Config loaded:', config);
                updateWebviews();
            }
        } else {
            // Create default config if it doesn't exist
            console.log('Config file not found, creating default at:', configPath);
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        }
    } catch (err) {
        console.error('Error loading config:', err);
    }
}

function updateWebviews() {
    const webviews = [
        document.getElementById('view1'),
        document.getElementById('view2'),
        document.getElementById('view3'),
        document.getElementById('view4')
    ];

    webviews.forEach((wv, index) => {
        const url = config.urls[index];
        const labelText = config.labels ? config.labels[index] : '';
        const labelEl = document.getElementById(`label${index + 1}`);

        if (labelEl) {
            if (labelText) {
                labelEl.innerText = labelText;
                labelEl.style.display = 'block';
            } else {
                labelEl.style.display = 'none';
            }
        }

        if (url && wv.src !== url) {
            console.log(`Updating view${index + 1} to: ${url}`);
            wv.src = url;
        }
    });

    setupAutoRefresh();
}

function setupAutoRefresh() {
    if (refreshTimer) {
        clearInterval(refreshTimer);
        refreshTimer = null;
    }

    if (config.refreshInterval > 0) {
        console.log(`Setting up auto-refresh every ${config.refreshInterval} seconds`);
        refreshTimer = setInterval(() => {
            console.log('Refreshing webviews...');
            const webviews = document.querySelectorAll('webview');
            webviews.forEach(wv => wv.reload());
        }, config.refreshInterval * 1000);
    }
}

function init() {
    loadConfig();

    const { ipcRenderer } = require('electron');

    const webviews = document.querySelectorAll('webview');
    webviews.forEach((wv, index) => {
        // Context Menu
        wv.addEventListener('context-menu', (e) => {
            e.preventDefault();
            // Send coordinates and webview index or ID to main process
            ipcRenderer.send('show-context-menu', { id: wv.id });
        });
    });

    // Listen for commands from main process
    ipcRenderer.on('context-menu-command', (event, command) => {
        const { id, action } = command;
        const wv = document.getElementById(id);
        if (!wv) return;

        switch (action) {
            case 'reload':
                wv.reload();
                break;
            case 'zoom-in':
                wv.setZoomLevel(wv.getZoomLevel() + 0.5);
                break;
            case 'zoom-out':
                wv.setZoomLevel(wv.getZoomLevel() - 0.5);
                break;
            case 'zoom-reset':
                wv.setZoomLevel(0);
                break;
        }
    });

    // Watch for file changes
    fs.watchFile(configPath, (curr, prev) => {
        console.log('Config file changed, reloading...');
        loadConfig();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    // Initial load with a slight delay to ensure webviews are ready
    setTimeout(init, 1000);
});
