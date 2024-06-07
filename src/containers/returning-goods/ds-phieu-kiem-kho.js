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
// import DatePicker from 'react-native-datepicker';

import { get_list, get_total, xoaton } from '../../services/kiemkhoService';
import productAction from '../../actions/productAction';
import kiemkhoAction from '../../actions/kiemkhoAction';
import SpinnerComponent from '../elements/Spinner';

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


class DSPhieuKiemKho extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingMore: false,
            stopFetchMore: true,
            isCheck: '1',
            modalFilterFW: false,
            isModalVisible: false,
            isActive: 'Tháng này',
            selectedDateFrom: '',
            selectedDateTo: '',
            modalVisibleD: false,
            type: 1,
            product_id: 0,
            modalDelete: false,
            id: '',
            total: {},
            spinner: false,
        }
        // console.log(this.props.product.id);
    }
    componentDidMount() {
        this.setState({ uid: this.props.admin.uid, product_id: this.props.product.id });
        // this.getData();
        this.getTotal();
        this.props.navigation.addListener(
            'focus',
            () => {
                from = 0;
                this.setState({ uid: this.props.admin.uid, product_id: this.props.product.id });
                this.getData();
            }
        );
    }

    setModalDelete = (opt) => {
        this.setState({ modalDelete: opt });
    }

    setId = (opt) => {
        this.setState({ id: opt });
    }

    setSpinner = (opt) => {
        this.setState({ spinner: opt });
    }

    handleOpenConfirmDelete(id) {
        this.setId(id);
        this.setModalDelete(true);
    }

    async getData() {
        // if (this.props.admin.is_admin != 1) {
        //     this.setState({ isCheck: '2', type: 2 })
        // }
        if (this.props.admin.roles?.includes('kiemkho_list') || this.props.admin.is_admin == 1) {
            var d = this.state;
            d.uid = this.props.admin.uid;
            d.from = from;
            d.product_id = this.props.product.id
            d.isActive = this.state.isActive

            this.setSpinner(true)
            const dataLog = await get_list(d);
            this.setState({ data: dataLog });
            this.setSpinner(false)
            // console.log(this.state);
            // console.log(dataLog);
            // if (dataLog[0].category_title)
            //     this.setState({ current_category_title: dataLog[0].category_title });
            from = 0 + limit;
            // console.log('kiem kho list', dataLog);
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    async handleOnEndReached() {
        this.setState({ loadingMore: true });//(true);

        console.log('handleOnEndReached...........');
        console.log(from);
        if (!this.state.stopFetchMore) {
            console.log('from...........');
            console.log(from);
            var d = this.state;
            d.uid = this.props.admin.uid;
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

    setIsCheck = (opt) => {
        this.setState({ isCheck: opt, type: opt }, () => {
            this.getData();
            this.getTotal();
        });
    }

    setModalFilterFW = (opt) => {
        this.setState({ modalFilterFW: opt });
    }

    setModalVisible = (opt) => {
        this.setState({ isModalVisible: opt });
    }

    setIsActive = (opt) => {
        this.setState({ isActive: opt });
    }


    setModalVisibleD = (opt) => {
        this.setState({ modalVisibleD: opt });
    }

    handleClick = (id) => {
        this.setIsCheck(id);
    }

    gotoPage = (name, values) => {
        this.props.navigation.navigate(name, values);
    }

    toggleModal = () => {
        this.setModalVisible(!this.state.isModalVisible);
    };

    addMaLK = () => {
        this.setModalVisible(!this.state.isModalVisible);
    }

    handleActive = (option) => {
        from = 0;
        this.setModalVisibleD(false);
        this.setIsActive(option, () => {
            this.getData();
            this.getTotal();
        });
    }

    Cancel = () => {
        this.setModalVisibleD(false);
    }

    setSelectedDate = (opt) => {
        this.setState({ selectedDate: opt });
    }

    handleDateChange1(date) {
        // this.setSelectedDate(date);
        this.setState({ selectedDateFrom: date }, () => {
            this.getData();
            this.getTotal();
        });
    }

    handleDateChange2(date) {
        // this.setSelectedDate(date);
        this.setState({ selectedDateTo: date }, () => {
            this.getData();
            this.getTotal();
        });
    }

    gotoChitiet(kiemkho_id, product_id) {
        if (this.props.admin.roles?.includes('kiemkho_detail') || this.props.admin.is_admin == 1) {
            this.props.kiemkhoAction('current_kiemkho_id', kiemkho_id);
            this.props.productAction('current_product_id', product_id);
            this.gotoPage('ChiTIetSuaTon', { list: true });
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }


    async handleDelete() {
        const dataLog = await xoaton(this.props.admin.uid, this.state.id);
        from = 0;
        this.getData();
        this.setModalDelete(false);
    }

    async getTotal() {
        if (this.props.admin.roles?.includes('kiemkho_list') || this.props.admin.is_admin == 1) {
            var d = this.state;
            d.uid = this.props.admin.uid;
            d.product_id = this.props.product.id
            d.isActive = this.state.isActive
            d.type = this.state.type
            this.setSpinner(true)
            const data = await get_total(d);
            this.setState({ total: data });
            this.setSpinner(false)
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    handleFilter = async (filter, type, isCheck) => {
        from = 0
        this.setState({ isActive: filter, type: type, isCheck: isCheck });
        this.setModalVisibleD(false);
        if (this.props.admin.roles?.includes('kiemkho_list') || this.props.admin.is_admin == 1) {
            var d = this.state;
            d.uid = this.props.admin.uid;
            d.from = from;
            d.product_id = this.props.product.id
            d.isActive = filter
            d.type = type

            this.setSpinner(true)
            const dataLog = await get_list(d);
            this.setState({ data: dataLog });
            from = 0 + limit;


            const data = await get_total(d);
            this.setState({ total: data });
            this.setSpinner(false)
        }
        else {
            return false;
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    render() {
        const { isCheck, modalDelete, isModalVisible, isActive, selectedDate, modalVisibleD, data, loadingMore, selectedDateFrom, selectedDateTo, total, type, spinner } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={'Danh sách phiếu kiểm kho'} />

                    <View style={styles.btnGroupFt}>
                        <TouchableOpacity onPress={() => this.setModalVisibleD(true)}>
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
                            visible={modalVisibleD}
                            onRequestClose={() => {
                                this.setModalVisibleD(!modalVisibleD);
                            }}>
                            <View style={[styles.centeredViewS]}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Chọn thời gian</Text>
                                    <TouchableOpacity onPress={() => this.handleFilter('Hôm nay', type, isCheck)}>
                                        <Text style={[styles.txtFilter, isActive === 'Hôm nay' && styles.activeCL]}>Hôm nay</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleFilter('Hôm qua', type, isCheck)}>
                                        <Text style={[styles.txtFilter, isActive === 'Hôm qua' && styles.activeCL]}>Hôm qua</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleFilter('7 ngày qua', type, isCheck)}>
                                        <Text style={[styles.txtFilter, isActive === '7 ngày qua' && styles.activeCL]}>7 ngày qua</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleFilter('Tháng này', type, isCheck)}>
                                        <Text style={[styles.txtFilter, isActive === 'Tháng này' && styles.activeCL]}>Tháng này</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleFilter('Tháng trước', type, isCheck)}>
                                        <Text style={[styles.txtFilter, isActive === 'Tháng trước' && styles.activeCL]}>Tháng trước</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleFilter('Tùy chọn...', type, isCheck)}>
                                        <Text style={[styles.txtFilter, isActive === 'Tùy chọn...' && styles.activeCL]}>Tùy chọn...</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.centeredView1}>
                                <TouchableOpacity onPress={this.Cancel}>
                                    <Text style={styles.txtClose}>Hủy bỏ</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisibleD(!modalVisibleD)}
                                style={styles.modalBackdrop}
                            />
                        </Modal>
                    </View>
                    {isActive == 'Tùy chọn...' && (
                        <View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Từ ngày</Text>
                                <DatePickerComponent setDateTime={(txt) => this.handleDateChange1(txt)} dateTime={selectedDateFrom} />
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Đến ngày</Text>
                                <DatePickerComponent setDateTime={(txt) => this.handleDateChange2(txt)} dateTime={selectedDateTo} />
                            </View>
                        </View>
                    )}

                    <View style={styles.flexRowCh}>
                        <TouchableOpacity onPress={() => {
                            // if (this.props.admin.is_admin == 1) {
                            from = 0;
                            this.handleFilter(isActive, 1, '1');
                            // }
                            // else {
                            //     Alert.alert('Bạn không phép thực hiện hành động này!');
                            // }
                        }}>
                            <Text style={[styles.btnLoadLK, isCheck === '1' && styles.bgGreen]}>Kiểm âm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            from = 0;
                            this.handleFilter(isActive, 2, '2');
                        }}>
                            <Text style={[styles.btnLoadLK, isCheck === "2" && styles.bgGreen]}>Kiểm dương</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            // if (this.props.admin.is_admin == 1) {
                            from = 0;
                            this.handleFilter(isActive, 3, '3');
                            // }
                            // else {
                            //     Alert.alert('Bạn không phép thực hiện hành động này!');
                            // }
                        }}>
                            <Text style={[styles.btnLoadLK, isCheck === "3" && styles.bgGreen]}>Kiểm hòa</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerFluid}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            numColumns={1}
                            renderItem={({ item }) => {
                                // console.log(item?.product_node_id);
                                let d = item;
                                if (!d.id)
                                    return;

                                else
                                    return (

                                        <Swipeout right={[
                                            {
                                                text: 'Xóa',
                                                onPress: () => {
                                                    if (this.props.admin.roles?.includes('kiemkho_delete') || this.props.admin.is_admin == 1) {
                                                        this.handleOpenConfirmDelete(item.id);
                                                    }
                                                    else {
                                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                                    }
                                                },
                                                backgroundColor: 'red',
                                                color: 'white',
                                            },
                                        ]} >

                                            <TouchableOpacity onPress={() => this.gotoChitiet(item.id, item?.product_node_id)}>
                                                <View style={[styles.flexRow, styles.flexRowProduct]}>
                                                    <View style={styles.flexRow}>
                                                        <Image
                                                            style={styles.productImage}
                                                            source={item?.image == null || item?.image?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: item?.image }}
                                                        />
                                                        <View>
                                                            <Text style={styles.productName}>{item.code_sp}</Text>
                                                            <Text style={styles.productCode}>{item.code}</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <View style={[styles.flexRow, styles.flexEndE]}>
                                                            <View style={styles.gpTxt}>
                                                                <Text style={{ ...styles.productTxt, color: "red" }}>{item.price}</Text>
                                                                <Text style={{ ...styles.productTxt, color: "red" }}>{item.status} sp</Text>
                                                            </View>
                                                            <Svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <Path d="M6.875 0C3.08413 0 0 3.08413 0 6.875H2.75C2.75 4.60075 4.60075 2.75 6.875 2.75C9.14925 2.75 11 4.60075 11 6.875C11 8.34488 10.3758 8.88938 8.96363 9.97563C8.43838 10.3799 7.84575 10.8364 7.27788 11.4029C5.47388 13.2055 5.49313 14.9834 5.5 15.125V17.875H8.25V15.1126C8.25 15.0796 8.28162 14.2862 9.22212 13.3471C9.66212 12.9071 10.1599 12.5249 10.6397 12.155C12.0972 11.033 13.75 9.7625 13.75 6.875C13.75 3.08413 10.6659 0 6.875 0ZM5.5 19.25H8.25V22H5.5V19.25Z" fill="red" />
                                                            </Svg>
                                                        </View>
                                                        <Text style={styles.txtNguon}>Tạo bởi {item.creator} {item.created}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Swipeout>
                                    )
                            }}
                            onEndReached={() => this.handleOnEndReached()}
                            onEndReachedThreshold={0.5}
                            onScrollBeginDrag={() => {
                                this.updateStopFetchMore();
                            }}
                            ListFooterComponent={() => loadingMore && <ListFooterComponent />}
                        />
                        {/* {this.renderListItem(data)} */}

                    </View>
                    <View style={styles.flexEnd}>
                        <TouchableOpacity>
                            <View style={styles.flexRowNT}>
                                <Text style={styles.txtNoti}>Tổng sp:  {total.tong_sp} | Tổng tiền: {total.tong_tien}đ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Footer />
                </View >

                <Modal visible={modalDelete} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalContent}>
                            <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                            <View style={styles.btnGroupConfirm}>
                                <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalDelete(false)}>
                                    <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleDelete()}>
                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setModalDelete(false)}
                        style={styles.modalBackdrop}
                    />
                </Modal>
                <SpinnerComponent
                    spinner={spinner}
                />
            </SafeAreaView >
        );
    };
};


const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
    kiemkho: state.kiemkho,
});

const mapDispatchToProps = dispatch => ({
    kiemkhoAction: (act, data) => dispatch(kiemkhoAction(act, data)),
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(DSPhieuKiemKho)

