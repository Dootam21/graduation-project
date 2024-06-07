import { CURRENT_SOURCE_TITLE, CURRENT_SOURCE_ID, GET_DETAIL, RESET_THUCHI } from '../constants/actionTam';

const thuchiAction = (act, data) => async (dispatch) => {
    switch (act) {
        case 'current_source_id':
            dispatch({ type: CURRENT_SOURCE_ID, payload: data }); break;
        case 'current_source_title':
            dispatch({ type: CURRENT_SOURCE_TITLE, payload: data }); break;
        case 'get_detail':
            dispatch({ type: GET_DETAIL, payload: data }); break;
        case 'reset_thuchi':
            dispatch({ type: RESET_THUCHI });
        default:
            break;
    }
}

export default thuchiAction;