import { GET_PRODUCT_DATA, GET_PRODUCT_ITEM, SAVE_PRODUCT_ITEM, CURRENT_PRODUCT_ID, ADD_PRODUCT, GET_DETAIL_PRODUCT, ADD_QUANTITY, UPDATE_QUANTITY, GET_PRICE, GET_TYPE } from '../constants/actionTypes';
import { SET_NHAP_ID, SET_TRA_ID, SET_CHI_ID, SET_TYPE_TRA, RESET_PRODUCT } from '../constants/actionTam';

const INIT_STATE = {
    id: 0,
    code: '',
    title: '',
    category_id: 1,
    hang_id: 0,
    supplier_id: 0,
    price_nhap: 0,
    price_buon: 0,
    price_ctv: 0,
    price_le: 0,
    images: [],
    color: [],
    size: [],
    list_quantity: [],
    price: 0,
    type: 2,
    nhap_id: 0,
    tra_id: 0,
    chi_id: 0,
    typeTra: 0, // 1 tra xuong, 2 khach tra
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CURRENT_PRODUCT_ID:
            return {
                ...state,
                id: action.payload,
            };
        case GET_DETAIL_PRODUCT:
            return {
                ...state,
                id: action.payload.id,
                code: action.payload.code,
                title: action.payload.title,
                category_id: action.payload.category_id,
                hang_id: action.payload.hang_id,
                supplier_id: action.payload.supplier_id,
                price_nhap: action.payload.price_nhap,
                price_buon: action.payload.price_buon,
                price_ctv: action.payload.price_ctv,
                price_le: action.payload.price_le,
                images: action.payload.images,
                color: action.payload.color,
                size: action.payload.size,
            }

        case ADD_PRODUCT:
            return {
                ...state,
                code: action.payload.code,
                title: action.payload.title,
                category_id: action.payload.category_id,
                hang_id: action.payload.hang_id,
                supplier_id: action.payload.supplier_id,
                price_nhap: action.payload.price_nhap,
                price_buon: action.payload.price_buon,
                price_ctv: action.payload.price_ctv,
                price_le: action.payload.price_le,
                images: action.payload.images,
            }

        case ADD_QUANTITY:
            return {
                ...state,
                list_quantity: action.payload
            }

        case UPDATE_QUANTITY:
            return {
                ...state,
                list_quantity: action.payload
            }

        case GET_PRICE:
            return {
                ...state,
                price: action.payload
            }

        case GET_TYPE:
            return {
                ...state,
                type: action.payload
            }

        case SET_NHAP_ID:
            return {
                ...state,
                nhap_id: action.payload
            }

        case SET_TRA_ID:
            return {
                ...state,
                tra_id: action.payload
            }

        case SET_CHI_ID:
            return {
                ...state,
                chi_id: action.payload
            }

        case SET_TYPE_TRA:
            return {
                ...state,
                typeTra: action.payload
            }

        case RESET_PRODUCT:
            return INIT_STATE;
        default:
            return state;
    }
};
