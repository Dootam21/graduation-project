import { DOMAIN } from '../constants/config';

const GET_HOME_PRODUCT = DOMAIN + 'api/api_product/get_home_data';
const ADD_PRODUCT = DOMAIN + 'api/api_product/product_add';
const GET_DETAIL_PRODUCT = DOMAIN + 'api/api_product/product_detail';
const EDIT_PRODUCT = DOMAIN + 'api/api_product/product_edit';
const DELETE_PRODUCT = DOMAIN + 'api/api_product/product_delete';
const GET_CATEGORY_PRODUCTS = DOMAIN + 'api/api_product/get_product_list';
const UPDATE_STATUS = DOMAIN + 'api/api_product/product_status';
const ADD_COLOR_SIZE = DOMAIN + 'api/api_product/product_add_color_size';

//chi tiết hàng hóa -> lịch sử nhập
// const GET_LIST_NHAP = DOMAIN + 'api/api_nhap/nhap_product_history';
// const GET_DETAIL_NHAP = DOMAIN + 'api/api_nhap/nhap_detail_quantity';
const UPDATE_PRODUCT_IMAGES = DOMAIN + 'api/api_product/update_product_images';



const GET_LIST_NHAP_HISTORY = DOMAIN + 'api/api_nhap/nhap_product_history';

//cá nhân -> danh sách phiếu nhập
const GET_LIST_NHAP = DOMAIN + 'api/api_nhap/nhap_list';
const ADD_NHAP = DOMAIN + 'api/api_nhap/nhap_add';
// const GET_LIST_QUANTITY_NHAP = DOMAIN + 'api/api_nhap/nhap_list';
const GET_ORDER_LIST_NHAP = DOMAIN + 'api/api_nhap/nhap_order_list';
const GET_DETAIL_QUANTITY_NHAP = DOMAIN + 'api/api_nhap/nhap_detail_quantity';
const EDIT_QUANTITY_NHAP = DOMAIN + 'api/api_nhap/nhap_edit_quantity';
const CHANGE_STATUS_NHAP = DOMAIN + 'api/api_nhap/nhap_change_status';
const GET_NHAP_CHI_DETAIL = DOMAIN + 'api/api_nhap/nhap_chi_detail';
const UPDATE_NHAP_CHI = DOMAIN + 'api/api_nhap/nhap_chi_edit';
const UPDATE_PRICE_NHAP = DOMAIN + 'api/api_nhap/nhap_price_update';
const DELETE_NHAP = DOMAIN + 'api/api_nhap/nhap_delete';
const DELETE_NHAP_COOK = DOMAIN + 'api/api_nhap/nhap_delete_cook';

const GET_LIST_TRA = DOMAIN + 'api/api_trahang/trahang_list';
const ADD_TRA = DOMAIN + 'api/api_trahang/trahang_add';
// const GET_LIST_QUANTITY_TRA = DOMAIN + 'api/api_tra/tra_list';
const GET_ORDER_LIST_TRA = DOMAIN + 'api/api_trahang/trahang_order_list';
const GET_DETAIL_QUANTITY_TRA = DOMAIN + 'api/api_trahang/trahang_detail_quantity';
const EDIT_QUANTITY_TRA = DOMAIN + 'api/api_trahang/trahang_edit_quantity';
const UPDATE_CUSTOMER_SUPPLIER = DOMAIN + 'api/api_trahang/update_customer_supplier';
const CHANGE_STATUS_TRA = DOMAIN + 'api/api_trahang/trahang_change_status';
const UPDATE_PRICE_TRA = DOMAIN + 'api/api_trahang/trahang_price_update';
const DELETE_TRA = DOMAIN + 'api/api_trahang/trahang_delete';
const DELETE_TRA_COOK = DOMAIN + 'api/api_trahang/trahang_delete_cook';
const GET_LIST_TRA_HISTORY = DOMAIN + 'api/api_trahang/trahang_product_history';
const GET_TRA_DETAIL = DOMAIN + 'api/api_trahang/trahang_thuchi_detail';
const RETURN_WAGONS = DOMAIN + 'api/api_trahang/trahang_toahang';

