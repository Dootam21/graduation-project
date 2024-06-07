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
import { get_all_supplier } from '../../services/supplierService';
import supplierAction from '../../actions/supplierAction';
import SpinnerComponent from '../elements/Spinner';

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
    Modal
} from 'react-native';

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

class Supplier extends Component {
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
            tong_no: '',
            inputValue: '',
            dataSearch: [],
            filter: 1,
            spinner: false,
        }
    }

    componentDidMount() {
        this.setState({ from: 0 })
        // this.getList(this.state.filter);

        this.props.navigation.addListener(
            'focus',
            () => {
                this.setState({ from: 0 })
                this.getList(this.state.filter);
            }
        );
    }

    setData(opt) {
        this.setState({ data: opt });
    }

    onChangeText = (opt) => {
        this.setState({ text: opt });
    }

    setModalVisible = (opt) => {
        this.setState({ modalVisible: opt });
    }

    setIsActive = (opt) => {
        this.setState({ isActive: opt });
    }

    setSpinner(opt) {
        this.setState({ spinner: opt });
    }

    handleActive = (option, filter) => {
        this.setIsActive(option);
        this.setState({ filter: filter });
        this.getList(filter);
        this.setModalVisible(false);
    }

    Cancel = () => {
        this.setModalVisible(false);
    }

    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }

    async getList(filter) {
        if (this.props.admin.roles?.includes('supplier_list') || this.props.admin.is_admin == 1) {
            this.setSpinner(true);
            const data = await get_all_supplier(this.state.isActive, 0, this.props.admin.uid, filter);
            this.setState({ from: this.state.from + 10 })
            this.setData(data);
            this.setState({ tong_no: data[0]?.tong_no_str });
            this.setSpinner(false);
        } else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    async handleOnEndReached() {
        this.setState({ loadingMore: true });//(true);
        if (!this.state.stopFetchMore) {
            const newData = await get_all_supplier(this.state.isActive, this.state.from, this.props.admin.uid, this.state.filter);
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

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }

    gotoDetails = (id) => {
        if (this.props.admin.roles?.includes('supplier_detail') || this.props.admin.is_admin == 1) {
            this.props.supplierAction('current_supplier_id', id);
            this.gotoPage('SupplierDetail');
        } else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
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
        console.log('input search', text);
        console.log('data mau', this.state.data);

        // console.log('xxx', this.state.data);

        // const filteredSuggestions = this.state.data.filter((data) =>
        //     data.fullname.toLowerCase().includes(text.toLowerCase()),
        // );

        const filteredSuggestions = this.state.data.filter((data) => {
            if (data.title && text) {
                return data.title.toLowerCase().includes(text.toLowerCase());
            }
            return false;
        });

        console.log('data search', filteredSuggestions);

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

    render() {
        const { text, modalVisible, isActive, loadingMore, inputValue, dataSearch, tong_no, spinner } = this.state;
        const data = this.state.data;

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
                            <Text style={styles.title}>Nhà cung cấp</Text>
                            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                <View style={styles.btnchon}>
                                    <Text style={styles.thoigian}>{isActive}</Text>
                                    <Svg style={styles.icondown} width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M3.00279 2.7207L5.11863 0.181523C5.20376 0.0801732 5.32559 0.0166876 5.45743 0.00496953C5.58927 -0.0067485 5.72038 0.0342557 5.82205 0.119003C5.92372 0.20375 5.98766 0.325333 5.99988 0.457128C6.01209 0.588922 5.97158 0.720186 5.88722 0.822176L3.38709 3.82231C3.34009 3.87857 3.28132 3.92382 3.21491 3.95487C3.14851 3.98592 3.0761 4.00201 3.0028 4.00201C2.92949 4.00201 2.85708 3.98592 2.79068 3.95487C2.72427 3.92382 2.6655 3.87857 2.6185 3.82231L0.118379 0.822176C0.033612 0.720232 -0.00722375 0.588809 0.00484281 0.456777C0.0169094 0.324744 0.0808913 0.202901 0.182734 0.118012C0.284576 0.0331221 0.41595 -0.00787104 0.547996 0.00403747C0.680043 0.015946 0.801963 0.0797826 0.886974 0.181523L3.00279 2.7207Z" fill="white" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
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
                                            <Text style={[styles.txtFilter, isActive === 'Mặc định' && styles.activeCL]}>Mặc định</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive('Doanh thu giảm', 2)}>
                                            <Text style={[styles.txtFilter, isActive === 'Doanh thu giảm' && styles.activeCL]}>Doanh thu giảm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive('Danh thu tăng dần', 3)}>
                                            <Text style={[styles.txtFilter, isActive === 'Danh thu tăng dần' && styles.activeCL]}>Danh thu tăng dần</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive('Nợ giảm dần', 4)}>
                                            <Text style={[styles.txtFilter, isActive === 'Nợ giảm dần' && styles.activeCL]}>Nợ giảm dần</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive('Nợ tăng dần', 5)}>
                                            <Text style={[styles.txtFilter, isActive === 'Nợ tăng dần' && styles.activeCL]}>Nợ tăng dần</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive('Ngày hẹn nợ giảm dần', 6)}>
                                            <Text style={[styles.txtFilter, isActive === 'Ngày hẹn nợ giảm dần' && styles.activeCL]}>Ngày hẹn nợ giảm dần</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive('Ngày hẹn nợ tăng dần', 7)}>
                                            <Text style={[styles.txtFilter, isActive === 'Ngày hẹn nợ tăng dần' && styles.activeCL]}>Ngày hẹn nợ tăng dần</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive('Tên A-Z', 8)}>
                                            <Text style={[styles.txtFilter, isActive === 'Tên A-Z' && styles.activeCL]}>Tên A-Z</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive('Tên Z-A', 9)}>
                                            <Text style={[styles.txtFilter, isActive === 'Tên Z-A' && styles.activeCL]}>Tên Z-A</Text>
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

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => this.gotoPage('CurrenlyList')}>
                                <Svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18.375 13.1035C19.0239 11.5618 19.1733 9.85549 18.8021 8.22451C18.431 6.59352 17.558 5.11987 16.306 4.01073C15.0539 2.90159 13.4857 2.21274 11.8219 2.04104C10.158 1.86933 8.48222 2.2234 7.03004 3.05347L6.03804 1.31647C7.55567 0.449089 9.27423 -0.00515878 11.0222 -0.000947546C12.7703 0.00326369 14.4866 0.465787 16 1.34047C20.49 3.93247 22.21 9.48247 20.117 14.1105L21.459 14.8845L17.294 17.0985L17.129 12.3845L18.375 13.1035ZM3.62504 6.89747C2.97618 8.43917 2.82682 10.1455 3.19796 11.7764C3.56909 13.4074 4.44205 14.8811 5.69411 15.9902C6.94617 17.0994 8.51436 17.7882 10.1782 17.9599C11.842 18.1316 13.5179 17.7775 14.97 16.9475L15.962 18.6845C14.4444 19.5519 12.7258 20.0061 10.9778 20.0019C9.22982 19.9977 7.51347 19.5352 6.00004 18.6605C1.51004 16.0685 -0.209961 10.5185 1.88304 5.89047L0.540039 5.11747L4.70504 2.90347L4.87004 7.61747L3.62404 6.89847L3.62504 6.89747ZM7.50004 12.0005H13C13.1326 12.0005 13.2598 11.9478 13.3536 11.854C13.4474 11.7603 13.5 11.6331 13.5 11.5005C13.5 11.3679 13.4474 11.2407 13.3536 11.1469C13.2598 11.0532 13.1326 11.0005 13 11.0005H9.00004C8.337 11.0005 7.70111 10.7371 7.23227 10.2682C6.76343 9.7994 6.50004 9.16352 6.50004 8.50047C6.50004 7.83743 6.76343 7.20155 7.23227 6.73271C7.70111 6.26387 8.337 6.00047 9.00004 6.00047H10V5.00047H12V6.00047H14.5V8.00047H9.00004C8.86743 8.00047 8.74025 8.05315 8.64649 8.14692C8.55272 8.24069 8.50004 8.36787 8.50004 8.50047C8.50004 8.63308 8.55272 8.76026 8.64649 8.85403C8.74025 8.9478 8.86743 9.00047 9.00004 9.00047H13C13.6631 9.00047 14.299 9.26387 14.7678 9.73271C15.2366 10.2015 15.5 10.8374 15.5 11.5005C15.5 12.1635 15.2366 12.7994 14.7678 13.2682C14.299 13.7371 13.6631 14.0005 13 14.0005H12V15.0005H10V14.0005H7.50004V12.0005Z" fill="white" />
                                </Svg>

                            </TouchableOpacity>
                            {/* {
                                this.props.admin.groupId == 1 ? ( */}
                            <TouchableOpacity onPress={() => {
                                if (this.props.admin.roles?.includes('supplier_add') || this.props.admin.is_admin == 1) {
                                    this.gotoPage('AddSupplier');
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
                            {/* ) : (
                                    <></>
                                )
                            } */}
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

                    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}

                        {
                            inputValue === '' ?
                                (
                                    <FlatList
                                        data={data}
                                        keyExtractor={(item, index) => index}
                                        numColumns={1}
                                        renderItem={({ item }) => {
                                            // console.log(item);
                                            let d = item;
                                            let index = item.id;
                                            if (!d.id)
                                                return;
                                            else
                                                return (
                                                    <TouchableOpacity key={index} onPress={() => this.gotoDetails(d?.id)}>
                                                        <View style={styles.boxNCC}>
                                                            <View>
                                                                <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <Path d="M9 8.5C6.76881 8.5 5 6.71657 5 4.6C5 2.48342 6.76881 0.699997 9 0.699997C11.2312 0.699997 13 2.48342 13 4.6C13 6.71657 11.2312 8.5 9 8.5ZM9 7.5C10.6628 7.5 12 6.18932 12 4.6C12 3.01067 10.6628 1.7 9 1.7C7.33723 1.7 6 3.01067 6 4.6C6 6.18932 7.33723 7.5 9 7.5Z" fill="black" stroke="black" />
                                                                    <Path d="M3.59999 14.8C3.99999 13.1 5.39999 12 6.99999 12H11C11.8 12 12.6 12.3 13.3 12.8C13.7 13.2 14.4 13.1 14.7 12.7C15.1 12.3 15 11.6 14.6 11.3C13.6 10.5 12.3 10 11 10H6.99999C4.49999 10 2.29999 11.7 1.59999 14.3L1.09999 16.2C0.799988 17.1 0.999988 18.1 1.59999 18.9C2.19999 19.6 2.99999 20 3.99999 20H10.9C11.5 20 11.9 19.6 11.9 19C11.9 18.4 11.5 18 10.9 18H3.99999C3.59999 18 3.39999 17.8 3.29999 17.6C2.99999 17.4 2.89999 17 2.99999 16.7L3.59999 14.8Z" fill="black" />
                                                                    <Path d="M14.3 18.7C14.5 18.9 14.7 19 15 19C15.1 19 15.1 19 15.2 19C15.5 18.9 15.8 18.7 15.9 18.5L17.9 14.5C18.1 14 17.9 13.4 17.5 13.2C17 13 16.4 13.2 16.2 13.6L14.8 16.4L13.8 15.4C13.4 15 12.8 15 12.4 15.4C12 15.8 12 16.4 12.4 16.8L14.3 18.7Z" fill="black" />
                                                                </Svg>

                                                            </View>
                                                            <View style={styles.thongtin}>
                                                                <Text style={styles.text1}>{d?.title}</Text>
                                                                {
                                                                    this.props.admin.is_show_phone_supp == 1 &&
                                                                    <Text style={styles.text2}>SĐT: {d?.phone}</Text>
                                                                }
                                                                <Text style={styles.text2}>Địa chỉ: {d?.address}</Text>
                                                                {d?.con_no > 0 && this.props.admin.is_show_debt == 1 ? <Text style={styles.textGreen}>Cửa hàng nợ: {d?.con_no_str} </Text> :
                                                                    d?.con_no < 0 && this.props.admin.is_show_debt == 1 ? <Text style={styles.text3}>NCC nợ: {d?.con_no_str?.substring(1)} </Text> :
                                                                        <></>
                                                                }
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
                                ) : (
                                    <FlatList
                                        data={dataSearch}
                                        keyExtractor={(item) => item.id}
                                        numColumns={1}
                                        renderItem={({ item }) => {
                                            let d = item;
                                            let index = item.id;
                                            if (!d.id)
                                                return;
                                            else
                                                return (
                                                    <TouchableOpacity key={index} onPress={() => this.gotoDetails(d?.id)}>
                                                        <View style={styles.boxNCC}>
                                                            <View>
                                                                <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <Path d="M9 8.5C6.76881 8.5 5 6.71657 5 4.6C5 2.48342 6.76881 0.699997 9 0.699997C11.2312 0.699997 13 2.48342 13 4.6C13 6.71657 11.2312 8.5 9 8.5ZM9 7.5C10.6628 7.5 12 6.18932 12 4.6C12 3.01067 10.6628 1.7 9 1.7C7.33723 1.7 6 3.01067 6 4.6C6 6.18932 7.33723 7.5 9 7.5Z" fill="black" stroke="black" />
                                                                    <Path d="M3.59999 14.8C3.99999 13.1 5.39999 12 6.99999 12H11C11.8 12 12.6 12.3 13.3 12.8C13.7 13.2 14.4 13.1 14.7 12.7C15.1 12.3 15 11.6 14.6 11.3C13.6 10.5 12.3 10 11 10H6.99999C4.49999 10 2.29999 11.7 1.59999 14.3L1.09999 16.2C0.799988 17.1 0.999988 18.1 1.59999 18.9C2.19999 19.6 2.99999 20 3.99999 20H10.9C11.5 20 11.9 19.6 11.9 19C11.9 18.4 11.5 18 10.9 18H3.99999C3.59999 18 3.39999 17.8 3.29999 17.6C2.99999 17.4 2.89999 17 2.99999 16.7L3.59999 14.8Z" fill="black" />
                                                                    <Path d="M14.3 18.7C14.5 18.9 14.7 19 15 19C15.1 19 15.1 19 15.2 19C15.5 18.9 15.8 18.7 15.9 18.5L17.9 14.5C18.1 14 17.9 13.4 17.5 13.2C17 13 16.4 13.2 16.2 13.6L14.8 16.4L13.8 15.4C13.4 15 12.8 15 12.4 15.4C12 15.8 12 16.4 12.4 16.8L14.3 18.7Z" fill="black" />
                                                                </Svg>

                                                            </View>
                                                            <View style={styles.thongtin}>
                                                                <Text style={styles.text1}>{d?.title}</Text>
                                                                {
                                                                    this.props.admin.is_show_phone_supp == 1 &&
                                                                    <Text style={styles.text2}>SĐT: {d?.phone}</Text>
                                                                }
                                                                <Text style={styles.text2}>Địa chỉ: {d?.address}</Text>
                                                                {d?.con_no > 0 && this.props.admin.is_show_debt == 1 ? <Text style={styles.textGreen}>Cửa hàng nợ: {d?.con_no_str} </Text> :
                                                                    d?.con_no < 0 && this.props.admin.is_show_debt == 1 ? <Text style={styles.text3}>NCC nợ: {d?.con_no_str?.substring(1)} </Text> :
                                                                        <></>
                                                                }
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
    supplier: state.supplier,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Supplier)

