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
import supplierAction from '../../actions/supplierAction';
import customerAction from '../../actions/customerAction';
import { get_detail_supplier, delete_supplier } from '../../services/supplierService';


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
import styles from './styles.js';

class SupplierDetail extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isEnabled: false,
            text: 'Tìm kiếm',
            isShow: false,
            image: '',
            isDelete: false,
        }
    }

    componentDidMount() {
        this.getData();

        this.props.navigation.addListener(
            'focus',
            () => {
                this.getData();
            }
        );
    }

    setData = (opt) => {
        this.setState({ data: opt });
    }

    setIsEnabled = (opt) => {
        this.setState({ isEnabled: opt });
    }
    setIsShow = (opt) => {
        this.setState({ isShow: opt });
    }

    setIsDelete = (opt) => {
        this.setState({ isDelete: opt });
    }

    onChangeText = (opt) => {
        this.setState({ text: opt });
    }

    toggleSwitch = () => this.setIsEnabled(!this.state.isEnabled);

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }

    async getData() {
        const data = await get_detail_supplier(this.props.supplier.id, this.props.admin.uid,);
        if (data.images && data.images[0])
            this.setState({ image: data.images[0] });

        this.setData(data);
        console.log(data);
    }

    async DeleteSupplier() {
        const data = await delete_supplier({
            id: this.props.supplier.id,
            u_id: this.props.admin.uid,
        });
        // this.setState(data)
        this.gotoPage('Supplier');
    }

    render() {
        const { isEnabled, text } = this.state;
        const { data, image, isDelete } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>Chi tiết nhà cung cấp</Text>
                        </View>

                        {/* {
                            this.props.admin.groupId == 1 ? ( */}
                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => {
                                if (this.props.admin.roles?.includes('supplier_delete') || this.props.admin.is_admin == 1) {
                                    this.setIsDelete(true);
                                } else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <Text style={styles.btnEidt}>Xóa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (this.props.admin.roles?.includes('supplier_edit') || this.props.admin.is_admin == 1) {
                                    this.gotoPage('EditSupplier');
                                } else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <Text style={[styles.btnEidt, styles.item]}>Sửa</Text>
                            </TouchableOpacity>
                        </View>
                        {/* ) : (
                                <></>
                            )
                        } */}
                    </View >

                    <Modal visible={isDelete} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setIsDelete(false)}>
                                        <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.DeleteSupplier()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.setIsDelete(false)}
                            style={styles.modalBackdrop}
                        />
                    </Modal>

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
                        <View style={styles.avatar}>
                            <Image style={styles.thumbnail} source={image === null || image.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: image }}></Image>
                        </View>

                        <View style={styles.listAttr}>
                            <Text style={styles.sectionHeader}>THÔNG TIN LIÊN HỆ</Text>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tên NCC:</Text>
                                <Text style={styles.value}>{data?.title}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Địa chỉ:</Text>
                                <Text style={styles.value}>{data?.address}</Text>
                            </View>
                            {
                                this.props.admin.is_show_phone_supp == 1 &&
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>SĐT:</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.value}>{data?.phone}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={styles.listAttr}>
                            <Text style={styles.sectionHeader}>THÔNG TIN mua bán :</Text>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Ngày đầu nhập hàng :</Text>
                                <Text style={styles.value}>{data?.ngaydaunhaphang}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Lần cuối nhập hàng :</Text>
                                <Text style={styles.value}>{data?.lancuoinhaphang}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Số lượng(tổng còn/tổng về) :</Text>
                                <Text style={styles.value}>{data?.soluong}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng tiền nhập :</Text>
                                <Text style={styles.value}>{data?.tongtiennhap}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng tiền tồn :</Text>
                                <Text style={styles.value}>{data?.tongtienton}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Ngoại tệ : VND</Text>
                                <Text style={styles.value}>{data?.ngoaite}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Đã trả</Text>
                                <Text style={styles.value}>{data?.datra}</Text>
                            </View>
                            {
                                this.props.admin.is_show_debt == 1 &&
                                <>
                                    <View style={styles.attr}>
                                        <Text style={styles.attrName}>Còn nợ: {Number(data?.con_no?.replace(/,/g, '')) > 0 ? 'Cửa hàng nợ' : Number(data?.con_no?.replace(/,/g, '')) < 0 ? 'NCC nợ' : ''}</Text>
                                        <Text style={styles.value}>{Number(data?.con_no?.replace(/,/g, '')) > 0 ? data?.con_no : Number(data?.con_no?.replace(/,/g, '')) < 0 ? data?.con_no?.substring(1) : 0}</Text>
                                    </View>
                                    <View style={styles.attr}>
                                        <Text style={styles.attrName}>Ngày hẹn trả nợ :</Text>
                                        <Text style={styles.value}>{data?.ngay_hentra}</Text>
                                    </View>
                                </>
                            }
                        </View>
                        <View style={styles.btnGroup1}>
                            <View style={styles.col4}>
                                <TouchableOpacity onPress={() => {
                                    if (this.props.admin.roles?.includes('supplier_payment_detail') || this.props.admin.is_admin == 1) {
                                        this.gotoPage('PaymentHistory', { supplier: true })
                                    } else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <Text style={[styles.btnItem, styles.btnItem1]}>Lịch sử thanh toán</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.gotoPage('DSPhieuNhap')}>
                                    <Text style={[styles.btnItem, styles.btnItem1]}>Lịch sử nhập hàng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.gotoPage('BackToFactory')}>
                                    <Text style={[styles.btnItem, styles.btnItem1]}>Lịch sử trả hàng</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.col6}>
                                <TouchableOpacity onPress={() => {
                                    if (this.props.admin.roles?.includes('supplier_payment') || this.props.admin.is_admin == 1) {
                                        this.setIsShow(true);
                                    } else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <Text style={[styles.btnItem, styles.col12]}>Thanh toán</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => this.gotoPage('HNBaoTra')}>
                                    <Text style={[styles.btnItem, styles.btnItem2]}>Hẹn ngày báo trả</Text>
                                </TouchableOpacity> */}
                            </View>
                            <Modal visible={this.state.isShow} animationType="slide" transparent={true}>
                                <View style={styles.modalThanhtoan}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.txtThanhtoan}>Thanh toán</Text>
                                        <TouchableOpacity onPress={() => {
                                            this.props.customerAction('current_customer_id', 0);
                                            this.gotoPage('Payment', { suppDebt: data.con_no ? data?.con_no : 0, thuAdd: true, supplierPayment: true })
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
                                                        <Text style={[styles.txtT, styles.colorBl]}>Nhà cung cấp thanh toán</Text>
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
                                            this.props.customerAction('current_customer_id', 0);
                                            this.gotoPage('Payment', { suppDebt: data.con_no ? data?.con_no : 0, supplierPayment: true });
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
                                                        <Text style={[styles.txtT, styles.colorBl]}>Thanh toán cho nhà cung cấp</Text>
                                                        <Text style={styles.txtT}>Trả tiền cho nhà cung cấp</Text>
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
    supplier: state.supplier,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetail)
