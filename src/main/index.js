import { app, ipcMain, BrowserWindow, Menu, Tray } from 'electron'; // eslint-disable-line
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */

/* eslint no-underscore-dangle: ["error", { "allow": ["__static"] }] */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path')
        .join(__dirname, '/static')
        .replace(/\\/g, '\\\\');
}

let mainWindow;
let tray;

const toggleWindow = () => {
    if (mainWindow.isVisible()) {
        mainWindow.hide();
    } else {
        mainWindow.show();
    }
};

const winURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:9080'
        : `file://${__dirname}/index.html`;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        autoHideMenuBar: true,
        // frame: false,
        title: 'TodoTron 3000',
        backgroundColor: '#2d2f31',
        webPreferences: {
            backgroundThrottling: false,
        },
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createTray() {
    tray = new Tray(`${__static}/icons/png/iconTemplate.png`, mainWindow);

    tray.on('right-click', () => {
        mainWindow.hide();
    });

    tray.on('click', () => {
        toggleWindow();
    });
}

app.on('ready', () => {
    createWindow();
    createTray();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft);
});

ipcMain.on('open-window', () => {
    mainWindow.show();
});

ipcMain.on('hide-window', () => {
    mainWindow.hide();
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
