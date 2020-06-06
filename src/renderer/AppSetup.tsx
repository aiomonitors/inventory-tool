import React, { useEffect } from 'react';
import Store from './store/Store';
import * as StoreFuncs from './store/StoreFuncs';
type Props = {
    children: JSX.Element;
}

const AppSetup = (props: Props) => {
    const { children } = props;
    const store = Store.useStore();
    // const inventory = StoreFuncs.getInventory(store);
    
    useEffect(() => {
        StoreFuncs.calculateInventoryValue(store);
    }, []);

    useEffect(() => {
        StoreFuncs.calculateInventoryValue(store);
    }, [ store.get('inventory') ]);

    return (
        <div>
            { children }
        </div>
    )
}

export default AppSetup;