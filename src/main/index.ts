'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null;

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1200, 
    height: 600, 
    resizable: false, 
    frame: false, 
    movable: true, 
    webPreferences: 
      {
        nodeIntegration: true
      }
    });

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })
  return window
}


ipcMain.on('close-main-window', () => {
  if (mainWindow !== null) {mainWindow.close();}
  mainWindow = null;
});

ipcMain.on('minimize-main-window', () => {
  if (mainWindow !== null) mainWindow.minimize();
});

ipcMain.on('maximize-main-window', () => {
  if (mainWindow !== null) {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
  };
});

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
