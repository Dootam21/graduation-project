/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import productAction from '../../actions/productAction';
import supplierAction from '../../actions/supplierAction';
import customerAction from '../../actions/customerAction';
import accountAction from '../../actions/accountAction';
import cartAction from '../../actions/cartAction';
import categoryAction from '../../actions/categoryAction';
import colorAction from '../../actions/colorAction';
import hangAction from '../../actions/hangAction';
import kiemkhoAction from '../../actions/kiemkhoAction';
import sizeAction from '../../actions/sizeAction';
import thuchiAction from '../../actions/thichiAction';
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
    Modal,
    Alert,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import { get_count } from '../../services/notifyService';
import styles from './styles.js';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            cover: '',
            avatar: '',
            count_hanghoa: 0,
            count_khachhang: 0,
            count_toahang: 0,
            count_trangthai: 0,
            modalConfirm: false,
        }
    }

    gotoPage = (name) => {
        this.props.navigation.navigate(name)
    }

    setModalConfirm(opt) {
        this.setState({ modalConfirm: opt })
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'focus',
            () => {
                this.getData();
            }
        );

        this.getData();
        this.getThongkeNotify();
    }

    async getThongkeNotify() {
        var d = this.state;
        d.uid = this.props.admin.uid;
        d.role = this.props.admin.group_title;

        const data = await get_count(d);
        if (data.hanghoa) this.setState({ count_hanghoa: data.hanghoa });
        if (data.khachhang) this.setState({ count_khachhang: data.khachhang });
        if (data.toahang) this.setState({ count_toahang: data.toahang });
        if (data.trangthai) this.setState({ count_trangthai: data.trangthai });
    }

    getData() {
        var d = {
            id: this.props.admin.uid,
            cover: this.props.admin.banner,
            avatar: this.props.admin.avatar,
            fullname: this.props.admin.fullname,
            group_title: this.props.admin.group_title,
        }

        this.setState({ data: d });
    }

    handleLogout() {
        this.props.accountAction('reset_account');
        this.props.cartAction('reset_cart');
        this.props.categoryAction('reset_category');
        this.props.colorAction('reset_color');
        this.props.customerAction('reset_customer');
        this.props.hangAction('reset_hang');
        this.props.kiemkhoAction('reset_kiemkho');
        this.props.productAction('reset_product');
        this.props.sizeAction('reset_size');
        this.props.supplierAction('reset_supplier');
        this.props.thuchiAction('reset_thuchi');
        this.gotoPage('Logout');
    }


    render() {
        const { data, count_hanghoa, count_khachhang, count_toahang, count_trangthai, modalConfirm } = this.state;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.btnInfor} onPress={() => this.gotoPage('Setting')}>
                                <Image style={styles.avatar} source={data?.avatar == null || data?.avatar?.trim() === "" ? require('../../../asset/images/userImage.png') : { uri: data?.avatar }}></Image>

                                <View style={styles.info}>
                                    <Text style={styles.name}>{data.fullname}</Text>
                                    <Text>{this.props.admin.is_admin == 1 ? 'Administrator' : data.group_title}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnInfor} onPress={() => this.setModalConfirm(true)}>
                                <Svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M16.6154 11.0767H24" stroke="#B90F21" strokeWidth="2" stroke-miterlimit="10" stroke-linejoin="round" />
                                    <Path d="M20.3077 7.38428L24 11.0766L20.3077 14.7689" stroke="#BC0E1E" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M9.23077 10.1538H16.6154V1.84615C16.6154 0.828 15.7874 0 14.7692 0H1.84615C0.828 0 0 0.828 0 1.84615V20.3077C0 21.3258 0.828 22.1538 1.84615 22.1538H14.7692C15.7874 22.1538 16.6154 21.3258 16.6154 20.3077V12H9.23077C8.72123 12 8.30769 11.5865 8.30769 11.0769C8.30769 10.5674 8.72123 10.1538 9.23077 10.1538Z" fill="#B71021" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.hdText}>
                                <Text style={styles.hotline}>Hotline: {data.phone}</Text>
                            </TouchableOpacity>
                            <Text style={styles.hdText}>Ver 1.0.0</Text>
                        </View>
                    </View >

                    <ScrollView>
                        <View style={styles.box}>
                            <Text style={styles.headerBox}>NHBox</Text>
                            <View style={styles.bodyBox}>
                                {/* {
                                    this.props.admin.groupId == 1 ? ( */}
                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.productAction('current_product_id', 0);
                                        this.props.supplierAction('current_supplier_id', 0);
                                        this.gotoPage('DSPhieuNhap');
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M16.5858 5.70711L12.2929 1.41421L13.7071 0L20.4142 6.70711L13.7071 13.4142L12.2929 12L16.5858 7.70711H11C4.25356 7.70711 2 10.0508 2 16.7071H0C0 8.96341 3.13106 5.70711 11 5.70711H16.5858Z" fill="white" />
                                        </Svg>
                                        <Text style={styles.textBox}>Danh sách phiếu nhập</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.gotoPage('BackToFactory');
                                        this.props.productAction('current_product_id', 0);
                                        this.props.supplierAction('current_supplier_id', 0);
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M16.5858 5.70711L12.2929 1.41421L13.7071 0L20.4142 6.70711L13.7071 13.4142L12.2929 12L16.5858 7.70711H11C4.25356 7.70711 2 10.0508 2 16.7071H0C0 8.96341 3.13106 5.70711 11 5.70711H16.5858Z" fill="white" />
                                        </Svg>
                                        <Text style={styles.textBox}>Trả xưởng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.gotoPage('ReturnForm');
                                        this.props.productAction('current_product_id', 0);
                                        this.props.customerAction('current_customer_id', 0);
                                        this.props.customerAction('current_customer_id_finder', 0);
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M16.5858 5.70711L12.2929 1.41421L13.7071 0L20.4142 6.70711L13.7071 13.4142L12.2929 12L16.5858 7.70711H11C4.25356 7.70711 2 10.0508 2 16.7071H0C0 8.96341 3.13106 5.70711 11 5.70711H16.5858Z" fill="white" />
                                        </Svg>
                                        <Text style={styles.textBox}>Khách trả hàng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.gotoPage('Supplier');
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Danh sách nhà cung cấp</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.gotoPage('Customer');
                                        this.props.accountAction('view_profile', 0);
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Danh sách khách hàng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gotoPage('DSPhieuThu')} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Danh sách phiếu thu</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gotoPage('DSPhieuChi')} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Danh sách phiếu chi</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.productAction('current_product_id', 0);
                                        this.gotoPage('DSPhieuKiemKho')
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Lịch sử kiểm kho</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        if (this.props.admin.roles?.includes('thongke_ban') || this.props.admin.is_admin == 1) {
                                            this.props.customerAction('current_customer_id', 0);
                                            this.gotoPage('SaleStatistics');
                                            this.props.cartAction('get_data_filter', {
                                                day_from: '',
                                                day_to: '',
                                                filter: 1,
                                                isActive: 'Hôm nay',
                                            })
                                        } else {
                                            Alert.alert('Bạn không phép thực hiện hành động này!');
                                        }
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Thống kê bán</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        if (this.props.admin.roles?.includes('thongke_chung') || this.props.admin.is_admin == 1) {
                                            this.gotoPage('StatisticsOverview');
                                        } else {
                                            Alert.alert('Bạn không phép thực hiện hành động này!');
                                        }
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Thống kê chung</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => this.gotoPage('LienKetCuaHang')} style={[styles.col4, styles.col]}>
                                    <Svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M19.3725 2.03439C18.3759 1.05121 17.1704 0.564444 15.7563 0.574088L12.6451 0.595304C12.0794 0.599162 11.658 1.02631 11.6619 1.59198C11.6657 2.15765 12.0929 2.57901 12.6586 2.57516L15.7698 2.55394C17.4668 2.54237 18.8906 3.9469 18.9022 5.64392C18.908 6.49243 18.5597 7.27264 17.9979 7.84217C17.4361 8.4117 16.6607 8.77055 15.8122 8.77633L12.701 8.79755C12.1353 8.80141 11.714 9.22856 11.7178 9.79423C11.7198 10.0771 11.8631 10.3589 12.0055 10.4994C12.1479 10.6398 12.4317 10.7793 12.7145 10.7774L15.8257 10.7562C17.2399 10.7465 18.4386 10.2434 19.4217 9.24671C20.4049 8.25003 20.8917 7.0446 20.882 5.63042C20.8724 4.21624 20.3692 3.01756 19.3725 2.03439Z" fill="#fff" />
                                        <Path d="M8.62863 2.67335C9.19431 2.66949 9.61567 2.24235 9.61181 1.67667C9.60795 1.111 9.1808 0.68964 8.61513 0.693498L5.57416 0.643524C4.15998 0.653168 2.9613 1.15633 1.97813 2.15301C0.994951 3.14968 0.508185 4.35511 0.517829 5.76929C0.527473 7.18347 1.03063 8.38215 2.02731 9.36533C3.02399 10.3485 4.22942 10.8353 5.6436 10.8256L8.75479 10.8044C9.32047 10.8005 9.74183 10.3734 9.73797 9.80773C9.73411 9.24206 9.30697 8.8207 8.74129 8.82455L5.6301 8.84577C3.93308 8.85734 2.50926 7.45281 2.49768 5.75579C2.4919 4.90728 2.84014 4.12707 3.40195 3.55754C3.96377 2.98801 4.73915 2.62916 5.58766 2.62338L8.62863 2.67335Z" fill="#fff" />
                                        <Path d="M6.59881 5.72782C6.60074 6.01066 6.74408 6.29253 6.88646 6.43298C7.02885 6.57344 7.31265 6.71293 7.59548 6.711L13.6765 6.66953C14.2421 6.66567 14.6635 6.23852 14.6596 5.67285C14.6558 5.10718 14.2286 4.68582 13.663 4.68968L7.58198 4.73115C7.08654 4.66381 6.59495 5.16215 6.59881 5.72782Z" fill="#fff" />
                                    </Svg>
                                    <Text style={styles.textBox}>Liên kết cửa hàng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.gotoPage('ToaHangLienKet')} style={[styles.col4, styles.col]}>
                                    <Svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M19.3725 2.03439C18.3759 1.05121 17.1704 0.564444 15.7563 0.574088L12.6451 0.595304C12.0794 0.599162 11.658 1.02631 11.6619 1.59198C11.6657 2.15765 12.0929 2.57901 12.6586 2.57516L15.7698 2.55394C17.4668 2.54237 18.8906 3.9469 18.9022 5.64392C18.908 6.49243 18.5597 7.27264 17.9979 7.84217C17.4361 8.4117 16.6607 8.77055 15.8122 8.77633L12.701 8.79755C12.1353 8.80141 11.714 9.22856 11.7178 9.79423C11.7198 10.0771 11.8631 10.3589 12.0055 10.4994C12.1479 10.6398 12.4317 10.7793 12.7145 10.7774L15.8257 10.7562C17.2399 10.7465 18.4386 10.2434 19.4217 9.24671C20.4049 8.25003 20.8917 7.0446 20.882 5.63042C20.8724 4.21624 20.3692 3.01756 19.3725 2.03439Z" fill="#fff" />
                                        <Path d="M8.62863 2.67335C9.19431 2.66949 9.61567 2.24235 9.61181 1.67667C9.60795 1.111 9.1808 0.68964 8.61513 0.693498L5.57416 0.643524C4.15998 0.653168 2.9613 1.15633 1.97813 2.15301C0.994951 3.14968 0.508185 4.35511 0.517829 5.76929C0.527473 7.18347 1.03063 8.38215 2.02731 9.36533C3.02399 10.3485 4.22942 10.8353 5.6436 10.8256L8.75479 10.8044C9.32047 10.8005 9.74183 10.3734 9.73797 9.80773C9.73411 9.24206 9.30697 8.8207 8.74129 8.82455L5.6301 8.84577C3.93308 8.85734 2.50926 7.45281 2.49768 5.75579C2.4919 4.90728 2.84014 4.12707 3.40195 3.55754C3.96377 2.98801 4.73915 2.62916 5.58766 2.62338L8.62863 2.67335Z" fill="#fff" />
                                        <Path d="M6.59881 5.72782C6.60074 6.01066 6.74408 6.29253 6.88646 6.43298C7.02885 6.57344 7.31265 6.71293 7.59548 6.711L13.6765 6.66953C14.2421 6.66567 14.6635 6.23852 14.6596 5.67285C14.6558 5.10718 14.2286 4.68582 13.663 4.68968L7.58198 4.73115C7.08654 4.66381 6.59495 5.16215 6.59881 5.72782Z" fill="#fff" />
                                    </Svg>
                                    <Text style={styles.textBox}>Toa gọi hành liên kết</Text>
                                </TouchableOpacity> */}
                                    {/* <TouchableOpacity onPress={() => navigation.navigate("ToaHangLienKet")} style={[styles.col12, styles.col]}>
                                    <Svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M19.3725 2.03439C18.3759 1.05121 17.1704 0.564444 15.7563 0.574088L12.6451 0.595304C12.0794 0.599162 11.658 1.02631 11.6619 1.59198C11.6657 2.15765 12.0929 2.57901 12.6586 2.57516L15.7698 2.55394C17.4668 2.54237 18.8906 3.9469 18.9022 5.64392C18.908 6.49243 18.5597 7.27264 17.9979 7.84217C17.4361 8.4117 16.6607 8.77055 15.8122 8.77633L12.701 8.79755C12.1353 8.80141 11.714 9.22856 11.7178 9.79423C11.7198 10.0771 11.8631 10.3589 12.0055 10.4994C12.1479 10.6398 12.4317 10.7793 12.7145 10.7774L15.8257 10.7562C17.2399 10.7465 18.4386 10.2434 19.4217 9.24671C20.4049 8.25003 20.8917 7.0446 20.882 5.63042C20.8724 4.21624 20.3692 3.01756 19.3725 2.03439Z" fill="#fff" />
                                        <Path d="M8.62863 2.67335C9.19431 2.66949 9.61567 2.24235 9.61181 1.67667C9.60795 1.111 9.1808 0.68964 8.61513 0.693498L5.57416 0.643524C4.15998 0.653168 2.9613 1.15633 1.97813 2.15301C0.994951 3.14968 0.508185 4.35511 0.517829 5.76929C0.527473 7.18347 1.03063 8.38215 2.02731 9.36533C3.02399 10.3485 4.22942 10.8353 5.6436 10.8256L8.75479 10.8044C9.32047 10.8005 9.74183 10.3734 9.73797 9.80773C9.73411 9.24206 9.30697 8.8207 8.74129 8.82455L5.6301 8.84577C3.93308 8.85734 2.50926 7.45281 2.49768 5.75579C2.4919 4.90728 2.84014 4.12707 3.40195 3.55754C3.96377 2.98801 4.73915 2.62916 5.58766 2.62338L8.62863 2.67335Z" fill="#fff" />
                                        <Path d="M6.59881 5.72782C6.60074 6.01066 6.74408 6.29253 6.88646 6.43298C7.02885 6.57344 7.31265 6.71293 7.59548 6.711L13.6765 6.66953C14.2421 6.66567 14.6635 6.23852 14.6596 5.67285C14.6558 5.10718 14.2286 4.68582 13.663 4.68968L7.58198 4.73115C7.08654 4.66381 6.59495 5.16215 6.59881 5.72782Z" fill="#fff" />
                                    </Svg>
                                    <Text style={styles.textBox}>Toa gọi hành liên kết</Text>
                                </TouchableOpacity> */}
                                </View>
                                {/* ) : this.props.admin.groupId == 3 ? (
                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => {
                                        this.gotoPage('ReturnForm');
                                        this.props.productAction('current_product_id', 0);
                                        this.props.customerAction('current_customer_id', 0);
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M16.5858 5.70711L12.2929 1.41421L13.7071 0L20.4142 6.70711L13.7071 13.4142L12.2929 12L16.5858 7.70711H11C4.25356 7.70711 2 10.0508 2 16.7071H0C0 8.96341 3.13106 5.70711 11 5.70711H16.5858Z" fill="white" />
                                        </Svg>
                                        <Text style={styles.textBox}>Khách trả hàng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gotoPage('Supplier')} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Danh sách nhà cung cấp</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.gotoPage('Customer');
                                        this.props.accountAction('view_profile', 0);
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Danh sách khách hàng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.gotoPage('SaleStatistics');
                                        this.props.customerAction('current_customer_id', 0);
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Thống kê bán</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gotoPage('StatisticsOverview')} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Thống kê chung</Text>
                                    </TouchableOpacity>
                                </View> */}
                                {/* ) : this.props.admin.groupId == 2 ? (
                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.productAction('current_product_id', 0);
                                        this.props.supplierAction('current_supplier_id', 0);
                                        this.gotoPage('DSPhieuNhap');
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M16.5858 5.70711L12.2929 1.41421L13.7071 0L20.4142 6.70711L13.7071 13.4142L12.2929 12L16.5858 7.70711H11C4.25356 7.70711 2 10.0508 2 16.7071H0C0 8.96341 3.13106 5.70711 11 5.70711H16.5858Z" fill="white" />
                                        </Svg>
                                        <Text style={styles.textBox}>Danh sách phiếu nhập</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gotoPage('Supplier')} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Danh sách nhà cung cấp</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.gotoPage('Customer');
                                        this.props.accountAction('view_profile', 0);
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Danh sách khách hàng</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.gotoPage('SaleStatistics');
                                        this.props.customerAction('current_customer_id', 0);
                                    }} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Thống kê bán</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.gotoPage('StatisticsOverview')} style={[styles.col4, styles.col]}>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M18.8437 7.875C18.7064 9.78141 17.2922 11.25 15.75 11.25C14.2078 11.25 12.7912 9.78188 12.6562 7.875C12.5156 5.89172 13.8923 4.5 15.75 4.5C17.6076 4.5 18.9844 5.92781 18.8437 7.875Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.75 14.25C12.6952 14.25 9.7575 15.7673 9.02156 18.7223C8.92406 19.1133 9.16922 19.5 9.57093 19.5H21.9295C22.3312 19.5 22.575 19.1133 22.4789 18.7223C21.743 15.72 18.8053 14.25 15.75 14.25Z" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" />
                                            <Path d="M9.37499 8.71594C9.2653 10.2384 8.12249 11.4375 6.89061 11.4375C5.65874 11.4375 4.51405 10.2389 4.40624 8.71594C4.29421 7.13203 5.40655 6 6.89061 6C8.37468 6 9.48702 7.16109 9.37499 8.71594Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M9.65625 14.3438C8.81016 13.9562 7.87828 13.8071 6.89063 13.8071C4.45313 13.8071 2.10469 15.0188 1.51641 17.379C1.43906 17.6912 1.635 18.0001 1.95563 18.0001H7.21875" stroke="#fff" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" />
                                        </Svg>
                                        <Text style={styles.textBox}>Thống kê chung</Text>
                                    </TouchableOpacity>
                                </View> */}
                                {/* ) : (
                                        <></>
                                    )
                                } */}
                            </View>
                        </View>
                        {/* <View style={styles.box}>
                        <Text style={styles.headerBox}>NHMarket</Text>
                        <View style={styles.bodyBox}>
                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => this.gotoPage('BrowseCustomers')} style={[styles.col4, styles.col]}>
                                    <Svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.66645 9.09432L11.0462 7.69324L11.5459 8.19988L19.6192 0L21 1.40006L11.5459 11L9.66645 9.09432ZM5.54591 8.19988L13.6192 0L15 1.40006L5.54591 11L0.973663 6.35001L2.35446 4.94996L5.54591 8.19988Z" fill="white" />
                                    </Svg>
                                    <Text style={styles.textBox}>Duyệt khách</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.gotoPage("CustomerDepartment")} style={[styles.col4, styles.col]}>
                                    <Svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.66645 9.09432L11.0462 7.69324L11.5459 8.19988L19.6192 0L21 1.40006L11.5459 11L9.66645 9.09432ZM5.54591 8.19988L13.6192 0L15 1.40006L5.54591 11L0.973663 6.35001L2.35446 4.94996L5.54591 8.19988Z" fill="white" />
                                    </Svg>
                                    <Text style={styles.textBox}>Chia khách</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{}} style={[styles.col4, styles.col]}>
                                    <Svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M15 11.2712H11.875V14.2373H15V11.2712Z" fill="white" />
                                        <Path d="M11.875 8.89831H9.375V11.2712H11.875V8.89831Z" fill="white" />
                                        <Path d="M17.5 14.2373H15V16.6102H17.5V14.2373Z" fill="white" />
                                        <Path d="M17.5 8.89831H15.625V10.678H17.5V8.89831Z" fill="white" />
                                        <Path d="M11.25 14.8305H9.375V16.6102H11.25V14.8305Z" fill="white" />
                                        <Path d="M15 2.37288H11.875V5.33898H15V2.37288Z" fill="white" />
                                        <Path d="M17.5 7.71186H9.375V0H17.5V7.71186ZM11.0938 6.08051H15.7812V1.63136H11.0938V6.08051Z" fill="white" />
                                        <Path d="M5.625 2.37288H2.5V5.33898H5.625V2.37288Z" fill="white" />
                                        <Path d="M8.125 7.71186H0V0H8.125V7.71186ZM1.71875 6.08051H6.40625V1.63136H1.71875V6.08051Z" fill="white" />
                                        <Path d="M5.625 11.2712H2.5V14.2373H5.625V11.2712Z" fill="white" />
                                        <Path d="M8.125 16.6102H0V8.89831H8.125V16.6102ZM1.71875 14.9788H6.40625V10.5297H1.71875V14.9788Z" fill="white" />
                                    </Svg>

                                    <Text style={styles.textBox}>Quét QR</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.gotoPage("ListNews")} style={[styles.col12, styles.col]}>
                                <Svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M2.77439 0H23.4003C23.7316 0 24 0.268657 24 0.599711V16.4551C24 16.7861 23.7316 17.0548 23.4003 17.0548H0.599711C0.268368 17.0548 0 16.7861 0 16.4551V2.77468C0 2.44333 0.268368 2.17496 0.599711 2.17496H2.17496V0.599711C2.17496 0.268657 2.44333 0 2.77439 0ZM5.93154 10.2142C5.1429 10.2142 5.1429 9.01473 5.93154 9.01473H20.2434C21.0321 9.01473 21.0321 10.2142 20.2434 10.2142H5.93154ZM5.93154 12.81C5.1429 12.81 5.1429 11.6106 5.93154 11.6106H20.2434C21.0321 11.6106 21.0321 12.81 20.2434 12.81H5.93154ZM15.0867 4.19856C14.298 4.19856 14.298 2.99913 15.0867 2.99913H20.8397C21.6283 2.99913 21.6283 4.19856 20.8397 4.19856H15.0867ZM15.0867 6.75917C14.298 6.75917 14.298 5.55975 15.0867 5.55975H20.8397C21.6283 5.55975 21.6283 6.75917 20.8397 6.75917H15.0867ZM5.33529 2.31507H11.7195C12.0506 2.31507 12.3192 2.58373 12.3192 2.91478V6.84352C12.3192 7.17458 12.0506 7.44324 11.7195 7.44324H5.33529C5.00424 7.44324 4.73558 7.17458 4.73558 6.84352V2.91478C4.73558 2.58373 5.00424 2.31507 5.33529 2.31507ZM11.1198 3.51449H5.935V6.24381H11.1198V3.51449ZM2.17496 15.8554V3.37439H1.19913V15.8554H2.17496ZM22.8009 1.19942H3.3741V15.8554H22.8009V1.19942Z" fill="white" />
                                </Svg>
                                <Text style={styles.textBox}>Bảng tin</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}

                    </ScrollView>
                    <View style={styles.notifi}>
                        <TouchableOpacity style={styles.boxNotifi} onPress={() => this.gotoPage('Notification')}>
                            <View>
                                <Svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M13 5C13 2.239 10.761 0 8 0C5.239 0 3 2.239 3 5V10L0 12V13H16V12L13 10V5Z" fill="#2DCC6F" />
                                    <Path d="M10 14H6C6 15.105 6.895 16 8 16C9.105 16 10 15.105 10 14Z" fill="#2DCC70" />
                                </Svg>
                                <Text style={styles.quantityNotifi}>{count_hanghoa}</Text>
                            </View>
                            <Text style={styles.textNotifi}>Hàng hóa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boxNotifi} onPress={() => this.gotoPage('Notification')}>
                            <View>
                                <Svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M13 5C13 2.239 10.761 0 8 0C5.239 0 3 2.239 3 5V10L0 12V13H16V12L13 10V5Z" fill="#2DCC6F" />
                                    <Path d="M10 14H6C6 15.105 6.895 16 8 16C9.105 16 10 15.105 10 14Z" fill="#2DCC70" />
                                </Svg>
                                <Text style={styles.quantityNotifi}>{count_trangthai}</Text>
                            </View>
                            <Text style={styles.textNotifi}>Tình trạng hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boxNotifi} onPress={() => this.gotoPage('Notification')}>
                            <View>
                                <Svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M13 5C13 2.239 10.761 0 8 0C5.239 0 3 2.239 3 5V10L0 12V13H16V12L13 10V5Z" fill="#2DCC6F" />
                                    <Path d="M10 14H6C6 15.105 6.895 16 8 16C9.105 16 10 15.105 10 14Z" fill="#2DCC70" />
                                </Svg>
                                <Text style={styles.quantityNotifi}>{count_toahang}</Text>
                            </View>
                            <Text style={styles.textNotifi}>Toa hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boxNotifi} onPress={() => this.gotoPage('Notification')}>
                            <View>
                                <Svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M13 5C13 2.239 10.761 0 8 0C5.239 0 3 2.239 3 5V10L0 12V13H16V12L13 10V5Z" fill="#2DCC6F" />
                                    <Path d="M10 14H6C6 15.105 6.895 16 8 16C9.105 16 10 15.105 10 14Z" fill="#2DCC70" />
                                </Svg>
                                <Text style={styles.quantityNotifi}>{count_khachhang}</Text>
                            </View>
                            <Text style={styles.textNotifi}>Khách hàng</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal visible={modalConfirm} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalTitle, styles.textCenter]}>Bạn có chắc muốn đăng xuất ?</Text>
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalConfirm(false)}>
                                        <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleLogout()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalConfirm(false)}
                            style={styles.modalBackdrop}
                        />
                    </Modal>
                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
};
const mapStateToProps = state => ({
    product: state.product,
    supplier: state.supplier,
    customer: state.customer,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
    accountAction: (act, data) => dispatch(accountAction(act, data)),
    cartAction: (act, data) => dispatch(cartAction(act, data)),
    categoryAction: (act, data) => dispatch(categoryAction(act, data)),
    colorAction: (act, data) => dispatch(colorAction(act, data)),
    hangAction: (act, data) => dispatch(hangAction(act, data)),
    kiemkhoAction: (act, data) => dispatch(kiemkhoAction(act, data)),
    sizeAction: (act, data) => dispatch(sizeAction(act, data)),
    thuchiAction: (act, data) => dispatch(thuchiAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

