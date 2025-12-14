const { ipcRenderer } = require('electron');

// Elements
const refreshInput = document.getElementById('refreshInterval');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

// Load Config on Startup
window.onload = () => {
    ipcRenderer.send('get-config');
};

ipcRenderer.on('config-data', (event, config) => {
    // Refresh Interval
    refreshInput.value = config.refreshInterval || 0;

    // URLs and Labels
    // Ensure arrays exist
    const urls = config.urls || ["", "", "", ""];
    const labels = config.labels || ["", "", "", ""];

    for (let i = 0; i < 4; i++) {
        const urlEl = document.getElementById(`url${i}`);
        const labelEl = document.getElementById(`label${i}`);

        if (urlEl) urlEl.value = urls[i] || "";
        if (labelEl) labelEl.value = labels[i] || "";
    }
});

// Save Validation & Send
saveBtn.addEventListener('click', () => {
    const newConfig = {
        urls: [],
        labels: [],
        refreshInterval: parseInt(refreshInput.value, 10) || 0
    };

    for (let i = 0; i < 4; i++) {
        const url = document.getElementById(`url${i}`).value;
        const label = document.getElementById(`label${i}`).value;
        newConfig.urls.push(url);
        newConfig.labels.push(label);
    }

    ipcRenderer.send('save-config', newConfig);
});

// Close on Cancel
cancelBtn.addEventListener('click', () => {
    window.close();
});

// Close on Success
ipcRenderer.on('save-success', () => {
    alert('¡Configuración guardada correctamente!');
    window.close();
});
