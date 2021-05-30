const { app, BrowserWindow, globalShortcut } = require('electron');

// const config = require('./config');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile('index.html');
  // window.loadURL(config.url);
}

function toggleDevTools() {
  window.webContents.toggleDevTools();
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools);
}

app.whenReady().then(createWindow).then(createShortcuts);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
