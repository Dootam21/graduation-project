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
import Footer from '../elements/Footer';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    FlatList,
    Alert
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import DatePickerComponent from '../elements/DatePickerComponent';
import productAction from '../../actions/productAction';
// import DatePicker from 'react-native-datepicker';

import { get_list, read_all, read_one } from '../../services/notifyService';
import { get_detail_product } from '../../services/productService';
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

class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectedDateFrom: '',
            selectedDateTo: '',
            status: 2,

            modalFilterFW: false,
            isModalVisible3: false,
            loadingMore: false,
            stopFetchMore: true,
        }
    }

    componentDidMount() {
        // this.getData();

        this.props.navigation.addListener(
            'focus',
            () => {
                from = 0;
                this.getData();
            }
        );
    }

    async getData() {
        const d = {};
        d.uid = this.props.admin.uid;
        d.status = this.state.status;
        d.from_date = this.state.selectedDateFrom;
        d.from_to = this.state.selectedDateTo;
        d.from = from;

        console.log('this.props.admin');
        console.log(this.props.admin);
        console.log('end this.props.admin');
        const dataLog = await get_list(d);
        this.setState({ data: dataLog });
        from = 0 + limit;
    }

    async handleOnEndReached() {
        this.setState({ loadingMore: true });//(true);

        console.log('handleOnEndReached...........');
        console.log(from);
        if (!this.state.stopFetchMore) {
            console.log('from...........');
            console.log(from);
            const d = {};
            d.uid = this.props.admin.uid;
            d.role = this.props.admin.group_title;
            d.status = this.state.status;
            d.from_date = this.state.selectedDateFrom;
            d.from_to = this.state.selectedDateTo;
            d.from = from;

            const newData = await get_list(d);
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

    resetAll() {
        this.resetDate();
        this.setStatus(2);
    }

    resetDate() {
        this.setState({ selectedDateFrom: '' });
        this.setState({ selectedDateTo: '' }, () => {
            from = 0; this.getData();
        });
    }
    setStatus(s) {
        this.setState({ status: s }, () => {
            from = 0; this.getData();
        });
    }

    setSelectedDateFrom(opt) {
        this.setState({ selectedDateFrom: opt }, () => {
            from = 0; this.getData();
        });
    }
    setSelectedDateTo(opt) {
        this.setState({ selectedDateTo: opt }, () => {
            from = 0; this.getData();
        });
    }
    setModalFilterFW(opt) {
        this.setState({ modalFilterFW: opt }, () => {
            from = 0; this.getData();
        });
    }
    setModalVisible3(opt) {
        this.setState({ isModalVisible3: opt }, () => {
            from = 0; this.getData();
        });
    }

    async btnConfirm() {
        this.setModalVisible3(false);
        const d = {};
        d.uid = this.props.admin.uid;
        d.status = this.state.status;
        d.from_date = this.state.selectedDateFrom;
        d.from_to = this.state.selectedDateTo;
        d.from = from;

        const dataLog = await read_all(d);
        from = 0;
        this.getData();
    };

    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }
    async gotoDetail(tb_type, foreign_id, id) {
        const d = {};
        d.id = id;
        d.uid = this.props.admin.uid;
        d.tb_type = tb_type;
        d.foreign_id = foreign_id;

        const dataLog = await read_one(d);
        const data = await get_detail_product({
            id: foreign_id,
            u_id: this.props.admin.uid,
        });
        console.log(data);

        if (data === false) {
            Alert.alert('Sản phẩm đã bị xóa hoặc không tồn tại !');
        }
        else {
            this.props.productAction('current_product_id', foreign_id);
            this.gotoPage('ProductDetail');
        }
        //hanghoa, trangthai, toahang, khachhang	
        // if(type == '')

        //push reducer id của foreign_key_id
    }

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }

    render() {
        const navigation = this.props.navigation;
        const { data, loadingMore, stopFetchMore, selectedDateFrom, selectedDateTo } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => navigation.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Thông báo</Text>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.items} onPress={() => this.setModalVisible3(true)}>
                                <Svg width="30" height="16" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.8571 0C4.57143 0 0 8 0 8C0 8 4.57143 16 14.8571 16C25.1429 16 29.7143 8 29.7143 8C29.7143 8 25.1429 0 14.8571 0ZM14.8571 12.5714C17.3819 12.5714 19.4286 10.5247 19.4286 8C19.4286 5.47527 17.3819 3.42857 14.8571 3.42857C12.3324 3.42857 10.2857 5.47527 10.2857 8C10.2857 10.5247 12.3324 12.5714 14.8571 12.5714ZM14.8571 11.4286C16.7507 11.4286 18.2857 9.89355 18.2857 8C18.2857 6.10645 16.7507 4.57143 14.8571 4.57143C12.9636 4.57143 11.4286 6.10645 11.4286 8C11.4286 9.89355 12.9636 11.4286 14.8571 11.4286ZM14.8571 9.14286C15.4883 9.14286 16 8.63118 16 8C16 7.36882 15.4883 6.85714 14.8571 6.85714C14.226 6.85714 13.7143 7.36882 13.7143 8C13.7143 8.63118 14.226 9.14286 14.8571 9.14286Z" fill="white" />
                                </Svg>

                            </TouchableOpacity>
                            <Modal visible={this.state.isModalVisible3} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <Text style={[styles.modalTitle, styles.textCenter]}>Bạn muốn đánh dấu đã đọc tất cả thông báo trong mục này?</Text>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible3(false)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmButton} onPress={() => this.btnConfirm()}>
                                                <Text style={styles.txtConfirm}>Xác nhận</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible3(false)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            <TouchableOpacity style={styles.items} onPress={() => this.setModalFilterFW(true)}>
                                <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M6.6052 7.1122L0.937779 1.86935C0.602965 1.55962 0.82212 1 1.27823 1H16.766C17.2221 1 17.4413 1.55962 17.1065 1.86935L11.4391 7.1122C11.3365 7.20709 11.2781 7.34049 11.2781 7.48022V18.4977C11.2781 18.9843 10.6546 19.1857 10.3701 18.7908L6.8607 13.9211C6.79919 13.8358 6.76609 13.7332 6.76609 13.628V7.48022C6.76609 7.34049 6.70777 7.20709 6.6052 7.1122Z" strokeWidth="2" stroke="#fff" />
                                </Svg>
                            </TouchableOpacity>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalFilterFW}
                                onRequestClose={() => {
                                    this.setModalFilterFW(!modalFilterFW);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <ScrollView>
                                            {/* <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo nguồn</Text>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Bán chạy</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Bán chậm</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Lẻ sỉze</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View> */}
                                            <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo trạng thái</Text>
                                                    <TouchableOpacity onPress={() => this.setStatus(2)}>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    <TouchableOpacity onPress={() => this.setStatus(1)}>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Đã đọc</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setStatus(0)}>
                                                        <Text style={[styles.btnGrey, styles.btn]}>Chưa đọc</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={[styles.flexRowBW, styles.mb20]}>
                                                    <Text style={styles.txtTitle}>Lọc theo thời gian</Text>
                                                    <TouchableOpacity onPress={() => this.resetDate()}>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    <View style={styles.flexRowDt}>
                                                        <Text style={styles.txtDate}>Từ ngày</Text>
                                                        <View>
                                                            <DatePickerComponent
                                                                style={styles.datePicker}
                                                                date={this.state.selectedDateFrom}
                                                                setDateTime={(txt) => this.setSelectedDateFrom(txt)}
                                                                dateTime={selectedDateFrom}
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={styles.flexRowDt}>
                                                        <Text style={styles.txtDate}>Đến ngày</Text>
                                                        <View>
                                                            <DatePickerComponent
                                                                style={styles.datePicker}
                                                                date={this.state.selectedDateTo}
                                                                setDateTime={(txt) => this.setSelectedDateTo(txt)}
                                                                dateTime={selectedDateTo}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={() => this.resetAll()}>
                                                    <Text style={[styles.btnRest, styles.resetAll]}>Reset</Text>
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
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index}
                        numColumns={1}
                        renderItem={({ item }) => {
                            let d = item;
                            // <TouchableOpacity onPress={() => this.gotoPage('ChonSoLuongMa')}>
                            if (!d.id)
                                return;
                            else
                                return (
                                    <TouchableOpacity onPress={() => this.gotoDetail(d.tb_type, d.foreign_id, d.id)}>
                                        <View style={[styles.flexRowNT, styles.padding10, d.status == 0 ? styles.bgRead : '']}>
                                            <View style={styles.flexRowNT}>
                                                <Image style={styles.avatar} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                                                <View style={styles.txtNoti}>
                                                    <Text style={styles.txtN}>{d.title}</Text>
                                                    <View style={styles.flexRowNT}>
                                                        <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <Path d="M6.5 0C2.91031 0 0 2.91031 0 6.5C0 10.0897 2.91031 13 6.5 13C10.0897 13 13 10.0897 13 6.5C13 2.91031 10.0897 0 6.5 0ZM9.5 7.5H6.5C6.36739 7.5 6.24021 7.44732 6.14645 7.35355C6.05268 7.25979 6 7.13261 6 7V2.5C6 2.36739 6.05268 2.24021 6.14645 2.14645C6.24021 2.05268 6.36739 2 6.5 2C6.63261 2 6.75979 2.05268 6.85355 2.14645C6.94732 2.24021 7 2.36739 7 2.5V6.5H9.5C9.63261 6.5 9.75979 6.55268 9.85355 6.64645C9.94732 6.74021 10 6.86739 10 7C10 7.13261 9.94732 7.25979 9.85355 7.35355C9.75979 7.44732 9.63261 7.5 9.5 7.5Z" fill="#A29D9D" />
                                                        </Svg>

                                                        <Text style={styles.txtCreate}>{d.created_txt}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <Svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M12.7507 16.0239L17.9611 9.89139C18.2727 9.55264 18.4286 9.09124 18.4286 8.58312C18.4286 8.075 18.2727 7.61944 17.9611 7.27485L12.7507 1.11899C12.1325 0.388927 11.1247 0.388927 10.5065 1.11899C9.88833 1.84905 9.88833 3.02883 10.5065 3.75889L13.0052 6.70249L1.73249 6.70249C0.854565 6.70249 0.142876 7.53768 0.142876 8.57144C0.142876 9.60521 0.854565 10.4404 1.73249 10.4404L13.0052 10.4404L10.5013 13.384C9.88313 14.1141 9.88313 15.2938 10.5013 16.0239C11.1247 16.754 12.1273 16.754 12.7507 16.0239Z" fill="#939393" />
                                            </Svg>
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

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };

};

// <TouchableOpacity onPress={() => this.gotoPage('ChonSoLuongMa')}>
//                             <View style={[styles.flexRowNT, styles.padding10, styles.bgRead]}>
//                                 <View style={styles.flexRowNT}>
//                                     <Image style={styles.avatar} source={require('../../../asset/images/NoImageProduct.png')}></Image>
//                                     <View style={styles.txtNoti}>
//                                         <Text style={styles.txtN}>Đơn hàng của khách hàng Khách mới vừa được tạo bởi Cương</Text>
//                                         <View style={styles.flexRowNT}>
//                                             <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <Path d="M6.5 0C2.91031 0 0 2.91031 0 6.5C0 10.0897 2.91031 13 6.5 13C10.0897 13 13 10.0897 13 6.5C13 2.91031 10.0897 0 6.5 0ZM9.5 7.5H6.5C6.36739 7.5 6.24021 7.44732 6.14645 7.35355C6.05268 7.25979 6 7.13261 6 7V2.5C6 2.36739 6.05268 2.24021 6.14645 2.14645C6.24021 2.05268 6.36739 2 6.5 2C6.63261 2 6.75979 2.05268 6.85355 2.14645C6.94732 2.24021 7 2.36739 7 2.5V6.5H9.5C9.63261 6.5 9.75979 6.55268 9.85355 6.64645C9.94732 6.74021 10 6.86739 10 7C10 7.13261 9.94732 7.25979 9.85355 7.35355C9.75979 7.44732 9.63261 7.5 9.5 7.5Z" fill="#A29D9D" />
//                                             </Svg>

//                                             <Text style={styles.txtCreate}>08/07/2023 11:08:47</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <Svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <Path d="M12.7507 16.0239L17.9611 9.89139C18.2727 9.55264 18.4286 9.09124 18.4286 8.58312C18.4286 8.075 18.2727 7.61944 17.9611 7.27485L12.7507 1.11899C12.1325 0.388927 11.1247 0.388927 10.5065 1.11899C9.88833 1.84905 9.88833 3.02883 10.5065 3.75889L13.0052 6.70249L1.73249 6.70249C0.854565 6.70249 0.142876 7.53768 0.142876 8.57144C0.142876 9.60521 0.854565 10.4404 1.73249 10.4404L13.0052 10.4404L10.5013 13.384C9.88313 14.1141 9.88313 15.2938 10.5013 16.0239C11.1247 16.754 12.1273 16.754 12.7507 16.0239Z" fill="#939393" />
//                                 </Svg>
//                             </View>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => this.gotoPage('ChonSoLuongMa')}>
//                             <View style={[styles.flexRowNT, styles.padding10]}>
//                                 <View style={styles.flexRowNT}>
//                                     <Image style={styles.avatar} source={require('../../../asset/images/NoImageProduct.png')}></Image>
//                                     <View style={styles.txtNoti}>
//                                         <Text style={styles.txtN}>Đơn hàng của khách hàng Khách mới vừa được tạo bởi Cương</Text>
//                                         <View style={styles.flexRowNT}>
//                                             <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                 <Path d="M6.5 0C2.91031 0 0 2.91031 0 6.5C0 10.0897 2.91031 13 6.5 13C10.0897 13 13 10.0897 13 6.5C13 2.91031 10.0897 0 6.5 0ZM9.5 7.5H6.5C6.36739 7.5 6.24021 7.44732 6.14645 7.35355C6.05268 7.25979 6 7.13261 6 7V2.5C6 2.36739 6.05268 2.24021 6.14645 2.14645C6.24021 2.05268 6.36739 2 6.5 2C6.63261 2 6.75979 2.05268 6.85355 2.14645C6.94732 2.24021 7 2.36739 7 2.5V6.5H9.5C9.63261 6.5 9.75979 6.55268 9.85355 6.64645C9.94732 6.74021 10 6.86739 10 7C10 7.13261 9.94732 7.25979 9.85355 7.35355C9.75979 7.44732 9.63261 7.5 9.5 7.5Z" fill="#A29D9D" />
//                                             </Svg>

//                                             <Text style={styles.txtCreate}>08/07/2023 11:08:47</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <Svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <Path d="M12.7507 16.0239L17.9611 9.89139C18.2727 9.55264 18.4286 9.09124 18.4286 8.58312C18.4286 8.075 18.2727 7.61944 17.9611 7.27485L12.7507 1.11899C12.1325 0.388927 11.1247 0.388927 10.5065 1.11899C9.88833 1.84905 9.88833 3.02883 10.5065 3.75889L13.0052 6.70249L1.73249 6.70249C0.854565 6.70249 0.142876 7.53768 0.142876 8.57144C0.142876 9.60521 0.854565 10.4404 1.73249 10.4404L13.0052 10.4404L10.5013 13.384C9.88313 14.1141 9.88313 15.2938 10.5013 16.0239C11.1247 16.754 12.1273 16.754 12.7507 16.0239Z" fill="#939393" />
//                                 </Svg>
//                             </View>
//                         </TouchableOpacity>


const mapStateToProps = state => ({
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(Notification)
