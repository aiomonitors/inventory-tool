'use strict'

import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import { data } from '../common/data';
import * as types from '../common/types';

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null;

data.loadMemory();

function createMainWindow() {
  mainWindow = new BrowserWindow({
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
    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    mainWindow.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  mainWindow!.webContents.on('did-finish-load', () => {
    mainWindow!.webContents.send('getInventory', data.getInventory());
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
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


// Inventory item stuff
ipcMain.on('delete-inventory-item', async (event: IpcMainEvent, arg: { index: string }) => {
  data.deleteInventoryItem(arg.index);
  event.returnValue = data.getInventory();
});

ipcMain.on('add-inventory-item', (event: IpcMainEvent, arg: types.InventoryItemForm) => {
  const q = arg.quantity || 0;
  if (q > 0) {
    const items = [];
    for (let i = 0; i < q; i++) {
      // Make sure a new object is created
      items.push({ ...arg });
    }
    data.addInventoryItem(items);
  } else {
    data.addInventoryItem(arg);
  }
  event.returnValue = data.getInventory();
});

ipcMain.on('calc-inventory-potential', (event: IpcMainEvent, arg: types.InventoryItem) => {
  event.returnValue = data.getInventoryPotentialProfit();
});

ipcMain.on('sync-inventory-prices', async (event: IpcMainEvent, arg: null) => {
  const items = await data.syncInventoryPrices();
  console.log('synced')
  mainWindow!.webContents.send('synced-inventory-prices', items);
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
    createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  createMainWindow()
})
