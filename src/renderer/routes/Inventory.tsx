import React, { useState, useEffect } from 'react';
import Modal from 'react-responsive-modal';
import { TableItem } from '../components/InvComponents';
import Store from '../store/Store';
import { getInventory } from '../store/StoreFuncs';

import '../styles/Inventory.scss';

const Inventory = () => {
    const [ addModalOpen, setAddModalOpen ] = useState(false);
    const store = Store.useStore();
    const [ items, setItems ] = useState(getInventory(store));
    const tableItems = items.map((i) => {
        return <TableItem {...i} />
    });

    const openAddModal = () => {
        setAddModalOpen(true);
    }
    const closeAddModal = () => {
        setAddModalOpen(false);
    }

    useEffect(() => {
        setItems(getInventory(store));
    }, [ store.get('inventory') ]);

    return (
        <main className="inventory-page">
            <div className="top-content">
                <div className="info-container">
                    INFO SHOULD GO HERE
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
                    { tableItems }
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
            />
            
        </main>
    )
};

export default Inventory;