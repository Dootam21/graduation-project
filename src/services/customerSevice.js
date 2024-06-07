import { DOMAIN } from '../constants/config';
const ADD_CUSTOMER = DOMAIN + 'api/api_customer/customer_add';
const GET_ALL_CUSTOMER = DOMAIN + 'api/api_customer/customer_list';
const GET_DETAIL_CUSTOMER = DOMAIN + 'api/api_customer/customer_detail';
const DELETE_CUSTOMER = DOMAIN + 'api/api_customer/customer_delete';
const EDIT_CUSTOMER = DOMAIN + 'api/api_customer/customer_edit';
const ADD_PHONE_NUMBER = DOMAIN + 'api/api_customer/customer_phone_update';
const ADD_MANAGER = DOMAIN + 'api/api_customer/customer_quanly';
const UPDATE_IMAGE_CUSTOMER = DOMAIN + 'api/api_customer/customer_image_update';

const get_all_customer = async (data) => {
    console.log('filter dataa', data);
    return await fetch(GET_ALL_CUSTOMER,
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

const add_customer = async (data) => {
    console.log('xin chao', data);
    return await fetch(ADD_CUSTOMER,
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
            // return true
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const edit_detail_customer = async (data) => {
    console.log('xin chao thuan', JSON.stringify(data));
    return await fetch(EDIT_CUSTOMER,
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
            // return true
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_detail_customer = async (data) => {
    return await fetch(GET_DETAIL_CUSTOMER,
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

const delete_customer = async (data) => {
    console.log('hello', data);
    return await fetch(DELETE_CUSTOMER,
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

const add_phone_number = async (data) => {
    console.log('phone to server', JSON.stringify(data));
    return await fetch(ADD_PHONE_NUMBER,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}


const add_manager = async (data) => {
    console.log('hello', JSON.stringify(data));
    // return true
    return await fetch(ADD_MANAGER,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const update_image_customer = async (data) => {
    return await fetch(UPDATE_IMAGE_CUSTOMER,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

export {
    add_customer,
    get_all_customer,
    get_detail_customer,
    delete_customer,
    edit_detail_customer,
    add_phone_number,
    add_manager,
    update_image_customer
}
