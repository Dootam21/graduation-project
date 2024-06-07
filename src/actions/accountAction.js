import { USER_INFO, VIEW_PROFILE } from '../constants/actionTypes';
import { SET_LIST_USER, UPDATE_PHONE, RESET_ACCOUNT, UPDATE_BANNER_AVATAR, ADD_USER_SALES, REMOVE_USER_SALES } from '../constants/actionTam';

const userAction = (act, data) => async (dispatch) => {
    switch (act) {
        case 'user_info':
            dispatch({ type: USER_INFO, payload: data }); break;

        case 'view_profile':
            dispatch({ type: VIEW_PROFILE, payload: data }); break;

        case 'set_list_user':
            dispatch({ type: SET_LIST_USER, payload: data }); break;

        case 'update_phone':
            dispatch({ type: UPDATE_PHONE, payload: data }); break;

        case 'reset_account':
            dispatch({ type: RESET_ACCOUNT }); break;

        case 'update_banner_avatar':
            dispatch({ type: UPDATE_BANNER_AVATAR, payload: data }); break;

        case 'add_user_sales':
            dispatch({ type: ADD_USER_SALES, payload: data }); break;

        case 'remove_user_sales':
            dispatch({ type: REMOVE_USER_SALES }); break;
        default:
            break;
    }
}

export default userAction;