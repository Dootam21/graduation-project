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
import Header from '../elements/Header';
// import DatePicker from 'react-native-datepicker';
import { RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { get_thong_ke_chung } from '../../services/statisticService';
import productAction from '../../actions/productAction';
import supplierAction from '../../actions/supplierAction';
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
    CheckBox,
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import DatePickerComponent from '../elements/DatePickerComponent';
import SpinnerComponent from '../elements/Spinner';

class StatisticsOverview extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            isActive: 'Hôm nay',
            selectedDate: '',
            modalStates: [false, false, false, false, false, false, false, false, false, false],
            data: {},
            phieu_nhap: {},
            phieu_tra_xuong: {},
            phieu_don_ban: {},
            phieu_kh_tra: {},
            phieu_chi: {},
            phieu_thu: {},
            activeBtn: '1',
            filter: 1,
            dayFrom: '',
            dayTo: '',
            spinner: false,

            modalPhieuNhap: false,
            modalDonBan: false,

        }
    }

    componentDidMount() {
        // this.getData(this.state.filter, this.state.isActive);

        this.props.navigation.addListener(
            'focus',
            () => {
                this.getData(this.state.filter, this.state.isActive);
            }
        );
    }

    setModalPhieuNhap(opt) {
        this.setState({ modalPhieuNhap: opt });
    }

    setModalDonBan(opt) {
        this.setState({ modalDonBan: opt });
    }



    setModalVisible = (opt) => {
        this.setState({ modalVisible: opt });
    }
    setActiveBtn = (opt) => {
        this.setState({ activeBtn: opt });
    }

    setIsActive = (opt) => {
        this.setState({ isActive: opt });
    }

    setSelectedDate = (opt) => {
        this.setState({ selectedDate: opt });
    }

    setModalStates = (opt) => {
        this.setState({ modalStates: opt });
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

    toggleModal = (modalIndex) => {
        const newModalStates = [...this.state.modalStates];
        newModalStates[modalIndex] = !newModalStates[modalIndex];
        this.setState({ modalStates: newModalStates });
    };


    btnConfirm = (modalIndex) => {
        const newModalStates = [...this.state.modalStates];
        newModalStates[modalIndex] = false;
        this.setState({ modalStates: newModalStates });
    };

    btnClose = (modalIndex) => {
        const newModalStates = [...this.state.modalStates];
        newModalStates[modalIndex] = false;
        this.setState({ modalStates: newModalStates });
    };

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }

    async getData(filter, date, dayFrom, dayTo) {
        this.setSpinner(true);
        var data = this.state.data;
        if (dayFrom !== '' && dayTo !== '' && filter === "") {
            data = await get_thong_ke_chung({
                u_id: this.props.admin.uid,
                day_from: dayFrom,
                day_to: dayTo
            })
        }
        else if (filter !== "") {
            data = await get_thong_ke_chung({
                u_id: this.props.admin.uid,
                filter: filter,
            })
            this.setDayFrom('');
            this.setDayTo('');
        }
        this.setState({ data: data });
        this.setState({ phieu_nhap: data?.phieu_nhap });
        this.setState({ phieu_tra_xuong: data?.phieu_tra_xuong });
        this.setState({ phieu_don_ban: data?.phieu_don_ban });
        this.setState({ phieu_kh_tra: data?.phieu_kh_tra });
        this.setState({ phieu_chi: data?.phieu_chi });
        this.setState({ phieu_thu: data?.phieu_thu });
        this.handleActive(date);
        this.setSpinner(false);
    }

    render() {
        const { modalVisible, isActive, selectedDate, modalStates, data, phieu_nhap, phieu_tra_xuong, phieu_don_ban, phieu_kh_tra, phieu_chi, phieu_thu, dayFrom, dayTo, spinner, modalPhieuNhap, modalDonBan } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title="Tổng quan" />

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        <View style={styles.btnGroupFt}>
                            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                <View style={styles.flexIcon1}>
                                    <Text style={styles.txtChose}>{isActive}</Text>
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
                                        <TouchableOpacity onPress={() => this.getData(1, 'Hôm nay')}>
                                            <Text style={[styles.txtFilter, isActive === 'Hôm nay' && styles.activeCL]}>Hôm nay</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.getData(2, 'Hôm qua')}>
                                            <Text style={[styles.txtFilter, isActive === 'Hôm qua' && styles.activeCL]}>Hôm qua</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.getData(3, '7 ngày qua')}>
                                            <Text style={[styles.txtFilter, isActive === '7 ngày qua' && styles.activeCL]}>7 ngày qua</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.getData(4, 'Tháng này')}>
                                            <Text style={[styles.txtFilter, isActive === 'Tháng này' && styles.activeCL]}>Tháng này</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.getData(5, 'Tháng trước')}>
                                            <Text style={[styles.txtFilter, isActive === 'Tháng trước' && styles.activeCL]}>Tháng trước</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive('Tùy chọn...')}>
                                            <Text style={[styles.txtFilter, isActive === 'Tùy chọn...' && styles.activeCL]}>Tùy chọn...</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.centeredView1}>
                                    <TouchableOpacity onPress={this.Cancel}>
                                        <Text style={styles.txtClose}>Hủy bỏ</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(!modalVisible)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                        </View>
                        {isActive == 'Tùy chọn...' && (
                            <View>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Từ ngày</Text>
                                    <DatePickerComponent
                                        setDateTime={(text) => this.setDayFrom(text, () => this.getData('', isActive, text, dayTo))}
                                        dateTime={dayFrom}
                                    />
                                </View>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Đến ngày</Text>
                                    <DatePickerComponent
                                        setDateTime={(text) => this.setDayTo(text, () => this.getData('', isActive, dayFrom, text))}
                                        dateTime={dayTo}
                                    />
                                </View>
                            </View>
                        )}

                        <View style={styles.groupElement}>
                            <TouchableOpacity onPress={() => this.setModalPhieuNhap(true)}>
                                <View style={[styles.element, styles.bdRight]}>
                                    <Svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M10.1818 2L10.1818 22" stroke="#B8101F" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round" />
                                        <Path d="M2 13.8182L10.1818 22L18.3636 13.8182" stroke="#B8101F" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round" />
                                    </Svg>

                                    <Text style={[styles.txtElemet, styles.mt4]}>{phieu_nhap?.so_phieu} phiếu nhập</Text>
                                    <Text style={[styles.txtElemet]}>{phieu_nhap?.so_sp} sản phẩm</Text>
                                    <Text style={[styles.txtElemet, styles.bold]}>Tổng tiền: {phieu_nhap?.tong_tien}đ</Text>
                                </View>
                            </TouchableOpacity>
                            <Modal visible={modalPhieuNhap} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.groupContent}>
                                            <Text style={[styles.modalTitleTQ, styles.textCenter]}>Chi tiết</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>Tổng tiền: {phieu_nhap?.tong_tien}đ</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>Chuyển khoản: {phieu_nhap?.nhap_chuyenkhoan}đ</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>Tiền mặt: {phieu_nhap?.nhap_tienmat}đ</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>Nợ lại: {phieu_nhap?.nhap_nolai}đ</Text>
                                        </View>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalPhieuNhap(false)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>OK</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmButton} onPress={() => {
                                                this.setModalPhieuNhap(false);
                                                this.props.productAction('current_product_id', 0);
                                                this.props.supplierAction('current_supplier_id', 0);
                                                this.gotoPage('DSPhieuNhap');
                                            }}>
                                                <Text style={styles.txtConfirm}>Xem chi tiết</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1}
                                    style={styles.modalBackdrop} onPress={() => this.setModalPhieuNhap(false)}
                                />
                            </Modal>

                            <View style={styles.element}>
                                <Svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M6.5 11.6667L1.00001 6.33333L6.5 1" stroke="#B8101F" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M23 17.0002C23 14.1712 21.8411 11.4581 19.7782 9.45769C17.7153 7.4573 14.9174 6.3335 12 6.3335L1.00004 6.3335" stroke="#B8101F" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>

                                <Text style={[styles.txtElemet, styles.mt4]}>{phieu_tra_xuong?.so_phieu} phiếu trả xưởng</Text>
                                <Text style={[styles.txtElemet]}>{phieu_tra_xuong?.so_sp} sản phẩm</Text>
                                <Text style={[styles.txtElemet, styles.bold]}>Tổng tiền: {phieu_tra_xuong?.tong_tien}đ</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setModalDonBan(true)}>
                                <View style={[styles.element, styles.bdRight]}>
                                    <Svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M19.378 5.40587C19.378 5.19695 19.2735 5.09249 19.1691 4.98802L10.7077 0.0783459C10.6032 -0.0261153 10.3943 -0.0261153 10.1854 0.0783459L1.61957 4.98802C1.51511 5.09249 1.41064 5.19695 1.41064 5.40587C1.41064 5.61479 1.51511 5.71925 1.61957 5.82371L10.0809 10.7334C10.1854 10.7334 10.2899 10.8379 10.2899 10.8379C10.2899 10.8379 10.4988 10.8379 10.4988 10.7334L18.9601 5.82371C19.2735 5.71925 19.378 5.51033 19.378 5.40587Z" fill="#B8101F" />
                                        <Path d="M9.19259 13.2405L0.731229 8.33079C0.522306 8.22633 0.313384 8.22633 0.208923 8.33079C0.104461 8.43525 0 8.64417 0 8.74863V18.568C0 18.7769 0.104461 18.8814 0.208923 18.9858L8.67029 23.8955C8.77475 23.8955 8.87921 24 8.87921 24C8.87921 24 9.08813 24 9.08813 23.8955C9.19259 23.7911 9.29705 23.6866 9.29705 23.4777V13.6583C9.50597 13.4494 9.40151 13.3449 9.19259 13.2405Z" fill="#B8101F" />
                                        <Path d="M20.5708 8.33079C20.4663 8.22633 20.2574 8.22633 20.0485 8.33079L11.5871 13.2405C11.4826 13.3449 11.3782 13.4494 11.3782 13.6583V23.4777C11.3782 23.6866 11.4826 23.7911 11.5871 23.8955C11.6916 23.8955 11.796 24 11.796 24C11.796 24 12.0049 24 12.0049 23.8955L20.4663 18.9858C20.5708 18.8814 20.6752 18.7769 20.6752 18.568V8.74863C20.7797 8.64417 20.6752 8.43525 20.5708 8.33079Z" fill="#B8101F" />
                                    </Svg>
                                    <Text style={[styles.txtElemet, styles.mt4]}>{phieu_don_ban?.so_phieu} đơn bán</Text>
                                    <Text style={[styles.txtElemet]}>{phieu_don_ban?.so_sp} sản phẩm</Text>
                                    <Text style={[styles.txtElemet, styles.bold]}>Tổng tiền: {phieu_don_ban?.tong_tien}đ</Text>
                                </View>
                            </TouchableOpacity>

                            <Modal visible={modalDonBan} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.groupContent}>
                                            <Text style={[styles.modalTitleTQ, styles.textCenter]}>Chi tiết</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>Tổng tiền: {phieu_don_ban?.tong_tien}đ</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>Chuyển khoản: {phieu_don_ban?.ban_chuyenkhoan}đ</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>Tiền mặt: {phieu_don_ban?.ban_tienmat}đ</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>Nợ lại: {phieu_don_ban?.ban_nolai}đ</Text>
                                        </View>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalDonBan(false)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>OK</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmButton} onPress={() => {
                                                this.props.customerAction('current_customer_id', 0);
                                                this.gotoPage('FreightWagons', { customer: true });
                                            }}>
                                                <Text style={styles.txtConfirm}>Xem chi tiết</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalDonBan(false)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>



                            <View style={styles.element}>
                                <Svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M6.5 6.3335L1 11.6668L6.5 17.0002" stroke="#B8101F" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M23 1C23 3.82898 21.8411 6.54208 19.7782 8.54247C17.7153 10.5429 14.9174 11.6667 12 11.6667H1" stroke="#B8101F" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>

                                <Text style={[styles.txtElemet, styles.mt4]}>{phieu_kh_tra?.so_phieu} phiếu trả</Text>
                                <Text style={[styles.txtElemet]}>{phieu_kh_tra?.so_sp} sản phẩm</Text>
                                <Text style={[styles.txtElemet, styles.bold]}>Tổng tiền: {phieu_kh_tra?.tong_tien}đ</Text>
                            </View>
                            <View style={[styles.element, styles.bdRight]}>
                                <Svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M16.875 2.25H5.625C5.32663 2.25 5.04048 2.13147 4.82951 1.92049C4.61853 1.70952 4.5 1.42337 4.5 1.125C4.5 0.826631 4.61853 0.540484 4.82951 0.329505C5.04048 0.118527 5.32663 0 5.625 0H16.875C17.1734 0 17.4595 0.118527 17.6705 0.329505C17.8815 0.540484 18 0.826631 18 1.125C18 1.42337 17.8815 1.70952 17.6705 1.92049C17.4595 2.13147 17.1734 2.25 16.875 2.25Z" fill="#B8101F" />
                                    <Path d="M16.875 7.875H5.625C5.32663 7.875 5.04048 7.75647 4.82951 7.54549C4.61853 7.33452 4.5 7.04837 4.5 6.75C4.5 6.45163 4.61853 6.16548 4.82951 5.95451C5.04048 5.74353 5.32663 5.625 5.625 5.625H16.875C17.1734 5.625 17.4595 5.74353 17.6705 5.95451C17.8815 6.16548 18 6.45163 18 6.75C18 7.04837 17.8815 7.33452 17.6705 7.54549C17.4595 7.75647 17.1734 7.875 16.875 7.875Z" fill="#B8101F" />
                                    <Path d="M16.875 13.5H5.625C5.32663 13.5 5.04048 13.3815 4.82951 13.1705C4.61853 12.9595 4.5 12.6734 4.5 12.375C4.5 12.0766 4.61853 11.7905 4.82951 11.5795C5.04048 11.3685 5.32663 11.25 5.625 11.25H16.875C17.1734 11.25 17.4595 11.3685 17.6705 11.5795C17.8815 11.7905 18 12.0766 18 12.375C18 12.6734 17.8815 12.9595 17.6705 13.1705C17.4595 13.3815 17.1734 13.5 16.875 13.5Z" fill="#B8101F" />
                                    <Path d="M1.125 2.25C1.74632 2.25 2.25 1.74632 2.25 1.125C2.25 0.50368 1.74632 0 1.125 0C0.50368 0 0 0.50368 0 1.125C0 1.74632 0.50368 2.25 1.125 2.25Z" fill="#B8101F" />
                                    <Path d="M1.125 7.875C1.74632 7.875 2.25 7.37132 2.25 6.75C2.25 6.12868 1.74632 5.625 1.125 5.625C0.50368 5.625 0 6.12868 0 6.75C0 7.37132 0.50368 7.875 1.125 7.875Z" fill="#B8101F" />
                                    <Path d="M1.125 13.5C1.74632 13.5 2.25 12.9963 2.25 12.375C2.25 11.7537 1.74632 11.25 1.125 11.25C0.50368 11.25 0 11.7537 0 12.375C0 12.9963 0.50368 13.5 1.125 13.5Z" fill="#B8101F" />
                                </Svg>
                                <Text style={[styles.txtElemet, styles.mt4]}>{phieu_chi?.so_phieu} phiếu chi</Text>
                                <Text style={[styles.txtElemet]}>Chi ngoài: {phieu_chi?.so_chingoai}đ</Text>
                                <Text style={[styles.txtElemet]}>Chi toa: {phieu_chi?.so_chitoa}đ</Text>
                                <Text style={[styles.txtElemet, styles.bold]}>Tổng chi: {phieu_chi?.tong_tien}đ</Text>
                            </View>
                            <View style={styles.element}>
                                <Svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M17.25 8.5H9.75C9.55109 8.5 9.36032 8.42098 9.21967 8.28033C9.07902 8.13968 9 7.94891 9 7.75C9 7.55109 9.07902 7.36032 9.21967 7.21967C9.36032 7.07902 9.55109 7 9.75 7H17.25C17.4489 7 17.6397 7.07902 17.7803 7.21967C17.921 7.36032 18 7.55109 18 7.75C18 7.94891 17.921 8.13968 17.7803 8.28033C17.6397 8.42098 17.4489 8.5 17.25 8.5Z" fill="#B8101F" />
                                    <Path d="M17.25 12.25H9.75C9.55109 12.25 9.36032 12.171 9.21967 12.0303C9.07902 11.8897 9 11.6989 9 11.5C9 11.3011 9.07902 11.1103 9.21967 10.9697C9.36032 10.829 9.55109 10.75 9.75 10.75H17.25C17.4489 10.75 17.6397 10.829 17.7803 10.9697C17.921 11.1103 18 11.3011 18 11.5C18 11.6989 17.921 11.8897 17.7803 12.0303C17.6397 12.171 17.4489 12.25 17.25 12.25Z" fill="#B8101F" />
                                    <Path d="M17.25 16H9.75C9.55109 16 9.36032 15.921 9.21967 15.7803C9.07902 15.6397 9 15.4489 9 15.25C9 15.0511 9.07902 14.8603 9.21967 14.7197C9.36032 14.579 9.55109 14.5 9.75 14.5H17.25C17.4489 14.5 17.6397 14.579 17.7803 14.7197C17.921 14.8603 18 15.0511 18 15.25C18 15.4489 17.921 15.6397 17.7803 15.7803C17.6397 15.921 17.4489 16 17.25 16Z" fill="#B8101F" />
                                    <Path d="M6.75 8.5C7.16421 8.5 7.5 8.16421 7.5 7.75C7.5 7.33579 7.16421 7 6.75 7C6.33579 7 6 7.33579 6 7.75C6 8.16421 6.33579 8.5 6.75 8.5Z" fill="#B8101F" />
                                    <Path d="M6.75 12.25C7.16421 12.25 7.5 11.9142 7.5 11.5C7.5 11.0858 7.16421 10.75 6.75 10.75C6.33579 10.75 6 11.0858 6 11.5C6 11.9142 6.33579 12.25 6.75 12.25Z" fill="#B8101F" />
                                    <Path d="M6.75 16C7.16421 16 7.5 15.6642 7.5 15.25C7.5 14.8358 7.16421 14.5 6.75 14.5C6.33579 14.5 6 14.8358 6 15.25C6 15.6642 6.33579 16 6.75 16Z" fill="#B8101F" />
                                    <Path d="M11.56 1C5.73748 1 1 5.73748 1 11.56C1 17.3825 5.73748 22.12 11.56 22.12C17.3825 22.12 22.12 17.3825 22.12 11.56C22.12 5.73748 17.3825 1 11.56 1ZM11.56 21.24C6.22236 21.24 1.88 16.8976 1.88 11.56C1.88 6.22236 6.22236 1.88 11.56 1.88C16.8976 1.88 21.24 6.22236 21.24 11.56C21.24 16.8976 16.8976 21.24 11.56 21.24Z" fill="#B8101F" stroke="#B8101F" />
                                </Svg>


                                <Text style={[styles.txtElemet, styles.mt4]}>{phieu_thu?.so_phieu} phiếu thu</Text>
                                <Text style={[styles.txtElemet]}>Thu ngoài: {phieu_thu?.so_thungoai}đ</Text>
                                <Text style={[styles.txtElemet]}>Thu toa: {phieu_thu?.so_thutoa}đ</Text>
                                <Text style={[styles.txtElemet, styles.bold]}>Tổng thu: {phieu_thu?.tong_tien}đ</Text>
                            </View>
                        </View>
                        <View >
                            <Text style={styles.borderTop}></Text>
                            <TouchableOpacity onPress={() => this.toggleModal(2)}>
                                <View style={styles.attr}>
                                    <View style={styles.flexRow}>
                                        <Text style={[styles.attrName, styles.mr6]}>Phụ chi ngoài/SP:</Text>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 9C16.3636 4.93318 13.0668 1.63636 9 1.63636C4.93318 1.63636 1.63636 4.93318 1.63636 9C1.63636 13.0668 4.93318 16.3636 9 16.3636ZM9.00027 13.9077C8.54825 13.9077 8.18182 13.5414 8.18182 13.0896C8.18182 12.6377 8.54825 12.2714 9.00027 12.2714C9.45229 12.2714 9.81872 12.6377 9.81872 13.0896C9.81872 13.5414 9.45229 13.9077 9.00027 13.9077ZM8.18424 4.08956H9.82114V10.635H8.18424V4.08956Z" fill="black" />
                                        </Svg>
                                    </View>
                                    <Text style={styles.value}>{data?.phu_chi_ngoai} đ</Text>
                                </View>
                            </TouchableOpacity>
                            <Modal visible={this.state.modalStates[2]} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.groupContent}>
                                            <Text style={[styles.modalTitleTQ, styles.textCenter]}>Phụ chi ngoài/SP</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>Tổng phụ chi ngoài / (Tổng SP bán - Tổng SP KH trả)</Text>
                                        </View>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.btnClose(2)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>OK</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.btnClose(2)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            <TouchableOpacity onPress={() => this.toggleModal(3)}>
                                <View style={styles.attr}>
                                    <View style={styles.flexRow}>
                                        <Text style={[styles.attrName, styles.mr6]}>Lợi nhuận SP:</Text>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 9C16.3636 4.93318 13.0668 1.63636 9 1.63636C4.93318 1.63636 1.63636 4.93318 1.63636 9C1.63636 13.0668 4.93318 16.3636 9 16.3636ZM9.00027 13.9077C8.54825 13.9077 8.18182 13.5414 8.18182 13.0896C8.18182 12.6377 8.54825 12.2714 9.00027 12.2714C9.45229 12.2714 9.81872 12.6377 9.81872 13.0896C9.81872 13.5414 9.45229 13.9077 9.00027 13.9077ZM8.18424 4.08956H9.82114V10.635H8.18424V4.08956Z" fill="black" />
                                        </Svg>
                                    </View>
                                    <Text style={styles.value}>{data?.loi_nhuan_sp} đ</Text>
                                </View>
                            </TouchableOpacity>
                            <Modal visible={this.state.modalStates[3]} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.groupContent}>
                                            <Text style={[styles.modalTitleTQ, styles.textCenter]}>Phụ chi ngoài/SP</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>(Tổng tiền toa bán - Tổng tiền nhập của ứng với số lượng bán) - (Tổng tiền toa trả - Tổng tiền nhập ứng với số lượng trả)</Text>
                                        </View>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.btnClose(3)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>OK</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.btnClose(3)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            <TouchableOpacity onPress={() => this.toggleModal(4)}>
                                <View style={styles.attr}>
                                    <View style={styles.flexRow}>
                                        <Text style={[styles.attrName, styles.mr6]}>Phụ chi trung bình/SP:</Text>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 9C16.3636 4.93318 13.0668 1.63636 9 1.63636C4.93318 1.63636 1.63636 4.93318 1.63636 9C1.63636 13.0668 4.93318 16.3636 9 16.3636ZM9.00027 13.9077C8.54825 13.9077 8.18182 13.5414 8.18182 13.0896C8.18182 12.6377 8.54825 12.2714 9.00027 12.2714C9.45229 12.2714 9.81872 12.6377 9.81872 13.0896C9.81872 13.5414 9.45229 13.9077 9.00027 13.9077ZM8.18424 4.08956H9.82114V10.635H8.18424V4.08956Z" fill="black" />
                                        </Svg>
                                    </View>
                                    <Text style={styles.value}>{data?.phu_chi_tb} đ</Text>
                                </View>
                            </TouchableOpacity>
                            <Modal visible={this.state.modalStates[4]} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.groupContent}>
                                            <Text style={[styles.modalTitleTQ, styles.textCenter]}>Phụ chi ngoài/SP</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>(Tổng phụ ci ngoài + Tổng phụ chi khoa bán) / (Tổng SP bán - Tổng SP KH trả)</Text>
                                        </View>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.btnClose(4)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>OK</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.btnClose(4)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            <TouchableOpacity onPress={() => this.toggleModal(5)}>
                                <View style={styles.attr}>
                                    <View style={styles.flexRow}>
                                        <Text style={[styles.attrName, styles.mr6]}>Doanh thu ước tính:</Text>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 9C16.3636 4.93318 13.0668 1.63636 9 1.63636C4.93318 1.63636 1.63636 4.93318 1.63636 9C1.63636 13.0668 4.93318 16.3636 9 16.3636ZM9.00027 13.9077C8.54825 13.9077 8.18182 13.5414 8.18182 13.0896C8.18182 12.6377 8.54825 12.2714 9.00027 12.2714C9.45229 12.2714 9.81872 12.6377 9.81872 13.0896C9.81872 13.5414 9.45229 13.9077 9.00027 13.9077ZM8.18424 4.08956H9.82114V10.635H8.18424V4.08956Z" fill="black" />
                                        </Svg>
                                    </View>
                                    <Text style={styles.value}>{data?.doanh_so_uoc_tinh} đ</Text>
                                </View>
                            </TouchableOpacity>
                            <Modal visible={this.state.modalStates[5]} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.groupContent}>
                                            <Text style={[styles.modalTitleTQ, styles.textCenter]}>Phụ chi ngoài/SP</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>(Tổng tiền bán + Tổng tiền khách hàng trả) - (Tổng tiền nhập - Tổng tiền trả NCC) - Phụ chi ngoài + Phụ thu ngoài</Text>
                                        </View>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.btnClose(5)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>OK</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.btnClose(5)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            <TouchableOpacity onPress={() => this.toggleModal(6)}>
                                <View style={styles.attr}>
                                    <View style={styles.flexRow}>
                                        <Text style={[styles.attrName, styles.mr6]}>Lợi nhuận ước tính: </Text>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 9C16.3636 4.93318 13.0668 1.63636 9 1.63636C4.93318 1.63636 1.63636 4.93318 1.63636 9C1.63636 13.0668 4.93318 16.3636 9 16.3636ZM9.00027 13.9077C8.54825 13.9077 8.18182 13.5414 8.18182 13.0896C8.18182 12.6377 8.54825 12.2714 9.00027 12.2714C9.45229 12.2714 9.81872 12.6377 9.81872 13.0896C9.81872 13.5414 9.45229 13.9077 9.00027 13.9077ZM8.18424 4.08956H9.82114V10.635H8.18424V4.08956Z" fill="black" />
                                        </Svg>
                                    </View>
                                    <Text style={styles.value}>{data?.loi_nhuan_uoc_tinh} đ</Text>
                                </View>
                            </TouchableOpacity>
                            <Modal visible={this.state.modalStates[6]} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.groupContent}>
                                            <Text style={[styles.modalTitleTQ, styles.textCenter]}>Phụ chi ngoài/SP</Text>
                                            <Text style={[styles.modalAttr, styles.textCenter]}>Lợi nhuận SP - Phụ chi ngoài + Phụ thu ngoài</Text>
                                        </View>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.btnClose(6)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>OK</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.btnClose(6)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                        </View>

                        {/* <Text style={styles.borderTop}></Text>
                        <View style={styles.padding10}>
                            <Text style={styles.txtChose}>Biểu đồ theo tiền</Text>
                        </View>
                        <Text style={styles.borderTop}></Text>
                        <View style={styles.padding10}>
                            <Text style={styles.txtChose}>Biểu đồ theo số lượng</Text>
                        </View> */}

                        <Text style={styles.borderTop}></Text>
                        <View>
                            <TouchableOpacity onPress={() => this.toggleModal(7)}>
                                <View style={styles.attr}>
                                    <View style={styles.flexRow}>
                                        <Text style={[styles.attrName, styles.mr6]}>Tổng tồn:</Text>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 9C16.3636 4.93318 13.0668 1.63636 9 1.63636C4.93318 1.63636 1.63636 4.93318 1.63636 9C1.63636 13.0668 4.93318 16.3636 9 16.3636ZM9.00027 13.9077C8.74825 13.9077 8.18182 13.5414 8.18182 13.0896C8.18182 12.6377 8.54825 12.2714 9.00027 12.2714C9.45229 12.2714 9.81872 12.6377 9.81872 13.0896C9.81872 13.5414 9.45229 13.9077 9.00027 13.9077ZM8.18424 4.08956H9.82114V10.635H8.18424V4.08956Z" fill="black" />
                                        </Svg>
                                    </View>
                                    <Text style={styles.value}>{data?.tong_ton} đ</Text>
                                </View>
                            </TouchableOpacity>
                            <Modal visible={this.state.modalStates[7]} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.groupContent}>
                                            <Text style={[styles.modalTitleTQ, styles.textCenter]}>Tổng tồn:</Text>
                                        </View>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.btnClose(7)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>OK</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.btnClose(7)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            <TouchableOpacity onPress={() => this.toggleModal(8)}>
                                <View style={styles.attr}>
                                    <View style={styles.flexRow}>
                                        <Text style={[styles.attrName, styles.mr6]}>Tổng khách nợ:</Text>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 9C16.3636 4.93318 13.0668 1.63636 9 1.63636C4.93318 1.63636 1.63636 4.93318 1.63636 9C1.63636 13.0668 4.93318 16.3636 9 16.3636ZM9.00027 13.9077C8.54825 13.9077 8.18182 13.5414 8.18182 13.0896C8.18182 12.6377 8.54825 12.2714 9.00027 12.2714C9.45229 12.2714 9.81872 12.6377 9.81872 13.0896C9.81872 13.5414 9.45229 13.9077 9.00027 13.9077ZM8.18424 4.08956H9.82114V10.635H8.18424V4.08956Z" fill="black" />
                                        </Svg>
                                    </View>
                                    <Text style={styles.value}>{data?.tong_khach_no} đ</Text>
                                </View>
                            </TouchableOpacity>
                            <Modal visible={this.state.modalStates[8]} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.groupContent}>
                                            <Text style={[styles.modalTitleTQ, styles.textCenter]}>Tổng khách nợ:</Text>
                                        </View>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.btnClose(8)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>OK</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.btnClose(8)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            <TouchableOpacity onPress={() => this.toggleModal(9)}>
                                <View style={styles.attr}>
                                    <View style={styles.flexRow}>
                                        <Text style={[styles.attrName, styles.mr6]}>Tổng nợ SX:</Text>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 9C16.3636 4.93318 13.0668 1.63636 9 1.63636C4.93318 1.63636 1.63636 4.93318 1.63636 9C1.63636 13.0668 4.93318 16.3636 9 16.3636ZM9.00027 13.9077C8.54825 13.9077 8.18182 13.5414 8.18182 13.0896C8.18182 12.6377 8.54825 12.2714 9.00027 12.2714C9.45229 12.2714 9.81872 12.6377 9.81872 13.0896C9.81872 13.5414 9.45229 13.9077 9.00027 13.9077ZM8.18424 4.08956H9.82114V10.635H8.18424V4.08956Z" fill="black" />
                                        </Svg>
                                    </View>
                                    <Text style={styles.value}>{data?.tong_no_san_xuat}đ</Text>
                                </View>
                            </TouchableOpacity>
                            <Modal visible={this.state.modalStates[9]} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.groupContent}>
                                            <Text style={[styles.modalTitleTQ, styles.textCenter]}>Tổng nợ SX</Text>
                                        </View>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.btnClose(9)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>OK</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.btnClose(9)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                        </View>
                        <Text style={styles.borderTop}></Text>
                        <View style={styles.padding10}>
                            <Text style={styles.txtChose}>Top sp bán chạy:</Text>

                        </View>
                        <View>
                            {
                                data?.tk_chi_tiet_sp?.length === 0 ? (
                                    <Text style={[styles.attrName, styles.clRed, styles.paddingT]}>Danh sách sản phẩm rỗng</Text>
                                ) : (
                                    <View>
                                        <View style={styles.FlexRowLoc}>
                                            <TouchableOpacity onPress={() => this.setActiveBtn('1')}>
                                                <Text style={{ ...styles.btnLoc, backgroundColor: this.state.activeBtn === '1' ? "green" : '#B8141C' }}>Theo số lượng</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setActiveBtn('2')}>
                                                <Text style={{ ...styles.btnLoc, backgroundColor: this.state.activeBtn === '2' ? "green" : '#B8141C' }}>Theo tiền</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.tbFlexColumn}>
                                            <View style={[styles.tbFlexRow, styles.tbFlexRowHead]}>
                                                <Text style={[styles.tbCell4, styles.tbCellHead]}>Hình ảnh</Text>
                                                <Text style={[styles.tbCell4, styles.tbCellHead]}>Tên SP</Text>
                                                <Text style={[styles.tbCell4, styles.tbCellHead]}>Số lượng</Text>
                                                <Text style={[styles.tbCell4, styles.tbCellHead]}>Tổng tiền</Text>
                                            </View>
                                            {/* <TouchableOpacity>
                                                <View style={styles.tbFlexRow}>
                                                    <View style={styles.tbCell4}>
                                                        <Image style={styles.imgProduct} resizeMode='contain' source={require('../../../asset/images/NoImageProduct.png')} ></Image>
                                                    </View>
                                                    <Text style={styles.tbCell4}>xxxx</Text>
                                                    <Text style={styles.tbCell4}>xxx</Text>
                                                    <Text style={styles.tbCell4}>1.444.444.444</Text>
                                                </View>
                                            </TouchableOpacity> */}
                                            {
                                                data?.tk_chi_tiet_sp?.map((item, index) => (
                                                    // console.log(item),
                                                    <TouchableOpacity key={index} onPress={() => {
                                                        this.props.productAction('current_product_id', item?.id);
                                                        this.gotoPage('ProductDetail');
                                                    }}>
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
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsOverview)
