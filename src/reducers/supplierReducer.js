import { CURRENT_SUPPLIER_ID } from '../constants/actionTypes';
import { GET_LIST_SUPPLIER, RESET_SUPPLIER, LIST_SUPPLIER_OBJECT } from '../constants/actionTam';

const INIT_STATE = {
    id: 0,
    title: '',
    phone: '',
    address: '',
    images: [],
    ngoaite: 1,
    listSupplier: [],
    listSupplierObj: {},
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CURRENT_SUPPLIER_ID:
            return {
                ...state,
                id: action.payload,
            };

        case GET_LIST_SUPPLIER:
            return {
                ...state,
                listSupplier: action.payload
            }

        case LIST_SUPPLIER_OBJECT:
            return {
                ...state,
                listSupplierObj: action.payload
            }

        case RESET_SUPPLIER:
            return INIT_STATE;

        default:
            return state;
    }
};
