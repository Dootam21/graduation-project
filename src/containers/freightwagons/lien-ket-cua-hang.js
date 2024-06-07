/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import Search from '../elements/Search';
import Swipeout from 'react-native-swipeout';
import ModalFW from '../elements/ModalFW';
import { connect } from 'react-redux';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import OrderDetail from '../cart/order-details';
import DatePickerComponent from '../elements/DatePickerComponent';

class ToaHangLienKet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: '1',
            modalFilterFW: false,
            isModalVisible: false

        }
    }

    setIsCheck = (opt) => {
        this.setState({ isCheck: opt });
    }

    setModalFilterFW = (opt) => {
        this.setState({ modalFilterFW: opt });
    }

    setModalVisible = (opt) => {
        this.setState({ isModalVisible: opt });
    }

    handleClick = (id) => {
        this.setIsCheck(id);
    }

    toggleModal = () => {
        this.setModalVisible(!this.state.isModalVisible);
    };

    addMaLK = () => {
        this.setModalVisible(!this.state.isModalVisible);
    }

    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }

    listBill = () => {
        var items = new Array();
        for (var i = 0; i < 2; i++) {
            items.push(
                <Swipeout key={i} right={[
                    {
                        text: 'Coppy',
                        onPress: () => {
                            // Xử lý hành động xóa
                        },
                        backgroundColor: 'grey',
                        color: 'white',
                    },
                    {
                        text: 'Xóa',
                        onPress: () => {
                            // Xử lý hành động chỉnh sửa
                        },
                        backgroundColor: 'red',
                        color: 'white',
                    },
                ]} >
                    <TouchableOpacity onPress={() => this.gotoPage('OrderDetail')}>
                        <View style={styles.cardItem}>
                            <View style={styles.cardLeft}>
                                <Text style={styles.customer}>Khách mời</Text>
                                <Text style={styles.txt}>12 sản phẩm</Text>
                                <Text style={styles.txt}>#01052023_KXCF</Text>
                                <Text style={{ color: "#DE110E" }}>Note: A cong</Text>
                            </View>
                            <View style={styles.cardRight}>
                                <Text style={styles.price}>4.200.000 đ</Text>
                                <View style={[styles.status, styles.pending]}>
                                    <Text style={styles.textStatus}>Chờ xác nhận</Text>
                                </View>
                                <Text style={styles.author}>Nhặt bời Minh | Tạo bởi Cuong 1/5 lúc 18:45</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Swipeout>
            )
        }

        return items;
    }

    render() {
        const { isCheck, modalFilterFW, isModalVisible } = this.state;
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
                        <Text style={styles.title}>Liên kết cửa hàng</Text>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={this.toggleModal}>
                                <Text style={styles.txtAddItem}>Thêm</Text>
                            </TouchableOpacity>
                            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.modalTitle}>Nhập mã liên kết</Text>
                                        <TextInput
                                            style={styles.inputSL}
                                        />
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible(false)}>
                                                <Text style={styles.txtConfirm}>Hủy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmButton} onPress={() => this.addMaLK()}>
                                                <Text style={styles.txtConfirm}>Xác nhận</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => { }}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                        </View>
                    </View >
                    <ScrollView>
                        <View style={styles.flexRowCh}>
                            <Text style={styles.txtMaLK}>Mã liên kết của bạn: <Text style={styles.txtCode}>M9EHOZUF</Text></Text>
                            <TouchableOpacity>
                                <View style={styles.btnLoad}>
                                    <Svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M8.49855 3.84751C6.96764 3.8481 5.47812 4.34466 4.2531 5.26282C3.02807 6.18097 2.13348 7.4713 1.70332 8.94054C1.27316 10.4098 1.33058 11.9788 1.86698 13.4127C2.40338 14.8466 3.38989 16.0681 4.67874 16.8942C5.9676 17.7204 7.48943 18.1067 9.01629 17.9954C10.5431 17.8841 11.9929 17.2811 13.1483 16.2768C14.3037 15.2724 15.1026 13.9208 15.4254 12.4243C15.7482 10.9278 15.5774 9.36699 14.9387 7.97568C14.8692 7.80652 14.8678 7.61703 14.9348 7.44687C15.0018 7.2767 15.1321 7.13906 15.2983 7.06273C15.4645 6.9864 15.6537 6.97732 15.8265 7.03737C15.9992 7.09743 16.142 7.22197 16.225 7.38493C16.9915 9.0546 17.1963 10.9276 16.8088 12.7235C16.4214 14.5193 15.4625 16.1413 14.0759 17.3464C12.6892 18.5516 10.9494 19.275 9.11713 19.4084C7.28482 19.5418 5.45861 19.0779 3.91205 18.0863C2.36549 17.0947 1.18184 15.6287 0.538392 13.9079C-0.105055 12.1871 -0.173661 10.3041 0.342853 8.54109C0.859367 6.77803 1.9332 5.22977 3.40349 4.12823C4.87378 3.02669 6.66139 2.43116 8.49855 2.43085V3.84751Z" fill="white" />
                                        <Path d="M8.49866 5.92437V0.354034C8.49868 0.286737 8.51788 0.220841 8.554 0.164061C8.59013 0.10728 8.64168 0.0619672 8.70262 0.0334271C8.76357 0.00488697 8.83138 -0.00569865 8.89813 0.00290973C8.96487 0.0115181 9.02778 0.0389642 9.07949 0.0820341L12.4228 2.8672C12.5928 3.00887 12.5928 3.26953 12.4228 3.4112L9.07949 6.19636C9.02778 6.23943 8.96487 6.26688 8.89813 6.27549C8.83138 6.2841 8.76357 6.27351 8.70262 6.24497C8.64168 6.21643 8.59013 6.17112 8.554 6.11434C8.51788 6.05756 8.49868 5.99166 8.49866 5.92437Z" fill="white" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.flexRowCh}>
                            <TouchableOpacity onPress={() => this.handleClick('1')}>
                                <Text style={[styles.btnLoadLK, isCheck === '1' && styles.bgGreen]}>Liên kết đi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleClick('2')}>
                                <Text style={[styles.btnLoadLK, isCheck === "2" && styles.bgGreen]}>Liên kết đến</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.listHollow}>Danh sách rỗng</Text>


                    </ScrollView>
                    <View style={styles.flexEnd}>
                        <TouchableOpacity onPress={() => this.gotoPage('Notification')}>
                            <View style={styles.flexRowNT}>
                                <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M7 16.0009C7.53043 16.0009 8.03914 15.7902 8.41421 15.4151C8.78929 15.04 9 14.5313 9 14.0009H5C5 14.5313 5.21071 15.04 5.58579 15.4151C5.96086 15.7902 6.46957 16.0009 7 16.0009ZM7.995 1.09987C8.00896 0.960829 7.99362 0.820401 7.94997 0.687648C7.90632 0.554895 7.83533 0.432765 7.74158 0.329133C7.64783 0.225501 7.5334 0.142669 7.40567 0.0859795C7.27794 0.0292895 7.13974 0 7 0C6.86026 0 6.72206 0.0292895 6.59433 0.0859795C6.4666 0.142669 6.35217 0.225501 6.25842 0.329133C6.16467 0.432765 6.09368 0.554895 6.05003 0.687648C6.00638 0.820401 5.99104 0.960829 6.005 1.09987C4.87472 1.32978 3.85862 1.94324 3.12876 2.83638C2.39891 3.72952 2.00015 4.84745 2 6.00087C2 7.09888 1.5 12.0009 0 13.0009H14C12.5 12.0009 12 7.09888 12 6.00087C12 3.58087 10.28 1.56087 7.995 1.09987Z" fill="#fff" />
                                </Svg>
                                <Text style={styles.txtNoti}>0 thông báo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    product: state.product,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToaHangLienKet)
