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
