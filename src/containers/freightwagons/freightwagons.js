/**
 *   React Native App
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
import Swipeout from 'react-native-swipeout';
import ModalFW from '../elements/ModalFW';
import cartAction from '../../actions/cartAction';
import customerAction from '../../actions/customerAction';
import { get_total, delete_cart_cook, get_wagons, create_copy_cart, get_wagons_history } from '../../services/cartService';
import { get_user_list } from '../../services/accountService';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import OrderDetail from '../cart/order-details';
import DatePickerComponent from '../elements/DatePickerComponent';
import { delete_return } from '../../services/productService';
import SpinnerComponent from '../elements/Spinner';

// var stopFetchMore = true;
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



class FreightWagons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loadingMore: false,
            stopFetchMore: true,
            selectedButton: false,
            selectedDate: '',
            modalFilterFW: false,
            total: '',
            dataSearch: [],
            textSearch: '',
            modalDelete: false,
            modalCopy: false,
            status: -1,
            dayFrom: "",
            dayTo: "",
            dataEmPloyee: [],
            user_id: '',
            pick: 0,
            bill_id: '',
            status_delete: '',
            nhat_lai: '',
            spinner: false,
            from: 0,
        }

    }

    componentDidMount() {
        // this.getCustomer();
        // if (this.props?.route?.params?.footer) {
        //     this.props?.customerAction('current_customer_id', "");
        //     this.getData();
        //     this.getTotalPrice();
        //     this.getDataEmPloyee();
        // }
        // else {
        //     this.getData();
        //     this.getTotalPrice();
        //     this.getDataEmPloyee();
        // }
        // var customer_id = this.props.customer.id;
        // console.log('customerid', customer_id);

        // if (this.props.route?.params?.footer) {
        //     this.props?.customerAction('current_customer_id', 0);
        //     customer_id = 0;
        // }

        // this.props?.customerAction('current_customer_id', 0);
        this.setState({ from: 0 })
        // this.getData(this.props.customer.id);
        this.getTotalPrice();
        this.getDataEmPloyee();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.setState({ from: 0 })
                this.getData(this.props.customer.idFinder);
            }
        );
    }

    setSelectedButton(opt) {
        this.setState({ selectedButton: opt })
    }
    setSelectedDate(opt) {
        this.setState({ selectedDate: opt })
    }
    setModalFilterFW(opt) {
        this.setState({ modalFilterFW: opt })
    }

    setModalDelete(opt) {
        this.setState({ modalDelete: opt })
    }
    setModalCopy(opt) {
        this.setState({ modalCopy: opt })
    }

    setStatus(opt) {
        this.setState({ status: opt })
    }

    setDayFrom(opt) {
        this.setState({ dayFrom: opt })
    }

    setDayTo(opt) {
        this.setState({ dayTo: opt })
    }

    setPick(opt) {
        this.setState({ pick: opt })
    }

    setSpinner(opt) {
        this.setState({ spinner: opt })
    }

    handleButtonPress = (buttonName) => {
        this.setSelectedButton(buttonName);
    };

    handleDateChange = (date) => {
        this.setSelectedDate(date);
    };


    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }

    async getData(customer_id) {
        this.setSpinner(true);
        var status = -1;
        if (this.props?.route?.params?.filter) {
            status = 3;
            this.setStatus(3);
        }
        if (this.props?.route?.params?.getHistory) {
            const dataLog = await get_wagons_history({
                u_id: this.props.admin.uid,
                customer_id: customer_id,
                id: this.props.product.id,
                from: 0,
            });
            this.setState({ data: dataLog?.data });
            // console.log(dataLog);

        }
        else {
            if (this.props.admin.roles?.includes('order_list') || this.props.admin.is_admin == 1) {
                const dataLog = await get_wagons({
                    u_id: this.props.admin.uid,
                    customer_id: customer_id,
                    from: 0,
                    filter: this.props?.route?.params?.filter ? this.props?.route?.params?.filter : 0,
                    user_id: this.props?.route?.params?.user_id ? this.props?.route?.params?.user_id : 0,
                    status: status
                });
                this.setState({ data: dataLog?.data });
                // console.log(this.props?.route?.params);
            }
            else {
                Alert.alert('Bạn không phép thực hiện hành động này!');
            }

        }
        this.setState({ from: this.state.from + 10 })
        this.setSpinner(false);
    }


    async handleOnEndReached() {
        this.setState({ loadingMore: true });//(true);
        var dataFrom = '';
        var dataTo = '';
        if (this.state.dayFrom !== "") {
            dataFrom = new Date(this.state.dayFrom).toISOString().split('T')[0];
        }
        if (this.state.dayTo !== "") {
            dataTo = new Date(this.state.dayTo).toISOString().split('T')[0];
        }

        var nhat_lai = 0;
        var nhat_tai_cua_hang = 0;

        if (this.state.pick == 1) {
            nhat_tai_cua_hang = 1;
            nhat_lai = 0;
        } else if (this.state.pick == 2) {
            nhat_lai = 1;
            nhat_tai_cua_hang = 0;
        }
        if (!this.state.stopFetchMore) {

            var newData = [];
            if (this.props?.route?.params?.getHistory) {
                newData = await get_wagons_history({
                    u_id: this.props.admin.uid,
                    customer_id: this.props?.customer?.idFinder,
                    id: this.props.product.id,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    user_id: this.state.user_id,
                    nhat_lai: nhat_lai,
                    nhat_tai_cua_hang: nhat_tai_cua_hang,
                    from: this.state.from,
                });
            }
            else {
                newData = await get_wagons({
                    u_id: this.props.admin.uid,
                    customer_id: this.props?.customer?.idFinder,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    user_id: this.state.user_id,
                    nhat_lai: nhat_lai,
                    nhat_tai_cua_hang: nhat_tai_cua_hang,
                    filter: this.props?.route?.params?.filter ? this.props?.route?.params?.filter : 0,
                    from: this.state.from,
                });
            }

            this.setState({ from: this.state.from + 10 })

            if (newData === false) {
                stopLoadData = true;
                this.setState({ loadingMore: false });
                return false;
            }
            else {
                if (newData.data.length > 0) {
                    this.setState({ data: [...this.state.data, ...newData.data] });
                }
            }
            this.setState({ stopFetchMore: true });// = true;
        }
        else {
            return
        }

        this.setState({ loadingMore: false });
    }

    getTitleCustomer(id) {
        const title = this.props.customer?.listCustomers?.find((customer) => customer.id == id);
        return title;
    }

    gotoDetail(bill_id, customer_id, thu_id, status, data) {
        this.props.cartAction('current_cart_bill_id', bill_id);
        this.props.customerAction('current_customer_id', customer_id);
        this.props.cartAction('current_cart_thu_id', thu_id);
        this.props.cartAction('current_cart_status', status);
        this.props.cartAction('current_cart_order_detail', data);
        // console.log(thu_id);
        this.gotoPage('OrderDetail');
    }

    async getTotalPrice() {
        const data = await get_total({
            u_id: this.props.admin.uid,
        });
        // console.log(data);
        this.setState({ total: data?.data });
    }

    gotoCreateQuick() {
        if (this.props.admin.roles?.includes('order_create_quick') || this.props.admin.is_admin == 1) {
            this.props?.customerAction('current_customer_id', 0);
            this.gotoPage('QuickCreate');
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }
    setInputSearch = (opt) => {
        this.setState({ textSearch: opt })
    }
    setDataSearch = (opt) => {
        this.setState({ dataSearch: opt })
    }
    // setName = (opt) => {
    //     this.setState({ this.state.dataSearch, name: opt })
    // }
    handleInputChange = (text) => {
        this.setInputSearch(text);
        var phone = '';
        const filteredSuggestions = this.state.data.filter((data) => {
            const fullName = data?.customer_fullname || 'Khách mới';
            const code = data?.code || '';
            if (this.props.admin.is_show_phone_cus == 1) {
                phone = data?.customer_phone || '';
            } else {
                phone = '';
            }

            return (
                fullName.toLowerCase().includes(text.toLowerCase()) ||
                phone.toLowerCase().includes(text.toLowerCase()) ||
                code.toLowerCase().includes(text.toLowerCase())
            );
        });

        this.setDataSearch(filteredSuggestions);
    };

    handleOpenConfirmDelete(bill_id, status, nhat_lai) {
        // if (this.props.admin.groupId == 1) {
        this.setModalDelete(true);
        this.props.cartAction('current_cart_bill_id', bill_id);
        this.setState({ bill_id: bill_id });
        this.setState({ status_delete: status });
        this.setState({ nhat_lai: nhat_lai });
        // this.props.cartAction('current_cart_order_id', order_id);
        // }
        // else {
        //     return
        // }
    }

    handleOpenConfirmCopy(bill_id) {
        this.setModalCopy(true);
        this.props.cartAction('current_cart_bill_id', bill_id);
    }

    async handleDelete() {
        if (this.state.status_delete == 1 && this.state.nhat_lai == 1) {
            Alert.alert('Thông báo', 'Đơn hàng ở trạng thái chờ nhặt lại, không được phép xóa!');
        }
        else {
            if (this.state.status_delete == 3) {
                Alert.alert('Thông báo', 'Đơn hàng đã hoàn thành, không thể chỉnh sửa!');
            }
            else {
                if (this.state.status_delete == 2) {
                    const data = await delete_return({
                        u_id: this.props.admin.uid,
                        ghi_chu: 'Tự động tạo từ toa bán đã bị xóa',
                        bill_id: this.state.bill_id,
                        order_id: 0,
                    })
                }
                const dataLog = await delete_cart_cook({
                    bill_id: this.props?.cart?.bill_id,
                    u_id: this.props.admin.uid,
                });
                from = 0;
                this.getData(this.props.customer.id);
            }
        }
        this.setModalDelete(false);
    }

    async handleCopy() {
        const dataLog = await create_copy_cart({
            bill_id: this.props?.cart?.bill_id,
            u_id: this.props.admin.uid,
        })
        from = 0;
        this.getData(this.props.customer.id);
        this.props.cartAction('current_cart_status', 5);
        this.setModalCopy(false);
        // this.gotoPage('OrderDetail');
    }

    gotoCustomerList() {
        // if (this.props.admin.groupId == 1 || this.props.admin.groupId == 3) {
        this.props.navigation.navigate('Customer', { findCustomer: true })
        // }
        // else {
        //     return
        // }
    }

    async handleDeleteCustomer() {
        this.props.customerAction('current_customer_id_finder', 0);
        if (this.props?.route?.params?.getHistory) {
            const dataLog = await get_wagons_history({
                u_id: this.props.admin.uid,
                customer_id: 0,
                id: this.props.product.id,
            });
            this.setState({ data: dataLog?.data });
        }
        else {
            const dataLog = await get_wagons({
                u_id: this.props.admin.uid,
                customer_id: 0,
            });
            this.setState({ data: dataLog?.data });
        }
    }

    async handleFilter() {
        if (this.props.admin.roles?.includes('order_list') || this.props.admin.is_admin == 1) {
            from = 0;
            var nhat_lai = 0;
            var nhat_tai_cua_hang = 0;
            var dataFrom = '';
            var dataTo = '';
            if (this.state.dayFrom !== "") {
                dataFrom = new Date(this.state.dayFrom).toISOString().split('T')[0];
            }
            if (this.state.dayTo !== "") {
                dataTo = new Date(this.state.dayTo).toISOString().split('T')[0];
            }

            if (this.state.pick == 1) {
                nhat_tai_cua_hang = 1;
                nhat_lai = 0;
            } else if (this.state.pick == 2) {
                nhat_lai = 1;
                nhat_tai_cua_hang = 0;
            }

            if (this.props?.route?.params?.getHistory) {
                const dataLog = await get_wagons_history({
                    u_id: this.props.admin.uid,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    user_id: this.state.user_id,
                    from: from,
                    nhat_lai: nhat_lai,
                    nhat_tai_cua_hang: nhat_tai_cua_hang,
                });
                this.setState({ data: dataLog?.data });
                // console.log(dataLog);
            }
            else {
                const dataLog = await get_wagons({
                    u_id: this.props.admin.uid,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    user_id: this.state.user_id,
                    from: from,
                    nhat_lai: nhat_lai,
                    nhat_tai_cua_hang: nhat_tai_cua_hang,
                });
                this.setState({ data: dataLog?.data });
                // console.log(dataLog);
            }
            this.setModalFilterFW(false);
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
        // console.log('day from', this.state.dayFrom.toISOString().split('T')[0]);
        // console.log('day to', this.state.dayTo.toISOString().split('T')[0]);
    }

    async getDataEmPloyee() {
        const data = await get_user_list('Tất cả', this.props.admin.uid);
        this.setState({ dataEmPloyee: data });
    }

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }

    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { total, modalDelete, modalCopy, modalFilterFW, status, dataEmPloyee, user_id, loadingMore, dayFrom, dayTo, pick, textSearch, spinner } = this.state;
        const dataSearch = this.state.dataSearch;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            {/* {
                                this.props?.route?.params?.customer &&
                                (
                                    <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.goBack()}>
                                        <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                        </Svg>
                                    </TouchableOpacity>
                                )
                            } */}
                            {
                                !this.props?.route?.params?.footer &&
                                (
                                    <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.goBack()}>
                                        <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                        </Svg>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        <Text style={styles.title}>Toa hàng</Text>

                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.items} onPress={() => {
                                if (this.props.admin.roles?.includes('order_consolidation') || this.props.admin.is_admin == 1) {
                                    this.gotoPage("OrderConsolidation");
                                }
                                else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.125 20C19.1605 20 20 19.1605 20 18.125V6.875C20 5.83945 19.1605 5 18.125 5H6.875C5.83945 5 5 5.83945 5 6.875V18.125C5 19.1605 5.83945 20 6.875 20H18.125ZM6.875 3.75C5.15188 3.75 3.75 5.15187 3.75 6.875V15H1.875C0.839453 15 0 14.1605 0 13.125L0 1.875C0 0.839453 0.839453 0 1.875 0H13.125C14.1605 0 15 0.839453 15 1.875V3.75H6.875Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.items} onPress={() => this.gotoCreateQuick()}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8 1V15" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M1 8H15" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.items} onPress={() => this.setModalFilterFW(true)}>
                                <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M6.6052 7.1122L0.937779 1.86935C0.602965 1.55962 0.82212 1 1.27823 1H16.766C17.2221 1 17.4413 1.55962 17.1065 1.86935L11.4391 7.1122C11.3365 7.20709 11.2781 7.34049 11.2781 7.48022V18.4977C11.2781 18.9843 10.6546 19.1857 10.3701 18.7908L6.8607 13.9211C6.79919 13.8358 6.76609 13.7332 6.76609 13.628V7.48022C6.76609 7.34049 6.70777 7.20709 6.6052 7.1122Z" strokeWidth="2" stroke="#fff" />
                                </Svg>
                            </TouchableOpacity>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalFilterFW}
                                onRequestClose={() => {
                                    setModalFilterFW(false);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <ScrollView>
                                            <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo trạng thái</Text>
                                                    <TouchableOpacity onPress={() => this.setStatus(-1)}>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    <TouchableOpacity onPress={() => this.setStatus(3)}>
                                                        <Text style={[styles.btn, status === 3 ? styles.btnRed : styles.btnGrey]}>Hoàn thành</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setStatus(0)}>
                                                        <Text style={[styles.btn, , status === 0 ? styles.btnRed : styles.btnGrey]}>Chờ xác nhận</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setStatus(5)}>
                                                        <Text style={[styles.btn, , status === 5 ? styles.btnRed : styles.btnGrey]}>Toa nháp</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setStatus(1)}>
                                                        <Text style={[styles.btn, , status === 1 ? styles.btnRed : styles.btnGrey]}>Chờ nhặt hàng</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setStatus(2)}>
                                                        <Text style={[styles.btn, , status === 2 ? styles.btnRed : styles.btnGrey]}>Đă nhặt</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo trạng thái mở rộng</Text>
                                                    <TouchableOpacity onPress={() => this.setPick(0)}>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    <TouchableOpacity onPress={() => this.setPick(1)}>
                                                        <Text style={[styles.btn, , pick === 1 ? styles.btnRed : styles.btnGrey]}>Nhặt tại cửa hàng</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setPick(2)}>
                                                        <Text style={[styles.btn, , pick === 2 ? styles.btnRed : styles.btnGrey]}>Nhặt lại</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            {/* <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo thanh toán</Text>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Chưa thanh toán</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Đã thanh toán</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View> */}
                                            <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo người tạo</Text>
                                                    <TouchableOpacity onPress={() => this.setState({ user_id: "" })}>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    {
                                                        dataEmPloyee?.map((employee, index) => (
                                                            <TouchableOpacity key={index} onPress={() => this.setState({ user_id: employee?.id })}>
                                                                <Text style={[styles.btn, user_id === employee?.id ? styles.btnRed : styles.btnGrey]}>{employee?.fullname}</Text>
                                                            </TouchableOpacity>
                                                        ))
                                                    }
                                                </View>
                                            </View>
                                            <View>
                                                <View style={[styles.flexRowBW, styles.mb20]}>
                                                    <Text style={styles.txtTitle}>Lọc theo thời gian</Text>
                                                    <TouchableOpacity onPress={() => {
                                                        this.setDayFrom("");
                                                        this.setDayTo("");
                                                    }}>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowDate1}>
                                                    <Text style={[styles.txtTitle, styles.txtDate]}>Từ ngày</Text>
                                                    <DatePickerComponent setDateTime={(text) => this.setDayFrom(text)} dateTime={dayFrom}></DatePickerComponent>
                                                </View>
                                                <View style={styles.flexRowDate1}>
                                                    <Text style={[styles.txtTitle, styles.txtDate]}>Đến ngày</Text>
                                                    <DatePickerComponent setDateTime={(text) => this.setDayTo(text)} dateTime={dayTo}></DatePickerComponent>
                                                </View>
                                            </View>
                                            <View>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({
                                                            dayFrom: "",
                                                            dayTo: "",
                                                            user_id: '',
                                                            status: -1,
                                                            pick: "",
                                                        })
                                                    }}
                                                >
                                                    <Text style={[styles.btnRest, styles.resetAll]}>Reset tất cả</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.handleFilter()}>
                                                    <Text style={[styles.btnRest, styles.resetAll]}>Lọc</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalFilterFW(false)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>

                        </View>
                    </View >

                    {/* <View style={styles.navtab}>
                        <TouchableOpacity onPress={() => this.handleButtonPress('tab1')}>
                            <Text style={[styles.tab, this.state.selectedButton === 'tab1' && styles.tabActive]}>Tất cả</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleButtonPress('tab2')}>
                            <Text style={[styles.tab, this.state.selectedButton === 'tab2' && styles.tabActive]}>Toa Box</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleButtonPress('tab3')}>
                            <Text style={[styles.tab, this.state.selectedButton === 'tab3' && styles.tabActive]}>Toa Market</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.inputGroup}>
                        <View>
                            <TextInput style={[styles.item, styles.search]}
                                placeholder="Tìm kiếm..." placeholderTextColor="#C5C4C9" onChangeText={(text) => this.handleInputChange(text)}
                            />
                            <Svg style={styles.iconSearch} width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M20.043 18.3752L14.9047 13.2369C15.9367 11.8587 16.5553 10.1532 16.5553 8.29915C16.5553 3.73938 12.8589 0.0429688 8.29915 0.0429688C3.73938 0.0429688 0.0429688 3.73938 0.0429688 8.29915C0.0429688 12.8589 3.73938 16.5553 8.29915 16.5553C10.1532 16.5553 11.8587 15.9367 13.2369 14.9047L18.3752 20.043L20.043 18.3752ZM2.40188 8.29915C2.40188 5.04739 5.04739 2.40188 8.29915 2.40188C11.5509 2.40188 14.1964 5.04739 14.1964 8.29915C14.1964 11.5509 11.5509 14.1964 8.29915 14.1964C5.04739 14.1964 2.40188 11.5509 2.40188 8.29915Z" fill="#848484" />
                            </Svg>
                        </View>
                        <TouchableOpacity onPress={() => this.gotoCustomerList()}>
                            <View>
                                {
                                    this.props?.customer?.idFinder === 0 ?
                                        <Text style={[styles.item, styles.filter]}>Lọc theo KH</Text>
                                        :
                                        <View style={styles.displayNameCustomer}>
                                            <Text style={[styles.filter]}>{this.getTitleCustomer(this.props?.customer?.idFinder)?.fullname}</Text>
                                            {/* <Text>{this.getTitleCustomer(this.props?.customer?.id)?.phone[0]}</Text> */}
                                            <TouchableOpacity onPress={() => this.handleDeleteCustomer()}><Text>Xóa</Text></TouchableOpacity>
                                        </View>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerFluid}>
                        <View style={styles.cardGroup}>
                            <FlatList
                                data={textSearch === '' ? data : dataSearch}
                                keyExtractor={(item, index) => index}
                                numColumns={1}
                                renderItem={({ item }) => {
                                    let d = item;
                                    // console.log(item);
                                    if (!d.id)
                                        return;
                                    else
                                        if (textSearch === '')

                                            return (
                                                <Swipeout right={[
                                                    {
                                                        text: 'Sao chép',
                                                        onPress: () => {
                                                            if (this.props.admin.roles?.includes('order_copy') || this.props.admin.is_admin == 1) {
                                                                this.handleOpenConfirmCopy(d?.id);
                                                            }
                                                            else {
                                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                                            }
                                                        },
                                                        backgroundColor: 'grey',
                                                        color: 'white',
                                                    },
                                                    {
                                                        text: 'Xóa',
                                                        onPress: () => {
                                                            if (this.props.admin.roles?.includes('order_delete') || this.props.admin.is_admin == 1) {
                                                                this.handleOpenConfirmDelete(d?.id, d?.status, d?.nhat_lai);
                                                            }
                                                            else {
                                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                                            }
                                                        },
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                    },
                                                ]} >
                                                    <TouchableOpacity onPress={() => {
                                                        if (this.props.admin.roles?.includes('order_detail') || this.props.admin.is_admin == 1) {
                                                            this.gotoDetail(d?.id, d?.customer_id, d?.thu_id, d?.status, d);
                                                        }
                                                        else {
                                                            Alert.alert('Bạn không phép thực hiện hành động này!');
                                                        }
                                                    }}>
                                                        <View style={styles.cardItem}>
                                                            <View style={styles.cardLeft}>
                                                                <Text style={styles.customer}>{d?.customer_fullname ? d?.customer_fullname : 'Khách mới'}</Text>
                                                                {
                                                                    this.props.admin.is_show_phone_cus == 1 &&
                                                                    <Text style={styles.txt}>{d?.customer_phone}</Text>
                                                                }
                                                                <Text style={styles.txt}>{d?.totle_quan ? d?.totle_quan : 0} sản phẩm</Text>
                                                                <Text style={styles.txt}>{d?.code}</Text>
                                                                {
                                                                    d?.ghi_chu != null && d?.ghi_chu != '' &&
                                                                    <Text style={{ color: "#DE110E" }}>Note: {d?.ghi_chu}</Text>
                                                                }
                                                            </View>


                                                            <View style={styles.cardRight}>
                                                                <Text style={styles.price}>{d?.totle_price} đ</Text>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                                    {
                                                                        d?.nhat_lai == 1 && d?.status == 1 && (
                                                                            <View style={{ marginRight: 10 }}>
                                                                                {/* <Svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <Path d="M9.66473 1.76843L0.541165 17.5698C0.376361 17.8551 0.289581 18.1788 0.289551 18.5083C0.28952 18.8379 0.37624 19.1616 0.540991 19.447C0.705742 19.7323 0.942718 19.9693 1.2281 20.1341C1.51347 20.2988 1.8372 20.3856 2.16672 20.3855H20.4124C20.7419 20.3856 21.0656 20.2988 21.351 20.1341C21.6364 19.9693 21.8734 19.7323 22.0381 19.447C22.2029 19.1616 22.2896 18.8379 22.2896 18.5083C22.2895 18.1788 22.2027 17.8551 22.0379 17.5698L12.9153 1.76843C12.7506 1.48313 12.5137 1.24622 12.2284 1.08151C11.9431 0.916793 11.6195 0.830078 11.29 0.830078C10.9606 0.830078 10.637 0.916793 10.3517 1.08151C10.0664 1.24622 9.82946 1.48313 9.66473 1.76843Z" fill="#EE404C" />
                                                                                    <Path d="M11.4093 6.64062H11.1713C10.5853 6.64062 10.1104 7.11562 10.1104 7.70156V12.7726C10.1104 13.3586 10.5853 13.8336 11.1713 13.8336H11.4093C11.9952 13.8336 12.4702 13.3586 12.4702 12.7726V7.70156C12.4702 7.11562 11.9952 6.64062 11.4093 6.64062Z" fill="#FFF7ED" />
                                                                                    <Path d="M11.2903 17.8559C11.9419 17.8559 12.4702 17.3277 12.4702 16.676C12.4702 16.0244 11.9419 15.4961 11.2903 15.4961C10.6386 15.4961 10.1104 16.0244 10.1104 16.676C10.1104 17.3277 10.6386 17.8559 11.2903 17.8559Z" fill="#FFF7ED" />
                                                                                </Svg> */}
                                                                                <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <Path d="M21.6053 13.8292C23.1786 7.96157 19.6974 1.92944 13.8298 0.356071C7.96214 -1.2173 1.93001 2.2639 0.356644 8.13155C-1.21672 13.9992 2.26448 20.0313 8.13212 21.6047C13.9998 23.1781 20.0319 19.6969 21.6053 13.8292Z" fill="#EE404C" />
                                                                                    <Path d="M6.063 13.5097L6.06303 13.5097C6.05537 13.4927 6.04292 13.4784 6.02721 13.4684C6.01149 13.4584 5.9932 13.4532 5.97458 13.4535L5.96209 13.4537L5.96209 13.4535C5.94348 13.4533 5.92521 13.4586 5.90954 13.4686C5.89387 13.4787 5.88149 13.4931 5.87391 13.5101L5.87067 13.5174L5.87061 13.5173C5.86348 13.5327 5.85986 13.5494 5.86002 13.5664C5.86018 13.5833 5.86413 13.6 5.87156 13.6152L5.87499 13.6222L5.87494 13.6222C6.31735 14.5645 7.01895 15.3612 7.89766 15.9193C8.77636 16.4773 9.79582 16.7736 10.8367 16.7734H10.8368C13.8631 16.7734 16.3166 14.32 16.3166 11.2937C16.3166 8.26729 13.8631 5.81396 10.8368 5.81396H10.8362C10.0863 5.81305 9.34413 5.96656 8.65607 6.26494C7.968 6.56332 7.34874 7.00017 6.83685 7.54829L6.00873 8.43501L5.97166 7.22229L5.91408 5.3383C5.91408 5.33829 5.91408 5.33828 5.91408 5.33828C5.91361 5.32315 5.91017 5.30827 5.90396 5.29448C5.89774 5.28068 5.88886 5.26824 5.87784 5.25787C5.86681 5.2475 5.85385 5.2394 5.83969 5.23404C5.82554 5.22867 5.81046 5.22615 5.79533 5.22662C5.7802 5.22708 5.76531 5.23052 5.75151 5.23674C5.73771 5.24296 5.72527 5.25183 5.7149 5.26286C5.70453 5.27388 5.69643 5.28684 5.69107 5.301C5.68571 5.31516 5.68318 5.33023 5.68365 5.34536L5.68365 5.34537L5.78536 8.66813C5.78536 8.66817 5.78536 8.66821 5.78536 8.66826C5.78587 8.68391 5.7896 8.6993 5.79633 8.71345C5.80307 8.72764 5.81267 8.74028 5.82453 8.75058L5.83948 8.76357L5.85337 8.7777C5.86438 8.78891 5.87759 8.79772 5.89217 8.80358C5.9067 8.80942 5.92229 8.81221 5.93794 8.81176C5.93799 8.81176 5.93804 8.81176 5.93809 8.81176L9.26087 8.71004L9.26088 8.71004C9.27601 8.70958 9.2909 8.70614 9.3047 8.69992C9.3185 8.69371 9.33094 8.68483 9.34131 8.6738C9.35169 8.66278 9.35978 8.64982 9.36515 8.63566C9.37051 8.62151 9.37303 8.60643 9.37257 8.5913C9.3721 8.57617 9.36867 8.56128 9.36245 8.54748C9.35623 8.53368 9.34735 8.52124 9.33633 8.51087C9.3253 8.50049 9.31234 8.4924 9.29819 8.48704C9.28403 8.48167 9.26896 8.47915 9.25383 8.47961L9.25382 8.47961L7.377 8.53701L6.17586 8.57374L6.99644 7.69582C7.48822 7.16968 8.083 6.75036 8.7438 6.46397C9.4045 6.17762 10.1171 6.03027 10.8371 6.0311M6.063 13.5097L10.8369 16.5562C13.7433 16.5562 16.0994 14.2001 16.0994 11.2937C16.0994 8.38734 13.7434 6.03126 10.8371 6.0311M6.063 13.5097L6.06553 13.5151M6.063 13.5097L6.06553 13.5151M10.8371 6.0311C10.8372 6.0311 10.8373 6.0311 10.8374 6.0311L10.8368 6.5309V6.0311C10.8369 6.0311 10.837 6.0311 10.8371 6.0311ZM6.06553 13.5151C6.48863 14.4238 7.16246 15.1928 8.00773 15.7315C8.85298 16.2702 9.8345 16.5564 10.8368 16.5562L6.06553 13.5151Z" stroke="white" />
                                                                                </Svg>
                                                                            </View>
                                                                        )
                                                                    }
                                                                    {d?.status == 0 ?
                                                                        <View style={{ ...styles.status, ...styles.pending }}>
                                                                            <Text style={styles.textStatus}>Chờ xác nhận</Text>
                                                                        </View> :
                                                                        d?.status == 1 ?
                                                                            <View style={{ ...styles.status, backgroundColor: 'black' }}>
                                                                                <Text style={styles.textStatus}>Chờ nhặt hàng
                                                                                    {/* {
                                                                                    d?.c_type == 3 && (
                                                                                        <Text style={styles.textRed}>(Đặt cọc)</Text>
                                                                                    )
                                                                                } */}
                                                                                </Text>
                                                                            </View> :
                                                                            d?.status == 2 ?
                                                                                <View style={{ ...styles.status, backgroundColor: '#F1C40F' }}>
                                                                                    <Text style={styles.textStatus}>Đã nhặt
                                                                                        {/* {
                                                                                        d?.c_type == 3 && (
                                                                                            <Text style={styles.textRed}>(Đặt cọc)</Text>
                                                                                        )
                                                                                    } */}
                                                                                    </Text>
                                                                                    <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                                </View> :
                                                                                d?.status == 3 ?
                                                                                    <View style={{ ...styles.status, backgroundColor: 'green' }}>
                                                                                        <Text style={styles.textStatus}>Hoàn tất</Text>
                                                                                        <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                                    </View> :
                                                                                    d?.status == 5 ?
                                                                                        <View style={{ ...styles.status, backgroundColor: 'grey' }}>
                                                                                            <Text style={styles.textStatus}>Toa nháp</Text>
                                                                                            <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                                        </View> : <></>
                                                                    }
                                                                </View>

                                                                <Text style={styles.author}>Tạo bởi {d?.user_name} </Text>
                                                                <Text style={styles.author}>{d?.created} </Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </Swipeout>
                                            )
                                        else
                                            return (
                                                <Swipeout right={[
                                                    {
                                                        text: 'Sao chép',
                                                        onPress: () => {
                                                            if (this.props.admin.roles?.includes('order_copy') || this.props.admin.is_admin == 1) {
                                                                this.handleOpenConfirmCopy(d?.id);
                                                            }
                                                            else {
                                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                                            }
                                                        },
                                                        backgroundColor: 'grey',
                                                        color: 'white',
                                                    },
                                                    {
                                                        text: 'Xóa',
                                                        onPress: () => {
                                                            if (this.props.admin.roles?.includes('order_delete') || this.props.admin.is_admin == 1) {
                                                                this.handleOpenConfirmDelete(d?.id, d?.status, d?.nhat_lai);
                                                            }
                                                            else {
                                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                                            }
                                                        },
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                    },
                                                ]} >
                                                    <TouchableOpacity onPress={() => {
                                                        if (this.props.admin.roles?.includes('order_detail') || this.props.admin.is_admin == 1) {
                                                            this.gotoDetail(d?.id, d?.customer_id, d?.thu_id, d?.status, d)
                                                        }
                                                        else {
                                                            Alert.alert('Bạn không phép thực hiện hành động này!');
                                                        }
                                                    }}>
                                                        <View style={styles.cardItem}>
                                                            <View style={styles.cardLeft}>
                                                                <Text style={styles.customer}>{d?.customer_fullname != '' ? d?.customer_fullname : 'Khách mới'}</Text>
                                                                {
                                                                    this.props.admin.is_show_phone_cus == 1 &&
                                                                    <Text style={styles.txt}>{d?.customer_phone}</Text>
                                                                }
                                                                <Text style={styles.txt}>{d?.totle_quan} sản phẩm</Text>
                                                                <Text style={styles.txt}>{d?.code}</Text>
                                                                <Text style={{ color: "#DE110E" }}>Note: {d?.ghi_chu}</Text>
                                                            </View>
                                                            <View style={styles.cardRight}>
                                                                <Text style={styles.price}>{d?.totle_price} đ</Text>
                                                                {d?.status == 0 ?
                                                                    <View style={{ ...styles.status, ...styles.pending }}>
                                                                        <Text style={styles.textStatus}>Chờ xác nhận</Text>
                                                                    </View> :
                                                                    d?.status == 1 ?
                                                                        <View style={{ ...styles.status, backgroundColor: 'black' }}>
                                                                            <Text style={styles.textStatus}>Chờ nhặt hàng
                                                                                {/* {
                                                                                    d?.c_type == 3 && (
                                                                                        <Text style={styles.textRed}>(Đặt cọc)</Text>
                                                                                    )
                                                                                } */}
                                                                            </Text>
                                                                        </View> :
                                                                        d?.status == 2 ?
                                                                            <View style={{ ...styles.status, backgroundColor: '#F1C40F' }}>
                                                                                <Text style={styles.textStatus}>Đã nhặt
                                                                                    {/* {
                                                                                        d?.c_type == 3 && (
                                                                                            <Text style={styles.textRed}>(Đặt cọc)</Text>
                                                                                        )
                                                                                    } */}
                                                                                </Text>
                                                                                <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                            </View> :
                                                                            d?.status == 3 ?
                                                                                <View style={{ ...styles.status, backgroundColor: 'green' }}>
                                                                                    <Text style={styles.textStatus}>Hoàn tất</Text>
                                                                                    <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                                </View> :
                                                                                d?.status == 5 ?
                                                                                    <View style={{ ...styles.status, backgroundColor: 'grey' }}>
                                                                                        <Text style={styles.textStatus}>Toa nháp</Text>
                                                                                        <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                                    </View> : <></>
                                                                }

                                                                <Text style={styles.author}>Tạo bởi {d?.user_name} lúc {d?.created}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </Swipeout>
                                            )
                                }}
                                onEndReached={() => this.handleOnEndReached()}
                                onEndReachedThreshold={0}
                                onScrollBeginDrag={() => {
                                    this.updateStopFetchMore();
                                }}
                                ListFooterComponent={() => loadingMore && <ListFooterComponent />}
                            />

                            {/* {this.listBill()} */}

                        </View>
                    </View>

                    <Text style={styles.revenue}>D/thu hôm nay: {total ? total : "0"} đ</Text>

                    <Footer />
                </View >
                <View style={styles.groupItem}>
                    <Modal visible={modalDelete} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalDelete(false)}>
                                        <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleDelete()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalDelete(false)}
                            style={styles.modalBackdrop}
                        />
                    </Modal>
                </View>

                <View style={styles.groupItem}>
                    <Modal visible={modalCopy} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalCopy(false)}>
                                        <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleCopy()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalCopy(false)}
                            style={styles.modalBackdrop}
                        />
                    </Modal>
                </View>

                <SpinnerComponent
                    spinner={spinner}
                />
            </SafeAreaView >
        );
    };
};

const mapStateToProps = state => ({
    product: state.product,
    customer: state.customer,
    admin: state.admin,
    cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    cartAction: (act, data) => dispatch(cartAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FreightWagons)

