import { DOMAIN } from '../constants/config';

const GET_THONG_KE_BAN = DOMAIN + 'api/api_thongke/thongke_banhang';
const GET_THONG_KE_CHUNG = DOMAIN + 'api/api_thongke/thongke_chung';

const get_thong_ke_ban = async (data) => {
    console.log('tk ban', JSON.stringify(data));
    return await fetch(GET_THONG_KE_BAN,
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

const get_thong_ke_chung = async (data) => {
    console.log(data);

    return await fetch(GET_THONG_KE_CHUNG,
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
    get_thong_ke_ban,
    get_thong_ke_chung,
}
