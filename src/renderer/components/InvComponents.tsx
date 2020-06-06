import React from 'react';
import Select from 'react-select';

import { Action, InventoryItem } from '../../common/types';

export const TableItem = (props: InventoryItem) => {
    const {
        name,
        sku,
        purchasePrice,
        marketPrice,
        image,
        size,
        category
    } = props;
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
                    onChange={(e) => {console.log(e)}}
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