const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { Menu, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

// Setup Logging
const logPath = path.join(os.homedir(), 'camviewer.log');

function logToFile(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  try {
    fs.appendFileSync(logPath, logMessage);
    // Also log to console for development
    console.log(logMessage.trim());
  } catch (err) {
    console.error('Failed to write to log file:', err);
  }
}

// Global Error Handlers
process.on('uncaughtException', (error) => {
  logToFile(`UNCAUGHT EXCEPTION: ${error.stack}`);
  dialog.showErrorBox('Critical Error', `A critical error occurred:\n${error.message}\n\nPlease check ${logPath}`);
  app.quit();
});

// Configure Auto Updater
autoUpdater.logger = {
  info: (msg) => logToFile(`[Updater] ${msg}`),
  warn: (msg) => logToFile(`[Updater WARN] ${msg}`),
  error: (msg) => logToFile(`[Updater ERROR] ${msg}`)
};

autoUpdater.on('checking-for-update', () => {
  logToFile('Checking for updates...');
});

autoUpdater.on('update-available', (info) => {
  logToFile(`Update available: ${info.version}`);
});

autoUpdater.on('update-not-available', (info) => {
  logToFile('Update not available.');
});

autoUpdater.on('error', (err) => {
  logToFile(`Error in auto-updater: ${err}`);
});

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  logToFile(log_message);
});

autoUpdater.on('update-downloaded', (info) => {
  logToFile('Update downloaded');
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Ready',
    message: 'A new version has been downloaded. the application will quit and install the update now.',
    buttons: ['Restart']
  }).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

logToFile('Starting CamViewer...');

function createWindow() {
  logToFile('Creating main window...');
  try {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      fullscreen: true, // Start maximized/fullscreen
      webPreferences: {
        webviewTag: true, // Enable <webview> tag
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    logToFile('Loading index.html...');
    mainWindow.loadFile('index.html');
    
    mainWindow.webContents.on('did-finish-load', () => {
      logToFile('Main window loaded successfully');
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      logToFile(`Main window failed to load: ${errorCode} - ${errorDescription}`);
    });

    // mainWindow.webContents.openDevTools(); // Optional: for debugging
  } catch (e) {
    logToFile(`Error creating window: ${e.stack}`);
    throw e;
  }
}

app.whenReady().then(() => {
  logToFile('App Ready');
  createWindow();
  
  // Check for updates
  logToFile('Checking for updates (autoUpdater)...');
  autoUpdater.checkForUpdatesAndNotify();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  logToFile('All windows closed, quitting...');
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('show-context-menu', (event, params) => {
  const template = [
    {
      label: 'Reload Camera',
      click: () => {
        event.sender.send('context-menu-command', { id: params.id, action: 'reload' });
      }
    },
    { type: 'separator' },
    {
      label: 'Zoom In (+)',
      click: () => {
        event.sender.send('context-menu-command', { id: params.id, action: 'zoom-in' });
      }
    },
    {
      label: 'Zoom Out (-)',
      click: () => {
        event.sender.send('context-menu-command', { id: params.id, action: 'zoom-out' });
      }
    },
    {
      label: 'Reset Zoom',
      click: () => {
        event.sender.send('context-menu-command', { id: params.id, action: 'zoom-reset' });
      }
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup(BrowserWindow.fromWebContents(event.sender));
});
