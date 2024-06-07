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
import Header from '../elements/Header';
import { connect } from 'react-redux';
import productAction from '../../actions/productAction';
import cartAction from '../../actions/cartAction';
import customerAction from '../../actions/customerAction';
import supplierAction from '../../actions/supplierAction';

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
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import { get_payment_history_detail } from '../../services/thuchiService';

class TransactionDetail extends Component {
    // const { productId } = route.params;


    constructor(props) {
        super(props);

        this.state = {
            isEnabled: false,
            data: this.props.thuchi.data,
            dataDetail: {},

        };
        console.log('supplier', this.props?.route?.params.supplier);
        console.log('customer', this.props?.route?.params.customer);
    }

    componentDidMount() {
        this.getData();
    }

    setIsEnabled(opt) {
        this.setState({ isEnabled: opt });
    }

    toggleSwitch = () => setIsEnabled(!this.state.isEnabled);

    async getData() {
        const data = await get_payment_history_detail({
            u_id: this.props.admin.uid,
            thuchi_id: this.props.product.chi_id,
        })
        // console.log(this.state.data?.txt == 'Nhập hàng');
        console.log(Number(data.no_cu.replace(/,/g, "")) > 0);
        this.setState({ dataDetail: data });
    }

    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }

    gotoOrderDetail(bill_id, customer_id, thu_id, status) {
        this.props.cartAction('current_cart_bill_id', bill_id);
        this.props.customerAction('current_customer_id', customer_id);
        this.props.cartAction('current_cart_thu_id', thu_id);
        this.props.cartAction('current_cart_status', status);
        this.gotoPage('OrderDetail');
    }

    gotoNhapDetail(id, chiID, suppId) {
        console.log(id, chiID, suppId);
        this.props.productAction('set_nhap_id', id);
        this.props.productAction('set_chi_id', chiID);
        this.props.supplierAction('current_supplier_id', suppId);
        this.gotoPage('PrescriptionDtail');
    }

    gotoTraDetail(id, chiId) {
        this.props.productAction('set_tra_id', id);
        this.props.productAction('set_chi_id', chiId);
        this.gotoPage('ChiTietPhieuTraXuong')
    }

    render() {
        const { data, dataDetail } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={"Chi tiết giao dịch"} />

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        <View style={styles.topInfo}>
                            <View style={[styles.flexRow, styles.paddingV10]}>
                                <Svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M16.0012 20.0145C15.9097 18.9251 15.9448 18.1649 15.9448 17.1695C16.4023 16.9107 17.2222 15.2604 17.3607 13.8663C17.7205 13.8345 18.2878 13.456 18.4539 11.9619C18.5435 11.1598 18.1875 10.7083 17.9706 10.5664C18.556 8.66812 19.772 2.79556 15.7217 2.1887C15.3048 1.39939 14.2373 1 12.8502 1C7.30059 1.11016 6.63116 5.51829 7.84779 10.5664C7.63154 10.7083 7.27552 11.1598 7.36452 11.9619C7.53125 13.456 8.09788 13.8345 8.45766 13.8663C8.59556 15.2597 9.44805 16.9107 9.90686 17.1695C9.90686 18.1649 9.94131 18.9251 9.84975 20.0145C8.75163 23.1975 1.34223 22.3041 1 28.4429H24.8184C24.4768 22.3041 17.0994 23.1975 16.0012 20.0145Z" stroke="#00538B" stroke-width="0.6" stroke-miterlimit="10" stroke-linecap="round" />
                                    <Path d="M29.75 23C29.75 26.1756 27.1756 28.75 24 28.75C20.8244 28.75 18.25 26.1756 18.25 23C18.25 19.8244 20.8244 17.25 24 17.25C27.1756 17.25 29.75 19.8244 29.75 23Z" fill="white" stroke="#00538B" stroke-width="0.5" />
                                    <Path d="M24 26V22" stroke="#00538B" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M24 20H24.0051" stroke="#00538B" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                                <View style={styles.boxPrice}>
                                    <Text style={styles.txtToahang}>{data?.txt}</Text>
                                    <Text style={styles.txtPrice1}>{dataDetail?.tien_giao_dich?.toLocaleString()}đ</Text>
                                </View>
                            </View>
                            <View style={[styles.flexRow, styles.boxNoti]}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M7.99996 0.666504C6.54957 0.666504 5.13174 1.0966 3.92578 1.90239C2.71982 2.70819 1.77989 3.8535 1.22485 5.19349C0.669803 6.53348 0.524579 8.00797 0.807537 9.4305C1.0905 10.853 1.78893 12.1597 2.81451 13.1853C3.8401 14.2109 5.14677 14.9093 6.5693 15.1923C7.99183 15.4752 9.46632 15.33 10.8063 14.775C12.1463 14.2199 13.2916 13.28 14.0974 12.074C14.9032 10.8681 15.3333 9.45023 15.3333 7.99984C15.3333 6.05492 14.5607 4.18965 13.1854 2.81439C11.8101 1.43912 9.94488 0.666504 7.99996 0.666504ZM11.8046 6.47117L7.13796 11.1378C7.01294 11.2628 6.84341 11.333 6.66663 11.333C6.48985 11.333 6.32031 11.2628 6.1953 11.1378L4.1953 9.13784C4.07386 9.0121 4.00666 8.8437 4.00818 8.6689C4.0097 8.49411 4.07981 8.3269 4.20342 8.20329C4.32702 8.07969 4.49423 8.00957 4.66903 8.00805C4.84383 8.00654 5.01223 8.07373 5.13796 8.19517L6.66663 9.72384L10.862 5.5285C10.9877 5.40707 11.1561 5.33987 11.3309 5.34139C11.5057 5.34291 11.6729 5.41302 11.7965 5.53662C11.9201 5.66023 11.9902 5.82744 11.9917 6.00224C11.9933 6.17703 11.9261 6.34544 11.8046 6.47117Z" fill="#B8101F" />
                                </Svg>
                                <Text style={styles.statusNoti}>Giao dịch thành công</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.headTitle}>Thông tin chung</Text>
                            <View style={styles.paddingH10}>
                                {
                                    this.props.admin.is_show_debt == 1 &&
                                    <View style={[styles.flexBox, styles.flexBoxP0]}>
                                        <Text style={styles.txtName}>Nợ cũ ({
                                            Number(data?.no_cu?.replace(/,/g, "")) > 0 ? 'Cửa hàng nợ' :
                                                this.props?.route?.params?.supplier ? 'NCC nợ' :
                                                    this.props?.route?.params?.customer ? 'KH nợ' : ''
                                        })</Text>
                                        <Text style={styles.txtName}>{dataDetail?.no_cu?.toLocaleString()}đ</Text>
                                    </View>
                                }
                                <View style={[styles.flexBox, styles.flexBoxP0]}>
                                    <Text style={styles.txtName}>Thời gian</Text>
                                    <Text style={styles.txtName}>{dataDetail?.thoi_gian}</Text>
                                </View>
                                <View style={[styles.flexBox, styles.flexBoxP0]}>
                                    <Text style={styles.txtName}>Đối tượng</Text>
                                    <Text style={styles.txtName}>{dataDetail?.doi_tuong}</Text>
                                </View>
                                <View style={[styles.flexBox, styles.flexBoxP0]}>
                                    <Text style={styles.txtName}>Tiền mặt</Text>
                                    <Text style={styles.txtName}>{dataDetail?.tienmat}đ</Text>
                                </View>
                                <View style={[styles.flexBox, styles.flexBoxP0]}>
                                    <Text style={styles.txtName}>Chuyển khoản</Text>
                                    <Text style={styles.txtName}>{dataDetail?.chuyenkhoan}đ</Text>
                                </View>
                                <View style={[styles.flexBox, styles.flexBoxP0]}>
                                    <Text style={styles.txtName}>Phụ thu</Text>
                                    <Text style={styles.txtName}>{dataDetail?.phuthu}đ</Text>
                                </View>
                                <View style={[styles.flexBox, styles.flexBoxP0]}>
                                    <Text style={styles.txtName}>Phụ chi</Text>
                                    <Text style={styles.txtName}>{dataDetail?.phuchi}đ</Text>
                                </View>
                                <View style={[styles.flexBox, styles.flexBoxP0]}>
                                    <Text style={styles.txtName}>Ghi chú</Text>
                                    <Text style={styles.txtName}>{dataDetail?.ghi_chu ? dataDetail?.ghi_chu : 'Không có ghi chú...'}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    {
                        data?.txt == 'Toa Hàng' ? (
                            <View>
                                <TouchableOpacity onPress={() => this.gotoOrderDetail(data?.bill_id, data?.customer_id, data?.thu_id, 3)}>
                                    <Text style={styles.btnXemNguon}>Xem nguồn</Text>
                                </TouchableOpacity>
                            </View>
                        ) : data?.txt == 'Nhập hàng' ? (
                            <View>
                                <TouchableOpacity onPress={() => this.gotoNhapDetail(dataDetail?.nhap_id, dataDetail?.thuchi_id, dataDetail?.supplier_id)}>
                                    <Text style={styles.btnXemNguon}>Xem nguồn</Text>
                                </TouchableOpacity>
                            </View>
                        ) : data?.txt == 'Trả hàng' ? (
                            <>
                                <View>
                                    <TouchableOpacity onPress={() => this.gotoTraDetail(dataDetail?.trahang_id, dataDetail?.thuchi_id, dataDetail?.supplier_id)}>
                                        <Text style={styles.btnXemNguon}>Xem nguồn</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (<></>)
                    }

                    <Footer />
                </View >
            </SafeAreaView >
        );
    }

};
const mapStateToProps = state => ({
    product: state.product,
    supplier: state.supplier,
    thuchi: state.thuchi,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
    cartAction: (act, data) => dispatch(cartAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)

