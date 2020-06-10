import * as electron from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as types from './types';
import { StockX } from './stockx';

let dataPath: string;
let inventoryPath: string;
let settingsPath: string;
let salesPath: string;
let inventoryStorage: types.InventoryItem[];
let settingStorage: types.Settings;
let salesStorage: [];
let balancePath: string;
let balanceStorage: types.BalanceFile;
const dev = true;

export const data: types.DataManager = {
    loadMemory: (): void => {
        if (dev) {
            dataPath = __dirname;
        } else {
            dataPath = (electron.app || electron.remote.app).getPath('userData');
        }
        inventoryPath = path.join(dataPath, 'inventory.json');
        salesPath = path.join(dataPath, 'sales.json');
        settingsPath = path.join(dataPath, 'settings.json');
        balancePath = path.join(dataPath, 'balances.json');

        if (!fs.existsSync(salesPath)) {
            fs.writeFileSync(salesPath, '[]');
        }
        if (!fs.existsSync(settingsPath)) {
            fs.writeFileSync(settingsPath, JSON.stringify({
                stockxEmail: '',
                stockxPassword: '',
            }));
        }
        if (!fs.existsSync(inventoryPath)) {
            fs.writeFileSync(inventoryPath, '[]');
        }
        if (!fs.existsSync(balancePath)) {
            fs.writeFileSync(balancePath, JSON.stringify({
                inventory: [],
                sales: []
            }));
        }
        
        inventoryStorage = JSON.parse(fs.readFileSync(inventoryPath).toString());
        settingStorage = JSON.parse(fs.readFileSync(settingsPath).toString());
        salesStorage = JSON.parse(fs.readFileSync(salesPath).toString());
        balanceStorage = JSON.parse(fs.readFileSync(balancePath).toString());
    },

    /**
     * # getSettings
     * Returns settings
     * @return {types.Settings}
     */
    getSettings: (): types.Settings => {
        return settingStorage;
    },

    /**
     * # setSetting
     * Sets a setting in the settings JSON
     */
    setSetting: (key: keyof types.Settings, value: string): void => {
        settingStorage[key] = value;
        fs.writeFileSync(settingsPath, JSON.stringify(settingStorage));
    },

    /**
     * # getInventory
     * Returns the inventory items in storage
     */
    getInventory: (): types.InventoryItem[] => {
        return inventoryStorage;
    },

    /**
     * # addInventoryItem
     * Adds inventory item to storage
     */
    addInventoryItem: (items: types.InventoryItem | types.InventoryItem[]): void => {
        if(Array.isArray(items)) {
            const itemsWithIndex = items.map(newItem => { 
                newItem.index = Math.floor(Math.random() * 12938109381093).toString();
                return newItem;
            });
            console.log(itemsWithIndex);
            inventoryStorage.unshift(...itemsWithIndex);
        } else {
            delete items.index;
            items.index = Math.floor(Math.random() * 12318927319872391).toString();
            inventoryStorage.unshift(items);
        }
        fs.writeFileSync(inventoryPath, JSON.stringify(inventoryStorage));
    },

    /**
     * # deleteInventoryItem
     * Deletes an item from the inventory 
     */
    deleteInventoryItem: (index: String): void => {
        inventoryStorage = inventoryStorage.filter((item) => item.index !== index);
        fs.writeFileSync(inventoryPath, JSON.stringify(inventoryStorage));
    },

    getInventoryPotentialProfit: (): number => {
        let total = 0;
        for (const i of inventoryStorage) {
            total += i.marketPrice! - i.purchasePrice;
        }
        return total;
    },

    syncInventoryPrices: async (): Promise<types.InventoryItem[]> => {
        const before = data.getInventoryPotentialProfit();
        const sx = new StockX();
        for (const i of inventoryStorage) {
            if (i.autoSync) {
                const sq = await sx.getSearchItems(i.sku);
                const mp = sq[0].marketPrice;
                if (mp !== i.marketPrice) {
                    i.marketPrice = mp;
                }
            }
        }
        const after = data.getInventoryPotentialProfit();
        if (before !== after) {
            balanceStorage.inventory.unshift({
                value: after,
                timestamp: +new Date()
            });
            data.updateBalanceMemory();
            data.updateInventoryMemory();
        }
        return inventoryStorage;
    },

    updateBalanceMemory: () : void => {
        fs.writeFileSync(inventoryPath, JSON.stringify(inventoryStorage));
    },

    updateInventoryMemory: () : void => {
        fs.writeFileSync(balancePath, JSON.stringify(balanceStorage));
    }
}