const UPDATE_GHI_CHU = DOMAIN + 'api/api_nhap/sua_ghi_chu_toa_nhap';

const GET_THONG_KE_CHI_TIET = DOMAIN + 'api/api_product/product_thonngkechitiet';

const DELETE_RETURN = DOMAIN + 'api/api_trahang/trahang_order_del';

const SEARCH_PRODUCTS = DOMAIN + 'api/api_product/product_search';



const get_home_products = async (data) => {
    console.log('data home list', data);
    return await fetch(GET_HOME_PRODUCT,
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
            // console.log(responseJson);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const add_product = async (data) => {
    console.log('data add product truoc khi day len ', JSON.stringify(data));
    // return true;
    return await fetch(ADD_PRODUCT,
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
            // console.log('done', responseJson);

            if (responseJson.res && responseJson.res == 'done')
                return responseJson;
            else
                return responseJson;
        });
}

const get_detail_product = async (data) => {
    console.log('get_detail_product', data);
    return await fetch(GET_DETAIL_PRODUCT,
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

const edit_product = async (data) => {
    console.log(JSON.stringify(data));
    // return true;
    return await fetch(EDIT_PRODUCT,
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
            console.log('data_edit', data);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const delete_product = async (id, _) => {
    return await fetch(DELETE_PRODUCT,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                u_id: _,
            })
        })
        .then((response) => true);
}

const get_category_products = async (id, sort, price_from, price_to, hh_status, from, _) => {
    // console.log(id);
    // return true;

    //sản phẩm mới
    var sort_list = 'created-desc';

    switch (sort) {
        case 'Sản phẩm cũ':
            sort_list = 'created_asc';
            break;
        case 'Số lượng giảm dần':
            sort_list = 'sl_desc';
            break;
        case 'Số lượng tăng dần':
            sort_list = 'sl_asc';
            break;
        case 'Giá giảm dần':
            sort_list = 'price_desc';
            break;
        case 'Giá tăng dần':
            sort_list = 'price_asc';
            break;
        default:
            sort_list = 'created-desc';
            break;
    }

    const d = await fetch(GET_CATEGORY_PRODUCTS,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_id: id,
                sort: sort_list,
                price_from: price_from,
                price_to: price_to,
                hh_status: hh_status,
                from: from,
                u_id: _,
            })
        });

    // console.log('category_id');
    // console.log(id);

    console.log(d);
    var responseJson = await d.json();
    // .then((response) => response.json())
    // .then((responseJson) => {
    // console.log(responseJson);
    // return responseJson;

    if (responseJson.res && responseJson.res == 'done')
        return responseJson.data;
    else
        return false;
    // });
}

