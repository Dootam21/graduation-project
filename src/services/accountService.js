import { DOMAIN } from '../constants/config';

const ADD_USER_API = DOMAIN + 'api/api_user/user_add';
const LIST_GROUP_USER_API = DOMAIN + 'api/api_user/list_group';
const LOGIN_USER_API = DOMAIN + 'api/api_user/user_login';
const DETAIL_USER_API = DOMAIN + 'api/api_user/user_detail';
const UPDATE_USER_API = DOMAIN + 'api/api_user/user_edit';
const UPDATE_IMAGE_USER_API = DOMAIN + 'api/api_user/user_image';
const USER_LIST_API = DOMAIN + 'api/api_user/user_list';
const USER_DETAIL_API = DOMAIN + 'api/api_user/user_detail_acc';
const USER_UPDATE_NV_API = DOMAIN + 'api/api_user/user_update_nhanvien';
const GET_ROLE_LIST = DOMAIN + 'api/api_user/get_group_role';
const UPDATE_ROLE_LIST = DOMAIN + 'api/api_user/update_group_role';

const login = async (user, pass) => {
    const d = await fetch(LOGIN_USER_API,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
                pass: pass,
            })
        });

    // console.log(d);

    const responseJson = await d.json();

    if (responseJson.res && responseJson.res == 'done')
        return responseJson.data;
    else
        return false;


    // .then((response) => response.json())
    // .then((responseJson) => {

    //     if (responseJson.res && responseJson.res == 'done')
    //         return responseJson.data;
    //     else
    //         return false;
    // });
}

const get_user_data = async (token) => {
    console.log('token', token);
    console.log(token);
    return await fetch(DETAIL_USER_API,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const add_user = async (data) => {
    console.log(data);
    const d = await fetch(ADD_USER_API,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                u_id: data.u_id,
                id: data.id,
                fullname: data.fullname,
                username: data.username,
                password: data.password,
                repass: data.repass,
                group_id: data.group_id,
                status: data.status,
            })
        });


    const responseJson = await d.json();
    console.log(responseJson);

    //.then((response) => response.json())
    //.then((responseJson) => {

    if (responseJson.res && responseJson.res == 'done')
        return responseJson.data;
    else
        return false;
    // });
}

const list_group = async (data) => {
    return await fetch(LIST_GROUP_USER_API,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((responseJson) => {

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const save_user_image = async (data) => {
    var id = data.id ? data.id : '';
    var cover = data.cover ? data.cover : '';
    var avatar = data.avatar ? data.avatar : '';

    console.log('save_user_image.data');
    console.log(data);
    return await fetch(UPDATE_IMAGE_USER_API,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                cover: cover,
                avatar: avatar,
            })
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((responseJson) => {

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const save_user_data = async (data) => {
    var pass = data.old_pass ? data.old_pass : '';
    var new_pass = data.new_pass ? data.new_pass : '';

    console.log(data);
    return await fetch(UPDATE_USER_API,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.id,
                phone: data.phone,
                pass: pass,
                new_pass: new_pass,
                //token: token,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_user_list = async (data, uid) => {

    var group_id = '';

    switch (data) {
        case 'Quản lí cửa hàng':
            group_id = 1;
            break;
        case 'Nhân viên kho':
            group_id = 2;
            break;
        case 'Nhân viên bán hàng':
            group_id = 3;
            break;
        case 'Khách':
            group_id = 4;
            break;
        default:
            group_id = '';
            break;
    }

    console.log('group_id');
    console.log(group_id);

    const d = await fetch(USER_LIST_API,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                group_id: group_id,
                u_id: uid
            })
        });

    console.log(d);
    const responseJson = await d.json();

    // .then((response) => response.json())
    // .then((responseJson) => {

    if (responseJson.res && responseJson.res == 'done')
        return responseJson.data;
    else
        return false;
    // });
}

const update_nhanvien = async (data) => {
    console.log('update_nhanvien.apply.data');
    console.log(data);

    return await fetch(USER_UPDATE_NV_API,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                u_id: data.u_id,
                id: data.id,
                field: data.field,
                data: data.data,
                // parent_id: data.parent_id
            })
        }).then((response) => {
            // console.log(response.text());
            return response.json();
        }).then((responseJson) => {
            // console.log(responseJson);
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_user_detail = async (data) => {
    return await fetch(USER_DETAIL_API,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response);
            return response.json();
        }).then((responseJson) => {
            // console.log(responseJson);
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_role_list = async (data) => {
    console.log(data);
    return await fetch(GET_ROLE_LIST,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response);
            return response.json();
        }).then((responseJson) => {
            // console.log(responseJson);
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const update_role_list = async (data) => {
    console.log(data);
    return await fetch(UPDATE_ROLE_LIST,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response);
            return response.json();
        }).then((responseJson) => {
            // console.log(responseJson);
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}
export {
    login,
    get_user_data,
    get_user_list,
    save_user_data,
    add_user,
    list_group,
    save_user_image,
    get_user_detail,
    update_nhanvien,
    get_role_list,
    update_role_list,
}
