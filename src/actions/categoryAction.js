import { GET_CATEGORIES, CURRENT_CATEGORY_ID } from '../constants/actionTypes';
import { GET_LIST_CATEGORY, RESET_CATEGORY, LIST_CATEGORY_OBJECT } from '../constants/actionTam';

const categoryAction = (act, data) => async (dispatch) => {
    switch (act) {
        // case 'current_category_id':
        //     dispatch({ type: CURRENT_PRODUCT_ID, payload: data }); break;
        // case 'add_category':
        //     dispatch({ type: ADD_PRODUCT, payload: data }); break;
        case 'get_category':
            dispatch({ type: GET_CATEGORIES, payload: data }); break;

        case 'current_category_id':
            dispatch({ type: CURRENT_CATEGORY_ID, payload: data }); break;

        case 'get_list_category':
            dispatch({ type: GET_LIST_CATEGORY, payload: data }); break;

        case 'list_category_object':
            dispatch({ type: LIST_CATEGORY_OBJECT, payload: data }); break;

        case 'reset_category':
            dispatch({ type: RESET_CATEGORY }); break;
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

export default categoryAction;