import { Buffer } from 'react-native-buffer'; // Import the buffer package

//https://api.vietqr.io/v2/banks

const bankInfo = [
    { code: 'ICB', bin: '970415' },
];

class QrCodeHelper {
    async generateQRCode(bankCode, bankAccount, amount, message) {
        let bankId = bankInfo.find(x => x.code === bankCode)?.bin || '';

        let path12 = '00' + bankId.length.toString().padStart(2, '0') + bankId +
            '01' + bankAccount.length.toString().padStart(2, '0') + bankAccount;

        let path11 = '0010A000000727' +
            '01' + path12.length.toString().padStart(2, '0') + path12 +
            '0208QRIBFTTA';

        let path1 = '38' + path11.length.toString().padStart(2, '0') + path11;

        let path21 = '08' + message.length.toString().padStart(2, '0') + message;

        let path2 = '5303704' +
            '54' + amount.length.toString().padStart(2, '0') + amount +
            '5802VN' +
            '62' + path21.length.toString().padStart(2, '0') + path21;

        let qrCodeContent = '000201' +
            '010212' +
            path1 +
            path2 +
            '6304';

        qrCodeContent += this.generateCheckSum(qrCodeContent).toUpperCase();

        console.log(qrCodeContent);

        return qrCodeContent;
    }

    generateCheckSum(text) {
        let crc = 0xFFFF;
        let polynomial = 0x1021;
        let bytes = Buffer.from(text);

        for (let b of bytes) {
            for (let i = 0; i < 8; i++) {
                let bit = ((b >> (7 - i) & 1) === 1);
                let c15 = ((crc >> 15 & 1) === 1);
                crc <<= 1;
                if (c15 !== bit) crc ^= polynomial;
            }
        }

        return (crc & 0xFFFF).toString(16);
    }
}

export default QrCodeHelper;