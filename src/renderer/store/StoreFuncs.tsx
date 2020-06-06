import * as undux from 'undux';
import * as types from '../../common/types';

export const getInventory = (store: undux.Store<types.StoreState>): types.InventoryItem[] => {
    return store.get('inventory');
};

export const addItem = (store: undux.Store<types.StoreState>, item: types.InventoryItem) => {
    const inventory = [...getInventory(store), item];
    store.set('inventory')(inventory);
    return;
};

export const findItem = (store: undux.Store<types.StoreState>, index: string) => {
    return store.get('inventory').filter((item) => item.index === index);
};
