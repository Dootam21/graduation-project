import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import QrCodeHelper from './QrCodeHelper'; // Adjust the path as necessary

const PaymentQRCode = ({ bankCode, bankAccount, amount, message }) => {
    const [qrCodeData, setQrCodeData] = useState('');

    useEffect(() => {
        const qrCodeHelper = new QrCodeHelper();
        qrCodeHelper.generateQRCode(bankCode, bankAccount, amount, message)
            .then(data => {
                console.log(data);
                setQrCodeData(data);
            })
            .catch(error => console.error('Error generating QR code:', error));
    }, [bankCode, bankAccount, amount, message]);

    return (
        <View >
            {qrCodeData ? (
                <QRCode
                    value={qrCodeData}
                    size={200}
                />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};


export default PaymentQRCode;
