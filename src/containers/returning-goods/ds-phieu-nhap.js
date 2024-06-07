/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Footer from '../elements/Footer';
import Swipeout from 'react-native-swipeout';
// import DatePicker, { PaperProvider } from 'react-native-datepicker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import productAction from '../../actions/productAction';
import supplierAction from '../../actions/supplierAction';
import { connect } from 'react-redux';
import { delete_nhap_cook, get_list_nhap, get_list_nhap_history } from '../../services/productService';
import DatePickerComponent from '../elements/DatePickerComponent';

// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert,
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


class DSPhieuNhap extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingMore: false,
            stopFetchMore: true,
            isEnabled: false,
            modalFilterFW: false,
            selectedDate: null,
            showDatePicker: false,
            status: -1,
            dayFrom: '',
            dayTo: '',
            modalConfirmDelete: false,
            idDelete: null,
            statusDelete: null,
            from: 0,
        }
    }

    componentDidMount() {
        this.setState({ from: 0 })
        // this.getData();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.setState({ from: 0 })
                this.getData();
            }
        );
    }

    setIsEnabled(opt) {
        this.setState({ isEnabled: opt })
    }

    setModalConfirmDelete(opt) {
        this.setState({ modalConfirmDelete: opt })
    }

    setModalFilterFW(opt) {
        this.setState({ modalFilterFW: opt })
    }

    setSelectedDate(opt) {
        this.setState({ selectedDate: opt })
    }

    setShowDatePicker(opt) {
        this.setState({ showDatePicker: opt })
    }

    setStatus(opt) {
        this.setState({ status: opt })
    }

    setDayFrom(opt) {
        this.setState({ dayFrom: opt })
    }

    setDayTo(opt) {
        this.setState({ dayTo: opt })
    }

    toggleSwitch = () => this.setIsEnabled(!this.state.isEnabled);
    handleDateChange = (date) => {
        this.setSelectedDate(date);
        this.setShowDatePicker(false);
    };

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }

    gotoDetailPage(id, chiID, status, suppId) {
        if (this.props.admin.roles?.includes('nhap_detail') || this.props.admin.is_admin == 1) {
            if (status == 1) {
                this.gotoPage('PrescriptionDtail');
                this.props.productAction('set_nhap_id', id);
                this.props.productAction('set_chi_id', chiID);
                this.props.supplierAction('current_supplier_id', suppId);
            }
            else if (status == 0) {
                this.gotoPage('Receipt', { confirm: true });
                this.props.productAction('set_nhap_id', id);
                this.props.supplierAction('current_supplier_id', suppId);
            }
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    addNhap() {
        if (this.props.admin.roles?.includes('nhap_add') || this.props.admin.is_admin == 1) {
            if (!this.props?.route?.params?.getHistory) {
                this.props.productAction('current_product_id', 0);
                this.props.supplierAction('current_supplier_id', 0);
            }
            this.props.productAction('set_nhap_id', 0);
            this.props.productAction('update_quantity', []);
            this.gotoPage('Receipt', { addNhapFromList: true, getHistory: this.props?.route?.params?.getHistory });
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    async getData() {
        // console.log(this.props?.product?.id);
        if (this.props.admin.roles?.includes('nhap_list') || this.props.admin.is_admin == 1) {
            if (this.props?.product?.id === 0) {
                const data = await get_list_nhap({
                    u_id: this.props.admin.uid,
                    supplier_id: this.props?.supplier?.id,
                    from: 0,
                });
                this.setState({ data: data })
            }
            else {
                const data = await get_list_nhap_history({
                    u_id: this.props.admin.uid,
                    id: this.props?.product?.id,
                    from: 0
                })
                this.setState({ data: data })
            }

            this.setState({ from: this.state.from + 10 })

        } else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    async handleOnEndReached() {
        var dataFrom = '';
        var dataTo = '';
        if (this.state.dayFrom !== "") {
            dataFrom = new Date(this.state.dayFrom).toISOString().split('T')[0];
        }
        if (this.state.dayTo !== "") {
            dataTo = new Date(this.state.dayTo).toISOString().split('T')[0];
        }
        this.setState({ loadingMore: true });//(true);

        if (!this.state.stopFetchMore) {
            var newData = [];

            if (this.props?.product?.id === 0) {
                newData = await get_list_nhap({
                    u_id: this.props.admin.uid,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    supplier_id: this.props?.supplier?.id,
                    from: this.state.from,
                });
            }
            else {
                newData = await get_list_nhap_history({
                    u_id: this.props.admin.uid,
                    id: this.props?.product?.id,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    from: this.state.from,
                })
            }

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

    async handleFilter() {
        if (this.props.admin.roles?.includes('nhap_list') || this.props.admin.is_admin == 1) {
            from = 0;
            var dataFrom = '';
            var dataTo = '';
            if (this.state.dayFrom !== "") {
                dataFrom = new Date(this.state.dayFrom).toISOString().split('T')[0];
            }
            if (this.state.dayTo !== "") {
                dataTo = new Date(this.state.dayTo).toISOString().split('T')[0];
            }

            if (this.props?.product?.id === 0) {
                const data = await get_list_nhap({
                    u_id: this.props.admin.uid,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    supplier_id: this.props?.supplier?.id,
                    from: from,
                })
                console.log(data);
                this.setState({ data: data });
                this.setModalFilterFW(false);
            }
            else {
                const data = await get_list_nhap_history({
                    u_id: this.props.admin.uid,
                    id: this.props?.product?.id,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    from: from,
                })
                this.setState({ data: data });
                this.setModalFilterFW(false);
            }
            from = 0 + limit;
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    handleOpenModal(id, status) {
        this.setState({ idDelete: id });
        this.setState({ statusDelete: status });
        this.setModalConfirmDelete(true);
    }

    async handleConfirm() {
        // const dataLog = await delete_tra()
        if (this.state.statusDelete == 1) {
            this.setModalConfirmDelete(false);
            Alert.alert('Không được phép xóa toa hàng đã xác nhận!');
        } else {
            const dataLog = await delete_nhap_cook({
                nhap_id: this.state.idDelete,
                u_id: this.props.admin.uid,
            })
            from = 0;
            this.setModalConfirmDelete(false);
            this.getData();
        }
    }

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }

    render() {
        const { isEnabled, modalFilterFW, selectedDate, showDatePicker, data, status, modalConfirmDelete, loadingMore, stopFetchMore, dayFrom, dayTo } = this.state;
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

                        <Text style={styles.title}>Danh sách phiếu nhập</Text>

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
                                    this.setModalFilterFW(false);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView1}>
                                        <ScrollView>
                                            <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo trạng thái</Text>
                                                    <TouchableOpacity onPress={() => this.setStatus(-1)}>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    <TouchableOpacity onPress={() => this.setStatus(0)}>
                                                        <Text style={[styles.btn, status === 0 ? styles.btnRed : styles.btnGrey]}>Chờ xác nhận</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setStatus(1)}>
                                                        <Text style={[styles.btn, status === 1 ? styles.btnRed : styles.btnGrey]}>Đã xác nhận</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            {/* <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo  đã thanh toán</Text>
                                                    <TouchableOpacity onPress={() => this.setState({ status: "" })}>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    <TouchableOpacity onPress={() => this.setStatus(1)}>
                                                        <Text style={[styles.btn, status === 1 ? styles.btnRed : styles.btnGrey]}>Đã thanh toán</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setStatus(0)}>
                                                        <Text style={[styles.btn, status === 0 ? styles.btnRed : styles.btnGrey]}>Chưa thanh toán</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View> */}
                                            <View>
                                                <View style={[styles.flexRowBW, styles.mb20]}>
                                                    <Text style={styles.txtTitle}>Lọc theo thời gian</Text>
                                                    <TouchableOpacity onPress={() => {
                                                        this.setDayFrom('');
                                                        this.setDayTo('');
                                                    }}>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowDate}>
                                                    <Text style={[styles.txtTitle, styles.txtDate]}>Từ ngày</Text>
                                                    <DatePickerComponent setDateTime={(text) => this.setDayFrom(text)} dateTime={dayFrom}></DatePickerComponent>
                                                </View>
                                                <View style={styles.flexRowDate}>
                                                    <Text style={[styles.txtTitle, styles.txtDate]}>Đến ngày</Text>
                                                    <DatePickerComponent setDateTime={(text) => this.setDayTo(text)} dateTime={dayTo}></DatePickerComponent>
                                                </View>
                                            </View>

                                            <View>
                                                <TouchableOpacity onPress={() => {
                                                    this.setDayFrom('');
                                                    this.setDayTo('');
                                                    this.setStatus(-1);
                                                }}>
                                                    <Text style={[styles.btnRest, styles.resetAll]}>Reset tất cả</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.handleFilter()}>
                                                    <Text style={[styles.btnRest, styles.resetAll]}>Lọc</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalFilterFW(!modalFilterFW)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            {/* {
                                this.props.admin.groupId == 1 && */}
                            <TouchableOpacity style={styles.item} onPress={() => this.addNhap()}>
                                <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M10.5 2V19" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M2 10.5H19" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </TouchableOpacity>
                            {/* } */}
                        </View>
                    </View >

                    {/* <Header {[title = "home"]} /> */}

                    <View style={{ ...styles.containerFluid, backgroundColor: "#fff" }}>
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index}
                            numColumns={1}
                            renderItem={({ item }) => {
                                let d = item;
                                // console.log(1);
                                if (!d.id)
                                    return;

                                else

                                    return (
                                        <Swipeout key={d.id} right={[
                                            {
                                                text: 'Xóa',
                                                onPress: () => {
                                                    if (this.props.admin.roles?.includes('nhap_delete') || this.props.admin.is_admin == 1) {
                                                        this.handleOpenModal(d?.id, d?.status);
                                                    } else {
                                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                                    }
                                                },
                                                backgroundColor: 'red',
                                                color: 'white',
                                            },
                                        ]} >
                                            <TouchableOpacity onPress={() => this.gotoDetailPage(d?.id, d?.chi_id, d.status, d?.supplier_id)}>
                                                <View style={styles.cardItem}>
                                                    <View style={styles.cardLeft}>
                                                        <Text style={styles.customer}>{d?.supplier_name}</Text>
                                                        <Text style={styles.txtSP}>{d?.code}</Text>
                                                        <Text style={styles.txtSP}>{d?.totle_quan} sản phẩm</Text>
                                                        <Text style={{ color: "#DE110E" }}>{d?.ghi_chu}</Text>
                                                    </View>
                                                    <View style={styles.cardRight}>
                                                        <Text style={styles.price}>{d?.totle_price === "" ? 0 : d?.totle_price} đ</Text>

                                                        {d?.status == 0 ?
                                                            <View style={{ ...styles.status, backgroundColor: 'black' }}>
                                                                <Text style={styles.textStatus}>Chưa xác nhận</Text>
                                                                <Text style={[styles.created, styles.clblack]}>{d?.modified}</Text>
                                                            </View> :
                                                            d?.status == 1 ?
                                                                <View style={{ ...styles.status, ...styles.bgYellow }}>
                                                                    <Text style={styles.textStatus}>Đã xác nhận</Text>
                                                                    <Text style={[styles.created, styles.clblack]}>{d?.modified}</Text>
                                                                </View> : <></>
                                                        }

                                                        <Text style={styles.author}>Tạo bởi {d?.user_name} {d?.created}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Swipeout>
                                    )
                            }}
                            onEndReached={() => this.handleOnEndReached()}
                            onEndReachedThreshold={0}
                            onScrollBeginDrag={() => {
                                this.updateStopFetchMore();
                            }}
                            ListFooterComponent={() => loadingMore && <ListFooterComponent />}
                        />


                        {/*
                            data?.map((d, i) => (
                                // console.log(d),
                                <Swipeout key={i} right={[
                                    {
                                        text: 'Xóa',
                                        onPress: () => this.handleOpenModal(d?.id, d?.status),
                                        backgroundColor: 'red',
                                        color: 'white',
                                    },
                                ]} >
                                    <TouchableOpacity onPress={() => this.gotoDetailPage(d?.id, d?.chi_id, d?.status, d?.supplier_id)}>
                                        <View style={styles.cardItem}>
                                            <View style={styles.cardLeft}>
                                                <Text style={styles.customer}>{d?.supplier_name}</Text>
                                                <Text style={styles.txtSP}>{d?.code}</Text>
                                                <Text style={styles.txtSP}>{d?.totle_quan} sản phẩm</Text>
                                                <Text style={{ color: "#DE110E" }}>{d?.note}</Text>
                                            </View>
                                            <View style={styles.cardRight}>
                                                <Text style={styles.price}>{d?.totle_price}</Text>

                                                {d?.status == 0 ?
                                                    <View style={{ ...styles.status, backgroundColor: 'black' }}>
                                                        <Text style={styles.textStatus}>Chờ xác nhận</Text>
                                                        <Text style={[styles.created, styles.clblack]}>{d?.modified}</Text>
                                                    </View> :
                                                    d?.status == 1 ?
                                                        <View style={{ ...styles.status, ...styles.bgYellow }}>
                                                            <Text style={styles.textStatus}>Đã xác nhận</Text>
                                                            <Text style={[styles.created, styles.clblack]}>{d?.modified}</Text>
                                                        </View> : <></>
                                                }

                                                <Text style={styles.author}>Tạo bởi {d?.user_name} {d?.created}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Swipeout>
                            ))
                        */}
                    </View>

                    <Footer />
                </View >
                <Modal visible={modalConfirmDelete} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalContent}>
                            <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ</Text>
                            <View style={styles.btnGroupConfirm}>
                                <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalConfirmDelete(false)}>
                                    <Text style={[styles.txtConfirm, styles.cancel]}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleConfirm()}>
                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setModalConfirmDelete(false)}
                        style={styles.modalBackdrop}
                    />
                </Modal>
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
    supplier: state.supplier
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(DSPhieuNhap)
