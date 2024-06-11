const GET_QR_CODE = 'https://momofree.apimienphi.com/api/QRCode';
const GET_TRANSACTION = 'https://oauth.casso.vn/v2/transactions';

const get_qr_code = async (data) => {

    var url = `https://momofree.apimienphi.com/api/QRCode?phone=${data.phone}&amount=${data.amount}&note=${data.note}`;

    console.log(url);
    const urltest = 'https://momofree.apimienphi.com/api/QRCode?phone=0358037873&amount=1000&note=1.000';
    return await fetch(urltest,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        });
}


const get_transaction = async () => {
    const API_KEY = "AK_CS.dd6b15a0273411efa25ac5d284bd6c82.umaM118iogLmnSnAFbjsjT5koacLEyj4WBDLKmZKIsUlFOzt0dUOyznWpBSOyfXD3tbZQGEF"
    return await fetch(GET_TRANSACTION,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `apikey ${API_KEY}`
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        });
}

export {
    get_qr_code,
    get_transaction
}
