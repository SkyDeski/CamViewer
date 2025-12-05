const fs = require('fs');
const path = require('path');

// Load configuration
const configPath = path.join(__dirname, 'config.json');
let config = {
    urls: [],
    refreshInterval: 180
};

function loadConfig() {
    try {
        if (fs.existsSync(configPath)) {
            const data = fs.readFileSync(configPath, 'utf8');
            config = JSON.parse(data);
            console.log('Config loaded:', config);
        } else {
            console.warn('Config file not found, using defaults.');
        }
    } catch (err) {
        console.error('Error loading config:', err);
    }
}

function initWebviews() {
    const webviews = [
        document.getElementById('view1'),
        document.getElementById('view2'),
        document.getElementById('view3'),
        document.getElementById('view4')
    ];

    webviews.forEach((wv, index) => {
        const url = config.urls[index];
        if (url) {
            console.log(`Loading URL for view${index + 1}: ${url}`);
            // Use loadURL for better reliability
            try {
                wv.loadURL(url);
            } catch (e) {
                console.error(`Error loading URL ${url}:`, e);
                wv.src = url; // Fallback
            }
        }
    });

    // Set up auto-refresh
    if (config.refreshInterval > 0) {
        setInterval(() => {
            console.log('Refreshing webviews...');
            webviews.forEach(wv => {
                wv.reload();
            });
        }, config.refreshInterval * 1000);
    }
}

// Initialize
loadConfig();
window.addEventListener('DOMContentLoaded', () => {
    initWebviews();
});
