import { CURRENT_CUSTOMER_ID, GET_LIST_CUSTOMER, GET_LIST_PHONE, REMOVE_PHONE, SET_LIST_PHONE, RESET_CUSTOMER, ADD_CUSTOMER, CURRENT_CUSTOMER_ID_FINDER } from '../constants/actionTypesH';

const INIT_STATE = {
    id: 0,
    listCustomers: [],
    listPhone: [],
    idFinder: 0,
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CURRENT_CUSTOMER_ID:
            // console.log('action payload', action.payload);
            return {
                ...state,
                id: action.payload,
            };

        case CURRENT_CUSTOMER_ID_FINDER:
            return {
                ...state,
                idFinder: action.payload,
            };

        case GET_LIST_CUSTOMER:
            return {
                ...state,
                listCustomers: action.payload
            }

        case GET_LIST_PHONE:
            return {
                ...state,
                listPhone: [...state.listPhone, action.payload],
            }

        case REMOVE_PHONE:
            const newListPhone = [
                ...state.listPhone.slice(0, action.payload),
                ...state.listPhone.slice(action.payload + 1),
            ];
            return {
                ...state,
                listPhone: newListPhone
            }

        case SET_LIST_PHONE:
            return {
                ...state,
                listPhone: action.payload,
            }

        case ADD_CUSTOMER:
            return {
                ...state,
                listCustomers: [...state.listCustomers, action.payload]
            }

        case RESET_CUSTOMER:
            return INIT_STATE;

        default:
            return state;
    }
};
