import { CURRENT_HANG_ID, GET_LIST_HANG, RESET_HANG, LIST_HANG_OBJECT } from '../constants/actionTam';

const hangAction = (act, data) => async (dispatch) => {
    switch (act) {
        case 'current_hang_id':
            dispatch({ type: CURRENT_HANG_ID, payload: data }); break;
        case 'get_list_hang':
            dispatch({ type: GET_LIST_HANG, payload: data }); break;
        case 'list_hang_object':
            dispatch({ type: LIST_HANG_OBJECT, payload: data }); break;
        case 'reset_hang':
            dispatch({ type: RESET_HANG }); break
        default:
            break;
    }
}

export default hangAction;