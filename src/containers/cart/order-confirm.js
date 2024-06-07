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
import Header from '../elements/Header';
import DatePickerComponent from '../elements/DatePickerComponent';
import { get_thu_detail, edit_thu, update_customer } from '../../services/cartService';
import customerAction from '../../actions/customerAction';

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
    Keyboard
} from 'react-native';

import { DOMAIN } from '../../constants/config';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const options = {
    title: 'Chọn ảnh',
    takePhotoButtonTitle: 'Chụp ảnh',
    chooseFromLibraryButtonTitle: 'Chọn từ Thư viện',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
    },
};

import styles from './styles.js';
import { get_detail_customer } from '../../services/customerSevice';

class OrderConfirm extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            quantity: '0',
            isChecked: 'unCheck',
            isModalVisible1: false,
            isModalVisible2: false,
            isModalVisible3: false,
            type: 3,
            phuChi: '',
            phuThu: '',
            tienMat: '',
            chuyenKhoan: '',
            datCoc: '',
            tongTienNo: 0,
            tongTienThieu: 0,
            conNo: 0,
            conThieu: 0,
            ghiChu: '',
            images: [],
            image_show: [],
            selected: 0,
            ngaytrano: "",
            bill_id: 0,
            noTruocDon: '',
            no_truoc_don: '',

        }
    }
    componentDidMount() {
        console.log('thu id from reducer', this.props?.cart?.thu_id);
        this.getData();
        this.props.navigation.addListener(
            'focus',
            () => {
                // this.getData();
                this.getCustomerName();
            }
        );
    }
    setNgayTraNo(opt) {
        this.setState({ ngaytrano: opt })
    }
    setModalVisible1(opt) {
        this.setState({ isModalVisible1: opt })
    }
    setModalVisible2(opt) {
        this.setState({ isModalVisible2: opt })
    }
    setModalVisible3(opt) {
        this.setState({ isModalVisible3: opt })
    }
    setIsChecked(opt) {
        this.setState({ isChecked: opt })
    }
    setType(opt) {
        this.setState({ type: opt })
    }

    setPhuChi = (opt) => {
        this.setState({ phuChi: opt })
    }

    setPhuThu = (opt) => {
        this.setState({ phuThu: opt })
    }

    setTienMat = (opt) => {
        this.setState({ tienMat: opt })
    }

    setChuyenKhoan = (opt) => {
        this.setState({ chuyenKhoan: opt })
    }

    setDatCoc = (opt) => {
        this.setState({ datCoc: opt })
    }
    setGhiChu(opt) {
        this.setState({ ghiChu: opt })
    }

    handleToggleCheckbox = (checked) => {
        this.setIsChecked(checked);
    };

    btnConfirm1 = () => {
        this.setModalVisible1(false);
    };
    btnConfirm2 = () => {
        this.setModalVisible2(false);
    };

    async getData() {
        const dataLog = await get_thu_detail({
            u_id: this.props.admin.uid,
            thu_id: this.props?.cart?.thu_id,
            customer_id: this.props?.customer?.id,
        });
        // console.log(this.props.cart?.status);
        // console.log(this.props?.route?.params?.cart);
        this.setState({ data: dataLog?.data });
        this.setState({ bill_id: dataLog.data.bill_id });
        this.setState({ ghiChu: dataLog?.data?.ghi_chu });
        this.setState({ noTruocDon: dataLog?.data.notruocdon_txt });
        this.setState({ no_truoc_don: dataLog?.data.notruocdon });

        console.log('dataa order confirm', dataLog);
        // this.props.customerAction('current_customer_id', dataLog?.data?.customer_id);
        // const dataLog = await get_thu_detail(21);
        if (this.props?.route?.params?.cart !== true && (this.props.cart?.status == 2)) {
            this.setPhuChi(dataLog?.data?.phuchi);
            this.setPhuThu(dataLog?.data?.phuthu);
            this.setChuyenKhoan(dataLog?.data?.chuyenkhoan);
            this.setTienMat(dataLog?.data?.tienmat);
            this.setGhiChu(dataLog?.data?.ghi_chu);
            this.setDatCoc(dataLog?.data?.datcoc);
            this.setType(Number(dataLog?.data?.c_type));
            if (dataLog?.data?.c_type == 3) {
                this.setState({ tongTienNo: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) });
                this.setState({ image_show: dataLog?.data?.images });
                if (dataLog.data?.customer_id == 0) {
                    this.setState({ conNo: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) });
                }
                else {
                    this.setState({ conNo: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) + parseFloat(dataLog?.data?.notruocdon) });
                }
            } else {
                this.setState({ tongTienThieu: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) });
                if (dataLog.data?.customer_id == 0) {
                    this.setState({ conThieu: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) });
                } else {
                    this.setState({ conThieu: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) + parseFloat(dataLog?.data?.notruocdon) });
                }
            }
        }
        else {
            this.setState({ tongTienNo: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) });
            this.setState({ tongTienThieu: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) });
            if (dataLog.data?.customer_id == '0') {
                this.setState({ conNo: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) });
                this.setState({ conThieu: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) });
            } else {
                this.setState({ conNo: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) + parseFloat(dataLog?.data?.notruocdon) });
                this.setState({ conThieu: parseFloat(dataLog?.data?.totle_money?.replace(/,/g, "")) + parseFloat(dataLog?.data?.notruocdon) });
            }
        }
    }

    // getCustomerName() {
    //     const customerName = this.props.customer.listCustomers?.find(customer => customer.id === this.props.customer.id);
    //     this.setState({ customerName: customerName?.fullname });
    // }

    async getCustomerName() {
        if (this.props?.customer?.id !== 0) {
            const customerName = this.props.customer.listCustomers?.find(customer => customer.id === this.props.customer.id);
            this.setState({ customerName: customerName?.fullname });

            const dataLog = await update_customer({
                u_id: this.props.admin.uid,
                bill_id: this.state?.bill_id,
                customer_id: this.props?.customer?.id,
            })
            this.getData();
        }
    }

    handleSubmit(status) {
        var ngaytrano = '';
        if (this.state.ngaytrano !== "") {
            ngaytrano = new Date(this.state.ngaytrano).toISOString().split('T')[0];
        }
        let images = this.state.image_show;
        if (this.state?.type === 2) {
            images = []
        }
        var nhat_tai_cua_hang = 0;
        if (status === 3) {
            nhat_tai_cua_hang = 1;
        }
        this.setState({
            data: {
                ...this.state.data,
                u_id: this.props.admin.uid,
                thu_id: this.props?.cart?.thu_id,
                chuyenkhoan: this.state?.chuyenKhoan == 0 || this.state?.chuyenKhoan == '' ? 0 : this.state?.chuyenKhoan?.replace(/,/g, ''),
                datcoc: this.state?.datCoc == 0 || this.state?.datCoc == '' ? 0 : this.state?.datCoc?.replace(/,/g, ''),
                tienmat: this.state?.tienMat == 0 || this.state?.tienMat == '' ? 0 : this.state?.tienMat?.replace(/,/g, ''),
                status: status,
                phuthu: this.state?.phuThu == 0 || this.state?.phuThu == '' ? 0 : this.state?.phuThu?.replace(/,/g, ''),
                phuchi: this.state?.phuChi == 0 || this.state?.phuChi == '' ? 0 : this.state?.phuChi?.replace(/,/g, ''),
                c_type: this.state.type,
                ghi_chu: this.state.ghiChu,
                customer_id: this.props.customer.id,
                images: images,
                ngaytrano: ngaytrano,
                nhat_tai_cua_hang: nhat_tai_cua_hang,
            }
        }, async () => {
            // console.log(this.state.data);
            // return true;
            if ((this.state.data.customer_id == 0 || this.state.data.customer_id == '') && (this.state.conNo != 0 && this.state.conThieu != 0)) {
                Alert.alert("Khách vãng lai không được phép có nợ!");
                this.setModalVisible1(false);
                this.setModalVisible2(false);
            }
            else if (this.state.type === 2 && status === 3) {
                Alert.alert('Thông báo', 'Không thể thanh toán đơn hàng này!');
                this.setModalVisible1(false);
                this.setModalVisible2(false);
            }
            else {
                const dataLog = await edit_thu(this.state?.data);
                this.props.customerAction('current_customer_id', 0);
                this.setModalVisible1(false);
                this.setModalVisible2(false);
                if (this.props?.route?.params?.backToWagons) {
                    this.props.navigation.navigate('FreightWagons');
                }
                else {
                    this.props.navigation.goBack();
                }
            }
        })
    }

    updatePrice() {
        this.setPhuChi(0);
        this.setPhuThu(0);
        this.setChuyenKhoan(0);
        this.setTienMat(0);
        this.setDatCoc(0);
        if (this.props.customer.id == 0) {
            this.setState({ conNo: parseFloat(this.state.data?.totle_money?.replace(/,/g, "")) });
            this.setState({ conThieu: parseFloat(this.state.data?.totle_money?.replace(/,/g, "")) });
        }
        else {
            this.setState({ conNo: parseFloat(this.state.data?.totle_money?.replace(/,/g, "")) + parseFloat(this.state.data?.notruocdon) });
            this.setState({ conThieu: parseFloat(this.state.data?.totle_money?.replace(/,/g, "")) + parseFloat(this.state.data?.notruocdon) });
        }
    }

    setTongTienNo() {
        var phuThu = 0;
        var phuChi = 0;
        var tienMat = 0;
        var chuyenKhoan = 0;
        var notruocdon = 0;
        if (this.state?.phuThu === '' || this.state?.phuThu == 0) {
            phuThu = 0
        } else {
            phuThu = Number(this.state?.phuThu?.replace(/,/g, ''))
        }


        if (this.state?.phuChi === '' || this.state?.phuChi == 0) {
            phuChi = 0
        } else {
            phuChi = Number(this.state?.phuChi?.replace(/,/g, ''))
        }

        if (this.state?.tienMat === '' || this.state?.tienMat == 0) {
            tienMat = 0
        } else {
            tienMat = Number(this.state?.tienMat?.replace(/,/g, ''))
        }


        if (this.state?.chuyenKhoan === '' || this.state?.chuyenKhoan == 0) {
            chuyenKhoan = 0
        } else {
            chuyenKhoan = Number(this.state?.chuyenKhoan?.replace(/,/g, ''))
        }

        if (this.state.no_truoc_don === '' || this.state.no_truoc_don == 0 || this.props.customer.id == 0) {
            notruocdon = 0;
        }
        else {
            notruocdon = Number(this.state?.no_truoc_don)
        }


        this.setState({ conNo: Number(this.state.tongTienNo) - phuChi - tienMat - chuyenKhoan + phuThu + notruocdon })
    }

    setTongTienThieu() {
        // console.log(Number(this.state?.phuChi));
        var phuThu = 0;
        var phuChi = 0;
        var datCoc = 0;
        var notruocdon = 0;
        if (this.state?.phuThu === '' || this.state?.phuThu === 0) {
            phuThu = 0
        } else {
            phuThu = Number(this.state?.phuThu?.replace(/,/g, ''))
        }
        if (this.state?.phuChi === '' || this.state?.phuChi === 0) {
            phuChi = 0
        } else {
            phuChi = Number(this.state?.phuChi?.replace(/,/g, ''))
        }
        if (this.state?.datCoc === '' || this.state?.datCoc === 0) {
            datCoc = 0
        } else {
            datCoc = Number(this.state?.datCoc?.replace(/,/g, ''))
        }
        if (this.state.no_truoc_don === '' || this.state.no_truoc_don == 0 || this.props.customer.id == 0) {
            notruocdon = 0;
        }
        else {
            notruocdon = Number(this.state?.no_truoc_don)
        }
        this.setState({ conThieu: Number(this.state.tongTienThieu) - phuChi - datCoc + phuThu + notruocdon })
    }



    removeImage(stt) {
        var image_show = this.state.image_show;
        var buff = [];
        var num = 0;
        for (var i = 0; i < image_show.length; i++) {
            if (i != stt) {
                buff[num] = image_show[i];
                num++;
            }
        }
        this.setState({ image_show: buff });
    }


    renderListItem(image_show) {
        // console.log('imtam', image_show);
        var d = new Array();
        if (image_show.length > 0) {
            for (var i = 0; i < image_show.length; i++) {
                let stt = i;
                var item = image_show[stt];

                d.push(
                    <View style={styles.boxUploadImage} key={i}>
                        <Image style={styles.uploadImage} source={{ uri: item }}></Image>
                        <TouchableOpacity onPress={() => this.removeImage(stt)}>
                            <View style={styles.deleteImage}>
                                <Svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M14.4293 22.4282H3.57217C2.61979 22.4282 1.95312 21.6663 1.95312 20.8092V6.52344H16.0484V20.7139C16.0484 21.6663 15.2865 22.4282 14.4293 22.4282Z" stroke="#DFDEDE" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M17 5.95238V4.2381C17 3.57143 16.4286 3 15.7619 3H12.2381L11.8571 1.57143C11.6667 1.19048 11.381 1 10.9048 1H7.09524C6.71429 1 6.33333 1.19048 6.14286 1.57143L5.76191 2.90476H2.2381C1.57143 2.90476 1 3.47619 1 4.14286V5.95238C1 6.2381 1.28571 6.52381 1.57143 6.52381H16.4286C16.8095 6.52381 17 6.2381 17 5.95238Z" stroke="#DFDEDE" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M5.95312 9.95264V19.0003" stroke="#DFDEDE" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M9 9.95166V18.9993" stroke="#DFDEDE" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M12.0488 9.95166V18.9993" stroke="#DFDEDE" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            }
        }
        return d;
    }

    select_image = async () => {
        try {
            const results = await ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeExif: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
            });

            if (results && results.length > 0) {
                const images = results.map((image, index) => (
                    {
                        id: index + 1,
                        filename: image.path.split('/')[11],
                        path: 'file://' + image.path,
                        uri: image.path, // Use 'path' or 'sourceURL' depending on your use case
                        stt: index,
                        type: image.mime,
                    }));

                // Update the selected photos state
                this.setState({
                    images: images,
                    selected: 1
                });
                this.upload_images();
            }
        } catch (error) {
            console.log('ImagePicker Error: ', error);
        }
    };


    async select_camera() {
        const result = await launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            }
            else {
                var images = this.state.images;
                let n = images.length;
                let buff = {};
                buff.id = images.length + 1;
                var image_data = response.assets[0];
                buff.filename = image_data.fileName;
                buff.path = 'file://' + image_data.uri;
                buff.uri = image_data.uri;
                buff.stt = n;
                buff.type = image_data.type;
                // buff.type = 'image/jpeg';
                // buff.uploaded_image_link = '';
                images.push(buff);
                this.setState({
                    images: images,
                    selected: 1
                });
                this.upload_images();
            }
        });
    }



    upload_images() {
        this.setState({ loading: 1 });
        var uploadUrl = DOMAIN + 'api/api_image/upload_image/';
        // console.log('upload', uploadUrl);
        var images = this.state.images;
        if (images.length > 0) {
            var new_images = this.state.image_show;
            for (var i = 0; i < images.length; i++) {
                let picture = images[i];
                let pic = {
                    name: picture.filename,
                    type: picture.type,
                    uri: Platform.OS === "android" ? picture.path : picture.uri
                }
                var formData = new FormData();
                formData.append('file', pic);

                fetch(uploadUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({ loading: 0 });
                        if (responseJson.res == 'done') {

                            // console.log(responseJson);
                            // picture.uploaded_image_link = responseJson.msg;
                            // new_images.push(picture);
                            new_images.push(responseJson.msg);
                            this.setState({ image_show: new_images });
                        }
                        else {
                            Alert.alert("Thông báo", "có lỗi");
                            return false;
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            this.setState({ images: [] });
            // console.log('this.state.image_show');
            // console.log(this.state.image_show);
        }
        else {
            Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 ảnh");
            this.setState({ loading: 0 });
        }

    }

    formatWithCommas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    handlePriceChange = (setPrice) => {
        return (value) => {
            const numericValue = value.replace(/,/g, ''); // Remove existing commas
            const formattedValue = this.formatWithCommas(numericValue);
            setPrice(formattedValue);
        };
    };

    gotoCustomerList() {
        this.props.navigation.navigate('Customer', { cart: Math.random() })
    }


    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const status = this.props.cart.status;
        const { type, tongTienNo, tongTienThieu, phuChi, phuThu, tienMat, chuyenKhoan, datCoc, conNo, conThieu, ghiChu, image_show, customerName, ngaytrano, noTruocDon, no_truoc_don } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={'Xác nhận đơn hàng'} />

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <View style={styles.client}>
                            <TouchableOpacity style={styles.customer} onPress={() => navigation.navigate('Customer', { cart: true })}>
                                <Text style={styles.hText}>{this.props?.customer?.id == 0 ? 'Khách mới' : customerName}</Text>
                                <View style={styles.groupIcon}>
                                    <TouchableOpacity>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M3.625 7.795C5.065 10.625 7.38 12.94 10.215 14.38L12.415 12.175C12.69 11.9 13.085 11.82 13.43 11.93C14.55 12.3 15.755 12.5 17 12.5C17.555 12.5 18 12.945 18 13.5V17C18 17.555 17.555 18 17 18C7.61 18 0 10.39 0 1C0 0.445 0.45 0 1 0H4.5C5.055 0 5.5 0.445 5.5 1C5.5 2.245 5.7 3.45 6.07 4.57C6.18 4.915 6.1 5.31 5.825 5.585L3.625 7.795V7.795Z" fill="#B8101F" />
                                        </Svg>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Customer', { cart: true })} style={{ marginLeft: 20 }}>
                                        <Svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M17.5181 4.21424L16.5207 4.14221L16.5207 4.14238L17.5181 4.21424ZM11.6253 4.21424L12.6228 4.14362L12.6228 4.14351L11.6253 4.21424ZM8.16373 14.5449L9.13401 14.7869L9.13409 14.7866L8.16373 14.5449ZM20.9801 14.5449L20.0088 14.783L20.009 14.7836L20.9801 14.5449ZM8.50033 5.01512L7.50292 4.94326L7.50292 4.94327L8.50033 5.01512ZM3.76826 5.01512L2.77075 5.08568L2.77075 5.08574L3.76826 5.01512ZM8.35165 11.284C8.85375 11.514 9.44726 11.2935 9.67731 10.7914C9.90735 10.2893 9.68681 9.6958 9.18472 9.46575L8.35165 11.284ZM1.01606 13.2655L0.0457481 13.0236L0.0454067 13.025L1.01606 13.2655ZM6.44679 14.857C6.99908 14.857 7.44679 14.4093 7.44679 13.857C7.44679 13.3047 6.99908 12.857 6.44679 12.857V14.857ZM16.5207 4.14238C16.4178 5.57035 15.3903 6.42848 14.5717 6.42848V8.42848C16.6905 8.42848 18.3568 6.48933 18.5155 4.2861L16.5207 4.14238ZM14.5717 6.42848C13.752 6.42848 12.7238 5.56979 12.6228 4.14362L10.6278 4.28486C10.784 6.49079 12.4539 8.42848 14.5717 8.42848V6.42848ZM12.6228 4.14351C12.5739 3.45426 12.7878 2.93099 13.1142 2.58289C13.4432 2.23209 13.942 2 14.5717 2V0C13.4321 0 12.3908 0.430621 11.6554 1.21474C10.9175 2.00155 10.5427 3.0854 10.6278 4.28497L12.6228 4.14351ZM14.5717 2C15.7606 2 16.6127 2.86735 16.5207 4.14221L18.5155 4.28627C18.6913 1.85225 16.9211 0 14.5717 0V2ZM14.5717 9.28559C11.3993 9.28559 8.04647 10.8778 7.19337 14.3032L9.13409 14.7866C9.68276 12.5835 11.9254 11.2856 14.5717 11.2856V9.28559ZM7.19345 14.3029C6.9778 15.1676 7.51815 16.2855 8.68694 16.2855V14.2855C8.84378 14.2855 8.99149 14.3716 9.07306 14.4912C9.14612 14.5983 9.15364 14.7082 9.13401 14.7869L7.19345 14.3029ZM8.68694 16.2855H20.4569V14.2855H8.68694V16.2855ZM20.4569 16.2855C21.6291 16.2855 22.1622 15.1647 21.9512 14.3062L20.009 14.7836C19.9901 14.7069 19.9971 14.5985 20.0698 14.4919C20.1513 14.3722 20.2995 14.2855 20.4569 14.2855V16.2855ZM21.9513 14.3068C21.0982 10.8265 17.7352 9.28559 14.5717 9.28559V11.2856C17.2277 11.2856 19.4602 12.5446 20.0088 14.783L21.9513 14.3068ZM7.50292 4.94327C7.42596 6.01145 6.65243 6.60705 6.13429 6.60705V8.60705C7.96256 8.60705 9.36578 6.91876 9.49775 5.08698L7.50292 4.94327ZM6.13429 6.60705C5.61515 6.60705 4.84125 6.01086 4.76576 4.94451L2.77075 5.08574C2.90062 6.92024 4.30704 8.60705 6.13429 8.60705V6.60705ZM4.76576 4.94457C4.70021 4.01779 5.29791 3.42855 6.13429 3.42855V1.42855C4.14393 1.42855 2.62291 2.99553 2.77075 5.08568L4.76576 4.94457ZM6.13429 3.42855C6.9641 3.42855 7.5681 4.03858 7.50292 4.94326L9.49775 5.08699C9.64595 3.0301 8.13124 1.42855 6.13429 1.42855V3.42855ZM9.18472 9.46575C8.21205 9.0201 7.1727 8.86372 6.13429 8.86372V10.8637C6.97711 10.8637 7.71273 10.9913 8.35165 11.284L9.18472 9.46575ZM6.13429 8.86372C3.55008 8.86372 0.75835 10.1647 0.0457491 13.0236L1.98637 13.5073C2.39429 11.8708 4.07572 10.8637 6.13429 10.8637V8.86372ZM0.0454067 13.025C-0.149961 13.8136 0.342823 14.857 1.43436 14.857V12.857C1.63013 12.857 1.80857 12.9619 1.90887 13.1087C2.00066 13.2431 2.01548 13.3898 1.98672 13.5059L0.0454067 13.025ZM1.43436 14.857H6.44679V12.857H1.43436V14.857Z" fill="#C02D3A" />
                                        </Svg>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View style={styles.flexRowCF}>
                                <Text style={styles.attrName}>Tổng tiền hàng</Text>
                                <Text style={styles.value}>{data?.totle_money}</Text>
                            </View>

                            <View style={styles.flexRowCF}>
                                <Text style={styles.attrName}>Phụ chi</Text>
                                <TextInput
                                    style={styles.value}
                                    placeholder='Nhập phụ chi'
                                    keyboardType="numeric"
                                    value={phuChi}
                                    onChangeText={this.handlePriceChange(this.setPhuChi)}

                                    onBlur={() => { this.setTongTienNo(); this.setTongTienThieu() }}
                                >
                                </TextInput>
                            </View>

                            <View style={styles.flexRowCF}>
                                <Text style={styles.attrName}>Phụ thu</Text>
                                <TextInput
                                    style={styles.value}
                                    placeholder='Nhập phụ thu'
                                    keyboardType="numeric"
                                    value={phuThu}
                                    onChangeText={this.handlePriceChange(this.setPhuThu)}
                                    onBlur={() => { this.setTongTienNo(); this.setTongTienThieu() }}
                                >
                                </TextInput>
                            </View>

                            {
                                this.props?.customer?.id != 0 &&
                                (
                                    <View >

                                        {
                                            no_truoc_don > 0 ? (
                                                <View style={styles.flexRowCF}>
                                                    <Text style={styles.attrName}>Nợ cũ</Text>
                                                    <Text style={styles.value}>{noTruocDon.replace('-', '')} đ</Text>
                                                </View>
                                            ) : no_truoc_don < 0 ? (
                                                <View style={styles.flexRowCF}>
                                                    <Text style={styles.attrName}>Cửa hàng nợ</Text>
                                                    <Text style={styles.value}>{noTruocDon.replace('-', '')} đ</Text>
                                                </View>
                                            ) : (
                                                <></>
                                            )
                                        }

                                    </View>
                                )
                            }

                            {
                                type !== 2 &&
                                (
                                    <View>
                                        <View style={styles.flexRowCF}>
                                            <Text style={styles.attrName}>Tiền mặt</Text>
                                            <TextInput
                                                style={styles.value}
                                                placeholder="Nhập tiền mặt"
                                                keyboardType="numeric"
                                                value={tienMat}
                                                onChangeText={this.handlePriceChange(this.setTienMat)}
                                                onBlur={() => this.setTongTienNo()}
                                            />
                                        </View>
                                        <View style={styles.flexRowCF}>
                                            <Text style={styles.attrName}>Chuyển khoản</Text>
                                            <TextInput
                                                style={styles.value}
                                                keyboardType="numeric"
                                                placeholder="Nhập tiền chuyển khoản"
                                                value={chuyenKhoan}
                                                onChangeText={this.handlePriceChange(this.setChuyenKhoan)}
                                                onBlur={() => this.setTongTienNo()}
                                            />
                                        </View>
                                    </View>
                                )
                            }

                            <View style={styles.flexRowCF}>
                                <View style={styles.Gender}>
                                    {/* <TouchableOpacity
                                        style={[styles.checkbox, type === 1 && styles.checkboxChecked]}
                                        onPress={() => this.setType(1)}
                                    >
                                        <View style={styles.boxGender}>
                                            <View style={styles.checkGender}>
                                                {type === 1 && <Text style={styles.checkmark}></Text>}
                                            </View>
                                            <Text style={styles.checkboxText}>Ra lộc</Text>
                                        </View>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity
                                        style={[styles.checkbox, type === 2 && styles.checkboxChecked]}
                                        onPress={() => {
                                            this.updatePrice();
                                            this.setType(2);
                                            // this.setTongTienThieu();
                                        }}
                                    >
                                        <View style={styles.boxGender}>
                                            <View style={styles.checkGender}>
                                                {type === 2 && <Text style={styles.checkmark}></Text>}
                                            </View>
                                            <Text style={styles.checkboxText}>Đặt cọc</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.checkbox, type === 3 && styles.checkboxChecked]}
                                        onPress={() => {
                                            this.updatePrice();
                                            this.setType(3);
                                            // this.setTongTienNo();
                                        }}
                                    >
                                        <View style={styles.boxGender}>
                                            <View style={styles.checkGender}>
                                                {type === 3 && <Text style={styles.checkmark}></Text>}
                                            </View>
                                            <Text style={styles.checkboxText}>Nợ lại</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* <View style={styles.groupItemX}>

                            {this.state.isChecked === 'check' && <View style={styles.flexRowCF}>
                                <Text style={styles.attrName}>Khách đặt cọc</Text>
                                <TextInput
                                    style={styles.value}
                                    placeholder="Khách đặt cọc..."
                                    keyboardType="numeric"
                                />
                            </View>}

                            <Text style={styles.txt1}>Nợ: 30.600.000</Text>


                            {this.state.isChecked === 'unCheck' && <View style={styles.flexRowDate}>
                                <Text style={[styles.txtDate, styles.txt1]}>Ngày hẹn nợ:</Text>
                                <DatePickerComponent style={styles.txtDate} />
                            </View>}


                        </View> */}

                        {
                            type === 2 &&
                            (
                                <>
                                    <View style={styles.flexRowCF}>
                                        <Text style={styles.attrName}>Khách đặt cọc</Text>
                                        <TextInput
                                            style={styles.value}
                                            placeholder="Nhập tiền đặt cọc"
                                            keyboardType="numeric"
                                            value={datCoc}
                                            onChangeText={this.handlePriceChange(this.setDatCoc)}
                                            onBlur={() => this.setTongTienThieu()}
                                        />
                                    </View>
                                    {
                                        conThieu > 0 ? (
                                            <Text style={styles.txt1}>Tiền thiếu: {(conThieu).toLocaleString()}</Text>
                                        ) : conThieu < 0 ? (
                                            <Text style={styles.txt1}>Tiền thiếu: {Math.abs(conThieu).toLocaleString()} (Đặt cọc thừa)</Text>
                                        ) : (<></>)
                                    }
                                </>
                            )
                        }

                        {
                            type === 3 &&
                            (
                                <>
                                    {
                                        conNo > 0 ? (
                                            <Text style={styles.txt1}>Nợ: {conNo.toLocaleString()}</Text>
                                        ) : conNo < 0 ? (
                                            <Text style={[styles.txt1, styles.textRed]}>Trả thừa: {Math.abs(conNo).toLocaleString()}</Text>
                                        ) : (<></>)
                                    }
                                    <View style={styles.flexRowDate}>
                                        <Text style={[styles.txtDate, styles.txt1]}>Ngày hẹn nợ:</Text>
                                        <DatePickerComponent style={styles.txtDate} setDateTime={(text) => this.setNgayTraNo(text)} dateTime={ngaytrano} />
                                    </View>

                                    <View>
                                        <View style={styles.chonImage}>
                                            <Text style={styles.textImage}>Thêm ảnh nợ:</Text>
                                            <TouchableOpacity onPress={() => this.select_image()}>
                                                <View style={styles.iconImage}>
                                                    <Svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <Path d="M25.6576 3H6.40755C5.78871 3 5.19522 3.21071 4.75763 3.58579C4.32005 3.96086 4.07422 4.46957 4.07422 5V21.5C4.07422 22.0304 4.32005 22.5391 4.75763 22.9142C5.19522 23.2893 5.78871 23.5 6.40755 23.5H25.6576C26.2764 23.5 26.8698 23.2893 27.3075 22.9142C27.7451 22.5391 27.9909 22.0304 27.9909 21.5V5C27.9909 4.46957 27.7451 3.96086 27.3075 3.58579C26.8698 3.21071 26.2764 3 25.6576 3ZM11.2691 15.437C11.3603 15.2804 11.498 15.147 11.6682 15.0502C11.8385 14.9535 12.0354 14.8968 12.2393 14.8857C12.4432 14.8747 12.6468 14.9098 12.8299 14.9874C13.0131 15.065 13.1692 15.1824 13.2827 15.328L14.2522 16.574C14.2801 16.6099 14.3184 16.639 14.3633 16.6584C14.4082 16.6779 14.4583 16.687 14.5084 16.685C14.5587 16.683 14.6075 16.6699 14.6502 16.6469C14.6928 16.624 14.7276 16.592 14.7516 16.554L17.5947 12.027C17.6949 11.8615 17.8482 11.724 18.0364 11.6307C18.2247 11.5373 18.4402 11.492 18.6576 11.5C18.8734 11.5052 19.0833 11.5616 19.2639 11.6629C19.4445 11.7642 19.5888 11.9065 19.6807 12.074L23.8551 19.674C23.8978 19.7505 23.9171 19.8351 23.9113 19.9198C23.9053 20.0045 23.8744 20.0866 23.8213 20.1582C23.7681 20.2298 23.6948 20.2887 23.6077 20.3292C23.5208 20.3698 23.4232 20.3907 23.3242 20.39H9.32422C9.22474 20.39 9.12692 20.3682 9.04004 20.3267C8.95317 20.2851 8.88014 20.2252 8.82788 20.1527C8.77563 20.0801 8.74588 19.9973 8.74147 19.9121C8.73707 19.827 8.75815 19.7422 8.80272 19.666L11.2691 15.437ZM9.03255 9.25C9.03255 8.85444 9.1694 8.46776 9.42579 8.13886C9.68218 7.80996 10.0466 7.55362 10.473 7.40224C10.8993 7.25087 11.3685 7.21126 11.8211 7.28843C12.2737 7.3656 12.6895 7.55608 13.0158 7.83579C13.3421 8.11549 13.5644 8.47186 13.6544 8.85982C13.7444 9.24778 13.6982 9.64991 13.5215 10.0154C13.345 10.3808 13.0459 10.6932 12.6622 10.9129C12.2785 11.1327 11.8274 11.25 11.3659 11.25C10.747 11.25 10.1536 11.0393 9.71596 10.6642C9.27838 10.2891 9.03255 9.78043 9.03255 9.25Z" fill="#B8101F" />
                                                        <Path d="M2.33333 19.5V2.5C2.33333 2.36739 2.39479 2.24021 2.50419 2.14645C2.61358 2.05268 2.76196 2 2.91667 2H22.75C23.0594 2 23.3562 1.89464 23.575 1.70711C23.7937 1.51957 23.9167 1.26522 23.9167 1C23.9167 0.734784 23.7937 0.48043 23.575 0.292893C23.3562 0.105357 23.0594 0 22.75 0H2.33333C1.7145 0 1.121 0.210714 0.683418 0.585786C0.245833 0.960859 0 1.46957 0 2V19.5C0 19.7652 0.122915 20.0196 0.341707 20.2071C0.560501 20.3946 0.857248 20.5 1.16667 20.5C1.47609 20.5 1.77283 20.3946 1.99163 20.2071C2.21041 20.0196 2.33333 19.7652 2.33333 19.5Z" fill="#B8101F" />
                                                    </Svg>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.select_camera()}>
                                                <View style={styles.iconImage}>
                                                    <Svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <Path d="M12 16.6387C14.005 16.6387 15.6304 15.0133 15.6304 13.0083C15.6304 11.0033 14.005 9.37793 12 9.37793C9.99501 9.37793 8.36963 11.0033 8.36963 13.0083C8.36963 15.0133 9.99501 16.6387 12 16.6387Z" fill="#B8101F" />
                                                        <Path d="M20.4833 4.03364H17.6029L15.8372 0.501743C15.7617 0.350977 15.6458 0.224185 15.5024 0.135568C15.359 0.0469507 15.1938 8.85086e-06 15.0252 0H8.97475C8.80617 8.85086e-06 8.64093 0.0469507 8.49752 0.135568C8.35412 0.224185 8.23822 0.350977 8.1628 0.501743L6.3971 4.03364H3.51712C2.58463 4.03464 1.69062 4.40552 1.03125 5.06489C0.371873 5.72426 0.00099888 6.61827 0 7.55077V18.4665C0.00110849 19.399 0.372034 20.2929 1.0314 20.9521C1.69076 21.6114 2.58471 21.9822 3.51712 21.9832H20.4834C21.4157 21.9821 22.3096 21.6112 22.9688 20.952C23.6281 20.2927 23.9989 19.3989 24 18.4665V7.55077C23.999 6.61835 23.6282 5.72439 22.969 5.06502C22.3097 4.40566 21.4158 4.03474 20.4833 4.03364ZM12 18.4537C10.923 18.4537 9.8702 18.1344 8.97472 17.536C8.07925 16.9377 7.38131 16.0872 6.96917 15.0922C6.55702 14.0972 6.44919 13.0024 6.65929 11.9461C6.8694 10.8898 7.38802 9.91952 8.14956 9.15798C8.9111 8.39644 9.88136 7.87782 10.9377 7.66771C11.9939 7.4576 13.0888 7.56544 14.0838 7.97758C15.0788 8.38972 15.9293 9.08766 16.5276 9.98314C17.1259 10.8786 17.4453 11.9314 17.4453 13.0084C17.4437 14.4521 16.8694 15.8362 15.8486 16.857C14.8278 17.8779 13.4437 18.4521 12 18.4537ZM20.0673 8.87381H18.0504C17.8098 8.87381 17.579 8.7782 17.4088 8.60802C17.2386 8.43784 17.143 8.20702 17.143 7.96634C17.143 7.72567 17.2386 7.49485 17.4088 7.32467C17.579 7.15448 17.8098 7.05887 18.0504 7.05887H20.0673C20.3079 7.05887 20.5388 7.15448 20.7089 7.32467C20.8791 7.49485 20.9747 7.72567 20.9747 7.96634C20.9747 8.20702 20.8791 8.43784 20.7089 8.60802C20.5388 8.7782 20.3079 8.87381 20.0673 8.87381Z" fill="#B8101F" />
                                                    </Svg>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.viewImage}>
                                            {this.renderListItem(image_show)}
                                        </View>
                                    </View>
                                </>
                            )
                        }

                        <View>
                            <Text style={styles.txt1}>Ghi chú</Text>
                            <TextInput
                                style={styles.value1}
                                multiline
                                numberOfLines={6}
                                placeholder="Nhập ghi chú..."
                                value={ghiChu}
                                onChangeText={(text) => this.setGhiChu(text)}
                            />
                        </View>
                    </ScrollView>

                    {
                        this.props?.cart?.status == 2 ? (
                            <View style={styles.groupItem}>
                                <TouchableOpacity onPress={() => {
                                    if (this.props.admin.roles?.includes('order_confirm_status_3') || this.props.admin.is_admin == 1) {
                                        this.setModalVisible3(true);
                                    }
                                    else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <View style={styles.flexColumnStatus2}>
                                        <Text style={[styles.btnConfirm, styles.padding10]}>Hoàn tất</Text>
                                    </View>
                                </TouchableOpacity>
                                <Modal visible={this.state.isModalVisible3} animationType="slide" transparent={true}>
                                    <View style={styles.modalContainer2}>
                                        <View style={styles.modalContent}>
                                            <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                            <View style={styles.btnGroupConfirm}>
                                                <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible3(false)}>
                                                    <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleSubmit(3)}>
                                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity activeOpacity={1}
                                        style={styles.modalBackdrop}
                                    />
                                </Modal>
                            </View>
                        ) : (

                            <View style={styles.groupItem}>
                                <TouchableOpacity onPress={() => {
                                    if (this.props.admin.roles?.includes('order_confirm_status_1') || this.props.admin.is_admin == 1) {
                                        this.setModalVisible1(true);
                                        Keyboard.dismiss();
                                    }
                                    else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <View style={styles.flexColumn}>
                                        <Text style={[styles.btnConfirm, styles.padding10]}>Gửi tới kho</Text>
                                    </View>
                                </TouchableOpacity>
                                <Modal visible={this.state.isModalVisible1} animationType="slide" transparent={true}>
                                    <View style={styles.modalContainer2}>
                                        <View style={styles.modalContent}>
                                            <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                            <View style={styles.btnGroupConfirm}>
                                                <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible1(false)}>
                                                    <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleSubmit(1)}>
                                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity activeOpacity={1}
                                        style={styles.modalBackdrop}
                                    />
                                </Modal>
                                <TouchableOpacity onPress={() => {
                                    if (this.props.admin.roles?.includes('order_confirm_status_3') || this.props.admin.is_admin == 1) {
                                        this.setModalVisible2(true);
                                        Keyboard.dismiss();
                                    }
                                    else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <View style={styles.flexColumn}>
                                        <Text style={[styles.btnConfirm, styles.padding10]}>Nhặt tại cửa hàng</Text>
                                    </View> 
                                </TouchableOpacity>
                                <Modal visible={this.state.isModalVisible2} animationType="slide" transparent={true}>
                                    <View style={styles.modalContainer2}>
                                        <View style={styles.modalContent}>
                                            <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                            <View style={styles.btnGroupConfirm}>
                                                <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible2(false)}>
                                                    <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleSubmit(3)}>
                                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity activeOpacity={1}
                                        style={styles.modalBackdrop}
                                    />
                                </Modal>
                            </View>
                        )
                    }


                    <Footer />
                </View >
            </SafeAreaView >
        );
    };

};

const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart,
    customer: state.customer,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm)
