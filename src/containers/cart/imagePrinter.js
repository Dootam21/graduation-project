/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import RNFetchBlob from 'rn-fetch-blob';


// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    FlatList,
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Switch,
    Modal,
    FlatListComponent,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import { get_list_cart_bill_id, get_thu_detail } from '../../services/cartService';
import { get_infomation } from '../../services/infoShopService';

class Printer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isModalVisibleEdit: false,
            dataThu: {},
            customerName: '',
            dataDetail: this.props.cart.order_detail,
            tableData: [],
            image: '',
            infoShop: {},
        }


    }

    componentDidMount() {
        this.getData();
    }



    setModalVisibleEdit(opt) {
        this.setState({ isModalVisibleEdit: opt });
    }

    btnConfirm = () => {
        this.setModalVisibleEdit(false);
    };

    tableHead = ['Mã sp', 'Giá SP', 'Số lượng', 'Thành tiền'];

    async getData() {
        const dataLog = await get_list_cart_bill_id({
            u_id: this.props.admin.uid,
            bill_id: this.props.cart.bill_id,
        });
        // console.log('orderlist', dataLog);
        // console.log(dataLog?.data);
        dataLog?.data.order_list.map(d => {
            const data = [];
            data.push(d.product.code, d.product.price, d.product.quantity, d.product.totle_price);
            this.state.tableData.push(data);
        })
        this.setState({ data: dataLog.data });
        // const newColorList = this.props.color.listAllColor?.filter(color =>
        //     this.state.data?.data?.order_list?.map((order) => {
        //         order?.list_quantity?.some(quantity => quantity.color_id === color.id);
        //     })
        // );
        // this.setState({ colorList: newColorList });
        // if (this.props?.customer?.id != 0) {
        const getThuDetail = await get_thu_detail({
            u_id: this.props.admin.uid,
            thu_id: this.props?.cart?.thu_id,
        });
        this.setState({ dataThu: getThuDetail?.data });
        const infoShop = await get_infomation();
        this.setState({ infoShop: infoShop })
        this.viewShotRef.current.capture().then(async (uri) => {
            this.imageToBase64Jpg(uri)
                .then((base64Image) => {
                    if (base64Image) {
                        this.setState({ image: base64Image.replace(/^data:image\/jpeg;base64,/, '') });
                    }
                });
        });
        
    }


    viewShotRef = React.createRef();

    saveCapturedImage = () => {
        this.viewShotRef.current.capture().then(async (uri) => {
            // if (Platform.OS === 'android') {
            //     const granted = await App.getPermissionAndroid();
            //     if (!granted) {
            //         return;
            //     }
            // }

            // cameraroll saves image
            const image = CameraRoll.save(uri, 'photo');
            console.log(uri);
            this.setState({ image: uri });
            if (image) {
                Alert.alert('Thông báo', 'Lưu ảnh thành công.',
                    [{ text: 'OK', onPress: () => { } }],
                    { cancelable: false },
                );
            }

            this.imageToBase64Jpg(uri)
                .then((base64Image) => {
                    if (base64Image) {
                        this.setState({ image: base64Image.replace(/^data:image\/jpeg;base64,/, '') });
                        // console.log(base64Image.replace(/^data:image\/jpeg;base64,/, ''));
                    }
                });
        });
    };


    shareImages() {
        this.viewShotRef.current.capture().then(uri => {
            const options = {
                url: uri,
            }
            Share.open(options)
        });
    }

    imageToBase64Jpg = async (imageFilePath) => {
        try {
            const response = await RNFetchBlob.fs.readFile(imageFilePath, 'base64');
            const base64Image = `data:image/jpeg;base64,${response}`;
            return base64Image;
        } catch (error) {
            console.error('Error converting image to base64:', error);
            return null;
        }
    };

    convertVn = (word) => {
        const newStr = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
        return newStr
    }

    formatDataForPrint() {
        let formattedBill = '';
        var status = '';

        const dataThu = this.state.dataThu;

        formattedBill += `${this.convertVn(this.state.dataDetail?.user_name)}\n`;
        formattedBill += `D/c: ${this.convertVn(this.state.infoShop.address)}\n`;
        formattedBill += '------------------------------\n';
        formattedBill += `Ma don hang: ${this.state.dataDetail.code}\n`;

        switch (this.state.dataDetail?.status) {
            case '0':
                status = 'Cho xac nhan';
                break;
            case '1':
                status = 'Cho nhat hang';
                break;
            case '2':
                status = 'Đa nhat';
                break;
            case '3':
                status = 'Hoan tat';
                break;
            case '5':
                status = 'Toa nhap';
                break;
        }

        formattedBill += `Trang thai: ${status}\n`;

        formattedBill += `Thoi gian: ${this.state.dataDetail?.modified}\n`;

        formattedBill += `Ten KH: ${this.convertVn(this.state.dataDetail?.customer_fullname)}\n`;

        formattedBill += `SDT KH: ${this.state.dataDetail?.customer_phone}\n`;

        formattedBill += `Nguoi tao: ${this.convertVn(this.state.dataDetail?.user_name)}\n`;

        formattedBill += '--------------------------------\n';

        formattedBill += 'Ma_SP  Sl  Gia_SP  Thanh tien\n';
        this.state.data.order_list.forEach((item) => {
            formattedBill += `${item.product.code}  ${item.product.quantity}  ${item.product.price}  ${item.product.totle_price}\n`;
        });

        formattedBill += '--------------------------------\n';

        formattedBill += `Tong tien: \t ${dataThu?.sl_sp}   ${dataThu?.totle_money}\n`;

        formattedBill += '--------------------------------\n';

        if (this.props.customer.id != 0 && this.props.admin.is_show_debt == 1 && this.props.cart.status == 3) {
            if (dataThu?.chuyenkhoan != 0) {
                formattedBill += `Chuyen khoan: ${Number(dataThu?.chuyenkhoan).toLocaleString()} d\n`;
            }
            if (dataThu?.tienmat != 0) {
                formattedBill += `Tien mat: ${Number(dataThu?.tienmat).toLocaleString()} d\n`;
            }
            if (dataThu?.phuthu != 0) {
                formattedBill += `Phu thu: ${Number(dataThu?.phuthu).toLocaleString()} d\n`;
            }
            if (dataThu?.phuchi != 0) {
                formattedBill += `Phu chi: ${Number(dataThu?.phuchi).toLocaleString()} d\n`;
            }
            if (dataThu?.notruocdon != 0) {
                formattedBill += `No truoc don: ${dataThu?.notruocdon_txt} d\n`;
            }
            if (dataThu?.debt != 0) {
                formattedBill += `No sau don: ${Number(dataThu?.debt).toLocaleString()} d\n`;
            }
            if (dataThu?.ngaytrano) {
                formattedBill += `Ngay hen no: ${dataThu?.ngaytrano}\n`;
            }
            if (dataThu?.ghi_chu != '' && dataThu?.ghi_chu != null) {
                formattedBill += `Ghi chu: ${dataThu?.ghi_chu}\n`;
            }
        }
        else if (this.props.customer.id != 0 && this.props.admin.is_show_debt == 1 && this.props.cart.status != 3) {
            if (dataThu?.chuyenkhoan != 0) {
                formattedBill += `Chuyen khoan: ${Number(dataThu?.chuyenkhoan).toLocaleString()} d\n`;
            }
            if (dataThu?.tienmat != 0) {
                formattedBill += `Tien mat: ${Number(dataThu?.tienmat).toLocaleString()} d\n`;
            }
            if (dataThu?.phuthu != 0) {
                formattedBill += `Phu thu: ${Number(dataThu?.phuthu).toLocaleString()} d\n`;
            }
            if (dataThu?.phuchi != 0) {
                formattedBill += `Phu chi: ${Number(dataThu?.phuchi).toLocaleString()} d\n`;
            }
            if (dataThu?.notruocdon != 0) {
                formattedBill += `No cu: ${dataThu?.notruocdon_txt} d\n`;
            }
            if (dataThu?.debt != 0) {
                formattedBill += `Tong no: ${Number(dataThu?.debt).toLocaleString()} d\n`;
            }
            if (dataThu?.ngaytrano) {
                formattedBill += `Ngay hen no: ${dataThu?.ngaytrano}\n`;
            }
            if (dataThu?.ghi_chu != '' && dataThu?.ghi_chu != null) {
                formattedBill += `Ghi chu: ${dataThu?.ghi_chu}\n`;
            }
        }
        else {
            if (dataThu?.chuyenkhoan != 0) {
                formattedBill += `Chuyen khoan: ${Number(dataThu?.chuyenkhoan).toLocaleString()} d\n`;
            }
            if (dataThu?.tienmat != 0) {
                formattedBill += `Tien mat: ${Number(dataThu?.tienmat).toLocaleString()} d\n`;
            }
            if (dataThu?.phuthu != 0) {
                formattedBill += `Phu thu: ${Number(dataThu?.phuthu).toLocaleString()} d\n`;
            }
            if (dataThu?.phuchi != 0) {
                formattedBill += `Phu chi: ${Number(dataThu?.phuchi).toLocaleString()} d\n`;
            }
            if (this.props.cart.status != 3) {
                formattedBill += `Tong no: ${dataThu?.totle_money} d\n`;
            }
            if (dataThu?.ghi_chu != '' && dataThu?.ghi_chu != null) {
                formattedBill += `Ghi chu: ${dataThu?.ghi_chu}\n`;
            }
        }

        formattedBill += '\n\n\n';

        return formattedBill;
    }


    render() {
        const navigation = this.props.navigation;
        const { data, dataDetail, dataThu, tableData, image, infoShop } = this.state;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => navigation.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Xử lý in</Text>

                        <View style={[styles.headerRight]} >
                        </View>
                    </View >
                    <View style={styles.client}>
                        <View style={styles.customer}>
                            <Text style={styles.txtPrinter}>Máy in: <Text style={styles.txtPrinterStatus}>{this.props.cart.printerName ? this.props.cart.printerName : 'Chưa kết nối'}</Text></Text>
                        </View>
                    </View>
                    <ScrollView>
                        <ViewShot ref={this.viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                            <View style={styles.felxRowOder}>
                                <View style={styles.viewOrder}>
                                    <Text style={styles.nameCustomer1}>{dataDetail?.user_name}</Text>
                                    <Text style={styles.txtOrder2}>Đ/c: {infoShop.address}</Text>
                                    <Text style={[styles.txtMinus]}>--------------------------------------</Text>
                                    <View style={styles.flexRowPrint1}>
                                        <Text style={styles.txtOrder2}>Mã đơn hàng: </Text>
                                        <Text style={styles.txtOrder2}>{dataDetail.code}</Text>
                                    </View>
                                    <View style={styles.flexRowPrint1}>
                                        <Text style={styles.txtOrder2}>Trạng thái: </Text>
                                        <Text style={styles.txtOrder2}>{
                                            dataDetail?.status == 0 ? 'Chờ xác nhận' :
                                                dataDetail?.status == 1 ? 'Chờ nhặt hàng' :
                                                    dataDetail?.status == 2 ? 'Đã nhặt' :
                                                        dataDetail?.status == 3 ? 'Hoàn tất' :
                                                            dataDetail?.status == 5 ? 'Toa nháp' : ''
                                        }</Text>
                                    </View>
                                    <View style={styles.flexRowPrint1}>
                                        <Text style={styles.txtOrder2}>Thời gian: </Text>
                                        <Text style={styles.txtOrder2}>{dataDetail?.modified}</Text>
                                    </View>
                                    <View style={styles.flexRowPrint1}>
                                        <Text style={styles.txtOrder2}>Tên KH: </Text>
                                        <Text style={styles.txtOrder2}>{dataDetail?.customer_fullname}</Text>
                                    </View>
                                    <View style={styles.flexRowPrint1}>
                                        <Text style={styles.txtOrder2}>SĐT KH: </Text>
                                        <Text style={styles.txtOrder2}>{dataDetail?.customer_phone}</Text>
                                    </View>
                                    <View style={styles.flexRowPrint1}>
                                        <Text style={styles.txtOrder2}>Người tạo: </Text>
                                        <Text style={styles.txtOrder2}>{dataDetail?.user_name}</Text>
                                    </View>

                                    <Text style={[styles.txtMinus]}>--------------------------------------</Text>
                                    <Table borderStyle={{ borderWidth: 1 }}>
                                        <Row data={this.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={[styles.txtOrder1, styles.txtCenter]} />
                                        <TableWrapper style={styles.wrapper}>
                                            <Rows data={tableData} flexArr={[1, 1, 1, 1]} style={styles.row} textStyle={[styles.txtOrder1, styles.txtCenter]} />
                                        </TableWrapper>
                                    </Table>

                                    <Text style={[styles.txtMinus]}>--------------------------------------</Text>
                                    <View style={styles.flexRowPrint}>
                                        <Text style={styles.txtOrder2}>Tổng tiền:                       </Text>
                                        <Text style={styles.txtOrder2}>{dataThu?.sl_sp}        {dataThu?.totle_money}</Text>
                                    </View>
                                    <Text style={[styles.txtMinus]}>--------------------------------------</Text>

                                    {
                                        this.props.customer.id != 0 && this.props.admin.is_show_debt == 1 && this.props.cart.status == 3 ?
                                            (
                                                <View>
                                                    {/* <Text style={styles.listItem}>Thông tin nợ</Text> */}
                                                    <View>
                                                        {
                                                            dataThu?.chuyenkhoan != 0 &&
                                                            <View style={[styles.flexRow2]}>
                                                                <Text style={styles.textSubf1}>Chuyển khoản: </Text>
                                                                <Text style={[styles.bold, styles.textSubf1]}>{Number(dataThu?.chuyenkhoan).toLocaleString()} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.tienmat != 0 &&
                                                            <View style={[styles.flexRow2]}>
                                                                <Text style={styles.textSubf1}>Trả tiền mặt: </Text>
                                                                <Text style={[styles.bold, styles.textSubf1]}>{Number(dataThu?.tienmat).toLocaleString()} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.phuthu != 0 &&
                                                            <View style={[styles.flexRow2]}>
                                                                <Text style={styles.textSubf1}>Phu thu: </Text>
                                                                <Text style={[styles.bold, styles.textSubf1]}>{Number(dataThu?.phuthu).toLocaleString()} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.phuchi != 0 &&
                                                            <View style={[styles.flexRow2]}>
                                                                <Text style={styles.textSubf1}>Phu chi: </Text>
                                                                <Text style={[styles.bold, styles.textSubf1]}>{Number(dataThu?.phuchi).toLocaleString()} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.notruocdon != 0 &&
                                                            <View style={[styles.flexRow2]}>
                                                                <Text style={styles.textSubf1}>Nợ trước đơn: </Text>
                                                                <Text style={[styles.bold, styles.textSubf1]}>{dataThu?.notruocdon_txt} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.debt != 0 &&
                                                            <View style={[styles.flexRow2]}>
                                                                <Text style={styles.textSubf1}>Nợ sau đơn: </Text>
                                                                <Text style={[styles.bold, styles.textSubf1]}>{Number(dataThu?.debt).toLocaleString()} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.ngaytrano &&
                                                            <View style={[styles.flexRow2]}>
                                                                <Text style={styles.textSubf1}>Ngày hẹn nợ: </Text>
                                                                <Text style={[styles.bold, styles.textSubf1]}>{dataThu?.ngaytrano}</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.ghi_chu != '' && dataThu?.ghi_chu != null &&
                                                            <View style={[styles.flexRow2]}>
                                                                <Text style={styles.textSubf1}>Ghi chú: </Text>
                                                                <Text style={[styles.bold, styles.textSubf1]}>{dataThu?.ghi_chu}</Text>
                                                            </View>
                                                        }
                                                    </View>
                                                </View>

                                            ) :
                                            this.props.customer.id != 0 && this.props.admin.is_show_debt == 1 && this.props.cart.status != 3 ?
                                                (
                                                    <View>
                                                        {/* <Text style={styles.listItem}>Thông tin nợ</Text> */}
                                                        <View>
                                                            {
                                                                dataThu?.chuyenkhoan != 0 &&
                                                                <View style={[styles.flexRow2]}>
                                                                    <Text style={styles.textSubf1}>Chuyển khoản: </Text>
                                                                    <Text style={[styles.bold, styles.textSubf1]}>{Number(dataThu?.chuyenkhoan).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.tienmat != 0 &&
                                                                <View style={[styles.flexRow2]}>
                                                                    <Text style={styles.textSubf1}>Trả tiền mặt: </Text>
                                                                    <Text style={[styles.bold, styles.textSubf1]}>{Number(dataThu?.tienmat).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.phuthu != 0 &&
                                                                <View style={[styles.flexRow2]}>
                                                                    <Text style={styles.textSubf1}>Phu thu: </Text>
                                                                    <Text style={[styles.bold, styles.textSubf1]}>{Number(dataThu?.phuthu).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.phuchi != 0 &&
                                                                <View style={[styles.flexRow2]}>
                                                                    <Text style={styles.textSubf1}>Phu chi: </Text>
                                                                    <Text style={[styles.bold, styles.textSubf1]}>{Number(dataThu?.phuchi).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.notruocdon > 0 &&
                                                                <View style={[styles.flexRow2]}>
                                                                    <Text style={styles.textSubf1}>Nợ cũ: </Text>
                                                                    <Text style={[styles.bold, styles.textSubf1]}>{dataThu?.notruocdon_txt} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.debt > 0 &&
                                                                <View style={[styles.flexRow2]}>
                                                                    <Text style={styles.textSubf1}>Tổng nợ: </Text>
                                                                    <Text style={[styles.bold, styles.textSubf1]}>{Number(dataThu?.debt).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.ngaytrano &&
                                                                <View style={[styles.flexRow2]}>
                                                                    <Text style={styles.textSubf1}>Ngày hẹn nợ: </Text>
                                                                    <Text style={[styles.bold, styles.textSubf1]}>{dataThu?.ngaytrano}</Text>
                                                                </View>
                                                            }
                                                            {
                                                                (dataThu?.ghi_chu != "" && dataThu?.ghi_chu != null) &&
                                                                <View style={[styles.flexRow2]}>
                                                                    <Text style={styles.textSubf1}>Ghi chú: </Text>
                                                                    <Text style={[styles.bold, styles.textSubf1]}>{dataThu?.ghi_chu}</Text>
                                                                </View>
                                                            }
                                                        </View>
                                                    </View>

                                                ) :
                                                (
                                                    <View>
                                                        {/* <Text style={styles.listItem}>Thông tin nợ</Text> */}
                                                        <View>
                                                            {
                                                                dataThu?.chuyenkhoan != 0 &&
                                                                <View style={styles.flexRowPrint1}>
                                                                    <Text style={styles.txtOrder2}>Chuyển khoản: </Text>
                                                                    <Text style={styles.txtOrder2}>{Number(dataThu?.chuyenkhoan).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.tienmat != 0 &&
                                                                <View style={styles.flexRowPrint1}>
                                                                    <Text style={styles.txtOrder2}>Trả tiền mặt: </Text>
                                                                    <Text style={styles.txtOrder2}>{Number(dataThu?.tienmat).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.phuthu != 0 &&
                                                                <View style={styles.flexRowPrint1}>
                                                                    <Text style={styles.txtOrder2}>Phu thu: </Text>
                                                                    <Text style={styles.txtOrder2}>{Number(dataThu?.phuthu).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.phuchi != 0 &&
                                                                <View style={styles.flexRowPrint1}>
                                                                    <Text style={styles.txtOrder2}>Phu chi: </Text>
                                                                    <Text style={styles.txtOrder2}>{Number(dataThu?.phuchi).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                this.props.cart.status != 3 &&
                                                                <View style={styles.flexRowPrint1}>
                                                                    <Text style={styles.txtOrder2}>Tổng nợ: </Text>
                                                                    <Text style={styles.txtOrder2}>{dataThu?.totle_money} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.ghi_chu != '' && dataThu?.ghi_chu != null &&
                                                                <View style={styles.flexRowPrint1}>
                                                                    <Text style={styles.txtOrder2}>Ghi chú: </Text>
                                                                    <Text style={styles.txtOrder2}>{dataThu?.ghi_chu}</Text>
                                                                </View>
                                                            }
                                                        </View>
                                                    </View>


                                                    // <View style={styles.flexRowPrint}>
                                                    //     <Text style={styles.txtOrder2}>Tổng tiền</Text>
                                                    //     <Text style={styles.txtOrder2}>{dataDetail.totle_price} đ</Text>
                                                    // </View>
                                                )
                                    }
                                    {/* 
                                    <Text style={[styles.txtOrder, styles.txtCenter]}>Xin chân thành cảm ơn quý khách!</Text> */}
                                    
                                </View>
                            </View>
                        </ViewShot>
                    </ScrollView>

                    <View style={[styles.flexRowPrin]}>
                        {/* <TouchableOpacity >
                            <Text style={[styles.btnPrin, styles.btnPrin1]}>IN NHANH (không dấu)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setModalVisibleEdit(true)}>
                            <Text style={[styles.btnPrin, styles.btnPrin2]}>IN CHẬM (có dấu)</Text>
                        </TouchableOpacity> */}
                        <Modal visible={this.state.isModalVisibleEdit} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalContent}>
                                    <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chưa chọn máy in</Text>
                                    <View style={styles.btnGroupConfirm}>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisibleEdit(false)}>
                                            <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.btnConfirm()}>
                                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisibleEdit(false)}
                                style={styles.modalBackdrop}
                            />
                        </Modal>
                        <TouchableOpacity onPress={async () => {
                            await BluetoothEscposPrinter.printText(this.formatDataForPrint(), { encoding: 'Cp1258', codepage: 30 });
                        }}>
                            <Text style={[styles.btnPrin, styles.btnPrin2]}>In không dấu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {
                            await BluetoothEscposPrinter.printPic(image, { width: 1000 });
                        }}>
                            <Text style={[styles.btnPrin, styles.btnPrin1]}>In có dấu</Text>
                        </TouchableOpacity>

                    </View>
                    <Footer />
                </View >
            </SafeAreaView >
        );
    };


};
const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
    cart: state.cart,
    size: state.size,
    color: state.color,
    customer: state.customer
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(Printer)


