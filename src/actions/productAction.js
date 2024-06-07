import { GET_PRODUCT_DATA, GET_PRODUCT_ITEM, SAVE_PRODUCT_ITEM, CURRENT_PRODUCT_ID, ADD_PRODUCT, GET_DETAIL_PRODUCT, ADD_QUANTITY, UPDATE_QUANTITY, GET_PRICE, GET_TYPE } from '../constants/actionTypes';
import { SET_NHAP_ID, SET_TRA_ID, SET_CHI_ID, SET_TYPE_TRA, RESET_PRODUCT } from '../constants/actionTam';

const productAction = (act, data) => async (dispatch) => {
    switch (act) {
        case 'current_product_id':
            dispatch({ type: CURRENT_PRODUCT_ID, payload: data }); break;
        case 'add_product':
            dispatch({ type: ADD_PRODUCT, payload: data }); break;
        case 'get_products':
            dispatch({ type: GET_PRODUCT_DATA, payload: data }); break;
        case 'get_details_product':
            dispatch({ type: GET_DETAIL_PRODUCT, payload: data }); break;
        case 'add_quantity':
            dispatch({ type: ADD_QUANTITY, payload: data }); break;
        case 'update_quantity':
            dispatch({ type: UPDATE_QUANTITY, payload: data }); break;
        case 'get_price':
            dispatch({ type: GET_PRICE, payload: data }); break;
        case 'get_type':
            dispatch({ type: GET_TYPE, payload: data }); break;
        case 'set_nhap_id':
            dispatch({ type: SET_NHAP_ID, payload: data }); break;
        case 'set_tra_id':
            dispatch({ type: SET_TRA_ID, payload: data }); break;
        case 'set_chi_id':
            dispatch({ type: SET_CHI_ID, payload: data }); break;
        case 'set_type_tra':
            dispatch({ type: SET_TYPE_TRA, payload: data }); break;
        case 'reset_product':
            dispatch({ type: RESET_PRODUCT }); break;
        default:
            break;
    }

    //  if(act == 'getTxt')
    // {
    //    	dispatch({
    //    		type: GET_TXT, 
    //    	});
    // }

    //  if(act == 'setTxt')
    // {
    //    dispatch({
    //      type: SET_TXT, 
    //      data: data
    //    });
    //  }
}

export default productAction;