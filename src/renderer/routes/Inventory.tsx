import React from 'react';
import Modal from 'react-responsive-modal';
import { TableItem } from '../components/InvComponents';
import { InventoryItem } from '../../common/types';

import '../styles/Inventory.scss';

export default class Inventory extends React.Component<{}, {
    modalOpen: boolean;
}> {
  items: InventoryItem[];
    constructor(props: {}) {
        super(props);
        this.state = {
            modalOpen: false
        }
        this.items = [
          {
            name: 'Jordan 1 Spiderman',
            sku: 'CHDHD',
            size: '8',
            purchasePrice: 175,
            marketPrice: 400
          },
          {
            name: 'Jordan 1 Spiderman',
            sku: 'CHDHD',
            size: '8',
            purchasePrice: 175
          },
          {
            name: 'Jordan 1 Spiderman',
            sku: 'CHDHD',
            size: '8',
            purchasePrice: 175,
            marketPrice: 400,
            category: 'Shoes'
          }
        ]

        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
    }

    render() {
      const tableItems = this.items.map((i) => {
        return <TableItem {...i} />
      });

        return (
            <main className="inventory-page">
                <div className="top-content">
                    <div className="info-container">
                        INFO SHOULD GO HERE
                    </div>
                    <div className="button-container">
                        <button className="modal-open-button" onClick={this.openAddModal}>Add Sale</button>
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
                    open={this.state.modalOpen}
                    onClose={this.closeAddModal}
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
    }

    private openAddModal(): void {
        this.setState({ modalOpen: true });
    }
    
    private closeAddModal(): void {
        this.setState({ modalOpen: false });
    }
}