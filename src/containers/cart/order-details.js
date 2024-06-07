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
import Footer from '../elements/Footer';
import ReturnOder from '../elements/ReturnOder';
import ConfirmOrder from '../elements/ConfirmOrder';
import { change_customer, change_note, change_status, get_list_cart_bill_id, get_thu_detail } from '../../services/cartService';
import { get_category_products, get_product_list, return_wagons, search_products } from '../../services/productService';
import productAction from '../../actions/productAction';
import customerAction from '../../actions/customerAction';

// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
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
import styles from './styles.js';
import CartComponent from './CartComponent';
import SpinnerComponent from '../elements/Spinner';

class OrderDetail extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isEnabled: false,
            showItem: false,
            modalShowEdit: false,
            isModalVisibleEdit: false,
            isActive: false,
            modalVisibleGB: false,
            colorList: [],
            sizeList: [],
            state: 0,
            updatePrice: 0,
            bill_id: 0,
            customerName: '',
            customerPhone: '',
            modalConfirm: false,
            dataThu: {},
            textSearch: '',
            dataSearch: [],
            dataSearchInput: [],
            isInputFocused: false,
            type: 2,
            typeCase: {
                1: 'Giá nhập',
                2: 'Giá buôn',
                3: 'Giá lẻ',
                4: 'Giá CTV'
            },
            modalConfirmReturn: false,
            modalConfirmChangeCustomer: false,
            ghi_chu: '',
            ghi_chu_tam: '',
            modalGhiChu: false,
            spinner: false,
        }
    }

    componentDidMount() {
        // this.getData();
        // this.getSearchData();
        this.props.productAction('get_type', 2);

        this.props.navigation.addListener(
            'focus',
            () => {
                this.getData();
                this.setState({ isInputFocused: false });
            }
        );


    }

    setModalConfirmChangeCustomer(opt) {
        this.setState({ modalConfirmChangeCustomer: opt });
    }

    setType(opt) {
        this.setState({ type: opt });
    }

    setIsEnabled(opt) {
        this.setState({ isEnabled: opt })
    }
    setShowItem(opt) {
        this.setState({ showItem: opt })
    }
    setModalShowEdit(opt) {
        this.setState({ modalShowEdit: opt })
    }
    setModalVisibleEdit(opt) {
        this.setState({ isModalVisibleEdit: opt })
    }
    setModalVisibleGB(opt) {
        this.setState({ modalVisibleGB: opt })
    }
    setIsActive(opt) {
        this.setState({ isActive: opt })
    }

    setModalConfirm(opt) {
        this.setState({ modalConfirm: opt })
    }

    setModalConfirmReturn(opt) {
        this.setState({ modalConfirmReturn: opt })
    }

    setGhiChu(opt) {
        this.setState({ ghi_chu: opt })
    }
    setGhiChuTam(opt) {
        this.setState({ ghi_chu_tam: opt })
    }

    setModalGhiChu(opt) {
        this.setState({ modalGhiChu: opt })
    }

    setSpinner(opt) {
        this.setState({ spinner: opt })
    }

    toggleSwitch = () => setIsEnabled(previousState => !previousState);

    toggleItem = () => {
        this.setShowItem(!this.state.showItem);
    };

    toggleModalEdit = () => {
        this.setModalVisibleEdit(false);
        this.setModalShowEdit(false);
    };

    btnConfirm = () => {
        this.setModalShowEdit(false);
        this.setModalVisibleEdit(false);
    };
    btnClose = () => {
        this.setModalShowEdit(false);
        this.setModalVisibleEdit(false);
    }

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }

    async getData() {
        console.log('thu_id from order detail', this.props?.cart?.thu_id);
        const dataLog = await get_list_cart_bill_id({
            u_id: this.props.admin.uid,
            bill_id: this.props.cart.bill_id,
        });
        // console.log('ghi chu', dataLog.data.order_list);
        this.setState({ data: dataLog });
        this.setGhiChu(dataLog.data?.ghi_chu);
        this.setGhiChuTam(dataLog.data?.ghi_chu)
        // console.log('bill id', this.props.cart.bill_id);
        // console.log('dataLog', dataLog);

        const newColorList = this.props.color.listAllColor?.filter(color =>
            this.state.data?.data?.order_list?.map((order) => {
                order?.list_quantity?.some(quantity => quantity.color_id === color.id);
            })
        );
        this.setState({ colorList: newColorList });

        if (dataLog.data.customer_id != this.props.customer.id) {
            this.setModalConfirmChangeCustomer(true);
        }
        else if (dataLog.data.customer_id != 0) {
            const customerName = this.props.customer.listCustomers?.find(customer => customer.id == dataLog.data.customer_id);
            this.setState({ customerName: customerName?.fullname });
            this.setState({ customerPhone: customerName?.phone[0] });
        }

        // console.log(dataLog.data);
        // console.log(dataLog.data?.product);

        if (this.props?.cart?.status == 3) {
            const getThuDetail = await get_thu_detail({
                u_id: this.props.admin.uid,
                thu_id: this.props?.cart?.thu_id,
            });
            this.setState({ dataThu: getThuDetail?.data });
            // console.log('thu detail', getThuDetail?.data);
            // console.log('dataLog', getThuDetail);
        }
    }

    gotoEditQuantity() {
        this.props.navigation.navigate('Quantity', { orderDetail: true });
    }

    gotoProductDetails() {
        this.props.navigation.navigate('ProductDetail')
    }

    handleActive = (option) => {
        this.setType(option);
        this.setModalVisibleGB(false);
        this.props.productAction('get_type', option)
    }
    Cancel = () => {
        this.setModalVisibleGB(false);
    }

    handleConfirm() {
        if (this.props?.cart?.status == 0) {
            // this.props.cartAction('current_cart_thu_id', )
            this.props.navigation.navigate('OrderConfirm', { backToWagons: true });
        }
        else if (this.props?.cart?.status == 3) {
            console.log('status', this.props?.cart?.status);
        }
        else if (this.props?.cart?.status == 1) {
            if (this.props.admin.roles?.includes('order_confirm_status_2') || this.props.admin.is_admin == 1) {
                this.setModalConfirm(true);
            }
            else {
                Alert.alert('Bạn không phép thực hiện hành động này!');
            }
        }
        else if (this.props?.cart?.status == 2) {
            var list_total = [];
            this.state.data?.data?.order_list?.map((order) => {
                list_total.push(order.product.quantity);
            })
            if (list_total.includes('0') || this.props?.route?.params?.change_quantity) {
                this.setModalConfirm(true);
            } else {
                this.props.navigation.navigate('OrderConfirm', { backToWagons: true });
            }
        }
        else if (this.props?.cart?.status == 5) {
            if (this.props.admin.roles?.includes('order_confirm_copy') || this.props.admin.is_admin == 1) {
                this.setModalConfirm(true);
            }
            else {
                Alert.alert('Bạn không phép thực hiện hành động này!');
            }
        }
    }
    async handleChangeStatus() {
        this.setModalConfirm(false)
        this.setSpinner(true);
        if (this.props?.cart?.status == 1) {
            const dataLog = await change_status({
                u_id: this.props.admin.uid,
                bill_id: this.props?.cart?.bill_id,
                status: 2,
            });
        }
        else if (this.props?.cart?.status == 2) {
            const dataLog = await change_status({
                u_id: this.props.admin.uid,
                bill_id: this.props?.cart?.bill_id,
                status: 1,
                nhat_lai: 1,
            });
        }
        else if (this.props?.cart?.status == 5) {
            const dataLog = await change_status({
                u_id: this.props.admin.uid,
                bill_id: this.props?.cart?.bill_id,
                status: 0,
            })
        }
        // this.props?.customerAction('current_customer_id', 0);
        this.setSpinner(false);
        this.props.navigation.navigate('FreightWagons');

    }

    async getSearchData() {
        const dataSearch = await get_product_list({
            u_id: this.props.admin.uid,
        });
        this.setState({ dataSearch });
        // console.log('dataa', dataSearch);
    }


    setDataSearch = (opt) => {
        this.setState({ dataSearchInput: opt });
    }

    setInputSearch = (opt) => {
        this.setState({ textSearch: opt })
    }

    // handleInputChange = (text) => {
    //     this.setInputSearch(text);
    //     // console.log('Input Value', text);
    //     const filteredSuggestions = this.state.dataSearch.filter((dataSearch) => {
    //         const code = dataSearch.code || '';
    //         const title = dataSearch.title || '';

    //         return (
    //             code.toLowerCase().includes(text.toLowerCase()) ||
    //             title.toLowerCase().includes(text.toLowerCase())
    //         );
    //     });
    //     // console.log('sear', filteredSuggestions);
    //     this.setDataSearch(filteredSuggestions)

    // };
    setInputFocused = (opt) => {
        this.setState({ isInputFocused: opt });
    }

    handleInputFocus = () => {
        if (this.props.admin.roles?.includes('order_edit') || this.props.admin.is_admin == 1) {
            this.setInputFocused(true);
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    };

    handleInputBlur = () => {
        this.setInputFocused(false);
    };

    gotoDetail(id, type, nhap, buon, le, ctv) {
        if (type === 1) {
            this.props.productAction('get_price', nhap);
        }
        else if (type === 2) {
            this.props.productAction('get_price', buon);
        }
        else if (type === 3) {
            this.props.productAction('get_price', le);
        }
        else if (type === 4) {
            this.props.productAction('get_price', ctv);
        }
        if (this.props?.cart?.status == 2) {
            this.gotoPage('ChonSoLuongMa', { changing_quantity: true });
        }
        else {
            this.gotoPage('ChonSoLuongMa', { change_quantity_no2: true });
        }
        this.props.productAction('current_product_id', id);
        this.props.productAction('update_quantity', []);
    }

    goBack() {
        // this.props?.customerAction('current_customer_id', 0);
        this.props?.navigation?.goBack();
    }

    async handleReturn() {
        this.setModalConfirmReturn(false);
        this.setSpinner(true);
        const dataLog = await return_wagons({
            u_id: this.props.admin.uid,
            bill_id: this.props?.cart?.bill_id,
            ghi_chu: `Sao chép từ toa bán ${this.state.data.data.code}`
        })
        if (dataLog === false) {
            Alert.alert('Thông báo', 'Đơn hàng này đã được trả !');
            this.setModalConfirmReturn(false);
        }
        else {
            this.props.productAction('set_tra_id', dataLog?.trahang_id);
            this.props.productAction('set_chi_id', dataLog?.thuchi_id);
            this.gotoPage('ChiTietPhieuTraXuong', { customer: true });
        }
        this.setSpinner(false);
    }

    gotoListCustomer() {
        if (this.props?.customer?.id == 0) {
            if (this.props.cart.status != 3) {
                if (this.props.admin.roles?.includes('order_change_customer') || this.props.admin.is_admin == 1) {
                    this.gotoPage('Customer', { cart: Math.random() })
                }
                else {
                    Alert.alert('Bạn không phép thực hiện hành động này!');
                }
            }
            else {
                Alert.alert('Đơn hàng hoàn tất không thể chỉnh sửa!');
            }
        }
        else {
            this.gotoPage('CustomerDetail');
        }
    }

    async handleChangeCustomer() {
        const customerName = this.props.customer.listCustomers?.find(customer => customer.id == this.props.customer.id);
        this.setState({
            customerName: customerName?.fullname,
            customerPhone: customerName?.phone[0],
            data: {
                ...this.state.data,
                data: {
                    ...this.state.data.data,
                    customer_id: this.props.customer.id
                }
            }
        });
        const data = await change_customer({
            u_id: this.props.admin.uid,
            bill_id: this.state.data.data?.bill_id,
            customer_id: this.props.customer.id,
        })
        this.setModalConfirmChangeCustomer(false);
    }

    handleCancelChangeCustomer() {
        this.props?.customerAction('current_customer_id', this.state.data.data.customer_id);
        this.setModalConfirmChangeCustomer(false);
    }

    changeCustomer() {
        if (this.props.admin.roles?.includes('order_change_customer') || this.props.admin.is_admin == 1) {
            this.gotoPage('Customer', { cart: Math.random() })
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    async handleChangeGhiChu() {
        this.setGhiChu(this.state.ghi_chu_tam);
        const data = await change_note({
            u_id: this.props.admin.uid,
            bill_id: this.state.data.data?.bill_id,
            ghi_chu: this.state.ghi_chu_tam,
        })
        this.setModalGhiChu(false);
    }

    handleSearch = async (text) => {
        // this.setSpinner(true);
        const data = await search_products({
            key: text,
        });
        if (data.length === 0) {
            this.setDataSearch(data);
        }
        else {
            this.setDataSearch(data);
        }
        // this.setSpinner(false);
    };

    handleInputChange = async (text) => {
        this.setInputSearch(text);
        clearTimeout(this.typingTimer);

        if (text) {
            this.typingTimer = setTimeout(() => {
                this.handleSearch(text);
            }, 300);
        }
        else {
            this.setDataSearch([]);
        }
    };

    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { customerName, customerPhone, modalConfirm, dataThu, textSearch, isInputFocused, dataSearch, dataSearchInput, type, typeCase, modalConfirmReturn, modalConfirmChangeCustomer, ghi_chu, ghi_chu_tam, modalGhiChu, spinner } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => this.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>{this.props?.cart?.status == 1 ? 'Nhặt hàng' : 'Chi tiết đơn hàng'}</Text>

                        <View style={[styles.headerRight]}>
                            {/* <TouchableOpacity onPress={() => this.gotoPage('ToaHangLienKet')}>
                                <Svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M19.3725 2.03439C18.3759 1.05121 17.1704 0.564444 15.7563 0.574088L12.6451 0.595304C12.0794 0.599162 11.658 1.02631 11.6619 1.59198C11.6657 2.15765 12.0929 2.57901 12.6586 2.57516L15.7698 2.55394C17.4668 2.54237 18.8906 3.9469 18.9022 5.64392C18.908 6.49243 18.5597 7.27264 17.9979 7.84217C17.4361 8.4117 16.6607 8.77055 15.8122 8.77633L12.701 8.79755C12.1353 8.80141 11.714 9.22856 11.7178 9.79423C11.7198 10.0771 11.8631 10.3589 12.0055 10.4994C12.1479 10.6398 12.4317 10.7793 12.7145 10.7774L15.8257 10.7562C17.2399 10.7465 18.4386 10.2434 19.4217 9.24671C20.4049 8.25003 20.8917 7.0446 20.882 5.63042C20.8724 4.21624 20.3692 3.01756 19.3725 2.03439Z" fill="#fff" />
                                    <Path d="M8.62863 2.67335C9.19431 2.66949 9.61567 2.24235 9.61181 1.67667C9.60795 1.111 9.1808 0.68964 8.61513 0.693498L5.57416 0.643524C4.15998 0.653168 2.9613 1.15633 1.97813 2.15301C0.994951 3.14968 0.508185 4.35511 0.517829 5.76929C0.527473 7.18347 1.03063 8.38215 2.02731 9.36533C3.02399 10.3485 4.22942 10.8353 5.6436 10.8256L8.75479 10.8044C9.32047 10.8005 9.74183 10.3734 9.73797 9.80773C9.73411 9.24206 9.30697 8.8207 8.74129 8.82455L5.6301 8.84577C3.93308 8.85734 2.50926 7.45281 2.49768 5.75579C2.4919 4.90728 2.84014 4.12707 3.40195 3.55754C3.96377 2.98801 4.73915 2.62916 5.58766 2.62338L8.62863 2.67335Z" fill="#fff" />
                                    <Path d="M6.59881 5.72782C6.60074 6.01066 6.74408 6.29253 6.88646 6.43298C7.02885 6.57344 7.31265 6.71293 7.59548 6.711L13.6765 6.66953C14.2421 6.66567 14.6635 6.23852 14.6596 5.67285C14.6558 5.10718 14.2286 4.68582 13.663 4.68968L7.58198 4.73115C7.08654 4.66381 6.59495 5.16215 6.59881 5.72782Z" fill="#fff" />
                                </Svg>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => this.gotoPage('OrderCupture')} style={{ marginLeft: 20 }}>
                                <Svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M0 4C0 2.9 0.9 2 2 2H5L7 0H13L15 2H18C18.5304 2 19.0391 2.21071 19.4142 2.58579C19.7893 2.96086 20 3.46957 20 4V14C20 14.5304 19.7893 15.0391 19.4142 15.4142C19.0391 15.7893 18.5304 16 18 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14V4ZM10 14C11.3261 14 12.5979 13.4732 13.5355 12.5355C14.4732 11.5979 15 10.3261 15 9C15 7.67392 14.4732 6.40215 13.5355 5.46447C12.5979 4.52678 11.3261 4 10 4C8.67392 4 7.40215 4.52678 6.46447 5.46447C5.52678 6.40215 5 7.67392 5 9C5 10.3261 5.52678 11.5979 6.46447 12.5355C7.40215 13.4732 8.67392 14 10 14ZM10 12C9.60603 12 9.21593 11.9224 8.85195 11.7716C8.48797 11.6209 8.15726 11.3999 7.87868 11.1213C7.6001 10.8427 7.37913 10.512 7.22836 10.1481C7.0776 9.78407 7 9.39397 7 9C7 8.60603 7.0776 8.21593 7.22836 7.85195C7.37913 7.48797 7.6001 7.15726 7.87868 6.87868C8.15726 6.6001 8.48797 6.37913 8.85195 6.22836C9.21593 6.0776 9.60603 6 10 6C10.7956 6 11.5587 6.31607 12.1213 6.87868C12.6839 7.44129 13 8.20435 13 9C13 9.79565 12.6839 10.5587 12.1213 11.1213C11.5587 11.6839 10.7956 12 10 12Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.gotoPage('Printer', {
                                data: {
                                    ...this.props?.route?.params?.data,
                                    customer_fullname: customerName
                                }
                            })} style={{ marginLeft: 20 }}>
                                <Svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M14.5702 17.1464H15.0033V11.8729V11.3504C15.0033 11.0602 14.7488 10.8057 14.4496 10.8057H5.55479C5.25562 10.8057 5.0011 11.0557 5.0011 11.3504V11.8729V17.1464H5.43423C5.47442 17.1464 5.51461 17.1464 5.55479 17.1464H14.4541C14.4943 17.1464 14.5345 17.1464 14.5702 17.1464Z" fill="white" />
                                    <Path d="M17.495 2.99174H16.1197V0.656396C16.1197 0.285778 15.7937 0 15.4097 0H4.59477C4.21076 0 3.88479 0.285778 3.88479 0.656396V2.99174H2.50949C1.26367 2.99174 0 4.21522 0 5.42978V10.8238C0 12.0384 1.26367 13.5789 2.50949 13.5789C2.50949 13.5789 3.10337 13.5789 3.32663 13.5789C3.54543 13.5789 3.57222 13.5789 3.57222 12.9538V11.0337C3.57222 10.1942 4.25095 9.60482 5.0413 9.60482H15.0435C15.8339 9.60482 16.4322 10.5559 16.4322 11.3909V12.9538C16.4322 13.5789 16.4367 13.5789 16.6555 13.5789C16.8788 13.5789 17.4905 13.5789 17.4905 13.5789C18.7363 13.5789 20 12.3956 20 11.1811V5.42978C20.0045 4.21522 18.7408 2.99174 17.495 2.99174ZM16.4322 5.71556C16.0393 5.71556 15.7178 5.39406 15.7178 5.00111C15.7178 4.60817 16.0393 4.28667 16.4322 4.28667C16.8252 4.28667 17.1467 4.60817 17.1467 5.00111C17.1467 5.39406 16.8252 5.71556 16.4322 5.71556Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View >
                    <View style={[styles.statusColor, styles.red]}></View>
                    {
                        this.props.cart.status != 3 && (
                            <View style={styles.bodyTop}>
                                <View style={styles.inputGroup}>
                                    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M14.6339 12.8664L11.4607 9.69323C12.1164 8.70509 12.5001 7.52195 12.5001 6.25007C12.5001 2.80378 9.69635 0 6.25007 0C2.80378 0 0 2.80378 0 6.25007C0 9.69635 2.80378 12.5001 6.25007 12.5001C7.52195 12.5001 8.70509 12.1164 9.69323 11.4607L12.8664 14.6339C13.3539 15.122 14.1464 15.122 14.6339 14.6339C15.122 14.1458 15.122 13.3545 14.6339 12.8664ZM1.87502 6.25007C1.87502 3.83754 3.83754 1.87502 6.25007 1.87502C8.66259 1.87502 10.6251 3.83754 10.6251 6.25007C10.6251 8.66259 8.66259 10.6251 6.25007 10.6251C3.83754 10.6251 1.87502 8.66259 1.87502 6.25007Z" fill="#757575" />
                                    </Svg>
                                    <TextInput
                                        onFocus={() => this.handleInputFocus()}
                                        style={styles.input}
                                        placeholder="Tìm kiếm ..."
                                        value={textSearch}
                                        onChangeText={(text) => this.handleInputChange(text)}
                                    />
                                </View>
                                <TouchableOpacity style={styles.bntGiabuon1} onPress={() => this.setModalVisibleGB(true)}>
                                    <Text style={styles.bntGiabuon}>{typeCase[type]}</Text>
                                </TouchableOpacity>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={this.state.modalVisibleGB}
                                    onRequestClose={() => {
                                        this.setModalVisibleGB(false);
                                    }}>
                                    <View style={styles.centeredViewCL}>
                                        <View style={styles.modalView}>
                                            <Text style={styles.modalTextCL}>Chọn loại giá</Text>
                                            <TouchableOpacity onPress={() => this.handleActive(1)}>
                                                <Text style={[styles.txtFilter, type === 1 && styles.activeCL]}>Giá nhập</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleActive(2)}>
                                                <Text style={[styles.txtFilter, type === 2 && styles.activeCL]}>Giá buôn</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleActive(3)}>
                                                <Text style={[styles.txtFilter, type === 3 && styles.activeCL]}>Giá lẻ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleActive(4)}>
                                                <Text style={[styles.txtFilter, type === 4 && styles.activeCL]}>Giá CTV</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.centeredView1CL}>
                                        <TouchableOpacity onPress={() => this.Cancel()}>
                                            <Text style={styles.txtClose}>Hủy bỏ</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisibleGB(false)}
                                        style={styles.modalBackdrop}
                                    />
                                </Modal>
                            </View>

                        )
                    }

                    {/* {isInputFocused && (
                        <View style={styles.modalOverlay}>
                            <View style={styles.modal}>
                                <ScrollView>
                                    {
                                        textSearch === '' ?
                                            (
                                                dataSearch?.map((d, index) => (
                                                    <TouchableOpacity key={index} onPress={() => this.gotoDetail(d?.id, type, d?.price_nhap, d?.price_buon, d?.price_le, d?.price_ctv)}>
                                                        <View style={styles.cardItemS}>
                                                            <Image style={styles.thumbnail} source={d?.image === null || d?.image?.trim() === '' ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>

                                                            <View style={styles.cardContent}>
                                                                <View style={styles.itemInfo}>
                                                                    <Text style={[styles.clback, styles.name]}>{d?.code} - {d?.title}</Text>
                                                                    <Text style={styles.clback}>Giá: {
                                                                        type === 1 ? d?.price_nhap_txt :
                                                                            type === 2 ? d?.price_buon_txt :
                                                                                type === 3 ? d?.price_le_txt :
                                                                                    type === 4 ? d?.price_ctv_txt : ''
                                                                    } đ</Text>
                                                                    <Text style={styles.clback}>Tồn: {d?.totle_buy}/{d?.totle_quan}</Text>
                                                                </View>
                                                                <View style={styles.date}>
                                                                    <Text style={{ fontSize: 11 }}>Ngày về :  {d?.ngaynhap?.split(' ')[0]}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            ) : (
                                                dataSearchInput?.map((d, index) => (
                                                    <TouchableOpacity key={index} onPress={() => this.gotoDetail(d?.id, type, d?.price_nhap, d?.price_buon, d?.price_le, d?.price_ctv)}>
                                                        <View style={styles.cardItemS}>
                                                            <Image style={styles.thumbnail} source={d?.image === null || d?.image?.trim() === '' ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>

                                                            <View style={styles.cardContent}>
                                                                <View style={styles.itemInfo}>
                                                                    <Text style={[styles.clback, styles.name]}>{d?.code} - {d?.title}</Text>
                                                                    <Text style={styles.clback}>Giá: {
                                                                        type === 1 ? d?.price_nhap_txt :
                                                                            type === 2 ? d?.price_buon_txt :
                                                                                type === 3 ? d?.price_le_txt :
                                                                                    type === 4 ? d?.price_ctv_txt : ''
                                                                    } đ</Text>
                                                                    <Text style={styles.clback}>Tồn: {d?.totle_buy}/{d?.totle_quan}</Text>
                                                                </View>
                                                                <View style={styles.date}>
                                                                    <Text style={{ fontSize: 11 }}>Ngày về :  {d?.ngaynhap?.split(' ')[0]}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            )
                                    }
                                </ScrollView>
                                <TouchableOpacity><Text>Đóng tìm kiếm</Text></TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.modalBackdropFI} onPress={() => this.setInputFocused(false)} />
                        </View>

                    )} */}

                    {this.state.isInputFocused && (
                        <View style={styles.modalOverlay}>
                            <View style={styles.modal}>
                                <ScrollView>
                                    {
                                        dataSearchInput.length === 0 ?
                                            (
                                                // this.state.dataSearch?.map((d, index) => (
                                                //     // console.log(d),
                                                //     <TouchableOpacity key={index} onPress={() => this.gotoDetail(d?.id, type, d?.price_nhap, d?.price_buon, d?.price_le, d?.price_ctv)}>
                                                //         <View style={styles.cardItemS}>
                                                //             <Image style={styles.thumbnail2} source={d?.image === null || d?.image?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>

                                                //             <View style={styles.cardContent}>
                                                //                 <View style={styles.itemInfo}>
                                                //                     <Text style={[styles.clback, styles.name]}>{d?.code} - {d?.title}</Text>
                                                //                     <Text style={{ color: '#000' }}>Giá: {
                                                //                         type === 1 ? d?.price_nhap_txt :
                                                //                             type === 2 ? d?.price_buon_txt :
                                                //                                 type === 3 ? d?.price_le_txt :
                                                //                                     type === 4 ? d?.price_ctv_txt : ''
                                                //                     } đ</Text>
                                                //                     <Text style={{ color: '#000' }}>Tồn: {d?.totle_buy ? Number(d?.totle_buy).toLocaleString() : 0} / {d?.totle_quan ? Number(d?.totle_quan).toLocaleString() : 0}</Text>
                                                //                 </View>
                                                //                 <View style={styles.date}>
                                                //                     <Text style={{ fontSize: 11 }}>Ngày về :  {d?.ngaynhap?.split(' ')[0]}</Text>
                                                //                 </View>
                                                //             </View>
                                                //         </View>
                                                //     </TouchableOpacity>
                                                // ))
                                                <View style={{ padding: 30, alignItems: 'center' }}>
                                                    <Text style={{ color: '#000' }}>Không có sản phẩm nào</Text>
                                                </View>
                                            ) : (
                                                dataSearchInput?.map((d, index) => (
                                                    <TouchableOpacity key={index} onPress={() => this.gotoDetail(d?.id, type, d?.price_nhap, d?.price_buon, d?.price_le, d?.price_ctv)}>
                                                        <View style={styles.cardItemS}>
                                                            <Image style={styles.thumbnail} source={d?.image === null || d?.image?.trim() === '' ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>

                                                            <View style={styles.cardContent}>
                                                                <View style={styles.itemInfo}>
                                                                    <Text style={[styles.clback, styles.name]}>{d?.code} - {d?.title}</Text>
                                                                    <Text style={styles.clback}>Giá: {
                                                                        type === 1 ? d?.price_nhap_txt :
                                                                            type === 2 ? d?.price_buon_txt :
                                                                                type === 3 ? d?.price_le_txt :
                                                                                    type === 4 ? d?.price_ctv_txt : ''
                                                                    } đ</Text>
                                                                    <Text style={styles.clback}>Tồn: {d?.totle_buy}/{d?.totle_quan}</Text>
                                                                </View>
                                                                <View style={styles.date}>
                                                                    <Text style={{ fontSize: 11 }}>Ngày về :  {d?.ngaynhap?.split(' ')[0]}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            )
                                    }
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setInputFocused(false)}><Text style={{ color: "#0c8ce9", fontWeight: '600' }}>Đóng tìm kiếm</Text></TouchableOpacity>
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styles.modalBackdropFI} onPress={() => this.setInputFocused(false)} />
                        </View>

                    )}
                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <View style={styles.client}>
                            <TouchableOpacity style={styles.customer} onPress={() => this.gotoListCustomer()}>
                                <View>
                                    <Text style={styles.hText}>{data?.data?.customer_id == 0 ? 'Khách mới' : customerName}</Text>
                                    {
                                        this.props.admin.is_show_phone_cus == 1 &&
                                        <Text>{data?.data?.customer_id == 0 ? 'Không có số' : customerPhone}</Text>
                                    }
                                </View>
                                {
                                    data?.data?.customer_id != 0 &&
                                    <View style={styles.groupIcon}>
                                        <TouchableOpacity>
                                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M3.625 7.795C5.065 10.625 7.38 12.94 10.215 14.38L12.415 12.175C12.69 11.9 13.085 11.82 13.43 11.93C14.55 12.3 15.755 12.5 17 12.5C17.555 12.5 18 12.945 18 13.5V17C18 17.555 17.555 18 17 18C7.61 18 0 10.39 0 1C0 0.445 0.45 0 1 0H4.5C5.055 0 5.5 0.445 5.5 1C5.5 2.245 5.7 3.45 6.07 4.57C6.18 4.915 6.1 5.31 5.825 5.585L3.625 7.795V7.795Z" fill="#B8101F" />
                                            </Svg>
                                        </TouchableOpacity>
                                        {
                                            this.props.cart.status != 3 &&
                                            <TouchableOpacity onPress={() => this.changeCustomer()} style={{ marginLeft: 20 }}>
                                                <Svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M17.5181 4.21424L16.5207 4.14221L16.5207 4.14238L17.5181 4.21424ZM11.6253 4.21424L12.6228 4.14362L12.6228 4.14351L11.6253 4.21424ZM8.16373 14.5449L9.13401 14.7869L9.13409 14.7866L8.16373 14.5449ZM20.9801 14.5449L20.0088 14.783L20.009 14.7836L20.9801 14.5449ZM8.50033 5.01512L7.50292 4.94326L7.50292 4.94327L8.50033 5.01512ZM3.76826 5.01512L2.77075 5.08568L2.77075 5.08574L3.76826 5.01512ZM8.35165 11.284C8.85375 11.514 9.44726 11.2935 9.67731 10.7914C9.90735 10.2893 9.68681 9.6958 9.18472 9.46575L8.35165 11.284ZM1.01606 13.2655L0.0457481 13.0236L0.0454067 13.025L1.01606 13.2655ZM6.44679 14.857C6.99908 14.857 7.44679 14.4093 7.44679 13.857C7.44679 13.3047 6.99908 12.857 6.44679 12.857V14.857ZM16.5207 4.14238C16.4178 5.57035 15.3903 6.42848 14.5717 6.42848V8.42848C16.6905 8.42848 18.3568 6.48933 18.5155 4.2861L16.5207 4.14238ZM14.5717 6.42848C13.752 6.42848 12.7238 5.56979 12.6228 4.14362L10.6278 4.28486C10.784 6.49079 12.4539 8.42848 14.5717 8.42848V6.42848ZM12.6228 4.14351C12.5739 3.45426 12.7878 2.93099 13.1142 2.58289C13.4432 2.23209 13.942 2 14.5717 2V0C13.4321 0 12.3908 0.430621 11.6554 1.21474C10.9175 2.00155 10.5427 3.0854 10.6278 4.28497L12.6228 4.14351ZM14.5717 2C15.7606 2 16.6127 2.86735 16.5207 4.14221L18.5155 4.28627C18.6913 1.85225 16.9211 0 14.5717 0V2ZM14.5717 9.28559C11.3993 9.28559 8.04647 10.8778 7.19337 14.3032L9.13409 14.7866C9.68276 12.5835 11.9254 11.2856 14.5717 11.2856V9.28559ZM7.19345 14.3029C6.9778 15.1676 7.51815 16.2855 8.68694 16.2855V14.2855C8.84378 14.2855 8.99149 14.3716 9.07306 14.4912C9.14612 14.5983 9.15364 14.7082 9.13401 14.7869L7.19345 14.3029ZM8.68694 16.2855H20.4569V14.2855H8.68694V16.2855ZM20.4569 16.2855C21.6291 16.2855 22.1622 15.1647 21.9512 14.3062L20.009 14.7836C19.9901 14.7069 19.9971 14.5985 20.0698 14.4919C20.1513 14.3722 20.2995 14.2855 20.4569 14.2855V16.2855ZM21.9513 14.3068C21.0982 10.8265 17.7352 9.28559 14.5717 9.28559V11.2856C17.2277 11.2856 19.4602 12.5446 20.0088 14.783L21.9513 14.3068ZM7.50292 4.94327C7.42596 6.01145 6.65243 6.60705 6.13429 6.60705V8.60705C7.96256 8.60705 9.36578 6.91876 9.49775 5.08698L7.50292 4.94327ZM6.13429 6.60705C5.61515 6.60705 4.84125 6.01086 4.76576 4.94451L2.77075 5.08574C2.90062 6.92024 4.30704 8.60705 6.13429 8.60705V6.60705ZM4.76576 4.94457C4.70021 4.01779 5.29791 3.42855 6.13429 3.42855V1.42855C4.14393 1.42855 2.62291 2.99553 2.77075 5.08568L4.76576 4.94457ZM6.13429 3.42855C6.9641 3.42855 7.5681 4.03858 7.50292 4.94326L9.49775 5.08699C9.64595 3.0301 8.13124 1.42855 6.13429 1.42855V3.42855ZM9.18472 9.46575C8.21205 9.0201 7.1727 8.86372 6.13429 8.86372V10.8637C6.97711 10.8637 7.71273 10.9913 8.35165 11.284L9.18472 9.46575ZM6.13429 8.86372C3.55008 8.86372 0.75835 10.1647 0.0457491 13.0236L1.98637 13.5073C2.39429 11.8708 4.07572 10.8637 6.13429 10.8637V8.86372ZM0.0454067 13.025C-0.149961 13.8136 0.342823 14.857 1.43436 14.857V12.857C1.63013 12.857 1.80857 12.9619 1.90887 13.1087C2.00066 13.2431 2.01548 13.3898 1.98672 13.5059L0.0454067 13.025ZM1.43436 14.857H6.44679V12.857H1.43436V14.857Z" fill="#C02D3A" />
                                                </Svg>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>

                        {
                            this.props.cart.status == 3 &&
                            (
                                <View>
                                    <Text style={styles.listItem}>Thông tin chi tiết</Text>
                                    <View>
                                        <View style={[styles.flexRow, styles.borderBottom]}>
                                            <Text style={styles.textSubf}>Mã:</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{data?.data?.code}</Text>
                                        </View>
                                        <View style={[styles.flexRow, styles.borderBottom]}>
                                            <Text style={styles.textSubf}>Phụ thu:</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.phuthu).toLocaleString()}</Text>
                                        </View>
                                        <View style={[styles.flexRow, styles.borderBottom]}>
                                            <Text style={styles.textSubf}>Phụ chi:</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.phuchi)?.toLocaleString()}</Text>
                                        </View>
                                        <View style={[styles.flexRow, styles.borderBottom]}>
                                            <Text style={styles.textSubf}>Khách trả:</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.tienmat)?.toLocaleString()}</Text>
                                        </View>
                                        <View style={[styles.flexRow, styles.borderBottom]}>
                                            <Text style={styles.textSubf}>Chuyển khoản:</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.chuyenkhoan)?.toLocaleString()}</Text>
                                        </View>
                                        <View style={[styles.flexRow, styles.borderBottom]}>
                                            <Text style={styles.textSubf}>Người tạo:</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{dataThu?.user_name}</Text>
                                        </View>
                                    </View>
                                </View>

                            )
                        }

                        {
                            this.props.cart.status == 3 ? (
                                <Text style={styles.txtNote}>Ghi chú : {dataThu?.ghi_chu ? dataThu?.ghi_chu : 'chưa có ghi chú'}</Text>
                            ) : (
                                <TouchableOpacity onPress={() => this.setModalGhiChu(true)}>
                                    <Text style={styles.txtNote}>Ghi chú : {ghi_chu ? ghi_chu : 'chưa có ghi chú'}</Text>
                                </TouchableOpacity>
                            )
                        }


                        {
                            this.props.cart.status == 3 && this.props.admin.is_show_debt == 1 &&
                            (
                                <View>
                                    <Text style={styles.listItem}>Thông tin nợ</Text>
                                    <View>
                                        <View style={[styles.flexRow, styles.borderBottom]}>
                                            <Text style={styles.textSubf}>Nợ trước đơn:</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.notruocdon).toLocaleString()} đ</Text>
                                        </View>
                                        <View style={[styles.flexRow, styles.borderBottom]}>
                                            <Text style={styles.textSubf}>Nợ sau đơn:</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.debt).toLocaleString()} đ</Text>
                                        </View>
                                        <View style={[styles.flexRow, styles.borderBottom]}>
                                            <Text style={styles.textSubf}>Ngày hẹn nợ:</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{dataThu?.ngaytrano}</Text>
                                        </View>
                                    </View>
                                </View>

                            )
                        }
                        <View>
                            <Text style={styles.listItem}>Danh sách hàng</Text>
                            {
                                data?.data?.order_list?.map((product, index) => (
                                    <CartComponent
                                        key={index}
                                        productItem={product}
                                        data={data}
                                        reloadData={() => this.getData()}
                                        gotoQuantity={() => this.gotoEditQuantity()}
                                        gotoProductDetails={() => this.gotoProductDetails()}
                                        freightWagon={true}
                                        goBack={() => this.props.navigation.pop()}
                                    >
                                    </CartComponent>
                                ))
                            }
                        </View>

                    </ScrollView>

                    {/* <ReturnOder /> */}
                    {/* <ConfirmOrder /> */}

                    {
                        // this.props?.cart?.status == 3 && this.props.admin.groupId == 1 ? (
                        this.props?.cart?.status == 3 ? (
                            <>
                                <View style={styles.groupItem}>
                                    <View style={styles.flexColumnStatus2}>
                                        <View style={[styles.flexRow, styles.flexRow1]}>
                                            <Text style={styles.textSubf}>Số lượng/ Số sp</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{data?.data?.soluongsp ? Number(data?.data?.soluongsp).toLocaleString() : 0} / {data?.data?.tongsanpham}</Text>
                                        </View>
                                        <View style={[styles.flexRow, styles.flexRow1]}>
                                            <Text style={styles.textSubf}>Tổng tiền</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{data?.data?.toltal_price}</Text>
                                        </View>
                                        <TouchableOpacity style={[styles.flexRow, styles.flexRow1]} onPress={() => this.setModalConfirmReturn(true)}>
                                            <Text style={[styles.btnReturn, styles.btnConfirm1]}>Trả hàng</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.flexColumnStatus2}>
                                    </View>
                                </View>
                                {/*  ) : this.props.admin.groupId == 1 ? ( */}
                            </>

                        ) : (
                            <>
                                <View style={styles.groupItem}>
                                    <View style={styles.flexColumn}>
                                        <View style={[styles.flexRow, styles.flexRow1]}>
                                            <Text style={styles.textSubf}>Số lượng/ Số sp</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{Number(data?.data?.soluongsp).toLocaleString()} / {data?.data?.tongsanpham}</Text>
                                        </View>
                                        <View style={[styles.flexRow, styles.flexRow1]}>
                                            <Text style={styles.textSubf}>Tổng tiền</Text>
                                            <Text style={[styles.bold, styles.textSubf]}>{data?.data?.toltal_price}</Text>
                                        </View>
                                    </View>
                                    {

                                    }
                                    <View style={styles.flexColumn}>
                                        <TouchableOpacity style={styles.btnConfirm1} onPress={() => this.handleConfirm()}>
                                            <Text style={[styles.btnConfirm, styles.btnConfirm1]}>{this.props?.cart?.status == 5 ? 'Xác nhận toa nháp' : 'Xác nhận'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        )
                    }

                    <Modal visible={modalConfirm} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalConfirm(false)}>
                                        <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleChangeStatus()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalConfirm(false)}
                            style={styles.modalBackdrop}
                        />
                    </Modal>

                    <Modal visible={modalConfirmReturn} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalConfirmReturn(false)}>
                                        <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleReturn()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalConfirmReturn(false)}
                            style={styles.modalBackdrop}
                        />
                    </Modal>


                    <Modal visible={modalConfirmChangeCustomer} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalTitle, styles.textCenter]}>Bạn có chắc muốn đổi khách hàng?</Text>
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.handleCancelChangeCustomer()}>
                                        <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleChangeCustomer()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalConfirmChangeCustomer(false)}
                            style={styles.modalBackdrop}
                        />
                    </Modal>

                    <Modal visible={modalGhiChu} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Nhập ghi chú</Text>
                                <TextInput
                                    style={styles.inputSL1}
                                    multiline={true}
                                    numberOfLines={4}
                                    value={ghi_chu_tam}
                                    onChangeText={(text) => this.setGhiChuTam(text)}
                                />
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => {
                                        this.setGhiChuTam(ghi_chu);
                                        this.setModalGhiChu(false);
                                    }}>
                                        <Text style={styles.txtConfirm}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleChangeGhiChu()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            this.setGhiChuTam(ghi_chu);
                            this.setModalGhiChu(false)
                        }}
                            style={styles.modalBackdrop}
                        />
                    </Modal>
                    <SpinnerComponent
                        spinner={spinner}
                    />

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };
};
const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart,
    color: state.color,
    size: state.size,
    customer: state.customer,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)

