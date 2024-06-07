import { USER_INFO, VIEW_PROFILE } from '../constants/actionTypes';
import { SET_LIST_USER, UPDATE_PHONE, RESET_ACCOUNT, UPDATE_BANNER_AVATAR, ADD_USER_SALES, REMOVE_USER_SALES } from '../constants/actionTam';

const INIT_STATE = {
    uid: 0,
    username: '',
    fullname: '',
    phone: '',
    email: '',
    avatar: '',
    banner: '',
    editpass: '',
    group_title: '',
    // nv_edit_pass: '',
    // nv_edit_quanly: '',
    // nv_edit_fullname: '',
    // nv_edit_chucvu: '',
    // nv_edit_group_id: '',
    // nv_edit_status: '',
    // nv_edit_showphone: '',
    // group_title: '',
    // role: [],
    roles: [],
    active_uid: 0,
    listUsers: [],
    groupId: 0,
    is_show_phone_supp: 0,
    is_show_debt: 0,
    is_show_phone_cus: 0,
    is_admin: '',
    list_user_sale: [],
}

export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case USER_INFO:
            return {
                ...state,
                uid: action.payload.id,
                username: action.payload.username,
                fullname: action.payload.fullname,
                phone: action.payload.phone,
                avatar: action.payload.avatar,
                banner: action.payload.banner,
                email: action.payload.email,
                group_title: action.payload.group_title,
                roles: action.payload.role,
                groupId: action.payload.group_id,
                is_show_phone_supp: action.payload.is_show_phone_supp,
                is_show_debt: action.payload.is_show_debt,
                is_show_phone_cus: action.payload.is_show_phone_cus,
                is_admin: action.payload.is_admin,
            };
        case VIEW_PROFILE:
            return {
                ...state,
                active_uid: action.payload,
            };

        case SET_LIST_USER:
            return {
                ...state,
                listUsers: action.payload,
            }

        case UPDATE_PHONE:
            return {
                ...state,
                phone: action.payload,
            }

        case UPDATE_BANNER_AVATAR:
            return {
                ...state,
                avatar: action.payload.avatar,
                banner: action.payload.banner,
            }

        case ADD_USER_SALES:
            return {
                ...state,
                list_user_sale: [...state.list_user_sale, action.payload]
            }

        case REMOVE_USER_SALES:
            const updatedItems = state.list_user_sale.slice(0, -1);
            return {
                ...state,
                list_user_sale: updatedItems
            };

        case RESET_ACCOUNT:
            return INIT_STATE;

        default:
            return state;
    }
};
