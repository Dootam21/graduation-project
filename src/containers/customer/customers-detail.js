/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import { connect } from 'react-redux';
import UploadImage from '../elements/UploadImage';
import customerAction from '../../actions/customerAction';
import { get_detail_customer, delete_customer, add_phone_number, add_manager, update_image_customer } from '../../services/customerSevice';
import { RatingInput } from 'react-native-stock-star-rating';
import accountAction from '../../actions/accountAction';
import supplierAction from '../../actions/supplierAction';
// import type {Node} from 'react';


import { DOMAIN } from '../../constants/config';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const options = {
    title: 'Chọn ảnh',
    takePhotoButtonTitle: 'Chụp ảnh',
    chooseFromLibraryButtonTitle: 'Chọn từ Thư viện',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
    },
};

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
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import Customer from './customers';

class CustomerDetail extends Component {
    // const { productId } = route.params;
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isEnabled: false,
            text: 'Tìm kiếm',
            isModalVisible: false,
            isDelete: false,
            phone: '',
            images: [],
            image_show: [],
            selected: 0,
            isShow: false,
        }
        // console.log('list user', this.props.admin.listUsers);
    }

    componentDidMount() {
        this.getData();
        this.props.accountAction('view_profile', 0);
        this.props.navigation.addListener(
            'focus',
            () => {
                if (this.props.admin.active_uid != 0) {
                    this.setQualy();
                }
                this.getData();
            }
        );
    }

    setIsEnabled = (opt) => {
        this.setState({ isEnabled: opt });
    }

    onChangeText = (opt) => {
        this.setState({ text: opt });
    }
    setIsDelete = (opt) => {
        this.setState({ isDelete: opt });
    }

    setModalVisible = (opt) => {
        this.setState({ isModalVisible: opt });
    }

    setPhone = (opt) => {
        this.setState({ phone: opt })
    }

    setIsShow = (opt) => {
        this.setState({ isShow: opt });
    }

    toggleSwitch = () => this.setIsEnabled(!this.state.isEnabled);

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }


    setData = (opt) => {
        this.setState({
            data: opt
        })
    }

    getUser(u_id) {
        const user = this.props.admin.listUsers?.find((user) => user.id == u_id);
        return user?.fullname;
    }

    async setQualy() {
        const dataLog = await add_manager({
            u_id: this.props.admin.uid,
            id_quanly: this.props.admin.active_uid,
            id_customer: this.state.data.id,
        });
        this.getData();
    }

    async DeleteCustomer() {
        const data = await delete_customer({
            id: this.props.customer.id,
            u_id: this.props.admin.uid,
        });
        this.setState(data)
        this.gotoPage('Customer')
    }

    async getData() {
        const data = await get_detail_customer({
            id: this.props.customer.id,
            u_id: this.props.admin.uid
        });
        this.setData(data);
        console.log(data);
    }

    async handleAddView() {
        // console.log(this.state.phone);
        const dataLog = await add_phone_number({
            u_id: this.props.admin.uid,
            customer_id: this.props.customer.id,
            phone: this.state.phone
        })
        this.getData();
        this.setModalVisible(false);
        this.setPhone('');
    };

    async select_image() {
        const result = await launchImageLibrary(options, response => {
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
                this.updateImage(pic.uri);

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
            this.setState(prevState => ({
                image_show: prevState.image_show.slice(1)
            }));
            // console.log('this.state.image_show');
            // console.log(this.state.image_show);
        }
        else {
            Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 ảnh");
            this.setState({ loading: 0 });
        }

    }

    async updateImage(image) {
        const data = await update_image_customer({
            u_id: this.props.admin.uid,
            customer_id: this.props.customer.id,
            image: image,
        })
        this.getData();
    }

    render() {
        const { isEnabled, text, isModalVisible, phone, isShow } = this.state
        const data = this.state.data
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => {
                                this.props.accountAction('view_profile', 0);
                                this.props.customerAction('current_customer_id_finder', 0);
                                this.props.navigation.goBack();
                            }}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>Chi tiết Khách hàng</Text>
                        </View>

                        <View style={styles.headerRight}>
                            {/* {
                                this.props.admin.groupId == 1 && */}
                            <TouchableOpacity onPress={() => {
                                if (this.props.admin.roles?.includes('customer_delete') || this.props.admin.is_admin == 1) {
                                    this.setIsDelete(true);
                                } else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <Text style={styles.btnEidt}>Xóa</Text>
                            </TouchableOpacity>
                            {/* } */}
                            <Modal visible={this.state.isDelete} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.setIsDelete(false)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmButton} onPress={() => this.DeleteCustomer()}>
                                                <Text style={styles.txtConfirm}>Xác nhận</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setIsDelete(false)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            {/* {
                                this.props.admin.groupId == 1 && */}
                            <TouchableOpacity onPress={() => {
                                if (this.props.admin.roles?.includes('customer_edit') || this.props.admin.is_admin == 1) {
                                    this.gotoPage('EditCustomer');
                                } else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <Text style={[styles.btnEidt, styles.item]}>Sửa</Text>
                            </TouchableOpacity>
                            {/* } */}
                        </View>
                    </View >

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
                        <View style={[styles.avatar]}>
                            <Image style={[styles.thumbnail, styles.avatarCustomer]} source={data?.image == null || data?.image?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: data?.image }}></Image>
                            <View style={styles.startCustomer}>
                                {/* <Svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.0494 21.0746C17.914 21.0751 17.7806 21.0423 17.6609 20.9792L11.7657 17.879L5.86929 20.9792C5.73187 21.0511 5.5771 21.0831 5.42243 21.0718C5.26776 21.0604 5.11935 21.006 4.99392 20.9148C4.86849 20.8236 4.77104 20.6992 4.71256 20.5555C4.65408 20.4119 4.63689 20.2548 4.66293 20.1019L5.78938 13.5363L1.01724 8.88623C0.905948 8.77784 0.827214 8.64047 0.78994 8.48967C0.752666 8.33886 0.75834 8.18062 0.806321 8.03287C0.854301 7.88512 0.942673 7.75374 1.06144 7.65361C1.1802 7.55347 1.32462 7.48857 1.47836 7.46624L8.07113 6.50848L11.0193 0.534421C11.0881 0.395178 11.1944 0.277944 11.3263 0.195971C11.4582 0.113998 11.6104 0.0705566 11.7657 0.0705566C11.921 0.0705566 12.0731 0.113998 12.205 0.195971C12.3369 0.277944 12.4433 0.395178 12.512 0.534421L15.4602 6.50848L22.0524 7.46624C22.2062 7.48848 22.3507 7.55332 22.4695 7.65342C22.5884 7.75353 22.6768 7.88489 22.7248 8.03266C22.7729 8.18043 22.7786 8.33869 22.7414 8.48954C22.7041 8.64039 22.6254 8.77781 22.5141 8.88623L17.7419 13.5363L18.8684 20.1019C18.8888 20.2213 18.8829 20.3438 18.8511 20.4607C18.8194 20.5776 18.7624 20.6862 18.6843 20.7788C18.6062 20.8714 18.5088 20.9459 18.399 20.997C18.2891 21.0481 18.1694 21.0746 18.0482 21.0746H18.0494ZM3.38666 8.87125L7.26264 12.6496C7.35903 12.7435 7.43119 12.8594 7.47294 12.9874C7.51469 13.1154 7.52478 13.2515 7.50236 13.3843L6.58733 18.7191L11.3772 16.202C11.497 16.1389 11.6303 16.1058 11.7657 16.1058C11.901 16.1058 12.0344 16.1389 12.1541 16.202L16.9451 18.7207L16.029 13.3843C16.0062 13.2513 16.0161 13.1149 16.0577 12.9866C16.0994 12.8583 16.1716 12.7421 16.2681 12.6479L20.1447 8.87125L14.7882 8.09439C14.6547 8.07498 14.528 8.02342 14.4188 7.94416C14.3097 7.8649 14.2215 7.7603 14.1617 7.63937L11.7657 2.78565L9.37016 7.63937C9.31036 7.76037 9.22204 7.86501 9.1128 7.94428C9.00357 8.02355 8.87669 8.07506 8.74312 8.09439L3.38666 8.87125Z" fill="#868686" />
                                </Svg>
                                <Svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.0494 21.0746C17.914 21.0751 17.7806 21.0423 17.6609 20.9792L11.7657 17.879L5.86929 20.9792C5.73187 21.0511 5.5771 21.0831 5.42243 21.0718C5.26776 21.0604 5.11935 21.006 4.99392 20.9148C4.86849 20.8236 4.77104 20.6992 4.71256 20.5555C4.65408 20.4119 4.63689 20.2548 4.66293 20.1019L5.78938 13.5363L1.01724 8.88623C0.905948 8.77784 0.827214 8.64047 0.78994 8.48967C0.752666 8.33886 0.75834 8.18062 0.806321 8.03287C0.854301 7.88512 0.942673 7.75374 1.06144 7.65361C1.1802 7.55347 1.32462 7.48857 1.47836 7.46624L8.07113 6.50848L11.0193 0.534421C11.0881 0.395178 11.1944 0.277944 11.3263 0.195971C11.4582 0.113998 11.6104 0.0705566 11.7657 0.0705566C11.921 0.0705566 12.0731 0.113998 12.205 0.195971C12.3369 0.277944 12.4433 0.395178 12.512 0.534421L15.4602 6.50848L22.0524 7.46624C22.2062 7.48848 22.3507 7.55332 22.4695 7.65342C22.5884 7.75353 22.6768 7.88489 22.7248 8.03266C22.7729 8.18043 22.7786 8.33869 22.7414 8.48954C22.7041 8.64039 22.6254 8.77781 22.5141 8.88623L17.7419 13.5363L18.8684 20.1019C18.8888 20.2213 18.8829 20.3438 18.8511 20.4607C18.8194 20.5776 18.7624 20.6862 18.6843 20.7788C18.6062 20.8714 18.5088 20.9459 18.399 20.997C18.2891 21.0481 18.1694 21.0746 18.0482 21.0746H18.0494ZM3.38666 8.87125L7.26264 12.6496C7.35903 12.7435 7.43119 12.8594 7.47294 12.9874C7.51469 13.1154 7.52478 13.2515 7.50236 13.3843L6.58733 18.7191L11.3772 16.202C11.497 16.1389 11.6303 16.1058 11.7657 16.1058C11.901 16.1058 12.0344 16.1389 12.1541 16.202L16.9451 18.7207L16.029 13.3843C16.0062 13.2513 16.0161 13.1149 16.0577 12.9866C16.0994 12.8583 16.1716 12.7421 16.2681 12.6479L20.1447 8.87125L14.7882 8.09439C14.6547 8.07498 14.528 8.02342 14.4188 7.94416C14.3097 7.8649 14.2215 7.7603 14.1617 7.63937L11.7657 2.78565L9.37016 7.63937C9.31036 7.76037 9.22204 7.86501 9.1128 7.94428C9.00357 8.02355 8.87669 8.07506 8.74312 8.09439L3.38666 8.87125Z" fill="#868686" />
                                </Svg>
                                <Svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.0494 21.0746C17.914 21.0751 17.7806 21.0423 17.6609 20.9792L11.7657 17.879L5.86929 20.9792C5.73187 21.0511 5.5771 21.0831 5.42243 21.0718C5.26776 21.0604 5.11935 21.006 4.99392 20.9148C4.86849 20.8236 4.77104 20.6992 4.71256 20.5555C4.65408 20.4119 4.63689 20.2548 4.66293 20.1019L5.78938 13.5363L1.01724 8.88623C0.905948 8.77784 0.827214 8.64047 0.78994 8.48967C0.752666 8.33886 0.75834 8.18062 0.806321 8.03287C0.854301 7.88512 0.942673 7.75374 1.06144 7.65361C1.1802 7.55347 1.32462 7.48857 1.47836 7.46624L8.07113 6.50848L11.0193 0.534421C11.0881 0.395178 11.1944 0.277944 11.3263 0.195971C11.4582 0.113998 11.6104 0.0705566 11.7657 0.0705566C11.921 0.0705566 12.0731 0.113998 12.205 0.195971C12.3369 0.277944 12.4433 0.395178 12.512 0.534421L15.4602 6.50848L22.0524 7.46624C22.2062 7.48848 22.3507 7.55332 22.4695 7.65342C22.5884 7.75353 22.6768 7.88489 22.7248 8.03266C22.7729 8.18043 22.7786 8.33869 22.7414 8.48954C22.7041 8.64039 22.6254 8.77781 22.5141 8.88623L17.7419 13.5363L18.8684 20.1019C18.8888 20.2213 18.8829 20.3438 18.8511 20.4607C18.8194 20.5776 18.7624 20.6862 18.6843 20.7788C18.6062 20.8714 18.5088 20.9459 18.399 20.997C18.2891 21.0481 18.1694 21.0746 18.0482 21.0746H18.0494ZM3.38666 8.87125L7.26264 12.6496C7.35903 12.7435 7.43119 12.8594 7.47294 12.9874C7.51469 13.1154 7.52478 13.2515 7.50236 13.3843L6.58733 18.7191L11.3772 16.202C11.497 16.1389 11.6303 16.1058 11.7657 16.1058C11.901 16.1058 12.0344 16.1389 12.1541 16.202L16.9451 18.7207L16.029 13.3843C16.0062 13.2513 16.0161 13.1149 16.0577 12.9866C16.0994 12.8583 16.1716 12.7421 16.2681 12.6479L20.1447 8.87125L14.7882 8.09439C14.6547 8.07498 14.528 8.02342 14.4188 7.94416C14.3097 7.8649 14.2215 7.7603 14.1617 7.63937L11.7657 2.78565L9.37016 7.63937C9.31036 7.76037 9.22204 7.86501 9.1128 7.94428C9.00357 8.02355 8.87669 8.07506 8.74312 8.09439L3.38666 8.87125Z" fill="#868686" />
                                </Svg>
                                <Svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.0494 21.0746C17.914 21.0751 17.7806 21.0423 17.6609 20.9792L11.7657 17.879L5.86929 20.9792C5.73187 21.0511 5.5771 21.0831 5.42243 21.0718C5.26776 21.0604 5.11935 21.006 4.99392 20.9148C4.86849 20.8236 4.77104 20.6992 4.71256 20.5555C4.65408 20.4119 4.63689 20.2548 4.66293 20.1019L5.78938 13.5363L1.01724 8.88623C0.905948 8.77784 0.827214 8.64047 0.78994 8.48967C0.752666 8.33886 0.75834 8.18062 0.806321 8.03287C0.854301 7.88512 0.942673 7.75374 1.06144 7.65361C1.1802 7.55347 1.32462 7.48857 1.47836 7.46624L8.07113 6.50848L11.0193 0.534421C11.0881 0.395178 11.1944 0.277944 11.3263 0.195971C11.4582 0.113998 11.6104 0.0705566 11.7657 0.0705566C11.921 0.0705566 12.0731 0.113998 12.205 0.195971C12.3369 0.277944 12.4433 0.395178 12.512 0.534421L15.4602 6.50848L22.0524 7.46624C22.2062 7.48848 22.3507 7.55332 22.4695 7.65342C22.5884 7.75353 22.6768 7.88489 22.7248 8.03266C22.7729 8.18043 22.7786 8.33869 22.7414 8.48954C22.7041 8.64039 22.6254 8.77781 22.5141 8.88623L17.7419 13.5363L18.8684 20.1019C18.8888 20.2213 18.8829 20.3438 18.8511 20.4607C18.8194 20.5776 18.7624 20.6862 18.6843 20.7788C18.6062 20.8714 18.5088 20.9459 18.399 20.997C18.2891 21.0481 18.1694 21.0746 18.0482 21.0746H18.0494ZM3.38666 8.87125L7.26264 12.6496C7.35903 12.7435 7.43119 12.8594 7.47294 12.9874C7.51469 13.1154 7.52478 13.2515 7.50236 13.3843L6.58733 18.7191L11.3772 16.202C11.497 16.1389 11.6303 16.1058 11.7657 16.1058C11.901 16.1058 12.0344 16.1389 12.1541 16.202L16.9451 18.7207L16.029 13.3843C16.0062 13.2513 16.0161 13.1149 16.0577 12.9866C16.0994 12.8583 16.1716 12.7421 16.2681 12.6479L20.1447 8.87125L14.7882 8.09439C14.6547 8.07498 14.528 8.02342 14.4188 7.94416C14.3097 7.8649 14.2215 7.7603 14.1617 7.63937L11.7657 2.78565L9.37016 7.63937C9.31036 7.76037 9.22204 7.86501 9.1128 7.94428C9.00357 8.02355 8.87669 8.07506 8.74312 8.09439L3.38666 8.87125Z" fill="#868686" />
                                </Svg>
                                <Svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.0494 21.0746C17.914 21.0751 17.7806 21.0423 17.6609 20.9792L11.7657 17.879L5.86929 20.9792C5.73187 21.0511 5.5771 21.0831 5.42243 21.0718C5.26776 21.0604 5.11935 21.006 4.99392 20.9148C4.86849 20.8236 4.77104 20.6992 4.71256 20.5555C4.65408 20.4119 4.63689 20.2548 4.66293 20.1019L5.78938 13.5363L1.01724 8.88623C0.905948 8.77784 0.827214 8.64047 0.78994 8.48967C0.752666 8.33886 0.75834 8.18062 0.806321 8.03287C0.854301 7.88512 0.942673 7.75374 1.06144 7.65361C1.1802 7.55347 1.32462 7.48857 1.47836 7.46624L8.07113 6.50848L11.0193 0.534421C11.0881 0.395178 11.1944 0.277944 11.3263 0.195971C11.4582 0.113998 11.6104 0.0705566 11.7657 0.0705566C11.921 0.0705566 12.0731 0.113998 12.205 0.195971C12.3369 0.277944 12.4433 0.395178 12.512 0.534421L15.4602 6.50848L22.0524 7.46624C22.2062 7.48848 22.3507 7.55332 22.4695 7.65342C22.5884 7.75353 22.6768 7.88489 22.7248 8.03266C22.7729 8.18043 22.7786 8.33869 22.7414 8.48954C22.7041 8.64039 22.6254 8.77781 22.5141 8.88623L17.7419 13.5363L18.8684 20.1019C18.8888 20.2213 18.8829 20.3438 18.8511 20.4607C18.8194 20.5776 18.7624 20.6862 18.6843 20.7788C18.6062 20.8714 18.5088 20.9459 18.399 20.997C18.2891 21.0481 18.1694 21.0746 18.0482 21.0746H18.0494ZM3.38666 8.87125L7.26264 12.6496C7.35903 12.7435 7.43119 12.8594 7.47294 12.9874C7.51469 13.1154 7.52478 13.2515 7.50236 13.3843L6.58733 18.7191L11.3772 16.202C11.497 16.1389 11.6303 16.1058 11.7657 16.1058C11.901 16.1058 12.0344 16.1389 12.1541 16.202L16.9451 18.7207L16.029 13.3843C16.0062 13.2513 16.0161 13.1149 16.0577 12.9866C16.0994 12.8583 16.1716 12.7421 16.2681 12.6479L20.1447 8.87125L14.7882 8.09439C14.6547 8.07498 14.528 8.02342 14.4188 7.94416C14.3097 7.8649 14.2215 7.7603 14.1617 7.63937L11.7657 2.78565L9.37016 7.63937C9.31036 7.76037 9.22204 7.86501 9.1128 7.94428C9.00357 8.02355 8.87669 8.07506 8.74312 8.09439L3.38666 8.87125Z" fill="#868686" />
                                </Svg> */}

                                <RatingInput
                                    rating={data.rate}
                                    size={40}
                                    maxStars={5}
                                    bordered={false}
                                    setRating={() => { return false }}
                                />
                            </View>
                        </View>

                        {
                            (this.props.admin.roles?.includes('customer_edit') || this.props.admin.is_admin == 1) &&
                            <View style={styles.chonImage}>
                                <Text style={styles.textImage}>Chọn ảnh:</Text>
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
                        }


                        <View style={styles.listAttr}>
                            <Text style={styles.sectionHeader}>THÔNG TIN CHUNG</Text>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Mã khách hàng</Text>
                                <Text style={styles.value}>{data?.code}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tên khách hàng</Text>
                                <Text style={styles.value}>{data?.fullname}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Người phụ trách</Text>
                                {
                                    this.props.admin.roles?.includes('customer_edit') || this.props.admin.is_admin == 1 ? (
                                        <TouchableOpacity onPress={() => this.gotoPage('ListEmployee', { manager: Math.random() })}>
                                            <Text style={styles.btnChosePT}>{data?.id_quanly == 0 || data?.id_quanly == null ? 'Chưa có người phụ trách' : this.getUser(data?.id_quanly)}</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <Text style={styles.btnChosePT}>{data?.id_quanly == 0 || data?.id_quanly == null ? 'Chưa có người phụ trách' : this.getUser(data?.id_quanly)}</Text>
                                    )
                                }
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Ghi chú: Khách mới</Text>
                            </View>
                        </View>
                        <View style={styles.listAttr}>
                            <Text style={styles.sectionHeader}>THÔNG TIN LIÊN LẠC</Text>
                            {/* <View style={styles.btnAddPhone}>
                                <TouchableOpacity onPress={this.toggleModal} style={styles.addButton}>
                                    <View style={styles.groupBtn1}>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M9 18C7.21997 18 5.47991 17.4722 3.99987 16.4832C2.51983 15.4943 1.36628 14.0887 0.685088 12.4442C0.00389956 10.7996 -0.17433 8.99002 0.172937 7.24419C0.520203 5.49836 1.37737 3.89471 2.63604 2.63604C3.89471 1.37737 5.49836 0.520203 7.24419 0.172937C8.99002 -0.17433 10.7996 0.00389956 12.4442 0.685088C14.0887 1.36628 15.4943 2.51983 16.4832 3.99987C17.4722 5.47991 18 7.21997 18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18ZM9 1.38462C7.49382 1.38462 6.02146 1.83125 4.76912 2.66804C3.51678 3.50483 2.5407 4.69419 1.96431 6.08572C1.38792 7.47725 1.23711 9.00845 1.53095 10.4857C1.82479 11.9629 2.55008 13.3199 3.61511 14.3849C4.68014 15.4499 6.03708 16.1752 7.51431 16.4691C8.99155 16.7629 10.5228 16.6121 11.9143 16.0357C13.3058 15.4593 14.4952 14.4832 15.332 13.2309C16.1688 11.9785 16.6154 10.5062 16.6154 9C16.6154 6.98028 15.8131 5.04327 14.3849 3.61511C12.9567 2.18695 11.0197 1.38462 9 1.38462Z" fill="#0000FF" />
                                            <Path d="M9.00005 13.8461C8.81644 13.8461 8.64034 13.7732 8.51051 13.6434C8.38068 13.5135 8.30774 13.3374 8.30774 13.1538V4.84615C8.30774 4.66254 8.38068 4.48644 8.51051 4.35661C8.64034 4.22678 8.81644 4.15384 9.00005 4.15384C9.18366 4.15384 9.35975 4.22678 9.48958 4.35661C9.61942 4.48644 9.69235 4.66254 9.69235 4.84615V13.1538C9.69235 13.3374 9.61942 13.5135 9.48958 13.6434C9.35975 13.7732 9.18366 13.8461 9.00005 13.8461Z" fill="#0000FF" />
                                            <Path d="M13.1538 9.69229H4.84612C4.6625 9.69229 4.48641 9.61935 4.35658 9.48952C4.22675 9.35969 4.15381 9.1836 4.15381 8.99999C4.15381 8.81637 4.22675 8.64028 4.35658 8.51045C4.48641 8.38062 4.6625 8.30768 4.84612 8.30768H13.1538C13.3374 8.30768 13.5135 8.38062 13.6433 8.51045C13.7732 8.64028 13.8461 8.81637 13.8461 8.99999C13.8461 9.1836 13.7732 9.35969 13.6433 9.48952C13.5135 9.61935 13.3374 9.69229 13.1538 9.69229Z" fill="#0000FF" />
                                        </Svg>

                                        <Text style={styles.txtAdd}>Thêm số điện thoại</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                             */}
                            {
                                data?.phone?.length === 0 ?
                                    (
                                        <View style={styles.attr}>
                                            <Text style={styles.attrName}>SĐT:</Text>
                                            <Text style={styles.value}>Chưa có dữ liệu</Text>
                                        </View>
                                    ) : this.props.admin.is_show_phone_cus == 1 &&
                                    data?.phone?.map((phone, index) => (
                                        <View key={index} style={styles.attr}>
                                            <Text style={styles.attrName}>SĐT {index + 1}:</Text>
                                            <Text style={styles.value}>{phone}</Text>
                                        </View>
                                    ))
                            }

                            {
                                ((this.props.admin.roles?.includes('customer_edit') && this.props.admin.is_show_phone_cus == 1) || this.props.admin.is_admin == 1) &&
                                <View style={styles.groupBtn}>
                                    <TouchableOpacity style={styles.addButton} onPress={() => this.setModalVisible(true)}>
                                        <View style={styles.groupBtn1}>
                                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M9 18C7.21997 18 5.47991 17.4722 3.99987 16.4832C2.51983 15.4943 1.36628 14.0887 0.685088 12.4442C0.00389956 10.7996 -0.17433 8.99002 0.172937 7.24419C0.520203 5.49836 1.37737 3.89471 2.63604 2.63604C3.89471 1.37737 5.49836 0.520203 7.24419 0.172937C8.99002 -0.17433 10.7996 0.00389956 12.4442 0.685088C14.0887 1.36628 15.4943 2.51983 16.4832 3.99987C17.4722 5.47991 18 7.21997 18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18ZM9 1.38462C7.49382 1.38462 6.02146 1.83125 4.76912 2.66804C3.51678 3.50483 2.5407 4.69419 1.96431 6.08572C1.38792 7.47725 1.23711 9.00845 1.53095 10.4857C1.82479 11.9629 2.55008 13.3199 3.61511 14.3849C4.68014 15.4499 6.03708 16.1752 7.51431 16.4691C8.99155 16.7629 10.5228 16.6121 11.9143 16.0357C13.3058 15.4593 14.4952 14.4832 15.332 13.2309C16.1688 11.9785 16.6154 10.5062 16.6154 9C16.6154 6.98028 15.8131 5.04327 14.3849 3.61511C12.9567 2.18695 11.0197 1.38462 9 1.38462Z" fill="#0000FF" />
                                                <Path d="M9.00005 13.8461C8.81644 13.8461 8.64034 13.7732 8.51051 13.6434C8.38068 13.5135 8.30774 13.3374 8.30774 13.1538V4.84615C8.30774 4.66254 8.38068 4.48644 8.51051 4.35661C8.64034 4.22678 8.81644 4.15384 9.00005 4.15384C9.18366 4.15384 9.35975 4.22678 9.48958 4.35661C9.61942 4.48644 9.69235 4.66254 9.69235 4.84615V13.1538C9.69235 13.3374 9.61942 13.5135 9.48958 13.6434C9.35975 13.7732 9.18366 13.8461 9.00005 13.8461Z" fill="#0000FF" />
                                                <Path d="M13.1538 9.69229H4.84612C4.6625 9.69229 4.48641 9.61935 4.35658 9.48952C4.22675 9.35969 4.15381 9.1836 4.15381 8.99999C4.15381 8.81637 4.22675 8.64028 4.35658 8.51045C4.48641 8.38062 4.6625 8.30768 4.84612 8.30768H13.1538C13.3374 8.30768 13.5135 8.38062 13.6433 8.51045C13.7732 8.64028 13.8461 8.81637 13.8461 8.99999C13.8461 9.1836 13.7732 9.35969 13.6433 9.48952C13.5135 9.61935 13.3374 9.69229 13.1538 9.69229Z" fill="#0000FF" />
                                            </Svg>

                                            <Text style={styles.txtAdd}>Thêm số điện thoại</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Địa chỉ:</Text>
                                <Text style={styles.value}>{data.address !== '' ? data.address : 'Chưa có thông tin'}</Text>
                            </View>

                            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.modalTitle}>Thêm số điện thoại KH</Text>
                                        <TextInput
                                            style={styles.inputSL}
                                            keyboardType="numeric"
                                            value={phone}
                                            onChangeText={(text) => this.setPhone(text)}
                                        />
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible(false)}>
                                                <Text style={styles.txtConfirm}>Hủy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleAddView()}>
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
                        <View style={styles.listAttr}>
                            <Text style={styles.sectionHeader}>THÔNG TIN KHÁC</Text>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Ngày mua hàng đầu tiên:</Text>
                                <Text style={styles.value}>{data?.ngaymuahangdautien}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Ngày mua hàng gần nhất:</Text>
                                <Text style={styles.value}>{data?.ngaymuahanggannhat}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng số toa đã mua:</Text>
                                <Text style={styles.value}>{data?.tongsotoadamua}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng tiền đã mua:</Text>
                                <Text style={styles.value}>{data?.tongtiendamua}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng số sản phẩm đã mua:</Text>
                                <Text style={styles.value}>{data?.tongsosqpdamua}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng tiền đã mua tháng này:</Text>
                                <Text style={styles.value}>{data?.tongtienmuatrongthang}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng số sản phẩm đã mua tháng này:</Text>
                                <Text style={styles.value}>{data?.tongspdamuatrongthang}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng phụ chi:</Text>
                                <Text style={styles.value}>{data?.tongphuchi}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Phụ chi tháng này:</Text>
                                <Text style={styles.value}>{data?.phichithangnay}</Text>
                            </View>
                            {
                                this.props.admin.is_show_debt == 1 &&
                                <>
                                    <View style={styles.attr}>
                                        <Text style={styles.attrName}>Công nợ: {data?.congnokhachno_number > 0 ? 'Khách nợ' : 'Cửa hàng nợ'}</Text>
                                        <Text style={styles.value}>{data?.congnokhachno?.replace(/-/g, "")}</Text>
                                    </View>
                                    <View style={styles.attr}>
                                        <Text style={styles.attrName}>Ngày hẹn trả nợ:</Text>
                                        <Text style={styles.value}>{data?.ngayhentrano}</Text>
                                    </View>
                                    <View style={styles.attr}>
                                        <Text style={styles.attrName}>Khất nợ</Text>
                                        <Text style={styles.value}>{data?.solankhatno}</Text>
                                    </View>
                                </>
                            }
                        </View>
                        <View style={styles.btnGroup1}>
                            <View style={styles.col4}>
                                <TouchableOpacity onPress={() => {
                                    if (this.props.admin.roles?.includes('customer_payment_detail') || this.props.admin.is_admin == 1) {
                                        this.gotoPage('PaymentHistory', { customer: true });
                                    } else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <Text style={[styles.btnItem, styles.btnItem1, styles.bgorange]}>Lịch sử thanh toán</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.gotoPage('FreightWagons');
                                    this.props.customerAction('current_customer_id_finder', this.props.customer.id);
                                }}>
                                    <Text style={[styles.btnItem, styles.btnItem1, styles.bgorange]}>Lịch sử mua hàng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.gotoPage('ReturnForm');
                                    this.props.customerAction('current_customer_id_finder', this.props.customer.id);
                                }}>
                                    <Text style={[styles.btnItem, styles.btnItem1, styles.bgorange]}>Lịch sử trả hàng</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.col6}>
                                <TouchableOpacity onPress={() => {
                                    if (this.props.admin.roles?.includes('customer_payment') || this.props.admin.is_admin == 1) {
                                        this.setIsShow(true);
                                    } else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <Text style={[styles.btnItem, styles.btnItem3, styles.bgorange]}>Thanh toán</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => this.setIsShow(true)}>
                                    <Text style={[styles.btnItem, styles.bgorange]}>Thanh toán</Text>
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity>
                                    <Text style={[styles.btnItem, styles.btnItem2, styles.bgorange]}>Hẹn ngày báo trả</Text>
                                </TouchableOpacity> */}
                            </View>

                            <Modal visible={isShow} animationType="slide" transparent={true}>
                                <View style={styles.modalThanhtoan}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.txtThanhtoan}>Thanh toán</Text>
                                        <TouchableOpacity onPress={() => {
                                            this.props.supplierAction('current_supplier_id', 0);
                                            this.gotoPage('Payment', { customerDebt: data.congnokhachno ? data?.congnokhachno : 0, thuAdd: true, customerPayment: true });
                                            this.setIsShow(false);
                                        }}>
                                            <View style={[styles.flexRow, styles.btnThanhtoan]}>
                                                <View style={styles.flexRow}>
                                                    <Svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <Path d="M10.1016 17.6241C10.5454 17.6241 10.9057 17.9844 10.9057 18.4282C10.9057 18.5469 11.0024 18.6391 11.1166 18.6391C11.2353 18.6391 11.3275 18.5425 11.3275 18.4282C11.3275 17.8219 10.8882 17.3209 10.3082 17.2199V16.8025C10.3082 16.6838 10.2115 16.5916 10.0972 16.5916C9.97861 16.5916 9.88634 16.6882 9.88634 16.8025V17.2199C9.31073 17.3209 8.86694 17.8219 8.86694 18.4282C8.86694 19.1049 9.42058 19.6585 10.0972 19.6585C10.541 19.6585 10.9013 20.0188 10.9013 20.4626C10.9013 20.9064 10.541 21.2667 10.0972 21.2667C9.65346 21.2667 9.29316 20.9064 9.29316 20.4626C9.29316 20.344 9.19649 20.2517 9.08225 20.2517C8.96361 20.2517 8.87134 20.3484 8.87134 20.4626C8.87134 21.069 9.31073 21.5699 9.89073 21.6709V22.0884C9.89073 22.207 9.9874 22.2993 10.1016 22.2993C10.2203 22.2993 10.3125 22.2026 10.3125 22.0884V21.6709C10.8882 21.5699 11.3319 21.069 11.3319 20.4626C11.3319 19.7859 10.7783 19.2323 10.1016 19.2323C9.65785 19.2323 9.29755 18.872 9.29755 18.4282C9.29755 17.9844 9.65785 17.6241 10.1016 17.6241Z" fill="black" />
                                                        <Path d="M26.7723 20.1419H20.2033C20.1814 17.1759 17.3297 12.9138 14.8515 9.76776C15.3656 9.55686 15.7259 9.05595 15.7259 8.46716C15.7259 7.69383 15.0976 7.0611 14.3198 7.0611H14.0079C14.8076 5.80883 15.37 3.92383 15.5062 2.64958C15.6073 1.71807 15.4886 1.15125 15.1327 0.86125C14.6142 0.439432 13.7794 0.711856 12.7205 1.05458L12.5227 1.1161C11.6923 1.39292 10.8091 1.65655 9.92152 1.65655C9.11742 1.65655 8.33091 1.42807 7.66303 1.19958C7.50485 1.15564 7.35106 1.09852 7.20167 1.05019C6.26576 0.725038 5.52318 0.465795 5.05303 0.83928C4.70152 1.12049 4.59167 1.67852 4.70152 2.65837C4.83773 3.9414 5.42212 5.84398 6.19545 7.06989H5.88348C5.11015 7.06989 4.47742 7.69822 4.47742 8.47595C4.47742 9.06034 4.83773 9.56564 5.35182 9.77216C2.86485 12.927 0 17.2111 0 20.177C0 22.207 0.60197 24.1667 1.74439 25.8452C2.81212 27.4138 4.63561 28.3497 6.61727 28.3497H11.1167C11.1211 28.3497 11.1211 28.3497 11.1255 28.3497H26.7679C27.2205 28.3497 27.5852 27.9938 27.5852 27.5588V26.1C27.5852 25.8847 27.4973 25.6914 27.3523 25.5508C27.4973 25.4102 27.5852 25.2125 27.5852 25.0016V23.5472C27.5852 23.3187 27.4841 23.1122 27.3215 22.9672C27.4841 22.8222 27.5852 22.6156 27.5852 22.3872V20.9328C27.5852 20.4978 27.2205 20.1419 26.7723 20.1419ZM27.1589 20.9328V22.3872C27.1589 22.5893 26.9832 22.7519 26.7679 22.7519H25.7748V20.5681H26.7679C26.9876 20.5681 27.1589 20.735 27.1589 20.9328ZM27.1589 25.0016C27.1589 25.1466 27.0667 25.2696 26.9348 25.3267C26.8821 25.3179 26.825 25.3091 26.7679 25.3091H25.7748V23.1781H26.7679C26.9832 23.1781 27.1589 23.3406 27.1589 23.5428V25.0016ZM17.5494 27.9191H16.2488V25.7925H17.5186C17.4747 25.8891 17.4527 25.9946 17.4527 26.1044V27.5588C17.4527 27.6906 17.4879 27.8137 17.5494 27.9191ZM17.5494 23.1825C17.4879 23.2923 17.4527 23.4153 17.4527 23.5472V25.0016C17.4527 25.1114 17.4747 25.2169 17.5186 25.3135H16.2488V23.1825H17.5494ZM21.293 20.5681V22.7519H19.6892V20.5681H21.293ZM13.7926 25.3135H12.1888V23.1825H13.7926V25.3135ZM10.7695 22.7563C10.3609 22.7563 10.0226 23.0506 9.96545 23.4329C7.82561 23.3582 6.10758 21.6006 6.10758 19.4432C6.10758 17.2419 7.9003 15.4491 10.1017 15.4491C12.3074 15.4491 14.1002 17.2419 14.1002 19.4432C14.1002 20.779 13.4411 22.0093 12.3338 22.7563H10.7695ZM10.3785 25.0016V23.5472C10.3785 23.345 10.5542 23.1825 10.7695 23.1825H11.7626V25.3135H10.7695C10.7124 25.3135 10.6553 25.3179 10.6026 25.3311C10.4708 25.2696 10.3785 25.1466 10.3785 25.0016ZM17.8789 25.0016V23.5472C17.8789 23.345 18.0547 23.1825 18.27 23.1825H19.263V25.3135H18.27H18.0767C17.9624 25.2476 17.8789 25.1378 17.8789 25.0016ZM19.6892 23.1825H21.293V25.3135H19.6892V23.1825ZM21.7192 23.1825H23.323V25.3135H21.7192V23.1825ZM23.7492 25.3135V23.1825H25.353V25.3135H23.7492ZM25.353 22.7519H23.7492V20.5681H25.353V22.7519ZM23.323 22.7519H21.7192V20.5681H23.323V22.7519ZM19.263 22.7519H18.27C18.0547 22.7519 17.8789 22.5893 17.8789 22.3872V20.9328C17.8789 20.7306 18.0547 20.5681 18.27 20.5681H19.263V22.7519ZM15.8226 25.3135H14.2188V23.1825H15.8226V25.3135ZM13.0236 22.7563C13.9683 21.9214 14.522 20.7263 14.522 19.4432C14.522 17.0046 12.5359 15.0229 10.0973 15.0229C7.65864 15.0229 5.67697 17.0046 5.67697 19.4432C5.67697 21.8335 7.57955 23.78 9.94788 23.8591V25.0016C9.94788 25.0191 9.95227 25.0323 9.95227 25.0499C6.92485 24.9752 4.48621 22.4926 4.48621 19.4432C4.48621 16.3499 7.00394 13.8322 10.0973 13.8322C13.1906 13.8322 15.7127 16.3499 15.7127 19.4432C15.7127 20.6472 15.3348 21.7896 14.6274 22.7563H13.0236ZM10.7695 27.9191C10.5542 27.9191 10.3785 27.7566 10.3785 27.5544V26.1C10.3785 25.955 10.4708 25.832 10.6026 25.7749C10.6553 25.7837 10.7124 25.7925 10.7695 25.7925H11.7626V27.9235H10.7695V27.9191ZM12.1888 25.7925H13.7926V27.9235H12.1888V25.7925ZM14.2188 25.7925H15.8226V27.9235H14.2188V25.7925ZM19.6892 25.7925H21.293V27.9235H19.6892V25.7925ZM21.7192 25.7925H23.323V27.9235H21.7192V25.7925ZM23.7492 25.7925H25.353V27.9235H23.7492V25.7925ZM5.12333 2.61004C5.03545 1.82792 5.10136 1.34019 5.31667 1.16883C5.60227 0.940341 6.27894 1.17761 7.05667 1.45004C7.15773 1.48519 7.26758 1.52473 7.37303 1.55989C7.36864 1.6917 7.37303 1.84989 7.39061 2.07398C7.4697 3.01867 7.79045 4.46428 8.22545 5.28155C8.265 5.35186 8.3353 5.39579 8.41439 5.39579C8.44955 5.39579 8.4847 5.38701 8.51545 5.36943C8.62091 5.31231 8.65606 5.18489 8.60333 5.07943C8.20788 4.34125 7.89151 2.95276 7.81682 2.04322C7.80803 1.90701 7.80364 1.79716 7.79924 1.70049C8.43636 1.90701 9.16136 2.09155 9.91712 2.09155C10.7695 2.09155 11.6308 1.85867 12.3909 1.61261C12.3953 1.74004 12.3909 1.88064 12.3777 2.04322C12.3074 2.95276 11.9955 4.33686 11.5956 5.08383C11.5385 5.18928 11.578 5.3167 11.6835 5.37383C11.7142 5.3914 11.7494 5.40019 11.7845 5.40019C11.8592 5.40019 11.9339 5.36064 11.9735 5.28595C12.4173 4.45989 12.7336 3.01867 12.8039 2.07837C12.8215 1.84989 12.8215 1.65655 12.8083 1.4808L12.8435 1.46761C13.7442 1.17761 14.5176 0.927159 14.8559 1.19958C15.0844 1.38413 15.1591 1.86307 15.0756 2.61443C14.935 3.93261 14.3111 5.93186 13.4938 7.06989H6.69636C5.88788 5.92746 5.26394 3.92822 5.12333 2.61004ZM4.90364 8.47155C4.90364 7.9311 5.34303 7.4917 5.88348 7.4917H6.58652H6.59091H13.6124H13.6168H14.3242C14.8647 7.4917 15.3041 7.9311 15.3041 8.47155C15.3041 9.01201 14.8647 9.44701 14.3242 9.44701H5.87909C5.33864 9.44701 4.90364 9.01201 4.90364 8.47155ZM2.09591 25.6079C1.00182 24.0041 0.421818 22.1279 0.421818 20.1814C0.421818 17.8834 2.28045 14.3243 5.80439 9.87761H5.87909H7.54C6.87212 10.5455 6.47227 11.455 6.45909 12.4129C6.45909 12.5316 6.55136 12.6282 6.67 12.6282C6.67 12.6282 6.67 12.6282 6.67439 12.6282C6.78864 12.6282 6.8853 12.5359 6.8853 12.4173C6.89849 11.4199 7.38621 10.4752 8.18591 9.87761H12.0174C12.8171 10.4752 13.3048 11.4199 13.318 12.4173C13.318 12.5359 13.4147 12.6282 13.5289 12.6282C13.5289 12.6282 13.5289 12.6282 13.5333 12.6282C13.652 12.6282 13.7442 12.5316 13.7442 12.4129C13.7311 11.455 13.3312 10.5455 12.6633 9.87761H14.3242H14.3945C17.9009 14.3023 19.7595 17.8482 19.7771 20.1462H18.27C17.8174 20.1462 17.4527 20.5022 17.4527 20.9372V22.3916C17.4527 22.5234 17.4923 22.6508 17.5494 22.7606H15.1459C15.7962 21.7764 16.1389 20.6384 16.1389 19.4476C16.1389 16.1214 13.4279 13.4103 10.0973 13.4103C6.77106 13.4103 4.06 16.117 4.06 19.4476C4.06 22.7782 6.76667 25.4893 10.0973 25.4893C10.1061 25.4893 10.1105 25.4849 10.1192 25.4849C10.1412 25.5113 10.1588 25.5376 10.1808 25.5596C10.0358 25.7002 9.94788 25.8979 9.94788 26.1088V27.5632C9.94788 27.695 9.98303 27.8181 10.0445 27.9279H6.61288C4.77621 27.9235 3.08455 27.0579 2.09591 25.6079ZM17.8789 27.5588V26.1C17.8789 25.9638 17.9624 25.854 18.0767 25.7881H18.27H19.263V27.9191H18.27C18.0547 27.9191 17.8789 27.7566 17.8789 27.5588ZM27.1589 27.5588C27.1589 27.7609 26.9832 27.9235 26.7679 27.9235H25.7748V25.7925H26.7679C26.825 25.7925 26.8821 25.7881 26.9348 25.7749C27.0667 25.832 27.1589 25.955 27.1589 26.1V27.5588Z" fill="black" />
                                                        <Path d="M22.0883 13.5948C25.1201 13.5948 27.5851 11.1298 27.5851 8.09802C27.5851 5.07059 25.1201 2.60559 22.0883 2.60559C19.0609 2.60559 16.5959 5.07059 16.5959 8.09802C16.5959 11.1298 19.0609 13.5948 22.0883 13.5948ZM22.0883 3.0318C24.8829 3.0318 27.1589 5.30347 27.1589 8.09802C27.1589 10.8926 24.8829 13.1686 22.0883 13.1686C19.2938 13.1686 17.0221 10.8926 17.0221 8.09802C17.0221 5.30347 19.2982 3.0318 22.0883 3.0318Z" fill="black" />
                                                        <Path d="M22.0927 12.1317C24.3161 12.1317 26.1264 10.3214 26.1264 8.09809C26.1264 5.87476 24.3161 4.06885 22.0927 4.06885C19.8694 4.06885 18.0635 5.87476 18.0635 8.09809C18.0635 10.3214 19.8694 12.1317 22.0927 12.1317ZM22.0927 4.49506C24.0788 4.49506 25.7001 6.11203 25.7001 8.09809C25.7001 10.0842 24.0832 11.7055 22.0927 11.7055C20.1067 11.7055 18.4897 10.0885 18.4897 8.09809C18.4897 6.11203 20.1023 4.49506 22.0927 4.49506Z" fill="black" />
                                                        <Path d="M22.0927 9.73258C21.7017 9.73258 21.3809 9.41622 21.3809 9.02516C21.3809 8.90652 21.2843 8.81425 21.17 8.81425C21.0558 8.81425 20.9591 8.91092 20.9591 9.02516C20.9591 9.5788 21.359 10.0358 21.8818 10.1368V10.4971C21.8818 10.6158 21.9785 10.708 22.0927 10.708C22.2114 10.708 22.3037 10.6114 22.3037 10.4971V10.1368C22.8265 10.0358 23.2264 9.5788 23.2264 9.02516C23.2264 8.39683 22.7167 7.89152 22.0927 7.89152C21.7017 7.89152 21.3809 7.57516 21.3809 7.1841C21.3809 6.79304 21.6973 6.47667 22.0927 6.47667C22.4882 6.47667 22.8046 6.79304 22.8046 7.1841C22.8046 7.30274 22.9012 7.39501 23.0155 7.39501C23.1341 7.39501 23.2264 7.29834 23.2264 7.1841C23.2264 6.63046 22.8265 6.1691 22.3037 6.06804V5.70774C22.3037 5.5891 22.207 5.49683 22.0927 5.49683C21.9741 5.49683 21.8818 5.59349 21.8818 5.70774V6.06804C21.359 6.1691 20.9591 6.63046 20.9591 7.1841C20.9591 7.80804 21.4688 8.31774 22.0927 8.31774C22.4838 8.31774 22.8046 8.6341 22.8046 9.02516C22.8002 9.41183 22.4838 9.73258 22.0927 9.73258Z" fill="black" />
                                                    </Svg>
                                                    <View style={styles.marginLeft10}>
                                                        <Text style={[styles.txtT, styles.colorBl]}>Khách hàng thanh toán</Text>
                                                        <Text style={styles.txtT}>Nhận tiền về</Text>
                                                    </View>
                                                </View>
                                                <Svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M5.50404 7.6009L0.425686 12.3034C0.222986 12.4926 0.0960145 12.7633 0.0725784 13.0563C0.0491419 13.3493 0.131151 13.6407 0.300645 13.8667C0.470139 14.0927 0.713305 14.2348 0.976894 14.2619C1.24048 14.2891 1.50301 14.199 1.70699 14.0115L7.70727 8.45502C7.81978 8.35056 7.91028 8.21993 7.97238 8.07235C8.03448 7.92477 8.06667 7.76383 8.06667 7.60091C8.06667 7.43799 8.03448 7.27706 7.97238 7.12948C7.91028 6.9819 7.81978 6.85127 7.70727 6.74681L1.70699 1.1903C1.5031 1.0019 1.24026 0.911145 0.976192 0.937963C0.712128 0.964781 0.468441 1.10698 0.298662 1.33333C0.128883 1.55967 0.0468969 1.85165 0.070714 2.14512C0.0945311 2.43859 0.222205 2.70956 0.425686 2.8985L5.50404 7.6009Z" fill="#989898" />
                                                </Svg>
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={styles.bgGrey}></Text>
                                        <TouchableOpacity onPress={() => {
                                            this.props.supplierAction('current_supplier_id', 0);
                                            this.gotoPage('Payment', { customerDebt: data.congnokhachno ? data?.congnokhachno : 0, customerPayment: true });
                                            this.setIsShow(false);
                                        }}>
                                            <View style={[styles.flexRow, styles.btnThanhtoan]}>
                                                <View style={styles.flexRow}>
                                                    <Svg width="29" height="22" viewBox="0 0 29 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <Path d="M21.3636 18.9092C19.5455 19.6365 17.3636 20.091 15.0909 20.091C13.2727 20.091 11.5455 19.8183 10 19.3637" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        <Path d="M19.0909 16.8182C19.6364 17.7273 20.4545 18.5455 21.4545 19L21.9091 19.1818L22.8182 21H25.5455V18.2727C26.7273 15.9091 27.3636 13.2727 27.3636 10.5455C27.3636 6.72727 24.2727 3.72727 20.5455 3.72727H13.0909C11.1818 2 8.72727 1 6.09091 1H5.54545L7.72727 4.63636C6.54545 5.36364 5.54545 6.45455 5.09091 7.90909L4.63636 9.18182C4.09091 10.7273 2.54545 11.5455 1 11V14.6364L6.45455 16.4545V21H9.18182L10.0909 18.2727" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        <Path d="M26.9091 12.0907C25.9091 13.0907 24.3636 13.0907 23.3636 12.0907C22.5455 11.2726 22.5455 9.99982 23.3636 9.18164" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                        <Path d="M8.27286 11.909C8.18195 11.909 8.18195 11.909 8.09104 11.909C8.00013 11.909 8.00013 11.909 7.90922 11.8181C7.81832 11.8181 7.81831 11.7272 7.72741 11.7272C7.6365 11.7272 7.6365 11.6363 7.6365 11.6363C7.6365 11.5454 7.54559 11.5454 7.54559 11.5454C7.54559 11.4545 7.45468 11.4545 7.45468 11.3635C7.45468 11.2726 7.45468 11.2726 7.36377 11.1817C7.36377 11.0908 7.36377 11.0908 7.36377 10.9999C7.36377 10.7272 7.45468 10.5454 7.6365 10.3635L7.72741 10.2726C7.81831 10.2726 7.81832 10.1817 7.90922 10.1817C8.00013 10.1817 8.00013 10.1817 8.09104 10.0908C8.27286 10.0908 8.45468 10.0908 8.6365 10.1817C8.72741 10.2726 8.81831 10.2726 8.90922 10.3635C9.00013 10.4545 9.09104 10.5454 9.09104 10.6363C9.09104 10.7272 9.18195 10.909 9.18195 10.9999C9.18195 11.0908 9.18195 11.0908 9.18195 11.1817C9.18195 11.2726 9.18195 11.2726 9.09104 11.3635C9.09104 11.4545 9.00013 11.4545 9.00013 11.5454L8.90922 11.6363C8.72741 11.8181 8.54559 11.909 8.27286 11.909Z" fill="black" />
                                                    </Svg>
                                                    <View style={styles.marginLeft10}>
                                                        <Text style={[styles.txtT, styles.colorBl]}>Thanh toán cho khách hàng</Text>
                                                        <Text style={styles.txtT}>Trả tiền cho khách hàng</Text>
                                                    </View>
                                                </View>
                                                <Svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M5.50404 7.6009L0.425686 12.3034C0.222986 12.4926 0.0960145 12.7633 0.0725784 13.0563C0.0491419 13.3493 0.131151 13.6407 0.300645 13.8667C0.470139 14.0927 0.713305 14.2348 0.976894 14.2619C1.24048 14.2891 1.50301 14.199 1.70699 14.0115L7.70727 8.45502C7.81978 8.35056 7.91028 8.21993 7.97238 8.07235C8.03448 7.92477 8.06667 7.76383 8.06667 7.60091C8.06667 7.43799 8.03448 7.27706 7.97238 7.12948C7.91028 6.9819 7.81978 6.85127 7.70727 6.74681L1.70699 1.1903C1.5031 1.0019 1.24026 0.911145 0.976192 0.937963C0.712128 0.964781 0.468441 1.10698 0.298662 1.33333C0.128883 1.55967 0.0468969 1.85165 0.070714 2.14512C0.0945311 2.43859 0.222205 2.70956 0.425686 2.8985L5.50404 7.6009Z" fill="#989898" />
                                                </Svg>
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={styles.bgGrey}></Text>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setIsShow(false)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                        </View>
                    </ScrollView>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
};
const mapStateToProps = state => ({
    customer: state.customer,
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    customerAction: (act, data) => dispatch(customerAction(act, data)),
    accountAction: (act, data) => dispatch(accountAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail)
