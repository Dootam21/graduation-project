import { KIEMKHO_ID } from '../constants/actionTypes';
import { RESET_KIEMKHO } from '../constants/actionTam';

const kiemkhoAction = (act, data) => async (dispatch) => {
    switch (act) {

        case 'current_kiemkho_id':
            dispatch({ type: KIEMKHO_ID, payload: data }); break;
        case 'reset_kiemkho':
            dispatch({ type: RESET_KIEMKHO }); break;
        default:
            break;
    }
}

export default kiemkhoAction;