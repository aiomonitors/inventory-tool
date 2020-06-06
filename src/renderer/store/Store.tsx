import { createConnectedStore } from 'undux';
import * as types from '../../common/types';

const initialState: types.StoreState = {
    inventory: [
        {
          name: 'Jordan 1 Spiderman',
          sku: 'CHDHD',
          size: '8',
          purchasePrice: 175,
          marketPrice: 400,
          image: 'https://stockx.imgix.net/Air-Jordan-1-Retro-High-Pine-Green-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1581447019'
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
    inventoryTotal: 0
}
export default createConnectedStore(initialState);