import * as undux from 'undux';
import * as types from '../../common/types';

export const getInventory = (store: undux.Store<types.StoreState>): types.InventoryItem[] => {
    return store.get('inventory');
};

export const addItem = (store: undux.Store<types.StoreState>, item: types.InventoryItem) => {
    const inventory = [item, ...getInventory(store)];
    store.set('inventory')(inventory);
    return;
};

export const findItem = (store: undux.Store<types.StoreState>, index: string) => {
    return store.get('inventory').filter((item) => item.index === index);
};

export const calculateInventoryValue = (store: undux.Store<types.StoreState>) => {
    const inv = store.get('inventory');
    let total = 0;
    for (const item of inv) {
        total += item.marketPrice ? item.marketPrice : 0;
    }
    store.set('inventoryTotal')(total);
};

export const calculatePotentialProfits = (store: undux.Store<types.StoreState>): void => {
    let total = 0;
    const inv = store.get('inventory');
    for (const i of inv) {
        total += i.marketPrice! - i.purchasePrice;
    }
    store.set('potentialProfits')(total);
};

export const calculateTotalSpent = (store: undux.Store<types.StoreState>): void => {
    let total = 0;
    const inv = store.get('inventory');
    for (const i of inv) {
        total +=  +i.purchasePrice;
    }
    store.set('totalSpent')(total);
};

export const calculateTotals = (store: undux.Store<types.StoreState>) => {
    calculateInventoryValue(store);
    calculatePotentialProfits(store);
    calculateTotalSpent(store);
};
