import React, { useEffect } from 'react';
import Store from './store/Store';
import * as StoreFuncs from './store/StoreFuncs';
import * as types from '../common/types';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { toast } from 'react-toastify';

type Props = {
    children: JSX.Element;
}

/**
 * # AppSetup
 * This sets up the app when it loads
 * Also defines functions that should run when a value of the state changes
 */
const AppSetup = (props: Props) => {
    const { children } = props;
    const store = Store.useStore();
    // const inventory = StoreFuncs.getInventory(store);
    
    useEffect(() => {
        StoreFuncs.calculateInventoryValue(store);

        ipcRenderer.send('sync-inventory-prices');

        ipcRenderer.on('getInventory', (event: IpcRendererEvent, inv: types.InventoryItem[]) => {
            store.set('inventory')(inv);
        });
        ipcRenderer.on('synced-inventory-prices', (event: IpcRendererEvent, inv: types.InventoryItem[]) => {
            store.set('inventory')(inv);
            console.log('synced')
            toast.success('Synced Prices', {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }, []);

    useEffect(() => {
        StoreFuncs.calculateTotals(store);
    }, [ store.get('inventory') ]);

    return (
        <div>
            { children }
        </div>
    )
}

export default AppSetup;