import React, { useState, useEffect } from 'react';
import Modal from 'react-responsive-modal';
import { InfoBox } from '../components/HomeComponents';
import { TableItem, AddModal } from '../components/InvComponents';
import Store from '../store/Store';
import { getInventory } from '../store/StoreFuncs';

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
    const potentialProfits = store.get('potentialProfits');
    const totalSpent = store.get('totalSpent');
    const tableItems = items.map((i) => {
        return <TableItem {...i} />
    });

    const openAddModal = () => {
        setAddModalOpen(true);
    };
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    useEffect(() => {
        setItems(getInventory(store));
    }, [ store.get('inventory') ]);

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
                    <InfoBox
                        name="Potential Profits"
                        value={potentialProfits}
                        prev={2000}
                        pos={true}
                        small
                    />
                    <InfoBox
                        name="Total Spent"
                        value={totalSpent}
                        prev={2000}
                        pos={true}
                        small
                    />
                </div>
                <div className="button-container">
                    <button className="modal-open-button" onClick={openAddModal}>Add Item</button>
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
                <AddModal 
                    closeModal={closeAddModal}
                />
            </Modal>
            
        </main>
    )
};

export default Inventory;