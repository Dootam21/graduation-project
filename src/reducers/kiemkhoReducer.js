import { KIEMKHO_ID, RESET_KIEMKHO } from '../constants/actionTypes';

const INIT_STATE = {
    kiemkho_id: 0,
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case KIEMKHO_ID:
            return {
                ...state,
                kiemkho_id: action.payload
            };
        
        case RESET_KIEMKHO:
            return INIT_STATE;


        default:
            return state;
    }
};
