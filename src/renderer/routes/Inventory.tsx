import React from 'react';
import Modal from 'react-responsive-modal';
import Select from 'react-select';

import '../styles/Inventory.scss';

type Action = { label: string; value: string };

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
                        <tr className='row'>
          <td>
            <div className='cell border'>
              <p>Jordan 1 Court Purple</p>
              <p className='category'>Shoes</p>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                7.5
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                CDHGKJA
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                $175
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                $200
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <Select
                className='select-container'
                value={{value: 'title', label: 'Actions'}}
                onChange={(e: Action) => {console.log(e.value)}}
                options={[
                  {
                    value: 'title', label: 'Actions'
                  },
                  {
                    value: 'edit', label: 'Edit'
                  },
                  {
                    value: 'delete', label: 'Delete'
                  }
                ]}
              />
            </div>
          </td>
        </tr>
        
        <tr className='row'>
          <td>
            <div className='cell border'>
              <p>Jordan 1 Court Purple</p>
              <p className='category'>Shoes</p>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                7.5
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                CDHGKJA
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                $175
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <span>
                $200
              </span>
            </div>
          </td>
          <td>
            <div className='cell'>
              <Select
                className='select-container'
                value={{value: 'title', label: 'Actions'}}
                onChange={(e: Action) => {console.log(e.value)}}
                options={[
                  {
                    value: 'title', label: 'Actions'
                  },
                  {
                    value: 'edit', label: 'Edit'
                  },
                  {
                    value: 'delete', label: 'Delete'
                  }
                ]}
              />
            </div>
          </td>
        </tr>
        
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