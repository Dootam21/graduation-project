import { CURRENT_SUPPLIER_ID } from '../constants/actionTypes';
import { GET_LIST_SUPPLIER, RESET_SUPPLIER, LIST_SUPPLIER_OBJECT } from '../constants/actionTam';

const supplierAction = (act, data) => async (dispatch) => {
    switch (act) {
        case 'current_supplier_id':
            dispatch({ type: CURRENT_SUPPLIER_ID, payload: data }); break;
        case 'get_list_supplier':
            dispatch({ type: GET_LIST_SUPPLIER, payload: data }); break;
        case 'list_supplier_object':
            dispatch({ type: LIST_SUPPLIER_OBJECT, payload: data }); break;
        case 'reset_supplier':
            dispatch({ type: RESET_SUPPLIER }); break;
        default:
            break;
    }
}

export default supplierAction;