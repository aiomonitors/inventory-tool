import * as electron from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as types from '../../common/types';

let dataPath: string;
let inventoryPath: string;
let settingsPath: string;
let salesPath: string;
let inventoryStorage: types.InventoryItem[];
let settingStorage: types.Settings;
let salesStorage: [];
const dev = true;

export const data: types.DataManager = {
    loadMemory: (): void => {
        if (dev) {
            dataPath = __dirname;
        } else {
            dataPath = (electron.app || electron.remote.app).getPath('userData');
        }
        inventoryPath = path.join(dataPath, 'inventory.json');
        console.log(inventoryPath);
        salesPath = path.join(dataPath, 'sales.json');
        settingsPath = path.join(dataPath, 'settings.json');
        if(!fs.existsSync(salesPath)) {
            fs.writeFileSync(salesPath, '[]');
        }
        if(!fs.existsSync(settingsPath)) {
            fs.writeFileSync(settingsPath, JSON.stringify({
                stockxEmail: '',
                stockxPassword: '',
            }));
        }
        if(!fs.existsSync(inventoryPath)) {
            fs.writeFileSync(inventoryPath, '[]');
        }
        
        inventoryStorage = JSON.parse(fs.readFileSync(inventoryPath).toString());
        settingStorage = JSON.parse(fs.readFileSync(settingsPath).toString());
        salesStorage = JSON.parse(fs.readFileSync(salesPath).toString());
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
            inventoryStorage = inventoryStorage.concat(items);
        } else {
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
    }
}