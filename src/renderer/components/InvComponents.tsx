import React from 'react';
import Select, { OptionsType } from 'react-select';

import { Action, InventoryItem } from '../../common/types';
import Store from '../store/Store';
import { StockX } from '../../common/stockx';
import { ipcRenderer } from 'electron';
import path from 'path';

declare const __static: string;
/**
 * # TableItem
 * Represents an item in the inventory table
 */
export const TableItem = (props: InventoryItem) => {
    const {
        name,
        sku,
        purchasePrice,
        marketPrice,
        image,
        size,
        category,
        index
    } = props;
    const store = Store.useStore();

    const handleSelect = async (e: Action | any) => {
        if (e.value === 'delete') {
            const items = await ipcRenderer.sendSync('delete-inventory-item', { index });
            store.set('inventory')(items);
        }
    }
    
    return (
        <tr className="table-item">
            <td>
                <div className="cell">
                    <img src={ image || "https://img.icons8.com/ultraviolet/100/000000/no-image.png" } className="cell-image" />
                </div>
            </td>
            <td>
                <div className="cell border product-info">
                    <p>{ name }</p>
                    <p className="category">{ category }</p>
                </div>
            </td>
            <td>
                <div className="cell">
                    <span>{ size }</span>
                </div>
            </td>
            <td>
                <div className="cell">
                    <span>{ sku }</span>
                </div>
            </td>
            <td>
                <div className="cell">
                    <span>${ purchasePrice }</span>
                </div>
            </td>
            <td>
                <div className="cell">
                    <span>${ marketPrice && marketPrice.toString().length > 0 ? marketPrice : "N/A" }</span>
                </div>
            </td>
            <td>
                <Select
                    className='select-container'
                    value={{value: 'title', label: 'Actions'}}
                    onChange={handleSelect}
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
            </td>
        </tr>
    )
}

/**
 * # AddModal
 * Modal to add an inventory Item
 */
export const AddModal = () => {
    const [ formData, setFormData ] = React.useState({
        name: '',
        sku: '',
        purchasePrice: 0,
        size: '',
        marketPrice: 0,
        image: 'https://img.icons8.com/ultraviolet/100/000000/no-image.png'
    });
    const [ selectorState, setSelectorState ] = React.useState("left");

    const switchMode = (e: any) => {
        setSelectorState(e.target.id);
    }
    const handleStockXUpdate = (item: InventoryItem) => {
        setFormData(prevData => ({
            ...prevData,
            ...item
        }));
    }

    return (
        <div className="inventory-add-modal">
            <div className="selector">
                <div className={`left${selectorState === "left" ? ' selected' : ''}`} id="left" onClick={switchMode}>
                    Find on StockX
                </div>
                <div className={`right${selectorState === "right" ? ' selected' : ''}`} id="right" onClick={switchMode}>Enter Info</div>
            </div>
            <div className="body">
                {
                    selectorState === "left" && 
                    <StockXFinder updateState={handleStockXUpdate}/>
                }
            </div>
        </div>
    )
}

type StockXFinderProps = {
    updateState: (item: InventoryItem) => void;
};

const StockXFinder = (props: StockXFinderProps) => {
    const sx = new StockX();
    const [ input, setInput ] = React.useState("");
    const [ items, setItems ] = React.useState([] as InventoryItem[]);
    const [ currentValue, setCurrentValue ] = React.useState({ value: 'title', label: 'Actions' });
    const [ options, setOptions ] = React.useState([] as Action[]);

    const updateInput = async (e: any) => {
        setInput(e.target.value);
    }
    const updateSelect = (e: Action | any) => {
        setCurrentValue(e);
        const i = items.filter((item) => item.name === e.label);
        props.updateState(i[0]);
    };

    React.useEffect(() => {
        (async () => {
            const i = await sx.getSearchItems(input);
            setItems(i);
            setOptions(i.map((o) => { 
                return { value: o.name, label: o.name }
            }))
        })();
    }, [ input ]);

    return (
        <div className="stockx-finder">
            <div className="search-input">
                <input type="text" value={input} onChange={updateInput} />
            </div>
            <div className="selector-wrapper">
                <Select
                    className="stockx-finder-select"
                    value={currentValue}
                    onChange={updateSelect}
                    options={options}
                />
            </div>
        </div>
    )
}