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
import Search from '../elements/Search';
import Swipeout from 'react-native-swipeout';
import ModalFW from '../elements/ModalFW';
import { connect } from 'react-redux';
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
            selectedButton: null,
            selectedDate: '',
            modalFilterFW: false,
        }
    }

    setSelectedButton = (opt) => {
        this.setState({ selectedButton: opt });
    }

    setSelectedDate = (opt) => {
        this.setState({ selectedDate: opt });
    }

    setModalFilterFW = (opt) => {
        this.setState({ modalFilterFW: opt });
    }

    handleButtonPress = (buttonName) => {
        this.setSelectedButton(buttonName);
    };

    handleDateChange = (date) => {
        this.setSelectedDate(date);
    };

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
        const { selectedButton, selectedDate, modalFilterFW } = this.state;
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

                        <Text style={styles.title}>Toa gọi hàng liên kết</Text>

                        <View style={styles.headerRight}>

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
                                    this.setModalFilterFW(!modalFilterFW);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <ScrollView>
                                            <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo trạng thái</Text>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Hoàn thành</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Chờ xác nhận</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Toa nháp</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Chờ nhặt hàng</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Đă nhặt</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo Shop liên kết</Text>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                            <View>
                                                <View style={[styles.flexRowBW, styles.mb20]}>
                                                    <Text style={styles.txtTitle}>Lọc theo thời gian</Text>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    <View style={styles.flexRowDt}>
                                                        <Text style={styles.txtDate}>Từ ngày</Text>
                                                        <View>
                                                            <DatePicker
                                                                style={styles.datePicker}
                                                                date={selectedDate}
                                                                mode="date"
                                                                format="YYYY-MM-DD"
                                                                minDate="1900-01-01"
                                                                maxDate="2100-01-01"
                                                                placeholder="Chọn"
                                                                onDateChange={this.handleDateChange}
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={styles.flexRowDt}>
                                                        <Text style={styles.txtDate}>Đến ngày</Text>
                                                        <View>
                                                            <DatePicker
                                                                style={styles.datePicker}
                                                                date={selectedDate}
                                                                mode="date"
                                                                format="YYYY-MM-DD"
                                                                minDate="1900-01-01"
                                                                maxDate="2100-01-01"
                                                                placeholder="Chọn"
                                                                onDateChange={this.handleDateChange}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View>
                                                <TouchableOpacity>
                                                    <Text style={[styles.btnRest, styles.resetAll]}>Reset tất cả</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalFilterFW(!modalFilterFW)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>

                        </View>
                    </View >
                    <Search />
                    <ScrollView>
                        <Text style={styles.listHollow}>Danh sách rỗng</Text>
                    </ScrollView>

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
