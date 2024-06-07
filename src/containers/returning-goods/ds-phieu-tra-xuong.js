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
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import productAction from '../../actions/productAction';
import supplierAction from '../../actions/supplierAction';
import { delete_nhap_cook, delete_tra_cook, get_list_tra, get_list_tra_history } from '../../services/productService';
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
    Alert
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import { get_user_list } from '../../services/accountService';

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

class BackToFactory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingMore: false,
            stopFetchMore: true,
            isEnabled: false,
            dataEmPloyee: [],
            user_id: 0,
            status: -1,
            dayFrom: "",
            dayTo: "",
            modalFilterFW: false,
            idDelete: null,
            statusDelete: null,
            modalConfirmDelete: false,
            from: 0,
        }
        // console.log('spp',console.log(this.props.supplier.id));
    }
    componentDidMount() {
        this.setState({ from: 0 })
        // this.getData();
        this.getDataEmPloyee();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.setState({ from: 0 })
                this.getData();
            }
        );
    }

    setIsEnabled = (opt) => {
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

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }

    async getData() {
        if (this.props.admin.roles?.includes('trahang_xuong_list') || this.props.admin.is_admin == 1) {
            if (this.props?.route?.params?.getHistory) {
                const data = await get_list_tra_history({
                    u_id: this.props.admin.uid,
                    id: this.props?.product?.id,
                    type: 2,
                    from: 0
                });
                this.setState({ data: data })

            }
            else {
                const data = await get_list_tra({
                    u_id: this.props.admin.uid,
                    supplier_id: this.props.supplier?.id,
                    type: 2,
                    from: 0
                })
                this.setState({ data: data })

            }
            this.setState({ from: this.state.from + 10 })
        }
        else {
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

        console.log('handleOnEndReached...........');
        console.log(from);

        if (!this.state.stopFetchMore) {
            console.log('from...........');
            console.log(from);
            var newData = [];

            if (this.props?.route?.params?.getHistory) {
                newData = await get_list_tra_history({
                    u_id: this.props.admin.uid,
                    id: this.props?.product?.id,
                    type: 2,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    user_id: this.state.user_id,
                    from: this.state.from,
                });
            }
            else {
                newData = await get_list_tra({
                    u_id: this.props.admin.uid,
                    type: 2,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    user_id: this.state.user_id,
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

    gotoDetailPage(id, chiId) {
        // this.gotoPage(() => { });
        if (this.props.admin.roles?.includes('trahang_xuong_detail') || this.props.admin.is_admin == 1) {
            this.props.productAction('set_tra_id', id);
            this.props.productAction('set_chi_id', chiId);
            this.gotoPage('ChiTietPhieuTraXuong')
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    addTra() {
        if (this.props.admin.roles?.includes('trahang_xuong_add') || this.props.admin.is_admin == 1) {
            if (!this.props?.route?.params?.getHistory) {
                this.props.productAction('current_product_id', 0);
                this.props.supplierAction('current_supplier_id', 0);
            }
            this.props.productAction('set_tra_id', 0);
            this.props.productAction('update_quantity', []);
            this.gotoPage('CreateFormFactory', { getHistory: this.props?.route?.params?.getHistory });
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    async getDataEmPloyee() {
        const data = await get_user_list('Tất cả');
        this.setState({ dataEmPloyee: data });
    }



    async handleFilter() {
        if (this.props.admin.roles?.includes('trahang_xuong_list') || this.props.admin.is_admin == 1) {
            from = 0;
            var dataFrom = '';
            var dataTo = '';
            if (this.state.dayFrom !== "") {
                dataFrom = new Date(this.state.dayFrom).toISOString().split('T')[0];
            }
            if (this.state.dayTo !== "") {
                dataTo = new Date(this.state.dayTo).toISOString().split('T')[0];
            }

            if (this.props?.route?.params?.getHistory) {
                const dataLog = await get_list_tra_history({
                    u_id: this.props.admin.uid,
                    id: this.props?.product?.id,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    user_id: this.state.user_id,
                    type: 2,
                    from: from,
                });
                this.setState({ data: dataLog });
                this.setModalFilterFW(false);
            }
            else {
                const dataLog = await get_list_tra({
                    u_id: this.props.admin.uid,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    user_id: this.state.user_id,
                    supplier_id: this.props.supplier?.id,
                    type: 2,
                    from: from,
                });
                this.setState({ data: dataLog });
                this.setModalFilterFW(false);
            }
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    handleOpenModal(id, status) {
        if (this.props.admin.roles?.includes('trahang_xuong_delete') || this.props.admin.is_admin == 1) {
            this.setState({ idDelete: id });
            this.setState({ statusDelete: status });
            this.setModalConfirmDelete(true);
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }

    async handleConfirm() {
        // const dataLog = await delete_tra()
        // console.log(this.state.idDelete);
        if (this.state.statusDelete == 2) {
            this.setModalConfirmDelete(false);
            Alert.alert('Không được phép xóa toa hàng đã xác nhận!');
        }
        else {
            const dataLog = await delete_tra_cook({
                trahang_id: this.state.idDelete,
                u_id: this.props.admin.uid,
            })
            from = 0;
            this.setModalConfirmDelete(false);
            this.getData();
        }
    }


    // listBill = () => {
    //     var items = new Array();
    //     for (var i = 0; i < 2; i++) {
    //         items.push(
    //             <Swipeout key={i} right={[
    //                 {
    //                     text: 'Xóa',
    //                     onPress: () => {
    //                         // Xử lý hành động chỉnh sửa
    //                     },
    //                     backgroundColor: 'red',
    //                     color: 'white',
    //                 },
    //             ]} >
    //                 <TouchableOpacity onPress={() => this.gotoPage('OrderDetail')}>
    //                     <View style={styles.cardItem}>
    //                         <View style={styles.cardLeft}>
    //                             <Text style={styles.customer}>Khách mời</Text>
    //                             <Text style={styles.txtSP}>#GP9P4P</Text>
    //                             <Text style={styles.txtSP}>12 sản phẩm</Text>
    //                             <Text style={styles.txtSP}>#01052023_KXCF</Text>
    //                             <Text style={{ color: "#DE110E" }}>Note: A cong</Text>
    //                         </View>
    //                         <View style={styles.cardRight}>
    //                             <Text style={styles.price}>4.200.000 đ</Text>
    //                             <View style={[styles.status, styles.pending]}>
    //                                 <Text style={styles.textStatus}>Chờ xác nhận</Text>
    //                                 <Text style={[styles.created, styles.clblack]}>21/06/2023 17:57:23</Text>
    //                             </View>
    //                             <Text style={styles.author}>Nhặt bời Minh | Tạo bởi Cuong 1/5 lúc 18:45</Text>
    //                         </View>
    //                     </View>
    //                 </TouchableOpacity>
    //             </Swipeout>
    //         )
    //     }

    //     return items;
    // }

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }

    render() {
        const { data, dataEmPloyee, status, modalFilterFW, user_id, modalConfirmDelete, loadingMore, dayFrom, dayTo } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => {
                                if (this.props.product.id === 0) {
                                    this.props.navigation.navigate('Profile')
                                } else {
                                    this.props.navigation.goBack()
                                }
                            }}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Danh sách phiểu trả xưởng</Text>

                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.item} onPress={() => {
                                if (this.props.admin.roles?.includes('trahang_xuong_list') || this.props.admin.is_admin == 1) {
                                    this.setModalFilterFW(true);
                                }
                                else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
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
                                                        <Text style={[styles.btn, status === 0 ? styles.btnRed : styles.btnGrey]}>Chờ kiểm hàng</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setStatus(1)}>
                                                        <Text style={[styles.btn, status === 1 ? styles.btnRed : styles.btnGrey]}>Đã kiểm hàng</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setStatus(2)}>
                                                        <Text style={[styles.btn, status === 2 ? styles.btnRed : styles.btnGrey]}>Đã hoàn tất</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={styles.flexRowBW}>
                                                    <Text style={styles.txtTitle}>Lọc theo nhân viên</Text>
                                                    <TouchableOpacity onPress={() => this.setState({ user_id: 0 })}>
                                                        <Text style={[styles.btnRest, styles.btn]}>Reset</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.flexRowWrap}>
                                                    {
                                                        dataEmPloyee?.map((employee, index) => (
                                                            <TouchableOpacity key={index} onPress={() => this.setState({ user_id: employee?.id })}>
                                                                <Text style={[styles.btn, user_id === employee?.id ? styles.btnRed : styles.btnGrey]}>{employee?.fullname}</Text>
                                                            </TouchableOpacity>
                                                        ))
                                                    }
                                                </View>
                                            </View>
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
                                                    this.setState({ user_id: 0 });
                                                    this.setStatus(-1)
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
                            <TouchableOpacity style={styles.item} onPress={() => this.addTra()}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8 1V15" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M1 8H15" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View >

                    {/* <Header {[title = "home"]} /> */}

                    <View style={{ ...styles.containerFluid, backgroundColor: "#fff" }}>
                        {/* {this.listBill()} */}

                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            numColumns={1}
                            renderItem={({ item }) => {
                                let d = item;
                                if (!d.id)
                                    return;
                                else
                                    return (
                                        <Swipeout right={[
                                            {
                                                text: 'Xóa',
                                                onPress: () => this.handleOpenModal(d?.id, d?.status),
                                                backgroundColor: 'red',
                                                color: 'white',
                                            },
                                        ]} >
                                            <TouchableOpacity onPress={() => this.gotoDetailPage(d?.id, d?.chi_id)}>
                                                <View style={styles.cardItem}>
                                                    <View style={styles.cardLeft}>
                                                        <Text style={styles.customer}>{d?.supplier_name}</Text>
                                                        <Text style={styles.txtSP}>{d?.code}</Text>
                                                        <Text style={styles.txtSP}>{d?.totle_quan} sản phẩm</Text>
                                                        {d?.note && <Text style={{ color: "#DE110E" }}>NOTE: {d?.note}</Text>}

                                                    </View>
                                                    <View style={styles.cardRight}>
                                                        <Text style={styles.price}>{d?.totle_price}</Text>

                                                        {
                                                            d?.status == 0 ?
                                                                <View style={{ ...styles.status, backgroundColor: 'black' }}>
                                                                    <Text style={styles.textStatus}>Chờ xác nhận</Text>
                                                                    <Text style={[styles.created, styles.clblack]}>{d?.created}</Text>
                                                                </View> :
                                                                d?.status == 1 ?
                                                                    <View style={{ ...styles.status, backgroundColor: 'grey' }}>
                                                                        <Text style={styles.textStatus}>Đã xác nhận</Text>
                                                                        <Text style={[styles.created, styles.clblack]}>{d?.created}</Text>
                                                                    </View> :
                                                                    d?.status == 2 ?
                                                                        <View style={{ ...styles.status, ...styles.bgYellow }}>
                                                                            <Text style={styles.textStatus}>Đã hoàn tất</Text>
                                                                            <Text style={[styles.created, styles.clblack]}>{d?.created}</Text>
                                                                        </View> : <></>
                                                        }

                                                        <Text style={styles.author}>Tạo bởi {d?.user_name} lúc {d?.created}</Text>
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

                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
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
    };
};

const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
    supplier: state.supplier,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(BackToFactory)
