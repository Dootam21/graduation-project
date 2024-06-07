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
// import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { get_thong_ke_ban } from '../../services/statisticService';
import customerAction from '../../actions/customerAction';
import SpinnerComponent from '../elements/Spinner';
import accountAction from '../../actions/accountAction';
import cartAction from '../../actions/cartAction';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    BackHandler
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import DatePickComponent from '../elements/DatePickComponent';

class SaleStatistics extends Component {
    // const { productId } = route.params;
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            isActive: this.props.cart.dataFilter.isActive,
            selectedDate: '',
            data: {},
            thong_ke_ban: {},
            phieu_thanh_toan: {},
            thong_ke_tra: {},
            tong_phu_chi: {},
            cap_duoi: [],
            chi_tiet_sp: [],
            filter: this.props.cart.dataFilter.filter,
            dayFrom: this.props.cart.dataFilter.day_from,
            dayTo: this.props.cart.dataFilter.day_to,
            spinner: false,
        }
    }

    componentDidMount() {
        // console.log(this.props.cart.dataFilter);
        // this.handleFilter(this.state.filter, this.state.isActive, this.state.dayFrom, this.state.dayTo);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.props.navigation.addListener(
            'focus',
            () => {
                this.handleFilter(this.state.filter, this.state.isActive, this.state.dayFrom, this.state.dayTo);
            }
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.accountAction('remove_user_sales');
    };


    setModalVisible = (opt) => {
        this.setState({ modalVisible: opt });
    }

    setIsActive = (opt) => {
        this.setState({ isActive: opt });
    }

    setSelectedDate = (opt) => {
        this.setState({ selectedDate: opt });
    }

    setDayFrom = (opt, callback) => {
        this.setState({ dayFrom: opt }, callback);
    }

    setDayTo = (opt, callback) => {
        this.setState({ dayTo: opt }, callback);
    }

    setSpinner(opt) {
        this.setState({ spinner: opt });
    }

    handleActive = (option) => {
        this.setIsActive(option);
        this.setModalVisible(false);
    }

    Cancel = () => {
        this.setModalVisible(false);
    }

    handleDateChange = (date) => {
        this.setSelectedDate(date);
    };

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }

    // async getData() {
    //     const data = await get_thong_ke_ban({
    //         u_id: 0,
    //         customer_id: this.props?.customer?.id,
    //     })
    //     this.setState({ data: data });
    //     this.setState({ thong_ke_ban: data?.thong_ke_ban });
    //     this.setState({ phieu_thanh_toan: data?.phieu_thanh_toan });
    //     this.setState({ thong_ke_tra: data?.thong_ke_tra });
    //     this.setState({ tong_phu_chi: data?.tong_phu_chi });
    //     this.setState({ cap_duoi: data?.cap_duoi });
    //     this.setState({ chi_tiet_sp: data?.chi_tiet_sp });
    // }

    gotoCustomerList() {
        this.props.navigation.navigate('Customer', { cart: Math.random() })
    }

    getTitleCustomer(id) {
        const title = this.props.customer?.listCustomers?.find((customer) => customer.id == id);
        return title?.fullname;
    }

    async handleDeleteCustomer() {
        this.props.customerAction('current_customer_id', 0);
        const dataLog = await get_thong_ke_ban({
            u_id: this.props.admin.uid,
            customer_id: 0,
            user_id: this.props.admin.list_user_sale[this.props.admin.list_user_sale.length - 1]?.user_id ? this.props.admin.list_user_sale[this.props.admin.list_user_sale.length - 1]?.user_id : 0,
        });
        this.setState({ data: dataLog });
    }

    async handleFilter(filter, date, dayFrom, dayTo) {
        this.setSpinner(true);
        var data = this.state.data;
        if (dayFrom !== '' && dayTo !== '' && filter === "") {
            data = await get_thong_ke_ban({
                u_id: this.props.admin.uid,
                customer_id: this.props?.customer?.id,
                day_from: dayFrom,
                day_to: dayTo,
                user_id: this.props.admin.list_user_sale[this.props.admin.list_user_sale.length - 1]?.user_id ? this.props.admin.list_user_sale[this.props.admin.list_user_sale.length - 1]?.user_id : 0,
            })
            this.setState({ filter: '' })
        }
        else if (filter !== "") {
            data = await get_thong_ke_ban({
                u_id: this.props.admin.uid,
                customer_id: this.props?.customer?.id,
                filter: filter,
                user_id: this.props.admin.list_user_sale[this.props.admin.list_user_sale.length - 1]?.user_id ? this.props.admin.list_user_sale[this.props.admin.list_user_sale.length - 1]?.user_id : 0,
            })
            this.setDayFrom('');
            this.setDayTo('');
            this.setState({ filter: filter })
        }
        this.setState({ data: data });
        this.setState({ thong_ke_ban: data?.thong_ke_ban });
        this.setState({ phieu_thanh_toan: data?.phieu_thanh_toan });
        this.setState({ thong_ke_tra: data?.thong_ke_tra });
        this.setState({ tong_phu_chi: data?.tong_phu_chi });
        this.setState({ cap_duoi: data?.cap_duoi });
        this.setState({ chi_tiet_sp: data?.chi_tiet_sp });
        this.handleActive(date);
        this.setSpinner(false);
    }

    render() {
        const { modalVisible, isActive, selectedDate, data, thong_ke_ban, phieu_thanh_toan, thong_ke_tra, tong_phu_chi, cap_duoi, chi_tiet_sp, dayFrom, dayTo, spinner, filter } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => {
                                this.props.navigation.pop();
                                this.props.accountAction('remove_user_sales');
                            }}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>Thông kê bán hàng {this.props.admin.list_user_sale[this.props.admin.list_user_sale.length - 1]?.user_name}</Text>
                        </View>

                        <View style={styles.headerRight}>
                        </View>
                    </View >
                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        <View style={styles.btnGroupFt}>
                            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                <View style={styles.flexIcon}>
                                    <Text style={styles.btnFilter}>{isActive}</Text>
                                    <Svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M7.499 6.11704L2.20873 0.403896C1.99588 0.175858 1.69128 0.0330153 1.36164 0.00664976C1.032 -0.0197158 0.704181 0.0725435 0.449973 0.263225C0.195765 0.453906 0.0358839 0.727468 0.00534196 1.02401C-0.0252 1.32054 0.0760862 1.61589 0.28702 1.84536L6.53812 8.59567C6.65563 8.72225 6.80259 8.82406 6.96862 8.89393C7.13465 8.96379 7.3157 9 7.49898 9C7.68227 9 7.86332 8.96379 8.02935 8.89393C8.19538 8.82406 8.34234 8.72225 8.45985 8.59567L14.7109 1.84536C14.9229 1.61599 15.025 1.32029 14.9948 1.02322C14.9646 0.726143 14.8047 0.451996 14.55 0.260994C14.2954 0.0699931 13.9669 -0.0222415 13.6368 0.00455262C13.3066 0.0313468 13.0018 0.174979 12.7892 0.403896L7.499 6.11704Z" fill="black" />
                                    </Svg>

                                </View>
                            </TouchableOpacity>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    this.setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Chọn thời gian</Text>
                                        <TouchableOpacity onPress={() => this.handleFilter(1, 'Hôm nay')}>
                                            <Text style={[styles.txtFilter, isActive === 'Hôm nay' && styles.activeCL]}>Hôm nay</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleFilter(2, 'Hôm qua')}>
                                            <Text style={[styles.txtFilter, isActive === 'Hôm qua' && styles.activeCL]}>Hôm qua</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleFilter(3, '7 ngày qua')}>
                                            <Text style={[styles.txtFilter, isActive === '7 ngày qua' && styles.activeCL]}>7 ngày qua</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleFilter(4, 'Tháng này')}>
                                            <Text style={[styles.txtFilter, isActive === 'Tháng này' && styles.activeCL]}>Tháng này</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleFilter(5, 'Tháng trước')}>
                                            <Text style={[styles.txtFilter, isActive === 'Tháng trước' && styles.activeCL]}>Tháng trước</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive('Tùy chọn...')}>
                                            <Text style={[styles.txtFilter, isActive === 'Tùy chọn...' && styles.activeCL]}>Tùy chọn...</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.centeredView2}>
                                    <TouchableOpacity onPress={this.Cancel}>
                                        <Text style={styles.txtClose}>Hủy bỏ</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(!modalVisible)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            <TouchableOpacity onPress={() => this.gotoCustomerList()}>
                                {
                                    this.props?.customer?.id === 0 ?
                                        <Text style={[styles.item1, styles.filter]}>Lọc theo KH</Text>
                                        :
                                        <View style={styles.displayNameCustomer}>
                                            <Text style={[styles.filter]}>{this.getTitleCustomer(this.props?.customer?.id)}</Text>
                                            <TouchableOpacity onPress={() => this.handleDeleteCustomer()}><Text>Xóa</Text></TouchableOpacity>
                                        </View>
                                }
                            </TouchableOpacity>
                        </View>
                        {isActive == 'Tùy chọn...' && (
                            <View>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Từ ngày</Text>
                                    <DatePickComponent
                                        setDateTime={(text) => this.setDayFrom(text, () => this.handleFilter('', isActive, text, dayTo))}
                                        dateTime={dayFrom}
                                    />
                                </View>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Đến ngày</Text>
                                    <DatePickComponent
                                        setDateTime={(text) => this.setDayTo(text, () => this.handleFilter('', isActive, dayFrom, text))}
                                        dateTime={dayTo}
                                    />
                                </View>
                            </View>
                        )}
                        <View>
                            <Text style={styles.txtTitle}>Thống kê bán</Text>
                            <TouchableOpacity onPress={() => this.gotoPage("FreightWagons", {
                                filter: filter,
                                user_id: this.props.admin.list_user_sale[this.props.admin.list_user_sale.length - 1]?.user_id
                            })}>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Tổng đơn hàng</Text>
                                    <Text style={styles.value}>{thong_ke_ban?.tong_don_hang}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng sản phẩm</Text>
                                <Text style={styles.value}>{thong_ke_ban?.tong_sp_ban}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng tiền bán</Text>
                                <Text style={styles.value}>{thong_ke_ban?.tong_tien_ban}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tiền mặt</Text>
                                <Text style={styles.value}>{thong_ke_ban?.tong_tien_mat}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.gotoPage("FreightWagons")}>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Chuyển khoản</Text>
                                    <Text style={styles.value}>{thong_ke_ban?.tong_tien_chuyenkhoan}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.gotoPage("FreightWagons")}>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Nợ lại</Text>
                                    <Text style={styles.value}>{thong_ke_ban?.tong_tien_nolai}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.txtTitle}>Phiếu thanh toán</Text>
                            <TouchableOpacity onPress={() => this.gotoPage("PaymentHistory")}>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Tiền mặt</Text>
                                    <Text style={styles.value}>{phieu_thanh_toan?.tien_mat}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.gotoPage("PaymentHistory")}>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Chuyển khoản</Text>
                                    <Text style={styles.value}>{phieu_thanh_toan?.chuyen_khoan}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.txtTitle}>Thông kê trả</Text>
                            <TouchableOpacity onPress={() => this.gotoPage("ReturnForm")}>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Tổng đơn trả</Text>
                                    <Text style={styles.value}>{thong_ke_tra?.tong_don_tra}</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng sản phẩm trả</Text>
                                <Text style={styles.value}>{thong_ke_tra?.tong_sp_tra}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tổng tiền trả</Text>
                                <Text style={styles.value}>{thong_ke_tra?.tong_tien_tra}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.txtTitle}>Tổng phụ chi</Text>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Trong toa</Text>
                                <Text style={styles.value}>{tong_phu_chi?.trong_toa}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Trong phiếu thánh toán</Text>
                                <Text style={styles.value}>{tong_phu_chi?.trong_phieu_thanh_toan}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Ngoài toa</Text>
                                <Text style={styles.value}>{tong_phu_chi?.ngoai_toa}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.txtTitle} onPress={() => {
                                console.log(this.state.dayFrom, this.state.dayTo);
                            }}>Cấp dưới</Text>
                            {
                                cap_duoi?.length === 0 || cap_duoi == null ? (
                                    <View style={styles.attr}>
                                        <Text style={[styles.attrName, styles.clRed]}>Không có</Text>
                                    </View>
                                ) : (
                                    <View>
                                        <View style={[styles.tbFlexRow, styles.tbFlexRowHead]}>
                                            <Text style={[styles.tbCell, styles.tbCellHead]}>Tên</Text>
                                            <Text style={[styles.tbCell, styles.tbCellHead]}>Số lượng</Text>
                                            <Text style={[styles.tbCell, styles.tbCellHead]}>Tổng tiền</Text>
                                        </View>
                                        {
                                            cap_duoi?.map((item, index) => (
                                                // console.log(item),0
                                                <TouchableOpacity key={index} onPress={() => {
                                                    if (item.id == this.props.admin.list_user_sale[this.props.admin.list_user_sale.length - 1]?.user_id || item.id == 1) {
                                                        return
                                                    }
                                                    else {
                                                        this.props.navigation.push('SaleStatistics');
                                                        this.props.accountAction('add_user_sales', {
                                                            user_id: item.id,
                                                            user_name: item.fullname,
                                                        })
                                                        this.props.cartAction('get_data_filter', {
                                                            day_from: dayFrom,
                                                            day_to: dayTo,
                                                            filter: filter,
                                                            isActive: isActive,
                                                        })
                                                    }

                                                }}>
                                                    <View style={styles.tbFlexRow}>
                                                        <Text style={styles.tbCell}>{item?.fullname}</Text>
                                                        <Text style={styles.tbCell}>{item?.quantity}</Text>
                                                        <Text style={styles.tbCell}>{item?.price} đ</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                        }

                                    </View>
                                )
                            }

                        </View>
                        <View>
                            <Text style={styles.txtTitle}>Chi tiết</Text>
                            {
                                chi_tiet_sp?.length === 0 ? (
                                    <View style={styles.attr}>
                                        <Text style={[styles.attrName, styles.clRed]}>Danh sách sản phẩm rỗng</Text>
                                    </View>
                                ) : (
                                    <View>
                                        <View style={[styles.tbFlexRow, styles.tbFlexRowHead]}>
                                            <Text style={[styles.tbCell4, styles.tbCellHead]}>Hình ảnh</Text>
                                            <Text style={[styles.tbCell4, styles.tbCellHead]}>Tên SP</Text>
                                            <Text style={[styles.tbCell4, styles.tbCellHead]}>Số lượng ?</Text>
                                            <Text style={[styles.tbCell4, styles.tbCellHead]}>Tổng tiền ?</Text>
                                        </View>
                                        {
                                            chi_tiet_sp?.map((item, index) => (
                                                <TouchableOpacity key={index}>
                                                    <View style={styles.tbFlexRow}>
                                                        <View style={styles.tbCell4}>
                                                            <Image style={styles.imgProduct} resizeMode='contain' source={item?.image === null || item?.image?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: item?.image }} ></Image>
                                                        </View>
                                                        <Text style={styles.tbCell4}>{item?.title}</Text>
                                                        <Text style={styles.tbCell4}>{item?.quantity}</Text>
                                                        <Text style={styles.tbCell4}>{item?.price}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                        }


                                    </View>
                                )
                            }

                        </View>
                    </ScrollView>



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
    product: state.product,
    customer: state.customer,
    admin: state.admin,
    cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
    accountAction: (act, data) => dispatch(accountAction(act, data)),
    productAction: (act, data) => dispatch(productAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
    cartAction: (act, data) => dispatch(cartAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleStatistics)
