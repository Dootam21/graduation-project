import { DOMAIN } from '../constants/config';

const GET_LIST = DOMAIN + 'api/api_notify/get_list';
const GET_COUNT = DOMAIN + 'api/api_notify/get_count';
const READ_ALL = DOMAIN + 'api/api_notify/read_all';
const READ_ONE = DOMAIN + 'api/api_notify/read_one';


const read_all = async (data) => {
    console.log(data);
    return await fetch(READ_ALL,
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
            if (responseJson !== '')
                return responseJson.data;
            else
                return false;
        });
}
const read_one = async (data) => {
    console.log(data);
    return await fetch(READ_ONE,
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
            if (responseJson !== '')
                return responseJson.data;
            else
                return false;
        });
}

const get_list = async (data) => {
    console.log(data);
    return await fetch(GET_LIST,
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
            if (responseJson !== '')
                return responseJson.data;
            else
                return false;
        });
}

const get_count = async (data) => {
    console.log(JSON.stringify({
        role: data.role,
        uid: data.uid
    }));
    return await fetch(GET_COUNT,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role: data.role,
                u_id: data.uid
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

export {
    get_list,
    read_one,
    read_all,
    get_count
}