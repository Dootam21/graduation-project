import { CURRENT_SOURCE_ID, CURRENT_SOURCE_TITLE, GET_DETAIL, RESET_THUCHI } from '../constants/actionTam';

const INIT_STATE = {
    source_id: 0,
    title: '',
    data: {},
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CURRENT_SOURCE_ID:
            return {
                ...state,
                source_id: action.payload,
            };

        case CURRENT_SOURCE_TITLE:
            return {
                ...state,
                title: action.payload
            }

        case GET_DETAIL:
            return {
                ...state,
                data: action.payload
            }

        case RESET_THUCHI:
            return INIT_STATE;

        default:
            return state;
    }
};
