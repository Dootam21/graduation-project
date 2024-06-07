/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import { connect } from 'react-redux';
import { get_all_customer } from '../../services/customerSevice';
import customerAction from '../../actions/customerAction';
import accountAction from '../../actions/accountAction';
import SpinnerComponent from '../elements/Spinner';
// import type {Node} from 'react';
import {
    useWindowDimensions,
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
import { Rating, RatingInput } from 'react-native-stock-star-rating';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

var from = 0;
const limit = 10;
var stopLoadData = false;
const ListFooterComponent = () => (
    <Text
        style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingTop: 0,
            paddingBottom: 15,
            marginTop: 15
        }}
    >
        Đang Tải ...
    </Text>
);

class Customer extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingMore: false,
            stopFetchMore: true,
            text: 'Tìm kiếm',
            modalVisible: false,
            isActive: 'Mặc định',
            isShow: false,
            inputValue: '',
            dataSearch: [],
            tong_no: '',
            rate: 0,
            filter: 1,
            id_quanly: 0,
            spinner: false,
            from: 0,
        }
        // console.log(this.props.admin.is_show_debt);
    }

    setRate(opt) {
        this.setState({ rate: opt });
    }

    componentDidMount() {

        this.setState({ from: 0 })
        // this.getList();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.setState({ from: 0 })
                this.getList();
                if (this.props.admin.active_uid) {
                    this.setIsShow(true);
                }

                // if (this.props.admin.active_uid != 0) {
                //     from = 0;
                //     this.setState({ id_quanly: this.props.admin.active_uid });
                // }
            }
        );
    }

    onChangeText = (opt) => {
        this.setState({ text: opt });
    }
    setIsShow = (opt, callback) => {
        this.setState({ isShow: opt }, callback);
    }

    setModalVisible = (opt) => {
        this.setState({ modalVisible: opt });
    }

    setIsActive = (opt) => {
        this.setState({ isActive: opt });
    }

    handleActive = (option, filter) => {
        this.setIsActive(option);
        this.setState({ filter: filter });
        this.getListFilter(filter, this.state.rate, this.state.id_quanly);
        this.setModalVisible(false);
    }

    Cancel = () => {
        this.setModalVisible(false);
    }

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }

    setData(opt) {
        this.setState({ data: opt });
    }

    setSpinner(opt) {
        this.setState({ spinner: opt });
    }


    async getList() {
        if (this.props.admin.roles?.includes('customer_list') || this.props.admin.is_admin == 1) {
            this.setSpinner(true);
            const d = {
                u_id: this.props.admin.uid,
                from: 0,
            };

            const data = await get_all_customer(d);
            this.props?.customerAction('get_list_customer', data);
            this.setData(data);
            this.setState({ from: this.state.from + 10 })

            this.setState({ tong_no: data[0]?.tong_no_str });
            this.setSpinner(false);
        } else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    async getListFilter(filter, star, id_quanly) {
        const data = await get_all_customer({
            from: 0,
            u_id: this.props.admin.uid,
            star: star,
            filter: filter,
            id_quanly: id_quanly,
        });
        this.setData(data);
        this.setState({ tong_no: data[0]?.tong_no_str });
        this.setIsShow(false);
    }

    async handleOnEndReached() {
        this.setState({ loadingMore: true });//(true)

        if (!this.state.stopFetchMore) {
            const d = {
                u_id: this.props.admin.uid,
                star: this.state.rate,
                filter: this.state.filter,
                id_quanly: this.props.admin.active_uid,
                from: this.state.from,
            };

            const newData = await get_all_customer(d);
            this.setState({ from: this.state.from + 10 })

            if (newData === false) {
                stopLoadData = true;
                this.setState({ loadingMore: false });
                return false;
            }
            else {
                if (newData.length > 0) {
                    this.setState({ data: [...this.state.data, ...newData] });
                }
            }
            this.setState({ stopFetchMore: true });// = true;
        }

        this.setState({ loadingMore: false });
    }

    gotoDetails = (id) => {

        if (this.props?.route?.params?.cart) {
            this.props.customerAction('current_customer_id', id);
            this.props.navigation?.goBack();
        }
        else if (this.props?.route?.params?.findCustomer) {
            this.props.customerAction('current_customer_id_finder', id);
            this.props.navigation?.goBack();
        }
        else {
            this.props.customerAction('current_customer_id', id);
            if (this.props.admin.roles?.includes('customer_detail') || this.props.admin.is_admin == 1) {
                this.gotoPage('CustomerDetail');
            } else {
                Alert.alert('Bạn không phép thực hiện hành động này!');
            }
        }
    }

    setInputValue = (opt) => {
        this.setState({ inputValue: opt });
    }

    setDataSearch = (opt) => {
        this.setState({ dataSearch: opt });
    }

    handleInputChange = (text) => {
        this.setInputValue(text);
        // console.log('input search', text);
        // console.log('data mau', this.state.data);

        // console.log('xxx', this.state.data);

        // const filteredSuggestions = this.state.data.filter((data) =>
        //     data.fullname.toLowerCase().includes(text.toLowerCase()),
        // );
        var phone = '';

        const filteredSuggestions = this.state.data.filter((data) => {
            if (this.props.admin.is_show_phone_cus == 1) {
                phone = data?.phone[0]?.toLowerCase().includes(text.toLowerCase());
            } else {
                phone = '';
            }
            return (
                data?.fullname?.toLowerCase().includes(text.toLowerCase()) ||
                phone
            );
        });
        // console.log('data search', filteredSuggestions);

        this.setDataSearch(filteredSuggestions)

        // console.log('data search', filteredSuggestions);
        // if (text !== '') {
        //     this.setData(filteredSuggestions)
        //     console.log('data state', this.state.data);
        // }
        // else {
        //     this.getList()
        // }
    };

    handleRating = (value) => {
        // Xử lý lưu điểm đánh giá vào database hoặc nơi lưu trữ khác
        this.setRate(value);
    };

    getManager = () => {
        console.log(this.props.admin.active_uid);
    }

    getTitleManager() {
        const title = this.props.admin?.listUsers?.find((customer) => customer.id == this.props.admin.active_uid);
        return title?.fullname;
    }

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }

    render() {
        const { text, modalVisible, isActive, inputValue, dataSearch, loadingMore, tong_no, rate, filter, id_quanly, isShow, spinner } = this.state;
        const data = this.state.data;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>

                            <Modal animationType="slide"
                                transparent={true}
                                visible={isShow}
                                onRequestClose={() => {
                                    this.setIsShow(false);
                                }}>
                                <View style={styles.modalThanhtoan}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.txtThanhtoan}>Tìm kiếm</Text>
                                        <View style={styles.groupElement}>
                                            <Text style={styles.txtElement}>Đánh giá</Text>
                                            {/* <View style={styles.flexRowAround}>
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
                                                </Svg>
                                                <Svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M18.0494 21.0746C17.914 21.0751 17.7806 21.0423 17.6609 20.9792L11.7657 17.879L5.86929 20.9792C5.73187 21.0511 5.5771 21.0831 5.42243 21.0718C5.26776 21.0604 5.11935 21.006 4.99392 20.9148C4.86849 20.8236 4.77104 20.6992 4.71256 20.5555C4.65408 20.4119 4.63689 20.2548 4.66293 20.1019L5.78938 13.5363L1.01724 8.88623C0.905948 8.77784 0.827214 8.64047 0.78994 8.48967C0.752666 8.33886 0.75834 8.18062 0.806321 8.03287C0.854301 7.88512 0.942673 7.75374 1.06144 7.65361C1.1802 7.55347 1.32462 7.48857 1.47836 7.46624L8.07113 6.50848L11.0193 0.534421C11.0881 0.395178 11.1944 0.277944 11.3263 0.195971C11.4582 0.113998 11.6104 0.0705566 11.7657 0.0705566C11.921 0.0705566 12.0731 0.113998 12.205 0.195971C12.3369 0.277944 12.4433 0.395178 12.512 0.534421L15.4602 6.50848L22.0524 7.46624C22.2062 7.48848 22.3507 7.55332 22.4695 7.65342C22.5884 7.75353 22.6768 7.88489 22.7248 8.03266C22.7729 8.18043 22.7786 8.33869 22.7414 8.48954C22.7041 8.64039 22.6254 8.77781 22.5141 8.88623L17.7419 13.5363L18.8684 20.1019C18.8888 20.2213 18.8829 20.3438 18.8511 20.4607C18.8194 20.5776 18.7624 20.6862 18.6843 20.7788C18.6062 20.8714 18.5088 20.9459 18.399 20.997C18.2891 21.0481 18.1694 21.0746 18.0482 21.0746H18.0494ZM3.38666 8.87125L7.26264 12.6496C7.35903 12.7435 7.43119 12.8594 7.47294 12.9874C7.51469 13.1154 7.52478 13.2515 7.50236 13.3843L6.58733 18.7191L11.3772 16.202C11.497 16.1389 11.6303 16.1058 11.7657 16.1058C11.901 16.1058 12.0344 16.1389 12.1541 16.202L16.9451 18.7207L16.029 13.3843C16.0062 13.2513 16.0161 13.1149 16.0577 12.9866C16.0994 12.8583 16.1716 12.7421 16.2681 12.6479L20.1447 8.87125L14.7882 8.09439C14.6547 8.07498 14.528 8.02342 14.4188 7.94416C14.3097 7.8649 14.2215 7.7603 14.1617 7.63937L11.7657 2.78565L9.37016 7.63937C9.31036 7.76037 9.22204 7.86501 9.1128 7.94428C9.00357 8.02355 8.87669 8.07506 8.74312 8.09439L3.38666 8.87125Z" fill="#868686" />
                                                </Svg>
                                            </View> */}
                                            <View style={styles.flexStart}>
                                                <RatingInput
                                                    style={styles.flexStart}
                                                    rating={this.state.rate}
                                                    setRating={this.handleRating}
                                                    size={40}
                                                    maxStars={5}
                                                    bordered={false}
                                                />
                                            </View>
                                        </View>
                                        {/* <View style={styles.groupElement}>
                                            <Text style={styles.txtElement}>Đánh giá</Text>
                                            <View style={styles.flexRowAround}>
                                                <TouchableOpacity>
                                                    <Text style={styles.column6}>Đang nợ - 0 khách</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text style={styles.column6}>Đang nợ - 0 khách</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View> */}
                                        <View style={styles.groupElement}>
                                            <Text style={styles.txtElement}>Người quản lý</Text>
                                            <View style={styles.flexRowAround}>
                                                <TouchableOpacity onPress={() => {
                                                    this.gotoPage('ListEmployee', { manager: Math.random() });
                                                    this.setIsShow(false);
                                                }}>
                                                    <Text style={styles.column6}>{this.props.admin.active_uid ? this.getTitleManager() : 'Chọn người quản lý'}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this.props.accountAction('view_profile', 0);
                                                }}>
                                                    <Text style={styles.column6}>Chưa có quản lý</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={[styles.flexRowAround, styles.groupBtn2]}>
                                            <TouchableOpacity onPress={() => this.getListFilter(filter, rate, this.props.admin.active_uid)}>
                                                <Text style={styles.txtTimKiem}>Tìm kiếm</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                this.props.accountAction('view_profile', 0);
                                                this.handleRating(0);
                                            }}>
                                                <Text style={styles.txtDatLai}>Đặt lại</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setIsShow(false)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                        </View>

                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>Khách hàng</Text>
                            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                <View style={styles.btnchon}>
                                    <Text style={styles.thoigian}>{isActive}</Text>
                                    <Svg style={styles.icondown} width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M3.00279 2.7207L5.11863 0.181523C5.20376 0.0801732 5.32559 0.0166876 5.45743 0.00496953C5.58927 -0.0067485 5.72038 0.0342557 5.82205 0.119003C5.92372 0.20375 5.98766 0.325333 5.99988 0.457128C6.01209 0.588922 5.97158 0.720186 5.88722 0.822176L3.38709 3.82231C3.34009 3.87857 3.28132 3.92382 3.21491 3.95487C3.14851 3.98592 3.0761 4.00201 3.0028 4.00201C2.92949 4.00201 2.85708 3.98592 2.79068 3.95487C2.72427 3.92382 2.6655 3.87857 2.6185 3.82231L0.118379 0.822176C0.033612 0.720232 -0.00722375 0.588809 0.00484281 0.456777C0.0169094 0.324744 0.0808913 0.202901 0.182734 0.118012C0.284576 0.0331221 0.41595 -0.00787104 0.547996 0.00403747C0.680043 0.015946 0.801963 0.0797826 0.886974 0.181523L3.00279 2.7207Z" fill="white" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                this.setModalVisible(false);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Chọn loại sắp xếp</Text>
                                    <TouchableOpacity onPress={() => this.handleActive('Mặc định', 1)}>
                                        <Text style={[styles.txtFilter, this.state.isActive === 'Mặc định' && styles.activeCL]}>Mặc định</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleActive('Doanh thu giảm', 2)}>
                                        <Text style={[styles.txtFilter, this.state.isActive === 'Doanh thu giảm' && styles.activeCL]}>Doanh thu giảm</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleActive('Danh thu tăng dần', 3)}>
                                        <Text style={[styles.txtFilter, this.state.isActive === 'Danh thu tăng dần' && styles.activeCL]}>Danh thu tăng dần</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleActive('Nợ giảm dần', 4)}>
                                        <Text style={[styles.txtFilter, this.state.isActive === 'Nợ giảm dần' && styles.activeCL]}>Nợ giảm dần</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleActive('Nợ tăng dần', 5)}>
                                        <Text style={[styles.txtFilter, this.state.isActive === 'Nợ tăng dần' && styles.activeCL]}>Nợ tăng dần</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleActive('Ngày hẹn nợ giảm dần', 6)}>
                                        <Text style={[styles.txtFilter, this.state.isActive === 'Ngày hẹn nợ giảm dần' && styles.activeCL]}>Ngày hẹn nợ giảm dần</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleActive('Ngày hẹn nợ tăng dần', 7)}>
                                        <Text style={[styles.txtFilter, this.state.isActive === 'Ngày hẹn nợ tăng dần' && styles.activeCL]}>Ngày hẹn nợ tăng dần</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleActive('Tên A-Z', 8)}>
                                        <Text style={[styles.txtFilter, this.state.isActive === 'Tên A-Z' && styles.activeCL]}>Tên A-Z</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleActive('Tên Z-A', 9)}>
                                        <Text style={[styles.txtFilter, this.state.isActive === 'Tên Z-A' && styles.activeCL]}>Tên Z-A</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.centeredView1}>
                                <TouchableOpacity onPress={this.Cancel}>
                                    <Text style={styles.txtClose}>Hủy bỏ</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(false)}
                                style={styles.modalBackdrop}
                            />
                        </Modal>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => {
                                this.setIsShow(true);
                            }}>
                                <Svg style={styles.item1} width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M15 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H15C15.2652 0 15.5196 0.105357 15.7071 0.292893C15.8946 0.48043 16 0.734784 16 1C16 1.26522 15.8946 1.51957 15.7071 1.70711C15.5196 1.89464 15.2652 2 15 2Z" fill="#fff" />
                                    <Path d="M15 7H1C0.734784 7 0.48043 6.89464 0.292893 6.70711C0.105357 6.51957 0 6.26522 0 6C0 5.73478 0.105357 5.48043 0.292893 5.29289C0.48043 5.10536 0.734784 5 1 5H15C15.2652 5 15.5196 5.10536 15.7071 5.29289C15.8946 5.48043 16 5.73478 16 6C16 6.26522 15.8946 6.51957 15.7071 6.70711C15.5196 6.89464 15.2652 7 15 7Z" fill="#fff" />
                                    <Path d="M15 12H1C0.734784 12 0.48043 11.8946 0.292893 11.7071C0.105357 11.5196 0 11.2652 0 11C0 10.7348 0.105357 10.4804 0.292893 10.2929C0.48043 10.1054 0.734784 10 1 10H15C15.2652 10 15.5196 10.1054 15.7071 10.2929C15.8946 10.4804 16 10.7348 16 11C16 11.2652 15.8946 11.5196 15.7071 11.7071C15.5196 11.8946 15.2652 12 15 12Z" fill="#fff" />
                                </Svg>
                            </TouchableOpacity>



                            {/* <TouchableOpacity onPress={() => {
                                this.gotoPage('TelephoneDirectory');
                                this.props.accountAction('view_profile', 0);
                                this.handleRating(0);
                            }}>
                                <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.6585 9.612C13.0483 9.612 14.175 8.48534 14.175 7.09555C14.175 5.70575 13.0483 4.5791 11.6585 4.5791C10.2687 4.5791 9.14209 5.70575 9.14209 7.09555C9.14209 8.48534 10.2687 9.612 11.6585 9.612Z" stroke="white" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M7.26318 14.6895C7.49209 13.4098 8.01203 12.2755 8.74103 11.4655C9.47004 10.6555 10.3666 10.2158 11.2895 10.2158C12.2124 10.2158 13.109 10.6555 13.838 11.4655C14.567 12.2755 15.0869 13.4098 15.3158 14.6895" stroke="white" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M3.50525 5.02632V1H18V18.7158H3.50525V15.0921" stroke="white" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M1 13.3027H5.02632" stroke="white" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M1 10.0815H5.02632" stroke="white" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M1 7.26318H5.02632" stroke="white" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </TouchableOpacity> */}
                            {/* {
                                this.props.admin.groupId == 1 && */}
                            <TouchableOpacity onPress={() => {
                                if (this.props.admin.roles?.includes('customer_add') || this.props.admin.is_admin == 1) {
                                    this.gotoPage('AddCustomer');
                                    this.props.accountAction('view_profile', 0);
                                    this.setRate(0);
                                } else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <Svg style={styles.item} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M10 20C8.02219 20 6.08879 19.4135 4.4443 18.3147C2.79981 17.2159 1.51809 15.6541 0.761209 13.8268C0.00433284 11.9996 -0.1937 9.98891 0.192152 8.0491C0.578004 6.10929 1.53041 4.32746 2.92894 2.92894C4.32746 1.53041 6.10929 0.578004 8.0491 0.192152C9.98891 -0.1937 11.9996 0.00433284 13.8268 0.761209C15.6541 1.51809 17.2159 2.79981 18.3147 4.4443C19.4135 6.08879 20 8.02219 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20ZM10 1.53847C8.32647 1.53847 6.69052 2.03473 5.29902 2.96449C3.90753 3.89426 2.823 5.21577 2.18256 6.76191C1.54213 8.30806 1.37456 10.0094 1.70105 11.6508C2.02754 13.2921 2.83343 14.7998 4.01679 15.9832C5.20016 17.1666 6.70786 17.9725 8.34924 18.299C9.99062 18.6254 11.6919 18.4579 13.2381 17.8174C14.7842 17.177 16.1057 16.0925 17.0355 14.701C17.9653 13.3095 18.4615 11.6735 18.4615 10C18.4615 7.75586 17.5701 5.60364 15.9832 4.01679C14.3964 2.42995 12.2441 1.53847 10 1.53847Z" fill="white" />
                                    <Path d="M10 15.3846C9.79599 15.3846 9.60034 15.3036 9.45608 15.1593C9.31182 15.0151 9.23077 14.8194 9.23077 14.6154V5.38462C9.23077 5.1806 9.31182 4.98495 9.45608 4.84069C9.60034 4.69643 9.79599 4.61539 10 4.61539C10.204 4.61539 10.3997 4.69643 10.5439 4.84069C10.6882 4.98495 10.7692 5.1806 10.7692 5.38462V14.6154C10.7692 14.8194 10.6882 15.0151 10.5439 15.1593C10.3997 15.3036 10.204 15.3846 10 15.3846Z" fill="white" />
                                    <Path d="M14.6154 10.7692H5.38462C5.1806 10.7692 4.98495 10.6882 4.84069 10.5439C4.69643 10.3997 4.61539 10.204 4.61539 10C4.61539 9.79599 4.69643 9.60034 4.84069 9.45608C4.98495 9.31182 5.1806 9.23077 5.38462 9.23077H14.6154C14.8194 9.23077 15.0151 9.31182 15.1593 9.45608C15.3036 9.60034 15.3846 9.79599 15.3846 10C15.3846 10.204 15.3036 10.3997 15.1593 10.5439C15.0151 10.6882 14.8194 10.7692 14.6154 10.7692Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                            {/* } */}
                        </View>
                    </View >

                    <View style={{ backgroundColor: "#f5f5f5" }}>
                        <View style={styles.inputGroup}>
                            <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M14.6339 12.8664L11.4607 9.69323C12.1164 8.70509 12.5001 7.52195 12.5001 6.25007C12.5001 2.80378 9.69635 0 6.25007 0C2.80378 0 0 2.80378 0 6.25007C0 9.69635 2.80378 12.5001 6.25007 12.5001C7.52195 12.5001 8.70509 12.1164 9.69323 11.4607L12.8664 14.6339C13.3539 15.122 14.1464 15.122 14.6339 14.6339C15.122 14.1458 15.122 13.3545 14.6339 12.8664ZM1.87502 6.25007C1.87502 3.83754 3.83754 1.87502 6.25007 1.87502C8.66259 1.87502 10.6251 3.83754 10.6251 6.25007C10.6251 8.66259 8.66259 10.6251 6.25007 10.6251C3.83754 10.6251 1.87502 8.66259 1.87502 6.25007Z" fill="#757575" />
                            </Svg>
                            <TextInput
                                style={styles.inputsearch}
                                placeholder="Tìm kiếm"
                                value={this.state.inputValue}
                                onChangeText={(text) => this.handleInputChange(text)}
                            />
                        </View>
                    </View>

                    <View style={{ ...styles.containerFluid, backgroundColor: "#f5f5f5" }}>
                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}

                        {
                            inputValue === '' ?
                                (
                                    <FlatList
                                        data={data}
                                        // data={data}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={1}
                                        renderItem={({ item }) => {
                                            // console.log(item);
                                            // console.log('xx1', item);
                                            // console.log('xx2', dataSearch);
                                            // console.log('xx3', inputValue);
                                            let v = item;
                                            let index = v.id;
                                            // if (inputValue === '')
                                            if (!v.id)
                                                return;

                                            else
                                                return (

                                                    <TouchableOpacity key={index} onPress={() => this.gotoDetails(v?.id)}>
                                                        <View style={styles.boxNCC}>
                                                            <View style={styles.start}>
                                                                <View style={styles.imgCustomer}>
                                                                    {/* <Svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <Path d="M1.5 10L14 16.5V31.5L1.5 24.5V10Z" fill="#D9D9D9" />
                                                                                <Path d="M29 22.7746V10.3301C28.9994 9.78457 28.8554 9.24874 28.5824 8.7764C28.3094 8.30406 27.9169 7.91182 27.4444 7.63903L16.5556 1.41681C16.0826 1.14375 15.5461 1 15 1C14.4539 1 13.9174 1.14375 13.4444 1.41681L2.55556 7.63903C2.08308 7.91182 1.69064 8.30406 1.41761 8.7764C1.14458 9.24874 1.00056 9.78457 1 10.3301V22.7746C1.00056 23.3202 1.14458 23.856 1.41761 24.3283C1.69064 24.8007 2.08308 25.1929 2.55556 25.4657L13.4444 31.6879C13.9174 31.961 14.4539 32.1047 15 32.1047C15.5461 32.1047 16.0826 31.961 16.5556 31.6879L27.4444 25.4657C27.9169 25.1929 28.3094 24.8007 28.5824 24.3283C28.8554 23.856 28.9994 23.3202 29 22.7746Z" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                <Path d="M1.4201 8.7124L15.0001 16.568L28.5801 8.7124" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                <Path d="M15 32.2322V16.5522" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                            </Svg> */}
                                                                    <Image style={[styles.thumbnail, styles.avatarCustomer1]} source={v?.image === null || v?.image === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: v?.image }}></Image>
                                                                </View>

                                                                <RatingInput
                                                                    rating={v?.rate}
                                                                    size={12}
                                                                    maxStars={5}
                                                                    bordered={false}
                                                                    setRating={() => { return false }}
                                                                />
                                                            </View>
                                                            <View style={styles.thongtin}>
                                                                <Text style={styles.text1}>{v?.fullname}</Text>
                                                                {
                                                                    this.props.admin.is_show_phone_cus == 1 &&
                                                                    <Text style={styles.text2}>SĐT: {v?.phone[0]}</Text>
                                                                }
                                                                <Text style={styles.text2}>Đ/c: {v?.address}</Text>
                                                                {v?.kh_no < 0 && this.props.admin.is_show_debt == 1 ? <Text style={styles.textGreen}>Cửa hàng nợ: {v?.kh_no_str?.replace('-', '')} </Text> :
                                                                    v?.kh_no > 0 && this.props.admin.is_show_debt == 1 ? <Text style={styles.text3}>Khách nợ: {v?.kh_no_str?.replace('-', '')} </Text> :
                                                                        <></>
                                                                }
                                                            </View>
                                                            <View style={styles.iconPlus}>
                                                                <TouchableOpacity>
                                                                    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <Path d="M13 26C10.4288 26 7.91543 25.2376 5.77759 23.8091C3.63975 22.3807 1.97351 20.3503 0.989572 17.9749C0.0056327 15.5995 -0.251811 12.9856 0.249797 10.4638C0.751405 7.94208 1.98953 5.6257 3.80762 3.80762C5.6257 1.98953 7.94208 0.751405 10.4638 0.249797C12.9856 -0.251811 15.5995 0.0056327 17.9749 0.989572C20.3503 1.97351 22.3807 3.63975 23.8091 5.77759C25.2376 7.91543 26 10.4288 26 13C26 16.4478 24.6304 19.7544 22.1924 22.1924C19.7544 24.6304 16.4478 26 13 26ZM13 2.00001C10.8244 2.00001 8.69767 2.64514 6.88873 3.85384C5.07979 5.06254 3.66989 6.7805 2.83733 8.79049C2.00477 10.8005 1.78693 13.0122 2.21137 15.146C2.63581 17.2798 3.68345 19.2398 5.22183 20.7782C6.76021 22.3166 8.72022 23.3642 10.854 23.7886C12.9878 24.2131 15.1995 23.9952 17.2095 23.1627C19.2195 22.3301 20.9375 20.9202 22.1462 19.1113C23.3549 17.3023 24 15.1756 24 13C24 10.0826 22.8411 7.28473 20.7782 5.22183C18.7153 3.15893 15.9174 2.00001 13 2.00001Z" fill="black" />
                                                                        <Path d="M13 20C12.7348 20 12.4804 19.8946 12.2929 19.7071C12.1054 19.5196 12 19.2652 12 19V7C12 6.73478 12.1054 6.48043 12.2929 6.29289C12.4804 6.10536 12.7348 6 13 6C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7V19C14 19.2652 13.8946 19.5196 13.7071 19.7071C13.5196 19.8946 13.2652 20 13 20Z" fill="black" />
                                                                        <Path d="M19 14H7C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12H19C19.2652 12 19.5196 12.1054 19.7071 12.2929C19.8946 12.4804 20 12.7348 20 13C20 13.2652 19.8946 13.5196 19.7071 13.7071C19.5196 13.8946 19.2652 14 19 14Z" fill="black" />
                                                                    </Svg>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>



                                                )
                                            // else
                                            //     return (

                                            //         <TouchableOpacity key={index} onPress={() => this.gotoDetails(v?.id)}>
                                            //             <View style={styles.boxNCC}>
                                            //                 <View style={styles.start}>
                                            //                     <View stDyle={styles.imgCustomer}>
                                            //                         {/* <Svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            //                             <Path d="M1.5 10L14 16.5V31.5L1.5 24.5V10Z" fill="#D9D9D9" />
                                            //                             <Path d="M29 22.7746V10.3301C28.9994 9.78457 28.8554 9.24874 28.5824 8.7764C28.3094 8.30406 27.9169 7.91182 27.4444 7.63903L16.5556 1.41681C16.0826 1.14375 15.5461 1 15 1C14.4539 1 13.9174 1.14375 13.4444 1.41681L2.55556 7.63903C2.08308 7.91182 1.69064 8.30406 1.41761 8.7764C1.14458 9.24874 1.00056 9.78457 1 10.3301V22.7746C1.00056 23.3202 1.14458 23.856 1.41761 24.3283C1.69064 24.8007 2.08308 25.1929 2.55556 25.4657L13.4444 31.6879C13.9174 31.961 14.4539 32.1047 15 32.1047C15.5461 32.1047 16.0826 31.961 16.5556 31.6879L27.4444 25.4657C27.9169 25.1929 28.3094 24.8007 28.5824 24.3283C28.8554 23.856 28.9994 23.3202 29 22.7746Z" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            //                             <Path d="M1.4201 8.7124L15.0001 16.568L28.5801 8.7124" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            //                             <Path d="M15 32.2322V16.5522" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            //                         </Svg> */}
                                            //                         <Image style={[styles.thumbnail, styles.avatarCustomer1]} source={v?.image === null || v?.image === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: v?.image }}></Image>
                                            //                     </View>

                                            //                     <RatingInput
                                            //                         rating={v?.rate}
                                            //                         size={12}
                                            //                         maxStars={5}
                                            //                         bordered={false}
                                            //                         setRating={() => { return false }}
                                            //                     />
                                            //                 </View>
                                            //                 <View style={styles.thongtin}>
                                            //                     <Text style={styles.text1}>{v?.fullname}</Text>
                                            //                     <Text style={styles.text2}>SĐT: {v?.phone}</Text>
                                            //                     <Text style={styles.text2}>Đ/c: {v?.address}</Text>
                                            //                     {v?.kh_no !== '0' ? <Text style={styles.text3}>Khách nợ: {v?.kh_no_str}</Text> : <></>}
                                            //                 </View>
                                            //                 <View style={styles.iconPlus}>
                                            //                     <TouchableOpacity>
                                            //                         <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            //                             <Path d="M13 26C10.4288 26 7.91543 25.2376 5.77759 23.8091C3.63975 22.3807 1.97351 20.3503 0.989572 17.9749C0.0056327 15.5995 -0.251811 12.9856 0.249797 10.4638C0.751405 7.94208 1.98953 5.6257 3.80762 3.80762C5.6257 1.98953 7.94208 0.751405 10.4638 0.249797C12.9856 -0.251811 15.5995 0.0056327 17.9749 0.989572C20.3503 1.97351 22.3807 3.63975 23.8091 5.77759C25.2376 7.91543 26 10.4288 26 13C26 16.4478 24.6304 19.7544 22.1924 22.1924C19.7544 24.6304 16.4478 26 13 26ZM13 2.00001C10.8244 2.00001 8.69767 2.64514 6.88873 3.85384C5.07979 5.06254 3.66989 6.7805 2.83733 8.79049C2.00477 10.8005 1.78693 13.0122 2.21137 15.146C2.63581 17.2798 3.68345 19.2398 5.22183 20.7782C6.76021 22.3166 8.72022 23.3642 10.854 23.7886C12.9878 24.2131 15.1995 23.9952 17.2095 23.1627C19.2195 22.3301 20.9375 20.9202 22.1462 19.1113C23.3549 17.3023 24 15.1756 24 13C24 10.0826 22.8411 7.28473 20.7782 5.22183C18.7153 3.15893 15.9174 2.00001 13 2.00001Z" fill="black" />
                                            //                             <Path d="M13 20C12.7348 20 12.4804 19.8946 12.2929 19.7071C12.1054 19.5196 12 19.2652 12 19V7C12 6.73478 12.1054 6.48043 12.2929 6.29289C12.4804 6.10536 12.7348 6 13 6C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7V19C14 19.2652 13.8946 19.5196 13.7071 19.7071C13.5196 19.8946 13.2652 20 13 20Z" fill="black" />
                                            //                             <Path d="M19 14H7C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12H19C19.2652 12 19.5196 12.1054 19.7071 12.2929C19.8946 12.4804 20 12.7348 20 13C20 13.2652 19.8946 13.5196 19.7071 13.7071C19.5196 13.8946 19.2652 14 19 14Z" fill="black" />
                                            //                         </Svg>
                                            //                     </TouchableOpacity>
                                            //                 </View>
                                            //             </View>
                                            //         </TouchableOpacity>
                                            //     )
                                        }}
                                        onEndReached={() => this.handleOnEndReached()}
                                        onEndReachedThreshold={0}
                                        onScrollBeginDrag={() => {
                                            // stopFetchMore = false;
                                            // ()=>this.updateStopFetchMore();
                                            this.setState({ stopFetchMore: false })
                                        }}
                                        ListFooterComponent={() => loadingMore && <ListFooterComponent />}
                                    />
                                ) : (
                                    <FlatList
                                        data={dataSearch}
                                        // data={data}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={1}
                                        renderItem={({ item }) => {
                                            // console.log('xx1', data);
                                            // console.log('xx2', dataSearch);
                                            // console.log('xx3', inputValue);
                                            let v = item;
                                            let index = v.id;
                                            // if (inputValue === '')
                                            // return (

                                            //     <TouchableOpacity key={index} onPress={() => this.gotoDetails(v?.id)}>
                                            //         <View style={styles.boxNCC}>
                                            //             <View style={styles.start}>
                                            //                 <View style={styles.imgCustomer}>
                                            //                     {/* <Svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            //                                     <Path d="M1.5 10L14 16.5V31.5L1.5 24.5V10Z" fill="#D9D9D9" />
                                            //                                     <Path d="M29 22.7746V10.3301C28.9994 9.78457 28.8554 9.24874 28.5824 8.7764C28.3094 8.30406 27.9169 7.91182 27.4444 7.63903L16.5556 1.41681C16.0826 1.14375 15.5461 1 15 1C14.4539 1 13.9174 1.14375 13.4444 1.41681L2.55556 7.63903C2.08308 7.91182 1.69064 8.30406 1.41761 8.7764C1.14458 9.24874 1.00056 9.78457 1 10.3301V22.7746C1.00056 23.3202 1.14458 23.856 1.41761 24.3283C1.69064 24.8007 2.08308 25.1929 2.55556 25.4657L13.4444 31.6879C13.9174 31.961 14.4539 32.1047 15 32.1047C15.5461 32.1047 16.0826 31.961 16.5556 31.6879L27.4444 25.4657C27.9169 25.1929 28.3094 24.8007 28.5824 24.3283C28.8554 23.856 28.9994 23.3202 29 22.7746Z" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            //                                     <Path d="M1.4201 8.7124L15.0001 16.568L28.5801 8.7124" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            //                                     <Path d="M15 32.2322V16.5522" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            //                                 </Svg> */}
                                            //                     <Image style={[styles.thumbnail, styles.avatarCustomer1]} source={v?.image === null || v?.image === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: v?.image }}></Image>
                                            //                 </View>

                                            //                 <RatingInput
                                            //                     rating={v?.rate}
                                            //                     size={12}
                                            //                     maxStars={5}
                                            //                     bordered={false}
                                            //                     setRating={() => { return false }}
                                            //                 />
                                            //             </View>
                                            //             <View style={styles.thongtin}>
                                            //                 <Text style={styles.text1}>{v?.fullname}</Text>
                                            //                 <Text style={styles.text2}>SĐT: {v?.phone[0]}</Text>
                                            //                 <Text style={styles.text2}>Đ/c: {v?.address}</Text>
                                            //                 {v?.kh_no !== '0' ? <Text style={styles.text3}>Khách nợ: {v?.kh_no} đ</Text> : <></>}
                                            //             </View>
                                            //             <View style={styles.iconPlus}>
                                            //                 <TouchableOpacity>
                                            //                     <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            //                         <Path d="M13 26C10.4288 26 7.91543 25.2376 5.77759 23.8091C3.63975 22.3807 1.97351 20.3503 0.989572 17.9749C0.0056327 15.5995 -0.251811 12.9856 0.249797 10.4638C0.751405 7.94208 1.98953 5.6257 3.80762 3.80762C5.6257 1.98953 7.94208 0.751405 10.4638 0.249797C12.9856 -0.251811 15.5995 0.0056327 17.9749 0.989572C20.3503 1.97351 22.3807 3.63975 23.8091 5.77759C25.2376 7.91543 26 10.4288 26 13C26 16.4478 24.6304 19.7544 22.1924 22.1924C19.7544 24.6304 16.4478 26 13 26ZM13 2.00001C10.8244 2.00001 8.69767 2.64514 6.88873 3.85384C5.07979 5.06254 3.66989 6.7805 2.83733 8.79049C2.00477 10.8005 1.78693 13.0122 2.21137 15.146C2.63581 17.2798 3.68345 19.2398 5.22183 20.7782C6.76021 22.3166 8.72022 23.3642 10.854 23.7886C12.9878 24.2131 15.1995 23.9952 17.2095 23.1627C19.2195 22.3301 20.9375 20.9202 22.1462 19.1113C23.3549 17.3023 24 15.1756 24 13C24 10.0826 22.8411 7.28473 20.7782 5.22183C18.7153 3.15893 15.9174 2.00001 13 2.00001Z" fill="black" />
                                            //                         <Path d="M13 20C12.7348 20 12.4804 19.8946 12.2929 19.7071C12.1054 19.5196 12 19.2652 12 19V7C12 6.73478 12.1054 6.48043 12.2929 6.29289C12.4804 6.10536 12.7348 6 13 6C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7V19C14 19.2652 13.8946 19.5196 13.7071 19.7071C13.5196 19.8946 13.2652 20 13 20Z" fill="black" />
                                            //                         <Path d="M19 14H7C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12H19C19.2652 12 19.5196 12.1054 19.7071 12.2929C19.8946 12.4804 20 12.7348 20 13C20 13.2652 19.8946 13.5196 19.7071 13.7071C19.5196 13.8946 19.2652 14 19 14Z" fill="black" />
                                            //                     </Svg>
                                            //                 </TouchableOpacity>
                                            //             </View>
                                            //         </View>
                                            //     </TouchableOpacity>



                                            // )
                                            // else
                                            if (!v.id)
                                                return;

                                            else
                                                return (

                                                    <TouchableOpacity key={index} onPress={() => this.gotoDetails(v?.id)}>
                                                        <View style={styles.boxNCC}>
                                                            <View style={styles.start}>
                                                                <View stDyle={styles.imgCustomer}>
                                                                    {/* <Svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <Path d="M1.5 10L14 16.5V31.5L1.5 24.5V10Z" fill="#D9D9D9" />
                                                                        <Path d="M29 22.7746V10.3301C28.9994 9.78457 28.8554 9.24874 28.5824 8.7764C28.3094 8.30406 27.9169 7.91182 27.4444 7.63903L16.5556 1.41681C16.0826 1.14375 15.5461 1 15 1C14.4539 1 13.9174 1.14375 13.4444 1.41681L2.55556 7.63903C2.08308 7.91182 1.69064 8.30406 1.41761 8.7764C1.14458 9.24874 1.00056 9.78457 1 10.3301V22.7746C1.00056 23.3202 1.14458 23.856 1.41761 24.3283C1.69064 24.8007 2.08308 25.1929 2.55556 25.4657L13.4444 31.6879C13.9174 31.961 14.4539 32.1047 15 32.1047C15.5461 32.1047 16.0826 31.961 16.5556 31.6879L27.4444 25.4657C27.9169 25.1929 28.3094 24.8007 28.5824 24.3283C28.8554 23.856 28.9994 23.3202 29 22.7746Z" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <Path d="M1.4201 8.7124L15.0001 16.568L28.5801 8.7124" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                        <Path d="M15 32.2322V16.5522" stroke="#D9D9D9" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </Svg> */}
                                                                    <Image style={[styles.thumbnail, styles.avatarCustomer1]} source={v?.image === null || v?.image === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: v?.image }}></Image>
                                                                </View>

                                                                <RatingInput
                                                                    rating={v?.rate}
                                                                    size={12}
                                                                    maxStars={5}
                                                                    bordered={false}
                                                                    setRating={() => { return false }}
                                                                />
                                                            </View>
                                                            <View style={styles.thongtin}>
                                                                <Text style={styles.text1}>{v?.fullname}</Text>
                                                                {
                                                                    this.props.admin.is_show_phone_cus == 1 &&
                                                                    <Text style={styles.text2}>SĐT: {v?.phone}</Text>
                                                                }
                                                                <Text style={styles.text2}>Đ/c: {v?.address}</Text>
                                                                {v?.kh_no > 0 && this.props.admin.is_show_debt == 1 ? <Text style={styles.text3}>Khách nợ: {v?.kh_no_str} </Text> :
                                                                    v?.kh_no < 0 && this.props.admin.is_show_debt == 1 ? <Text style={styles.textGreen}>Cửa hàng nợ: {v?.kh_no_str?.replace(/-/g, "")} </Text> :
                                                                        <></>
                                                                }
                                                            </View>
                                                            <View style={styles.iconPlus}>
                                                                <TouchableOpacity>
                                                                    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <Path d="M13 26C10.4288 26 7.91543 25.2376 5.77759 23.8091C3.63975 22.3807 1.97351 20.3503 0.989572 17.9749C0.0056327 15.5995 -0.251811 12.9856 0.249797 10.4638C0.751405 7.94208 1.98953 5.6257 3.80762 3.80762C5.6257 1.98953 7.94208 0.751405 10.4638 0.249797C12.9856 -0.251811 15.5995 0.0056327 17.9749 0.989572C20.3503 1.97351 22.3807 3.63975 23.8091 5.77759C25.2376 7.91543 26 10.4288 26 13C26 16.4478 24.6304 19.7544 22.1924 22.1924C19.7544 24.6304 16.4478 26 13 26ZM13 2.00001C10.8244 2.00001 8.69767 2.64514 6.88873 3.85384C5.07979 5.06254 3.66989 6.7805 2.83733 8.79049C2.00477 10.8005 1.78693 13.0122 2.21137 15.146C2.63581 17.2798 3.68345 19.2398 5.22183 20.7782C6.76021 22.3166 8.72022 23.3642 10.854 23.7886C12.9878 24.2131 15.1995 23.9952 17.2095 23.1627C19.2195 22.3301 20.9375 20.9202 22.1462 19.1113C23.3549 17.3023 24 15.1756 24 13C24 10.0826 22.8411 7.28473 20.7782 5.22183C18.7153 3.15893 15.9174 2.00001 13 2.00001Z" fill="black" />
                                                                        <Path d="M13 20C12.7348 20 12.4804 19.8946 12.2929 19.7071C12.1054 19.5196 12 19.2652 12 19V7C12 6.73478 12.1054 6.48043 12.2929 6.29289C12.4804 6.10536 12.7348 6 13 6C13.2652 6 13.5196 6.10536 13.7071 6.29289C13.8946 6.48043 14 6.73478 14 7V19C14 19.2652 13.8946 19.5196 13.7071 19.7071C13.5196 19.8946 13.2652 20 13 20Z" fill="black" />
                                                                        <Path d="M19 14H7C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12H19C19.2652 12 19.5196 12.1054 19.7071 12.2929C19.8946 12.4804 20 12.7348 20 13C20 13.2652 19.8946 13.5196 19.7071 13.7071C19.5196 13.8946 19.2652 14 19 14Z" fill="black" />
                                                                    </Svg>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                        }}
                                        onEndReached={() => this.handleOnEndReached()}
                                        onEndReachedThreshold={0}
                                        onScrollBeginDrag={() => {
                                            this.updateStopFetchMore();
                                        }}
                                        ListFooterComponent={() => loadingMore && <ListFooterComponent />}
                                    />
                                )
                        }


                        {/* <Text style={styles.text4}>Không còn dữ liệu...</Text> */}
                    </View>

                    <View style={styles.tienno}>
                        <Text style={styles.tongno}>Tổng nợ: {tong_no ? tong_no : "0 đ"}</Text>
                    </View>

                    <Footer />
                </View >

                <SpinnerComponent
                    spinner={spinner}
                />
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    customer: state.customer,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    customerAction: (act, data) => dispatch(customerAction(act, data)),
    accountAction: (act, data) => dispatch(accountAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customer)
