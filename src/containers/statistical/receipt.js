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
import ModalChonNCC from '../elements/ModalChonNCC';
import { connect } from 'react-redux';
import ModalSearchPhieu from '../elements/ModalSearchPhieu';
import CartItem from '../elements/cartItem';
import supplierAction from '../../actions/supplierAction';
import productAction from '../../actions/productAction';
import { add_nhap, get_order_list_nhap, get_product_supplier, change_status_nhap } from '../../services/productService';
import CartComponent from '../cart/CartComponent';
import SpinnerComponent from '../elements/Spinner';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Image,
    Alert,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class Receipt extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            isModalVisible3: false,
            isModalVisible4: false,
            isModalVisible5: false,
            showItem: false,
            modalVisible: false,
            supplier_id: 0,
            dataProduct: [],
            isInputFocused: false,
            textSearch: '',
            dataSearchInput: [],
            dataOrder: {},
            checkedStatus: this.props.route?.params?.confirm,
            spinner: false,
        };
        // console.log('prd id', this.props?.route?.params?.getHistory);

        console.log('nhap nhanh', this.props.route?.params?.nhapNhanh);

    }
    componentDidMount() {
        // this.props.productAction('set_nhap_id', -1);
        // this.getSupplier();
        // this.getProductBySupplier();
        if (this.props.product.id !== 0) {
            this.gotoPage('ChonSoLuongMa', { nhap: true, nhapNhanh: this.props.route?.params?.nhapNhanh });
            // this.props.productAction('update_quantity', []);
        }
        if (this.props.supplier.id !== 0) {
            this.getSupplier();
        }
        this.props.navigation.addListener(
            'focus',
            () => {
                this.getListQuantity();
            }
        );
    }
    setShowItem(opt) {
        this.setState({ showItem: opt })
    }
    setModalVisible3 = (opt) => {
        this.setState({ isModalVisible3: opt });
    }
    setModalVisible4 = (opt) => {
        this.setState({ isModalVisible4: opt });
    }
    setModalVisible5 = (opt) => {
        this.setState({ isModalVisible5: opt });
    }
    setModalVisible(opt) {
        this.setState({ modalVisible: opt })
    }
    setSupplierId = (opt, callback) => {
        this.setState({ supplier_id: opt }, callback)
    }
    setDataSearch = (opt) => {
        this.setState({ dataSearchInput: opt })
    }

    setSpinner(opt) {
        this.setState({ spinner: opt });
    }



    async btnXacNhan() {
        // console.log(Object.keys(this.state.dataOrder).length === 0);
        if (Object.keys(this.state.dataOrder).length === 0) {
            this.setModalVisible4(true);
            this.setModalVisible5(false);
        }
        else {
            this.setSpinner(true);
            const dataLog = await change_status_nhap({
                status: 0,
                nhap_id: this.props.product.nhap_id,
                u_id: this.props.admin.uid,
            })
            this.setModalVisible5(false);
            if (this.props?.route?.params?.nhapNhanh || this.props?.route?.params?.getHistory) {
                this.props.productAction('current_product_id', this.props.product.id);
                this.props.supplierAction('current_supplier_id', this.props.supplier.id);
            }
            else {
                this.props.productAction('current_product_id', 0);
                this.props.supplierAction('current_supplier_id', 0);
            }
            this.props.navigation.goBack();
            this.setSpinner(false);
        }
    }

    taoToaHang = () => {
        if (this.state?.checkedStatus) {
            if (this.props.admin.roles?.includes('nhap_confirm') || this.props.admin.is_admin == 1) {
                this.props.navigation.navigate('NhapTraOrderConfirm');
            } else {
                Alert.alert('Bạn không phép thực hiện hành động này!');
            }
        } else {
            if (this.props.admin.roles?.includes('nhap_add') || this.props.admin.is_admin == 1) {
                this.setModalVisible5(true);
            }
            else {
                Alert.alert('Bạn không phép thực hiện hành động này!');
            }
        }
    }

    // deleteItem = () => {
    //     console.log("xxx")
    //     this.setModalVisible(false);
    //     this.setModalVisible3(true);

    // }

    setInputFocused = (opt) => {
        this.setState({ isInputFocused: opt });
    }

    handleInputFocus = () => {
        this.setInputFocused(true);
    };

    setInputSearch = (opt) => {
        this.setState({ textSearch: opt })
    }

    handleInputChange = (text) => {
        this.setInputSearch(text);
        // console.log('Input Value', text);
        const filteredSuggestions = this.state.dataProduct.filter((dataProduct) => {
            if (dataProduct.code && dataProduct.title && text) {
                return (
                    dataProduct.title.toLowerCase().includes(text.toLowerCase()) ||
                    dataProduct.code.toLowerCase().includes(text.toLowerCase())
                )
            }
            return false;
        });
        // console.log('sear', filteredSuggestions);
        this.setDataSearch(filteredSuggestions)

    };

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }

    gotoAddSupp() {
        if (this.state.checkedStatus) {
            return
        } else {
            this.props.navigation.navigate('AddSupplier');
        }
    }

    gotoEditQuantity() {
        this.props.navigation.navigate('Quantity', { nhapTra: true });
    }

    // async getProductBySupplier() {
    //     const dataLog = await get_product_supplier({
    //         u_id: 0,
    //         supplier_id: this.props.supplier.id,
    //     });

    //     this.setState({ dataProduct: dataLog });
    // }

    async getSupplier(id) {
        const dataLog = await get_product_supplier({
            u_id: this.props.admin.uid,
            supplier_id: id,
        });

        this.setState({ dataProduct: dataLog });

        const data = await add_nhap({
            u_id: this.props.admin.uid,
            supplier_id: id,
        });
        this.props.productAction('set_nhap_id', data.nhap_id);

    }

    gotoDetail(id, buon) {
        if (this.state.checkedStatus) {
            if (this.props.admin.roles?.includes('nhap_edit') || this.props.admin.is_admin == 1) {
                this.props.productAction('get_price', buon)
                this.props.productAction('current_product_id', id);
                this.gotoPage('ChonSoLuongMa', { nhap: true });
                this.props.productAction('update_quantity', []);
                this.setInputFocused(false);
            }
            else {
                Alert.alert('Bạn không phép thực hiện hành động này!');
            }
        }
        else {
            this.props.productAction('get_price', buon)
            this.props.productAction('current_product_id', id);
            this.gotoPage('ChonSoLuongMa', { nhap: true });
            this.props.productAction('update_quantity', []);
            this.setInputFocused(false);
        }
    }

    async getListQuantity() {
        // console.log('product nhap', this.props.product.nhap_id);
        const data = await get_order_list_nhap({
            u_id: this.props.admin.uid,
            nhap_id: this.props.product.nhap_id,
        });
        // console.log(this.props.product.nhap_id);
        // console.log(data.order_list);

        this.setState({ dataOrder: data });
        this.props?.productAction('set_chi_id', data?.chi_id);
        // console.log('cart_data', data.order_list);

        const newColorList = this.props.color.listAllColor?.filter(color =>
            this.state.dataOrder?.order_list?.map((order) => {
                order?.list_quantity?.some(quantity => quantity.color_id === color.id);
            })
        );
        this.setState({ colorList: newColorList });
    }

    goBack() {
        if (this.props?.route?.params?.getHistory && this.props.route?.params?.addNhapFromList) {
            this.props.productAction('current_product_id', this.props.product.id);
            this.props.supplierAction('current_supplier_id', this.props.supplier.id);
        }
        else {
            this.props.productAction('current_product_id', 0);
            this.props.supplierAction('current_supplier_id', 0);
        }
        this.props.navigation.goBack();
    }

    render() {
        const { supplier_id, dataOrder, checkedStatus, spinner } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{
                        backgroundColor: '#b8101f',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'flex-start',
                            alignItems: "center",
                        }}>
                            <TouchableOpacity style={styles.menu} onPress={() => {
                                // if (!this.props.route?.params?.addNhapFromList) {
                                //     this.props.supplierAction('current_supplier_id', 0);
                                // }
                                this.goBack();
                            }}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text style={{
                            color: "#fff",
                            fontWeight: "700",
                            textAlign: 'center',
                            fontSize: 13,
                        }}>{checkedStatus ? 'Chi tiết toa nhập' : 'Phiếu nhập hàng'}</Text>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'flex-end',
                        }}>
                            <TouchableOpacity onPress={() => this.gotoPage("AddProduct")}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M14.8571 6.85714H9.14286V1.14286C9.14286 0.512 8.63086 0 8 0C7.36914 0 6.85714 0.512 6.85714 1.14286V6.85714H1.14286C0.512 6.85714 0 7.36914 0 8C0 8.63086 0.512 9.14286 1.14286 9.14286H6.85714V14.8571C6.85714 15.488 7.36914 16 8 16C8.63086 16 9.14286 15.488 9.14286 14.8571V9.14286H14.8571C15.488 9.14286 16 8.63086 16 8C16 7.36914 15.488 6.85714 14.8571 6.85714Z" fill="white" />
                                </Svg>

                            </TouchableOpacity>
                        </View>
                    </View >

                    <View>
                        <View style={styles.flexRowBW}>
                            <Text style={styles.txtChonNCC}>Nhà cung cấp</Text>
                            <ModalChonNCC
                                setSuppId={(id) => this.getSupplier(id)}
                                idSupp={supplier_id}
                                gotoAddSupp={() => this.gotoAddSupp()}
                                checkedStatus={checkedStatus}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M14.6339 12.8664L11.4607 9.69323C12.1164 8.70509 12.5001 7.52195 12.5001 6.25007C12.5001 2.80378 9.69635 0 6.25007 0C2.80378 0 0 2.80378 0 6.25007C0 9.69635 2.80378 12.5001 6.25007 12.5001C7.52195 12.5001 8.70509 12.1164 9.69323 11.4607L12.8664 14.6339C13.3539 15.122 14.1464 15.122 14.6339 14.6339C15.122 14.1458 15.122 13.3545 14.6339 12.8664ZM1.87502 6.25007C1.87502 3.83754 3.83754 1.87502 6.25007 1.87502C8.66259 1.87502 10.6251 3.83754 10.6251 6.25007C10.6251 8.66259 8.66259 10.6251 6.25007 10.6251C3.83754 10.6251 1.87502 8.66259 1.87502 6.25007Z" fill="#757575" />
                        </Svg>
                        <TextInput
                            style={styles.inputsearch}
                            placeholder="Tìm kiếm"
                            onFocus={() => this.handleInputFocus()}
                            value={this.state.textSearch}
                            onChangeText={(text) => this.handleInputChange(text)}
                        />
                    </View>

                    {/* ấn vào thanh search hiện ra */}
                    {/* <ModalSearchPhieu /> */}

                    {this.state.isInputFocused && (
                        <View style={styles.modalOverlay}>
                            <View style={styles.modal}>
                                <ScrollView>
                                    {
                                        this.state.textSearch === '' ?
                                            (
                                                this.state.dataProduct?.map((d, index) => (
                                                    <TouchableOpacity key={index} onPress={() => {
                                                        this.gotoDetail(d?.id, d?.price_buon);
                                                        this.setInputFocused(true);
                                                    }}>
                                                        <View style={styles.cardItemS}>
                                                            <Image style={styles.thumbnail} source={d?.image === null || d?.image.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>

                                                            <View style={styles.cardContent}>
                                                                <View style={styles.itemInfo}>
                                                                    <Text style={[styles.clback, styles.name]}>{d?.code} - {d?.title}</Text>
                                                                    <Text style={styles.clback}>Giá: {
                                                                        d?.price_buon_txt
                                                                    } đ</Text>
                                                                    <Text style={styles.clback}>Tồn: {d?.totle_buy ? Number(d?.totle_buy).toLocaleString() : 0} / {d?.totle_quan ? Number(d?.totle_quan).toLocaleString() : 0}</Text>
                                                                </View>
                                                                <View style={styles.date}>
                                                                    <Text style={{ fontSize: 11 }}>Ngày về :  {d?.ngaynhap?.split(' ')[0]}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            ) : (
                                                this.state.dataSearchInput?.map((d, index) => (
                                                    <TouchableOpacity key={index} onPress={() => {
                                                        this.gotoDetail(d?.id, d?.price_buon);
                                                        this.setInputFocused(true);
                                                    }}>
                                                        <View style={styles.cardItemS}>
                                                            <Image style={styles.thumbnail} source={d?.image === null || d?.image.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>

                                                            <View style={styles.cardContent}>
                                                                <View style={styles.itemInfo}>
                                                                    <Text style={[styles.clback, styles.name]}>{d?.code} - {d?.title}</Text>
                                                                    <Text style={styles.clback}>Giá: {
                                                                        d?.price_buon_txt
                                                                    } đ</Text>
                                                                    <Text style={styles.clback}>Tồn: {d?.totle_buy ? Number(d?.totle_buy).toLocaleString() : 0} / {d?.totle_quan ? Number(d?.totle_quan).toLocaleString() : 0}</Text>
                                                                </View>
                                                                <View style={styles.date}>
                                                                    <Text style={{ fontSize: 11 }}>Ngày về : {d?.ngaynhap?.split(' ')[0]}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            )
                                    }
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setInputFocused(false)}><Text style={{ color: "#0c8ce9", fontWeight: '600' }}>Đóng tìm kiếm</Text></TouchableOpacity>
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styles.modalBackdropFI} onPress={() => this.setInputFocused(false)} />
                        </View>
                    )}

                    <ScrollView style={{ backgroundColor: "#fff", zIndex: 1 }}>

                        {
                            dataOrder?.order_list?.map((product, index) => (
                                <CartComponent
                                    key={index}
                                    productItem={product}
                                    data={dataOrder}
                                    reloadData={() => this.getListQuantity()}
                                    gotoQuantity={() => this.gotoEditQuantity()}
                                    nhap={true}
                                    // disableFunction={false}
                                    nhapFunction={true}
                                    checkedStatus={checkedStatus}
                                    goBack={() => this.props.navigation.pop()}
                                // gotoProductDetails={() => this.gotoProductDetails()}
                                >
                                </CartComponent>
                            ))
                        }


                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
                    </ScrollView>
                    <View>
                        <TouchableOpacity onPress={() => this.taoToaHang()}>
                            {
                                checkedStatus ? (
                                    <Text style={styles.btnCreate}>Xác nhận</Text>

                                ) : (
                                    <Text style={styles.btnCreate}>Tạo toa ({dataOrder?.soluongsp ? dataOrder?.soluongsp : 0} - {dataOrder?.toltal_price}đ)</Text>
                                )
                            }
                        </TouchableOpacity>
                        <Modal visible={this.state.isModalVisible5} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalContent}>
                                    <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ</Text>
                                    <View style={styles.btnGroupConfirm}>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible5(false)}>
                                            <Text style={[styles.txtConfirm, styles.cancel]}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.btnXacNhan()}>
                                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible5(false)}
                                style={styles.modalBackdrop}
                            />
                        </Modal>
                        <Modal visible={this.state.isModalVisible4} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalContent}>
                                    <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chưa chọn sản phẩm cho toa nhập!</Text>
                                    <View style={styles.btnGroupConfirm}>
                                        <TouchableOpacity onPress={() => this.setModalVisible4(false)}>
                                            <Text style={styles.cancelModal}>OK</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible4(false)}
                                style={styles.modalBackdrop}
                            />
                        </Modal>
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
    product: state.product,
    supplier: state.supplier,
    color: state.color,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Receipt)
