import { createConnectedStore } from 'undux';
import * as types from '../../common/types';

const initialState: types.StoreState = {
    inventory: [
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
    ],
}

export default createConnectedStore(initialState);