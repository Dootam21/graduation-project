import { DOMAIN } from '../constants/config';

const GET_LIST_CART = DOMAIN + 'api/api_cart/cart_list';
const ADD_CART = DOMAIN + 'api/api_cart/cart_add';
const GET_DETAIL_QUANTITY_CART = DOMAIN + 'api/api_cart/cart_detail_quantity';
const EDIT_QUANTITY_CART = DOMAIN + 'api/api_cart/cart_edit_quantity';
const UPDATE_PRICE = DOMAIN + 'api/api_cart/cart_price_update';
const UPDATE_CUSTOMER = DOMAIN + 'api/api_cart/cart_customer_update';
const GET_NUMBER_CART = DOMAIN + 'api/api_cart/get_number_cart';
const DELETE_CART = DOMAIN + 'api/api_cart/cart_delete';
const PAYMENT_CART = DOMAIN + 'api/api_cart/cart_payment';
const GET_THU_DETAIL = DOMAIN + 'api/api_cart/cart_thu_detail';
const EDIT_THU = DOMAIN + 'api/api_cart/cart_thu_edit';
const GET_WAGONS = DOMAIN + 'api/api_cart/get_toa_hang';
const CHANGE_STATUS = DOMAIN + 'api/api_cart/cart_change_status';
const GET_TOTAL = DOMAIN + 'api/api_cart/get_totle_cart';
const CREATE_CART_QUICK = DOMAIN + 'api/api_cart/cart_create_quick';
const CREATE_COPY_CART = DOMAIN + 'api/api_cart/cart_copy';
const GET_WAGONS_HISTORY = DOMAIN + 'api/api_cart/cart_product_history';
const DELETE_CART_COOK = DOMAIN + 'api/api_cart/cart_delete_cook';
const CHANGE_CUSTOMER = DOMAIN + 'api/api_cart/change_customer_order';
const CHANGE_NOTE = DOMAIN + 'api/api_cart/change_ghi_chu_order';

const add_cart = async (data) => {
    console.log('cart data ready to server', JSON.stringify(data));

    return await fetch(ADD_CART,
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
            console.log(responseJson);
            // return responseJson;

            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const get_list_cart = async (data) => {
    console.log('get list cart', data);
    return await fetch(GET_LIST_CART,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const get_list_cart_bill_id = async (data) => {
    console.log('data get orderlisst', data);

    return await fetch(GET_LIST_CART,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const get_detail_quantity_cart = async (data) => {
    console.log(data);
    return await fetch(GET_DETAIL_QUANTITY_CART,
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
            // console.log(responseJson);
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const edit_quantity_cart = async (data, list) => {
    console.log('lsquan day len :', {
        u_id: data.u_id,
        bill_id: data.bill_id,
        product_id: data.product_id,
        order_id: data.order_id,
        list_quantity: list
    });
    return await fetch(EDIT_QUANTITY_CART,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                u_id: data.u_id,
                bill_id: data.bill_id,
                product_id: data.product_id,
                order_id: data.order_id,
                list_quantity: list
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}


const update_price = async (data) => {
    console.log('update price', JSON.stringify(data));
    return await fetch(UPDATE_PRICE,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const update_customer = async (data) => {
    // console.log(data);
    console.log('data update ', JSON.stringify(data));
    // return true;
    return await fetch(UPDATE_CUSTOMER,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const get_number_cart = async (u_id) => {
    return await fetch(GET_NUMBER_CART,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                u_id: u_id,
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const delete_cart = async (data) => {
    console.log('delete cart', JSON.stringify(data));
    return await fetch(DELETE_CART,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const payment_cart = async (data) => {
    console.log('payment', JSON.stringify(data));
    return await fetch(PAYMENT_CART,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const get_thu_detail = async (data) => {
    console.log('thu_id', JSON.stringify(data));
    // return true;
    return await fetch(GET_THU_DETAIL,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const edit_thu = async (data) => {
    console.log('thu_id', JSON.stringify(data));
    // return true;

    return await fetch(EDIT_THU,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}



// freight wagons
const get_wagons = async (data) => {
    console.log('get data wagon', data);
    // return true;
    return await fetch(GET_WAGONS,
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
            // console.log('response tra ve', responseJson);
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const change_status = async (data) => {
    console.log('change stt', JSON.stringify(data));
    // return true

    return await fetch(CHANGE_STATUS,
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
            // console.log(responseJson);
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const get_total = async (data) => {
    console.log('total price', data);
    return await fetch(GET_TOTAL,
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
            // console.log(responseJson);
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const create_cart_quick = async (data) => {
    console.log('quick cart', data);
    // return true
    return await fetch(CREATE_CART_QUICK,
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
            // console.log(responseJson);
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const create_copy_cart = async (data) => {
    console.log('copy cart', data);
    // return true
    return await fetch(CREATE_COPY_CART,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const get_wagons_history = async (data) => {
    console.log('data wagons history', data);
    // return true;
    return await fetch(GET_WAGONS_HISTORY,
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
            // console.log(responseJson);
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}


const delete_cart_cook = async (data) => {
    console.log('delete', JSON.stringify(data));
    return await fetch(DELETE_CART_COOK,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}


const change_customer = async (data) => {
    console.log('change customer', JSON.stringify(data));
    return await fetch(CHANGE_CUSTOMER,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}

const change_note = async (data) => {
    console.log('change note', JSON.stringify(data));
    return await fetch(CHANGE_NOTE,
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
            if (responseJson !== '')
                return responseJson;
            else
                return false;
        });
}
export {
    add_cart,
    get_list_cart,
    get_list_cart_bill_id,
    get_detail_quantity_cart,
    edit_quantity_cart,
    update_price,
    update_customer,
    get_number_cart,
    delete_cart,
    payment_cart,
    get_thu_detail,
    edit_thu,
    get_wagons,
    change_status,
    get_total,
    create_cart_quick,
    create_copy_cart,
    get_wagons_history,
    delete_cart_cook,
    change_customer,
    change_note,
}