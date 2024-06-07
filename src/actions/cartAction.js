import { CURRENT_CART_BILL_ID, CURRENT_CART_ORDER_ID, CURRENT_CART_THU_ID, CURRENT_CART_STATUS, RESET_CART, CURRENT_CART_BILL_ID_TEMP, CURRENT_CART_ORDER_DETAIL, CURRENT_CART_AUTO, GET_PRINTER_NAME, GET_DATA_FILTER } from '../constants/actionTam';

const cartAction = (act, data) => async (dispatch) => {
    switch (act) {
        case 'current_cart_bill_id':
            dispatch({ type: CURRENT_CART_BILL_ID, payload: data }); break;
        case 'current_cart_bill_id_temp':
            dispatch({ type: CURRENT_CART_BILL_ID_TEMP, payload: data }); break;
        case 'current_cart_order_id':
            dispatch({ type: CURRENT_CART_ORDER_ID, payload: data }); break;
        case 'current_cart_thu_id':
            dispatch({ type: CURRENT_CART_THU_ID, payload: data }); break;
        case 'current_cart_status':
            dispatch({ type: CURRENT_CART_STATUS, payload: data }); break;
        case 'current_cart_order_detail':
            dispatch({ type: CURRENT_CART_ORDER_DETAIL, payload: data }); break;
        case 'current_cart_auto':
            dispatch({ type: CURRENT_CART_AUTO, payload: data }); break;
        case 'get_printer_name':
            dispatch({ type: GET_PRINTER_NAME, payload: data }); break;
        case 'get_data_filter':
            dispatch({ type: GET_DATA_FILTER, payload: data }); break;
        case 'reset_cart':
            dispatch({ type: RESET_CART }); break;
        default:
            break;
    }
}

export default cartAction;