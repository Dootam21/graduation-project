import { DOMAIN } from '../constants/config';
const ADD_SUPPLIER = DOMAIN + 'api/api_supplier/supplier_add';
const EDIT_SUPPLIER = DOMAIN + 'api/api_supplier/supplier_edit';
const GET_ALL_SUPPLIER = DOMAIN + 'api/api_supplier/supplier_list';
const GET_DETAIL_SUPPLIER = DOMAIN + 'api/api_supplier/supplier_detail';
const DELETE_SUPPLIER = DOMAIN + 'api/api_supplier/supplier_delete';

const get_all_supplier = async (sort, from, uid, filter) => {
    console.log({
        sort: sort_list,
        from: from,
        u_id: uid,
        filter: filter
    });

    var sort_list = 'created-desc';

    switch (sort) {
        case 'Nợ giảm dần':
            sort_list = 'no_desc';
            break;
        case 'Nợ tăng dần':
            sort_list = 'no_asc';
            break;
        case 'Ngày hẹn nợ giảm dần':
            sort_list = 'hentra_desc';
            break;
        case 'Ngày hẹn nợ tăng dần':
            sort_list = 'hentra_asc';
            break;
        case 'Tên A-Z':
            sort_list = 'title_asc';
            break;
        case 'Tên Z-A':
            sort_list = 'title_desc';
            break;
        default:
            sort_list = 'created-desc';
            break;
    }

    return await fetch(GET_ALL_SUPPLIER,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sort: sort_list,
                from: from,
                u_id: uid,
                filter: filter
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


const add_supplier = async (data) => {
    var images = data.image_show.join(',');

    return await fetch(ADD_SUPPLIER,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                u_id: data.u_id,
                title: data.title,
                address: data.address,
                phone: data.phone,
                images: images,
                loaitien: data.selectedCheckbox
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

const edit_supplier = async (data) => {
    var images = data.image_show.join(',');

    return await fetch(EDIT_SUPPLIER,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.id,
                title: data.title,
                address: data.address,
                phone: data.phone,
                images: images,
                loaitien: data.selectedCheckbox
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

const get_detail_supplier = async (id, uid) => {
    console.log({
        id: id,
        u_id: uid,
    });
    return await fetch(GET_DETAIL_SUPPLIER,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                u_id: uid,
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

const delete_supplier = async (data) => {

    return await fetch(DELETE_SUPPLIER,
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



export {
    add_supplier,
    edit_supplier,
    get_all_supplier,
    get_detail_supplier,
    delete_supplier,
}
