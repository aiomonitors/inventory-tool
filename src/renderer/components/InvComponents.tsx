import React from 'react';
import Select from 'react-select';

import { Action, InventoryItem, InventoryItemForm } from '../../common/types';
import Store from '../store/Store';
import { StockX } from '../../common/stockx';
import { ipcRenderer } from 'electron';
import * as request from 'request-promise-native';

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
                    classNamePrefix='select-item'
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

type AddModalProps = {
    closeModal: () => void;
}

/**
 * # AddModal
 * Modal to add an inventory Item
 */
export const AddModal = (props: AddModalProps) => {
    const [ formData, setFormData ] = React.useState({
        name: '',
        sku: '',
        purchasePrice: 0,
        size: '',
        marketPrice: 0,
        image: 'https://img.icons8.com/ultraviolet/100/000000/no-image.png',
    } as InventoryItemForm);
    const [ selectorState, setSelectorState ] = React.useState("left");
    const [ error, setError ] = React.useState("");
    const store = Store.useStore();

    // Check that all fields are there
    React.useEffect(() => {
        let err = "";
        if (formData.name.length < 1) {
            err += "Name cannot be blank. \n"
        }
        if (formData.size.length < 1) {
            err += "Size cannot be blank. \n"
        }
        if (formData.sku.length < 1) {
            err += "Sku cannot be blank. \n"
        }
        setError(err);
    }, [ formData ]);

    // Handle selector
    const switchMode = (e: any) => {
        setSelectorState(e.target.id);
    }
    const handleStockXUpdate = (item: InventoryItem) => {
        setFormData(prevData => ({
            ...prevData,
            ...item
        }));
    }
    const handleFieldUpdate = (key: keyof InventoryItem, value: any) => {
        setFormData(prevData => ({
            ...prevData, 
            [key]: value,
        }));
        setError("");
    }

    // Validates a URL
    const validateImage = async (image_url:string)  => {
        try {
            const res: request.FullResponse = await request.get(image_url, {
                timeout: 5000
            });
            return res.statusCode !== 404;
        } catch (err) {
            return false;
        }
    }

    // TODO: Add quantity into this
    const addItem = async () => {
        if (error.length === 0) {
           const inv = await ipcRenderer.sendSync('add-inventory-item', formData);
           store.set('inventory')(inv);
           props.closeModal();
        }
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
                    (
                        <>
                            <StockXFinder updateState={handleStockXUpdate}/>
                            <AddForm state={formData} updateFields={handleFieldUpdate} validateImage={validateImage} />
                        </>
                    )
                }
                {
                    selectorState === "right" &&
                    <AddForm state={formData} updateFields={handleFieldUpdate} validateImage={validateImage} />
                }
                <button className="add-btn" onClick={addItem}>Add Item</button>
                <div className="error-message">
                    { error }
                </div>
            </div>
        </div>
    )
}

type StockXFinderProps = {
    updateState: (item: InventoryItem) => void;
};

/**
 * # StockXFinder
 * Component to be used to search items on StockX
 * 
 * @param {StockXFinderProps} props
 */
const StockXFinder = (props: StockXFinderProps) => {
    const sx = new StockX();
    const [ input, setInput ] = React.useState("");
    const [ items, setItems ] = React.useState([] as InventoryItem[]);
    const [ currentValue, setCurrentValue ] = React.useState({ value: 'title', label: 'Choose a Product' });
    const [ options, setOptions ] = React.useState([] as Action[]);

    const updateInput = async (e: any) => {
        setInput(e.target.value);
    }
    const updateSelect = (e: Action | any) => {
        setCurrentValue(e);
        const i = items.filter((item) => item.name === e.label);
        props.updateState(i[0]);
    };

    // Query items on input change
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
                <input type="text" value={input} onChange={updateInput} placeholder="Enter SKU or Name" />
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

type AddFormProps = {
    state: InventoryItemForm;
    updateFields: (key: keyof InventoryItem, value: any) => void;
    validateImage: (url: string) => boolean | Promise<boolean>;
}
/**
 * # AddForm
 * Form to be used in Modal to add an item to inventory
 */
const AddForm = (props: AddFormProps) => {
    const [ isImgValid, setImgValid ] = React.useState(false);
    const onFieldChange = (e: any) => {
        switch (e.target.name as keyof InventoryItem) {
            case 'autoSync':
                props.updateFields(e.target.name as keyof InventoryItem, e.target.checked as boolean);
                break;
            case 'marketPrice' || 'purchasePrice':
                props.updateFields(e.target.name as keyof InventoryItem, +e.target.value.replace('$', '') as number);
                break;
            case 'image':
                props.updateFields(e.target.name as keyof InventoryItem, e.target.value as string);
                break;
            default:
                props.updateFields(e.target.name as keyof InventoryItem, e.target.value as any);
                break;
        }
    };

    // Validate image on image update
    React.useEffect(() => {
        (async() => {
            const isValid = await props.validateImage(props.state.image!);
            setImgValid(isValid);
        })();
    }, [ props.state.image ])

    return (
        <div className="add-form">
            <div className="row">
                <input name="name" 
                    type="text" 
                    className="input full" 
                    value={props.state.name} 
                    onChange={onFieldChange} 
                    placeholder="Name"
                    required 
                />
            </div>
            <div className="row">
                <input 
                    name="sku" 
                    type="text" 
                    className="input half" 
                    value={props.state.sku} 
                    onChange={onFieldChange} 
                    placeholder="sku"
                    required 
                />
                <input 
                    name="size" 
                    type="text" 
                    className="input half" 
                    value={props.state.size} 
                    onChange={onFieldChange} 
                    placeholder="size"
                    required 
                />
            </div>
            <div className="row">
                <input 
                    name="purchasePrice" 
                    type="text" 
                    className="input half" 
                    value={props.state.purchasePrice} 
                    onChange={onFieldChange} 
                    placeholder="Purchase Price"
                    required
                />
                <div className="marketPrice-container">
                    <div className={`checkbox-container${props.state.autoSync ? '-inline' : ''}`}>
                        <input type="checkbox" 
                            name="autoSync" 
                            checked={props.state.autoSync} 
                            className="marketPrice-checkbox" 
                            onChange={onFieldChange} 
                        />
                        <label className="marketPrice-checkbox-label">Auto-Sync Market Prices</label>
                    </div>
                    <input 
                        name="marketPrice" 
                        type="text" 
                        className={`input${props.state.autoSync ? '-disabled' : ''}`} 
                        value={props.state.marketPrice} 
                        onChange={onFieldChange} 
                        disabled={props.state.autoSync}
                        placeholder="0"
                    />
                </div>
            </div>
            <div className="row image-input">
                <div className="image">
                    <img src={isImgValid ? props.state.image : 'https://img.icons8.com/ultraviolet/100/000000/no-image.png'} className="input-image" />
                </div>
                <input 
                    name="image" 
                    type="text" 
                    className="input image" 
                    onChange={onFieldChange} 
                    value={props.state.image}
                />
            </div>
            <div className="row center">
                <input
                    name="quantity"
                    type="number"
                    className="input half"
                    onChange={onFieldChange}
                    value={props.state.quantity}
                    placeholder="Quantity"
                />
            </div>
        </div>
    )
}