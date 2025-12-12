const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { Menu, ipcMain } = require('electron');

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
