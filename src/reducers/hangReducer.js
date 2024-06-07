import { CURRENT_HANG_ID, GET_LIST_HANG, RESET_HANG, LIST_HANG_OBJECT } from '../constants/actionTam';

const INIT_STATE = {
    id: 0,
    title: '',
    listHang: [],
    listHangObj: {},
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CURRENT_HANG_ID:
            return {
                ...state,
                id: action.payload,
            };

        case GET_LIST_HANG:
            return {
                ...state,
                listHang: action.payload
            }

        case LIST_HANG_OBJECT:
            return {
                ...state,
                listHangObj: action.payload
            }

        case RESET_HANG:
            return INIT_STATE;

        default:
            return state;
    }
};
