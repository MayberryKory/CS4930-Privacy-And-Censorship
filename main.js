const { app, BrowserWindow, globalShortcut, ipcMain, session } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    }
  });
//set window always on top for prototyping
  mainWindow.setAlwaysOnTop(true, 'floating');


  mainWindow.once('ready-to-show', () => {
    mainWindow.setIcon(path.resolve(__dirname, './assets/icon.png'));
    mainWindow.show();
  });

  mainWindow.loadFile('index.html');

  //intercepting network requests to get all URLs (part of adblocking)
  const filter = {
    urls: ['*://*/*'], //intercept all URLs
  };
  
  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    //check if the request URL matches a known ad domain
    if (isAdDomain(details.url)) {
      callback({ cancel: true });
    } else {
      callback({ cancel: false });
    }
  });

  // Set up DevTools shortcut
  globalShortcut.register('F12', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.webContents.toggleDevTools();
    }
  });

  // Handle window activation
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Handle app quitting
  app.on('will-quit', () => {
    // Unregister all shortcuts when quitting
    globalShortcut.unregisterAll();
  });

  // Handle IPC event for fetching cookies
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
}

function isAdDomain(url) {
  //add any ads you want to block 
  //also blocks the user from going there to begin with
  const adDomains = [
    'doubleclick.net',
    'googlesyndication.com',
    'facebook.com',
    'twitter.com',
    'foxnews.com',
    'analytics.google.com',
    'scorecardresearch.com',
    'adnxs.com',
    'adsrvr.org',
    'openx.net',
    'popads.net',
    'popcash.net',
    //add more
  ];
  //check if the URL matches any of the ad domains
  return adDomains.some(domain => url.includes(domain));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
