import React from 'react';
import Modal from 'react-responsive-modal';

import '../styles/Inventory.scss';

export default class Inventory extends React.Component<{}, {
    modalOpen: boolean;
}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            modalOpen: false
        }

        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
    }


    render() {
        return (
            <main className="inventory-page">
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
                <div className="top-content">
                    <button className="modal-open-button" onClick={this.openAddModal}>Open Modal</button>
                </div>
                
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