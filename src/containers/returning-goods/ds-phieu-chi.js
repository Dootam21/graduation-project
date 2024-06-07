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

//import DateTimePicker from '@react-native-community/datetimepicker';
//import DatePickerComponent from '../elements/DatePickerComponent';
import DatePickerComponent from '../elements/DatePickerComponent';
import thuchiAction from '../../actions/thichiAction';

import { connect } from 'react-redux';
import SourceComponent from './SourceComponent';
// import { Alert, Button, View } from 'react-native';

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

import { customer_source_list, edit_customer_source, add_customer_source, delete_customer_source, get_all_chi, get_totle_chi, get_total_thuchi } from '../../services/thuchiService';
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

class DSPhieuChi extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loadingMore: false,
            stopFetchMore: true,
            isEnabled: false,
            modalFilterFW: false,
            modalFilterFW1: false,
            views: [],
            lastAddedIndex: -1,
            alert: false,
            isModalVisible: false,
            selectedDateFrom: '',
            selectedDateTo: '',
            nguonKH: [],
            nguon_id: 0,
            phuchitoday: 0,
            titleSource: '',
            total: '',
        }
    }

    componentDidMount() {
        from = 0;
        this.setState({ uid: this.props.admin.uid });
        this.getData(this.state);
        this.props.navigation.addListener(
            'focus',
            () => {
                from = 0;
                this.getData(this.state);
            }
        );
    }

    async getData() {
        if (this.props.admin.roles?.includes('thuchi_list') || this.props.admin.is_admin == 1) {
            var d = this.state;
            d.uid = this.props.admin.uid;
            d.from = from;

            const dataLog = await get_all_chi(d);
            this.setState({ data: dataLog });
            console.log(d);
            console.log(dataLog);

            const dataS = await customer_source_list();
            this.setState({ nguonKH: dataS });

            const phuchitoday = await get_totle_chi();
            this.setState({ phuchitoday: phuchitoday });
            from = 0 + limit;
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    async handleOnEndReached() {
        this.setState({ loadingMore: true });//(true);

        console.log('handleOnEndReached...........');
        console.log(from);

        var d = this.state;
        d.uid = this.props.admin.uid;
        d.from = from;
        if (!this.state.stopFetchMore) {
            console.log('from...........');
            console.log(from);

            var newData = await get_all_chi(d);
            from = from + limit;


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

    handleDateChange1(date) {
        // this.setSelectedDate(date);
        this.setState({ selectedDateFrom: date }, () => {
            from = 0;
            this.getData();
        });
    }

    handleDateChange2(date) {
        // this.setSelectedDate(date);
        this.setState({ selectedDateTo: date }, () => {
            from = 0;
            this.getData();
        });
    }

    setIsEnabled = (opt) => {
        this.setState({ isEnabled: opt })
    }

    setModalFilterFW = (opt) => {
        this.setState({ modalFilterFW: opt });
    }

    setModalFilterFW1 = (opt) => {
        this.setState({ modalFilterFW1: opt });
    }

    setViews = (opt) => {
        this.setState({ views: opt });
    }

    setLastAddedIndex = (opt) => {
        this.setState({ lastAddedIndex: opt });
    }

    setAlert = (opt) => {
        this.setState({ alert: opt });
    }

    setInputValue = (opt) => {
        this.setState({ inputValue: opt });
    }

    setModalVisible = (opt) => {
        this.setState({ isModalVisible: opt });
    }

    setTitleSource = (opt) => {
        this.setState({ titleSource: opt });
    }

    // componentDidMount() {
    //     this.setState((prevState) => ({
    //         item: [...prevState.item, prevState.views],
    //     }));
    // }

    toggleSwitch = () => this.setIsEnabled(!this.state.isEnabled);

    async handleEdit(id, title) {
        //console.log(id, title);

        const dataLog = await edit_customer_source({
            u_id: this.props.admin.uid,
            source_id: id,
            title: title
        });
        this.getData();
        // this.setModalVisible(false);
    };

    async handleAddView() {
        const dataLog = await add_customer_source({
            u_id: this.props.admin.uid,
            title: this.state.titleSource,
        })
        this.setTitleSource('');
        this.getData();
        this.setModalVisible(false);
    };

    async handleDelete(id) {
        const dataLog = await delete_customer_source({
            u_id: this.props.admin.uid,
            source_id: id,
        })
        this.getData();
    };

    gotoCreateChi(id, title) {
        this.props.thuchiAction('current_source_id', id);
        this.props.thuchiAction('current_source_title', title);
        this.gotoPage('PhieuThu', { chi: true });
        this.setModalFilterFW1(false);
    }


    toggleModal = () => {
        this.setModalVisible(!this.state.isModalVisible);
    };

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }
    changeType(id) {
        this.setState({ nguon_id: id }, () => {
            this.getData();
        });
    }

    renderNguonKH(kh_lst) {
        var d = new Array();
        for (var i = 0; i < kh_lst.length; i++) {
            let k = i;
            let item = kh_lst[k];

            d.push(
                <TouchableOpacity onPress={() => this.changeType(item.id)}>
                    <Text style={[styles.btn, this.state.nguon_id === item.id ? styles.btnRed : styles.btnGrey]}>{item.title}</Text>
                </TouchableOpacity>
            );
        }
        return d;
    }


    renderList(data) {
        var d = new Array();
        for (var i = 0; i < data.length; i++) {
            let k = i;
            let item = data[k];

            d.push(
                <TouchableOpacity>
                    <View style={[styles.cardItem, styles.padding10]}>
                        <View style={styles.cardLeft}>
                            <Text style={styles.customer}>KH:{item.customer_fullname}</Text>
                            <Text style={styles.txtSP}>TM: {item.customer_fullname} | CK: {item.customer_fullname}</Text>
                            <Text style={styles.txtSP}>Phụ thu: {item.phuthu_txt} | Phụ chi: {item.phuchi_txt}</Text>
                            <Text style={styles.txtSP}>{item.created} | {item.user_name}</Text>
                        </View>
                        <View style={styles.cardRight}>
                            <Text style={[styles.pricePT, styles.pending]}>{item.totle_txt}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }

        return d;
    }

    async getTotal() {
        const total = await get_total_thuchi();
        this.setState({ total: total });
    }

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }
    render() {
        const { isEnabled, modalFilterFW, modalFilterFW1, views, lastAddedIndex, alert, titleSource, isModalVisible, nguonKH, data, phuchitoday, loadingMore, selectedDateFrom, selectedDateTo } = this.state;

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

                        <Text style={styles.title}>Danh sách phiểu chi</Text>

                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.item} onPress={() => this.setModalFilterFW(true)}>
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
                                <View style={[styles.centeredView, styles.centeredView1]}>
                                    <View style={[styles.modalView, styles.padding10, styles.modalView1]}>
                                        <ScrollView>
                                            <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo nguồn</Text>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    {this.renderNguonKH(nguonKH)}

                                                    <View style={styles.flexRowDate}>
                                                        <Text style={[styles.txtTitle, styles.txtDate]}>Từ ngày</Text>
                                                        <DatePickerComponent setDateTime={(txt) => this.handleDateChange1(txt)} dateTime={selectedDateFrom} />
                                                    </View>
                                                    <View style={styles.flexRowDate}>
                                                        <Text style={[styles.txtTitle, styles.txtDate]}>Đến ngày</Text>
                                                        <DatePickerComponent setDateTime={(txt) => this.handleDateChange2(txt)} dateTime={selectedDateTo} />
                                                    </View>
                                                </View>
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => {
                                            this.handleDateChange1("");
                                            this.handleDateChange2("");
                                            this.changeType(0);
                                        }}>
                                            <Text style={[styles.btnRest, styles.resetAll]}>Reset tất cả</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalFilterFW(!modalFilterFW)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            <TouchableOpacity style={styles.item} onPress={() => this.setModalFilterFW1(true)}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8 1V15" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M1 8H15" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </TouchableOpacity>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalFilterFW1}
                                onRequestClose={() => {
                                    this.setModalFilterFW1(false);
                                }}>
                                <View style={[styles.centeredView, styles.centeredView1, styles.paddingH0]}>
                                    <View style={[styles.modalView, styles.padding10, styles.modalView1]}>
                                        <ScrollView>
                                            <View>
                                                <Text style={styles.txtTitle}>Chọn nguồn</Text>
                                                {
                                                    nguonKH.map((view, index) => (
                                                        <SourceComponent
                                                            key={index}
                                                            item={view}
                                                            handleEdit={(id, title) => this.handleEdit(id, title)}
                                                            handleDelete={(id) => this.handleDelete(id)}
                                                            gotoCreate={(id, title) => this.gotoCreateChi(id, title)}
                                                        />
                                                    ))
                                                }

                                                <TouchableOpacity>
                                                    <View style={styles.addElement}>
                                                        <Text style={styles.textAttr}>Khách hàng</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <View style={styles.addElement}>
                                                        <Text style={styles.textAttr}>Nhà cung cấp</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.paddingH10}>
                                        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                            <Text style={[styles.btnRest, styles.resetAll, styles.btnAddElement]}>Thêm mới</Text>
                                        </TouchableOpacity>
                                        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                                            <View style={styles.modalContainer}>
                                                <View style={styles.modalContent}>
                                                    <Text style={styles.modalTitle}>Thêm mới nguồn</Text>
                                                    <TextInput
                                                        style={styles.inputSL}
                                                        value={titleSource}
                                                        onChangeText={(text) => this.setTitleSource(text)}
                                                    />
                                                    <View style={styles.btnGroupConfirm}>
                                                        <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible(false)}>
                                                            <Text style={styles.txtConfirm}>Hủy</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleAddView()}>
                                                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(false)}
                                                style={styles.modalBackdrop}
                                            />
                                        </Modal>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalFilterFW1(!modalFilterFW1)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                        </View>
                    </View >

                    {/* <Header {[title = "home"]} /> */}

                    <View style={{ ...styles.containerFluid, backgroundColor: "#fff" }}>
                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            numColumns={1}
                            renderItem={({ item }) => {
                                let d = item;
                                if (!d.id)
                                    return;

                                else
                                    // console.log('item', item?.customer_fullname, item?.supplier_fullname, item?.customer_source);
                                    return (
                                        <TouchableOpacity>
                                            <View style={[styles.cardItem, styles.padding10]}>
                                                <View style={styles.cardLeft}>
                                                    <Text style={styles.customer}>{
                                                        item?.customer_fullname ? item?.customer_fullname :
                                                            item?.supplier_fullname ? item?.supplier_fullname :
                                                                item?.customer_source
                                                    }</Text>
                                                    <Text style={styles.txtSP}>Tiền mặt: {item.tienmat_txt ? item?.tienmat_txt : `0đ`}</Text>
                                                    <Text style={styles.txtSP}>Chuyển khoản: {item.chuyenkhoan_txt ? item?.chuyenkhoan_txt : `0đ`}</Text>
                                                    <Text style={styles.txtSP}>Phụ thu: {item.phuthu_txt ? item?.phuthu_txt : `0đ`}</Text>
                                                    <Text style={styles.txtSP}>Phụ chi: {item.phuchi_txt ? item?.phuchi_txt : `0đ`}</Text>
                                                    <Text style={styles.txtSP}>{item.created} | {item.user_name}</Text>
                                                </View>
                                                <View style={styles.cardRight}>
                                                    <Text style={[styles.pricePT, styles.pending]}>{item.totle_txt === "" ? '0đ' : item.totle_txt}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                            }}
                            onEndReached={() => this.handleOnEndReached()}
                            onEndReachedThreshold={0.5}
                            onScrollBeginDrag={() => {
                                this.updateStopFetchMore();
                            }}
                            ListFooterComponent={() => loadingMore && <ListFooterComponent />}
                        />
                        {/* <View> */}
                        {/* {this.renderList(data)} */}
                        {/* </View> */}
                    </View>
                    <View style={styles.txtRight}>
                        <Text style={styles.phuThuChi}>Phụ thu/phụ chi hôm nay: {phuchitoday} đ</Text>
                    </View>
                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    thuchi: state.thuchi,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    thuchiAction: (act, data) => dispatch(thuchiAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DSPhieuChi)
