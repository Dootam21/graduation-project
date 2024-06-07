
import { DOMAIN } from '../constants/config';

const GET_ALL_CHI = DOMAIN + 'api/api_thuchi/chi_list';
const GET_ALL_NGUON = DOMAIN + 'api/api_thuchi/customer_source_list';
const GET_PHU_CHI_TODAY = DOMAIN + 'api/api_thuchi/get_totle_chi';
const GET_ALL_THU = DOMAIN + 'api/api_thuchi/thu_list';
const GET_PHU_THU_TODAY = DOMAIN + 'api/api_thuchi/get_totle_thu';
const ADD_CUSTOMER_SOURCE = DOMAIN + 'api/api_thuchi/customer_source_add';
const EDIT_CUSTOMER_SOURCE = DOMAIN + 'api/api_thuchi/customer_source_edit';
const DELETE_CUSTOMER_SOURCE = DOMAIN + 'api/api_thuchi/customer_source_delete';
const ADD_THU = DOMAIN + 'api/api_thuchi/thu_add';
const ADD_CHI = DOMAIN + 'api/api_thuchi/chi_add';
const GET_PAYMENT_HISTORY = DOMAIN + 'api/api_thuchi/thuchi_history';
const GET_PAYMENT_HISTORY_DETAIL = DOMAIN + 'api/api_thuchi/thuchi_history_detail';
const GET_TOTAL_THUCHI = DOMAIN + 'api/api_thuchi/get_totle_thu';
const UPDATE_IMAGES = DOMAIN + 'api/api_thuchi/thuchi_update_image';

const get_all_chi = async (data) => {
    console.log({
        from: data.from,
    });
    return await fetch(GET_ALL_CHI,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                u_id: data.uid,
                source_id: data.nguon_id,
                day_from: data.selectedDateFrom,
                day_to: data.selectedDateTo,
                from: data.from,
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

const customer_source_list = async (data) => {
    return await fetch(GET_ALL_NGUON,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_totle_chi = async (data) => {
    return await fetch(GET_PHU_CHI_TODAY,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_all_thu = async (data) => {
    console.log('thu data', data);
    return await fetch(GET_ALL_THU,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                u_id: data.uid,
                source_id: data.nguon_id,
                day_from: data.selectedDateFrom,
                day_to: data.selectedDateTo,
                from: data.from,
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

const get_totle_thu = async (data) => {
    return await fetch(GET_PHU_THU_TODAY,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const add_customer_source = async (data) => {
    return await fetch(ADD_CUSTOMER_SOURCE,
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

const edit_customer_source = async (data) => {
    console.log(data);
    return await fetch(EDIT_CUSTOMER_SOURCE,
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

const delete_customer_source = async (data) => {
    console.log(data);
    return await fetch(DELETE_CUSTOMER_SOURCE,
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

const add_thu = async (data) => {
    console.log('khach (ncc) thanh toan', data);
    // return true
    return await fetch(ADD_THU,
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

const add_chi = async (data) => {
    console.log('thanh toan cho khach(ncc)', data);
    // return true
    return await fetch(ADD_CHI,
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

const get_payment_history = async (data) => {
    console.log(data);
    // return true
    return await fetch(GET_PAYMENT_HISTORY,
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

const get_payment_history_detail = async (data) => {
    console.log('payment history', data);
    // return true
    return await fetch(GET_PAYMENT_HISTORY_DETAIL,
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

const get_total_thuchi = async (data) => {
    // return true
    return await fetch(GET_TOTAL_THUCHI,
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

const update_images = async (data) => {
    // return true
    console.log('image', data);
    return await fetch(UPDATE_IMAGES,
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
    customer_source_list,
    get_all_chi,
    get_totle_chi,
    get_all_thu,
    get_totle_thu,
    add_customer_source,
    edit_customer_source,
    delete_customer_source,
    add_thu,
    add_chi,
    get_payment_history,
    get_payment_history_detail,
    get_total_thuchi,
    update_images
}
