import { CURRENT_CART_BILL_ID, CURRENT_CART_ORDER_ID, CURRENT_CART_THU_ID, CURRENT_CART_STATUS, RESET_CART, CURRENT_CART_BILL_ID_TEMP, CURRENT_CART_ORDER_DETAIL, CURRENT_CART_AUTO, GET_PRINTER_NAME, GET_DATA_FILTER } from '../constants/actionTam';

const INIT_STATE = {
    u_id: 0,
    bill_id: 0,
    product_id: 0,
    order_id: 0,
    thu_id: 0,
    bill_id_temp: 0,
    order_detail: {},
    auto: 0,
    printerName: '',
    dataFilter: {
        day_from: '',
        day_to: '',
        filter: 1,
        isActive: 'Hôm nay',
    },
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CURRENT_CART_BILL_ID:
            return {
                ...state,
                bill_id: action.payload
            };

        case CURRENT_CART_ORDER_ID:
            return {
                ...state,
                order_id: action.payload
            }

        case CURRENT_CART_THU_ID:
            return {
                ...state,
                thu_id: action.payload
            }

        case CURRENT_CART_STATUS:
            return {
                ...state,
                status: action.payload
            }

        case CURRENT_CART_BILL_ID_TEMP:
            return {
                ...state,
                bill_id_temp: action.payload
            }

        case CURRENT_CART_ORDER_DETAIL:
            return {
                ...state,
                order_detail: action.payload
            }

        case CURRENT_CART_AUTO:
            return {
                ...state,
                auto: action.payload
            }

        case GET_PRINTER_NAME:
            return {
                ...state,
                printerName: action.payload
            }
            
        case GET_DATA_FILTER:
            return {
                ...state,
                dataFilter: action.payload
            }

        case RESET_CART:
            return INIT_STATE;


        default:
            return state;
    }
};
