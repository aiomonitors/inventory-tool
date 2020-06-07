import { createConnectedStore } from 'undux';
import * as types from '../../common/types';

const initialState: types.StoreState = {
    inventory: [],
    inventoryTotal: 0
}
export default createConnectedStore(initialState);