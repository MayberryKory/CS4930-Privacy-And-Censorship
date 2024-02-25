const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //TODO change that stupid icon
    //icon: path.join(__dirname, './assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    }
  })

  mainWindow.loadFile('index.html');
  mainWindow.setMenu(null);
}

app.whenReady().then(() => {
  createWindow()

  // Register F12 as a global shortcut to toggle DevTools
  globalShortcut.register('F12', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        focusedWindow.webContents.toggleDevTools();
    }
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit', () => {
  // Unregister all shortcuts when quitting
  globalShortcut.unregisterAll();
});

ipcMain.on('get-cookies', (event) => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
      const { session } = win.webContents;
      session.cookies.get({}).then((cookies) => {
          event.reply('cookies', cookies);
      }).catch((error) => {
          console.error('Error fetching cookies:', error);
      });
  }
});
