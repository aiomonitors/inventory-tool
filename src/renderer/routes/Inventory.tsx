import React, { useState, useEffect } from 'react';
import Modal from 'react-responsive-modal';
import { InfoBox } from '../components/HomeComponents';
import { TableItem, AddModal } from '../components/InvComponents';
import Store from '../store/Store';
import { getInventory, addItem } from '../store/StoreFuncs';
import { ipcRenderer } from 'electron';
import { InventoryItem } from '../../common/types';

import '../styles/Inventory.scss';

/**
 * # Inventory 
 * Inventory page
 */
const Inventory = () => {
    const [ addModalOpen, setAddModalOpen ] = useState(false);
    const store = Store.useStore();
    const [ items, setItems ] = useState(getInventory(store));
    const inventoryTotal = store.get('inventoryTotal');
    const tableItems = items.map((i) => {
        return <TableItem {...i} />
    });

    const openAddModal = () => {
        setAddModalOpen(true);
    };
    const closeAddModal = () => {
        setAddModalOpen(false);
    };
    const addInventoryItem = async (item: InventoryItem) => {
        const items = await ipcRenderer.sendSync('add-inventory-item', item);
        store.set('inventory')(items);
    };

    useEffect(() => {
        setItems(getInventory(store));
    }, [ store.get('inventory') ]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         addItem(store,
    //             {
    //               name: 'Jordan 1 Spiderman',
    //               sku: 'CHDHD',
    //               size: '8',
    //               purchasePrice: 175,
    //               marketPrice: 400,
    //               category: 'Shoes'
    //             })
    //     }, 3000)
    // }, [])

    // useEffect(() => {
    //     setTimeout(() => {
    //         addInventoryItem({
    //             "name": "Jordan 1 Spiderman",
    //             "sku": "CHDHD",
    //             "size": "8",
    //             "purchasePrice": 175,
    //             "marketPrice": 400,
    //             "image": "https://stockx.imgix.net/Air-Jordan-1-Retro-High-Pine-Green-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1581447019",
    //             "index" : Math.round(Math.random() * 1000).toString(),
    //         });
    //     }, 3000)
    // }, []);

    return (
        <main className="inventory-page">
            <div className="top-content">
                <div className="info-container">
                    <InfoBox
                        name="Inventory Value"
                        value={inventoryTotal}
                        prev={2000}
                        pos={true}
                        small
                    />
                </div>
                <div className="button-container">
                    <button className="modal-open-button" onClick={openAddModal}>Add Sale</button>
                </div>
            </div>
            <div className="bottom-content">
                <table className="inventory-table">
                    <thead className="table-head">    
                        <tr className="row">
                            <td>
                                <div className="cell">
                                    <span>
                                        Image
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="cell">
                                    <span>
                                        Name
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="cell">
                                    <span>
                                        Size
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="cell">
                                    <span>
                                        Style Code
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="cell">
                                    <span>
                                        Purchase Price
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="cell">
                                    <span>
                                        Market Value
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="cell">
                                    <span>
                                        Actions
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        { tableItems }
                    </tbody>
                </table>
            </div>

            <Modal 
                open={addModalOpen}
                onClose={closeAddModal}
                focusTrapped={false}
                center
                classNames={{
                    animationIn: 'slide-up',
                    animationOut: 'slide-down',
                    modal: 'inventoryModal',
                    overlay: 'modalOverlay'
                }}
                animationDuration={1000}
            >
                <AddModal />
            </Modal>
            
        </main>
    )
};

export default Inventory;