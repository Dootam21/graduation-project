import { DOMAIN } from '../constants/config';
import filter from '../containers/commodity/filter';

const SUA_TON = DOMAIN + 'api/api_kiemkho/suaton';
const LIST_TON = DOMAIN + 'api/api_kiemkho/get_list';
const TK_TON = DOMAIN + 'api/api_kiemkho/get_list_tk_ton';
const TK_KHO_DETAIL = DOMAIN + 'api/api_kiemkho/get_kiemkho_detail';
const XOA_PHIEU_KIEM_KHO = DOMAIN + 'api/api_kiemkho/delete_kiemkho';
const GET_TOTAL = DOMAIN + 'api/api_kiemkho/get_total_kiemkho';

const thongketon = async (data) => {
    console.log({
        uid: data.uid,
        product_id: data.product_id,
    });

    return await fetch(TK_TON,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: data.uid,
                product_id: data.product_id,
            })
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
const get_detail_kiemkho = async (data) => {
    console.log('data de lay chi tiet phieu ton', data);
    return await fetch(TK_KHO_DETAIL,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: data.u_id,
                product_id: data.product_id,
                kiemkho_id: data.kiemkho_id,
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

const get_list = async (data) => {
    console.log({
        uid: data.uid,
        filter: data.isActive,
        type: data.type,
        from_date: data.selectedDateFrom,
        to: data.selectedDateTo,
        from: data.from,
        product_id: data.product_id,
    });
    var filter = 'this_month';

    switch (data.isActive) {
        case 'Hôm nay':
            filter = 'today';
            break;
        case 'Hôm qua':
            filter = 'yesterday';
            break;
        case '7 ngày qua':
            filter = '7days';
            break;
        case 'Tháng trước':
            filter = 'last_month';
            break;
        case 'Tùy chọn...':
            filter = 'custom';
            break;
        default:
            break;
    }

    return await fetch(LIST_TON,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: data.uid,
                filter: filter,
                type: data.type,
                from_date: data.selectedDateFrom,
                to: data.selectedDateTo,
                from: data.from,
                product_id: data.product_id,
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

const suaton = async (uid, product_id, data) => {
    console.log('data đẩy lên', {
        uid: uid,
        product_id: product_id,
        data: data
    });
    return await fetch(SUA_TON,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid,
                product_id: product_id,
                data: data
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson !== '')
                return responseJson.data;
            else
                return false;
        });
}


const xoaton = async (uid, id) => {
    console.log({
        uid: uid,
        id: id,
    });
    // return true
    return await fetch(XOA_PHIEU_KIEM_KHO,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid,
                id: id,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson !== '')
                return responseJson.data;
            else
                return false;
        });
}

const get_total = async (data) => {
    console.log('get_total', {
        uid: data.uid,
        filter: data.isActive,
        type: data.type,
        from_date: data.selectedDateFrom,
        to: data.selectedDateTo,
        product_id: data.product_id,
    });
    var filter = 'this_month';

    switch (data.isActive) {
        case 'Hôm nay':
            filter = 'today';
            break;
        case 'Hôm qua':
            filter = 'yesterday';
            break;
        case '7 ngày qua':
            filter = '7days';
            break;
        case 'Tháng trước':
            filter = 'last_month';
            break;
        case 'Tùy chọn...':
            filter = 'custom';
            break;
        default:
            break;
    }

    return await fetch(GET_TOTAL,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: data.uid,
                filter: filter,
                type: data.type,
                from_date: data.selectedDateFrom,
                to: data.selectedDateTo,
                product_id: data.product_id,
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

export {
    suaton,
    get_list,
    thongketon,
    get_detail_kiemkho,
    xoaton,
    get_total
}