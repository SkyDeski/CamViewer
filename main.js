const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
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

  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools(); // Optional: for debugging
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

const { Menu, ipcMain } = require('electron');

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
