import { createConnectedStore } from 'undux';
import * as types from '../../common/types';

const initialState: types.StoreState = {
    inventory: [],
    inventoryTotal: 0,
    potentialProfits: 0,
    totalSpent: 0,
}
export default createConnectedStore(initialState);