import { CURRENT_CUSTOMER_ID, GET_LIST_CUSTOMER, GET_LIST_PHONE, REMOVE_PHONE, SET_LIST_PHONE, ADD_CUSTOMER, CURRENT_CUSTOMER_ID_FINDER } from '../constants/actionTypesH';
import { RESET_CUSTOMER } from '../constants/actionTam';
const customerAction = (act, data) => async (dispatch) => {
    switch (act) {
        case 'current_customer_id':
            // console.log(act, data);
            dispatch({ type: CURRENT_CUSTOMER_ID, payload: data }); break;

        case 'current_customer_id_finder':
            dispatch({ type: CURRENT_CUSTOMER_ID_FINDER, payload: data }); break;

        case 'get_list_customer':
            dispatch({ type: GET_LIST_CUSTOMER, payload: data }); break;

        case 'get_list_phone':
            dispatch({ type: GET_LIST_PHONE, payload: data }); break;

        case 'remove_phone':
            dispatch({ type: REMOVE_PHONE, payload: data }); break;

        case 'set_list_phone':
            dispatch({ type: SET_LIST_PHONE, payload: data }); break;

        case 'reset_customer':
            dispatch({ type: RESET_CUSTOMER }); break;

        case 'add_customer':
            dispatch({ type: ADD_CUSTOMER, payload: data }); break;
        default:
            break;
    }
}

export default customerAction;