const get_product_list = async (data) => {

    const d = await fetch(GET_CATEGORY_PRODUCTS,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

    // console.log('category_id');
    // console.log(id);

    // console.log(d);
    var responseJson = await d.json();

    if (responseJson.res && responseJson.res == 'done')
        return responseJson.data;
    else
        return false;
    // });
}

const update_product_images = async (data) => {
    console.log('updateimage', {
        u_id: data.u_id,
        product_id: data.product_id,
        images: data.image_show,
    });
    return await fetch(UPDATE_PRODUCT_IMAGES,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                u_id: data.u_id,
                product_id: data.product_id,
                images: data.image_show,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            // return responseJson;
            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const update_product_status = async (data) => {
    return await fetch(UPDATE_STATUS,
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
            // return responseJson;
            console.log(responseJson);

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_category_products_by_option = async (data) => {
    console.log('api recive', data);
    var sort = 'created-desc';

    switch (data.option) {
        case 'Sản phẩm mới':
            sort = 'created_desc';
            break;
        case 'Sản phẩm cũ':
            sort = 'created_asc';
            break;
        case 'Số lượng giảm dần':
            sort = 'sl_desc';
            break;
        case 'Số lượng tăng dần':
            sort = 'sl_asc';
            break;
        case 'Giá giảm dần':
            sort = 'price_desc';
            break;
        case 'Giá tăng dần':
            sort = 'price_asc';
            break;
    }
    console.log(data);
    return await fetch(GET_CATEGORY_PRODUCTS,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                u_id: data.u_id,
                sort: sort,
                from: data.from,
                category_id: data.category_id,
                supplier_id: data.supplier_id,
                hang_id: data.hang_id,
                price_from: data.price_from,
                price_to: data.price_to,
                quantity_from: data.quantity_from,
                quantity_to: data.quantity_to,
                phan_loai: data.phanLoai,
                trang_thai: data.trangThai,
                dung_ban: data.dungBan,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log('res', responseJson);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}


const add_color_size = async (data) => {
    console.log(JSON.stringify(data));
    // return true;
    return await fetch(ADD_COLOR_SIZE,
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

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_list_nhap = async (data) => {
    console.log('get list nhap by id', JSON.stringify(data));
    // return true;
    return await fetch(GET_LIST_NHAP,
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
            // console.log(responseJson);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_list_nhap_history = async (data) => {
    console.log('get nhap history', JSON.stringify(data));
    // return true;
    return await fetch(GET_LIST_NHAP_HISTORY,
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
            // console.log(responseJson);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}


const get_detail_quantity_nhap = async (data) => {
    console.log(JSON.stringify(data));
    // return true;
    return await fetch(GET_DETAIL_QUANTITY_NHAP,
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

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_product_supplier = async (data) => {
    // console.log('data day len ', data);
    return await fetch(GET_CATEGORY_PRODUCTS,
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
            // console.log('res', responseJson);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}


const add_nhap = async (data) => {
    console.log('data nhap day len ', data);
    return await fetch(ADD_NHAP,
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
            // console.log('res', responseJson);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}


// const get_list_quantity_nhap = async (data) => {
//     console.log('data day len ', data);
//     return await fetch(GET_LIST_QUANTITY_NHAP,
//         {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         })
//         .then((response) => response.json())
//         .then((responseJson) => {
//             // console.log('res', responseJson);
//             // return responseJson;

//             if (responseJson.res && responseJson.res == 'done')
//                 return responseJson.data;
//             else
//                 return false;
//         });
// }

const get_order_list_nhap = async (data) => {
    console.log('lay order list nhap', JSON.stringify(data));
    return await fetch(GET_ORDER_LIST_NHAP,
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
            // console.log('res', responseJson);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const edit_quantity_nhap = async (data, list) => {
    // console.log('lsquan day len :', {
    //     u_id: data.u_id,
    //     nhap_id: data.nhap_id,
    //     product_id: data.product_id,
    //     order_id: data.order_id,
    //     list_quantity: list
    // });
    return await fetch(EDIT_QUANTITY_NHAP,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                u_id: data.u_id,
                nhap_id: data.nhap_id,
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

const change_status_nhap = async (data) => {
    console.log('tao toa', data);
    return await fetch(CHANGE_STATUS_NHAP,
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

const get_nhap_chi_detail = async (data) => {
    console.log(JSON.stringify(data));
    return await fetch(GET_NHAP_CHI_DETAIL,
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

const update_nhap_chi = async (data) => {
    console.log('chi tiet nhap', JSON.stringify(data));
    // return true;
    return await fetch(UPDATE_NHAP_CHI,
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

const update_price_nhap = async (data) => {
    console.log('update price', JSON.stringify(data));
    return await fetch(UPDATE_PRICE_NHAP,
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

const delete_nhap = async (data) => {
    console.log('delete nhap', JSON.stringify(data));
    return await fetch(DELETE_NHAP,
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

const delete_nhap_cook = async (data) => {
    console.log('delete nhap', JSON.stringify(data));
    return await fetch(DELETE_NHAP_COOK,
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
















const get_list_tra = async (data) => {
    console.log('list tra', JSON.stringify(data));
    // return true;
    return await fetch(GET_LIST_TRA,
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
            // console.log(responseJson);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const add_tra = async (data) => {
    console.log('data tra hang day len ', data);
    //return true;
    return await fetch(ADD_TRA,
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
            // console.log('res', responseJson);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}


const get_order_list_tra = async (data) => {
    console.log('lay order list', JSON.stringify(data));
    // return true
    return await fetch(GET_ORDER_LIST_TRA,
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
            // console.log('res', responseJson);
            // return responseJson;

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const get_detail_quantity_tra = async (data) => {
    console.log('get-list tra', JSON.stringify(data));
    console.log(GET_DETAIL_QUANTITY_TRA);
    return await fetch(GET_DETAIL_QUANTITY_TRA,
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

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const edit_quantity_tra = async (data, list) => {

    return await fetch(EDIT_QUANTITY_TRA,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                u_id: data.u_id,
                trahang_id: data.trahang_id,
                product_id: data.product_id,
                order_id: data.order_id,
                list_quantity: list,
                type: data.type
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



const update_customer_supplier = async (data) => {
    return await fetch(UPDATE_CUSTOMER_SUPPLIER,
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

const change_status_tra = async (data) => {
    console.log('change status tra', data);
    return await fetch(CHANGE_STATUS_TRA,
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

const update_price_tra = async (data) => {
    // console.log('update price', JSON.stringify(data));
    return await fetch(UPDATE_PRICE_TRA,
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

const delete_tra = async (data) => {
    return await fetch(DELETE_TRA,
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


const delete_tra_cook = async (data) => {
    return await fetch(DELETE_TRA_COOK,
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



const get_list_tra_history = async (data) => {
    console.log('list prd tra history', JSON.stringify(data));
    // return true;
    return await fetch(GET_LIST_TRA_HISTORY,
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

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}



const get_tra_detail = async (data) => {
    // console.log(data);
    return await fetch(GET_TRA_DETAIL,
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

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}




const get_thong_ke_chi_tiet = async (data) => {
    console.log(data);
    return await fetch(GET_THONG_KE_CHI_TIET,
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

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const return_wagons = async (data) => {
    console.log('data tra hang', data);
    return await fetch(RETURN_WAGONS,
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

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}


const update_ghi_chu = async (data) => {
    console.log('data ghi chu', data);
    return await fetch(UPDATE_GHI_CHU,
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

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}

const delete_return = async (data) => {
    console.log('data delete return ', data);
    return await fetch(DELETE_RETURN,
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

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}



const search_products = async (data) => {
    console.log('data search ', data);
    return await fetch(SEARCH_PRODUCTS,
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

            if (responseJson.res && responseJson.res == 'done')
                return responseJson.data;
            else
                return false;
        });
}




// const history_search = async (data) => 
// {
//     return await fetch(API_SEARCH_HISTORY_PRODUCT, 
//     {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             _: data._,
//             search_key: data.search_key,
//             city_id: data.city_id,
//             category_current_id: data.category_current_id,
//         })
//     })
//     .then((response) => response.json())
//     .then((responseJson) => 
//     {
//         return responseJson;

//         if(responseJson.res && responseJson.res == 'done')
//             return responseJson.data;
//         else
//             return false;
//     });
// }

export {
    get_home_products,
    add_product,
    get_detail_product,
    edit_product,
    delete_product,
    get_category_products,
    update_product_status,
    get_category_products_by_option,
    add_color_size,
    get_product_list,
    get_list_nhap,
    get_list_nhap_history,
    // get_detail_nhap,
    update_product_images,
    get_detail_quantity_nhap,
    get_product_supplier,
    add_nhap,
    // get_list_quantity_nhap,
    get_order_list_nhap,
    edit_quantity_nhap,
    get_nhap_chi_detail,
    update_nhap_chi,
    update_price_nhap,
    delete_nhap,
    delete_nhap_cook,
    update_ghi_chu,


    get_list_tra,
    add_tra,
    get_order_list_tra,
    get_detail_quantity_tra,
    edit_quantity_tra,
    change_status_nhap,
    update_customer_supplier,
    change_status_tra,
    update_price_tra,
    delete_tra,
    delete_tra_cook,
    get_list_tra_history,
    get_tra_detail,
    return_wagons,

    get_thong_ke_chi_tiet,


    delete_return,
    // favourite_product,
    // history_search,


    search_products,
};
