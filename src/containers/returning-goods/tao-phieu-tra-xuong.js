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
import ModalChonNCC from '../elements/ModalChonNCC';
import CartItem from '../elements/cartItem';
import ModalSearchPhieu from '../elements/ModalSearchPhieu';
import { get_product_supplier, add_tra, get_order_list_tra, change_status_tra } from '../../services/productService';
import CartComponent from '../cart/CartComponent';
import productAction from '../../actions/productAction';
import supplierAction from '../../actions/supplierAction';
import SpinnerComponent from '../elements/Spinner';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class CreateFormFactory extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);
        this.state = {
            text: 'Tìm kiếm',
            isModalVisible3: false,
            isModalVisible4: false,
            isModalVisible5: false,
            showItem: false,
            modalVisible: false,
            supplier_id: 0,
            titleSupp: '',
            dataProduct: [],
            isInputFocused: false,
            textSearch: '',
            dataSearchInput: [],
            dataOrder: {},
            phuThu: '',
            phuChi: '',
            ghiChu: '',
            modalConfirm: false,
            spinner: false,
        },
            console.log(this.props.supplier.id);
    }

    componentDidMount() {
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

    setIsEnabled = (opt) => {
        this.setState({ isEnabled: opt });
    }

    onChangeText = (opt) => {
        this.setState({ text: opt });
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

    setPhuThu = (opt) => {
        this.setState({ phuThu: opt })
    }

    setPhuChi = (opt) => {
        this.setState({ phuChi: opt })
    }

    setSpinner(opt) {
        this.setState({ spinner: opt });
    }

    btnXacNhan = () => {
        this.setModalVisible3(false);
        this.setModalVisible5(true)
    }

    setModalConfirm = (opt) => {
        this.setState({ modalConfirm: opt })
    }

    taoToaHang = () => {
        this.setModalVisible3(true);
    }

    deleteItem = () => {
        console.log("xxx")
        this.setModalVisible(false);
        this.setModalVisible3(true);

    }
    setSupplierId = (opt, callback) => {
        this.setState({ supplier_id: opt }, callback)
    }

    setInputFocused = (opt) => {
        this.setState({ isInputFocused: opt });
    }

    handleInputFocus = () => {
        this.setInputFocused(true);
    };

    setInputSearch = (opt) => {
        this.setState({ textSearch: opt })
    }
    setDataSearch = (opt) => {
        this.setState({ dataSearchInput: opt })
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
        this.props.navigation.navigate('AddSupplier');
    }

    gotoEditQuantity() {
        this.props.navigation.navigate('Quantity', { nhapTra: true });
    }

    async getSupplier(id) {

        const dataLog = await get_product_supplier({
            u_id: this.props.admin.uid,
            supplier_id: id,
        });

        this.setState({ dataProduct: dataLog });

        const data = await add_tra({
            u_id: this.props.admin.uid,
            supplier_id: id,
            type: 2,
        });
        this.props.productAction('set_tra_id', data.trahang_id);
        console.log(data);

    }

    gotoDetail(id, buon) {
        this.props.productAction('get_price', buon)
        this.props.productAction('current_product_id', id);
        this.gotoPage('ChonSoLuongMa', { traxuong: true });
        this.props.productAction('update_quantity', []);
        this.props.productAction('set_type_tra', 2)
        this.setInputFocused(false);
    }

    async getListQuantity() {
        // console.log('product nhap', this.props.product.nhap_id);
        const data = await get_order_list_tra({
            u_id: this.props.admin.uid,
            trahang_id: this.props.product.tra_id,
            type: 2,
        });

        console.log(data);

        this.setState({ dataOrder: data });

        const newColorList = this.props.color.listAllColor?.filter(color =>
            this.state.dataOrder?.order_list?.map((order) => {
                order?.list_quantity?.some(quantity => quantity.color_id === color.id);
            })
        );
        this.setState({ colorList: newColorList });
    }


    async handleConfirm() {
        // console.log({
        //     phuchi: this.state?.phuChi?.replace(/,/g, ''),
        //     phuthu: this.state?.phuThu?.replace(/,/g, ''),
        // });
        this.setModalConfirm(false);
        this.setSpinner(true);
        if (this.props.admin.is_admin == 1) {
            const dataLog = await change_status_tra({
                u_id: this.props.admin.uid,
                ghi_chu: this.state.ghiChu,
                phuchi: this.state?.phuChi?.replace(/,/g, ''),
                phuthu: this.state?.phuThu?.replace(/,/g, ''),
                trahang_id: this.props.product?.tra_id,
                status: 2,
                type: 2,
            });
        }
        else {
            const dataLog = await change_status_tra({
                u_id: this.props.admin.uid,
                ghi_chu: this.state.ghiChu,
                phuchi: this.state?.phuChi?.replace(/,/g, ''),
                phuthu: this.state?.phuThu?.replace(/,/g, ''),
                trahang_id: this.props.product?.tra_id,
                status: 0,
                type: 2,
            });
        }
        this.props.supplierAction('current_supplier_id', 0);
        this.props.productAction('current_product_id', 0);
        this.setSpinner(false);
        this.props.navigation.navigate('BackToFactory');
    }


    formatWithCommas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    handlePriceChange = (setPrice) => {
        return (value) => {
            const numericValue = value.replace(/,/g, ''); // Remove existing commas
            const formattedValue = this.formatWithCommas(numericValue);
            setPrice(formattedValue);
        };
    };



    render() {
        const { supplier_id, dataOrder, phuChi, phuThu, ghiChu, modalConfirm, spinner } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => {
                                if (!this.props?.route?.params?.getHistory) {
                                    this.props.supplierAction('current_supplier_id', 0)
                                }
                                this.props.navigation.goBack();
                            }}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Tạo phiếu trả xưởng</Text>

                        <View style={styles.headerRight}>
                        </View>
                    </View >

                    <View>
                        <View style={[styles.flexRowBW, styles.mt0]}>
                            <Text style={styles.txtChonNCC1}>Nhà cung cấp</Text>
                            <ModalChonNCC
                                setSuppId={(opt) => this.getSupplier(opt)}
                                idSupp={supplier_id}
                                gotoAddSupp={() => this.gotoAddSupp()}
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
                    {this.state.isInputFocused && (
                        <View style={styles.modalOverlay}>
                            <View style={styles.modal}>
                                <ScrollView>
                                    {
                                        this.state.textSearch === '' ?
                                            (
                                                this.state.dataProduct?.map((d, index) => (
                                                    <TouchableOpacity key={index} onPress={() => this.gotoDetail(d?.id, d?.price_buon)}>
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
                                                    <TouchableOpacity key={index} onPress={() => this.gotoDetail(d?.id, d?.price_buon)}>
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
                                            )
                                    }
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setInputFocused(false)}><Text style={{ color: "#0c8ce9", fontWeight: '600' }}>Đóng tìm kiếm</Text></TouchableOpacity>
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styles.modalBackdropFI} onPress={() => this.setInputFocused(false)} />
                        </View>
                    )}
                    {/* <ModalSearchPhieu /> */}

                    <ScrollView style={{ backgroundColor: "#fff", zIndex: 1 }}>

                        {
                            dataOrder?.order_list?.map((product, index) => (
                                console.log('prd tra xuong', product),
                                <CartComponent
                                    key={index}
                                    productItem={product}
                                    data={dataOrder}
                                    reloadData={() => this.getListQuantity()}
                                    gotoQuantity={() => this.gotoEditQuantity()}
                                    traxuong={true}
                                    goBack={() => this.props.navigation.pop()}
                                // gotoProductDetails={() => this.gotoProductDetails()}
                                >
                                </CartComponent>
                            ))
                        }


                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
                    </ScrollView>

                    <View style={styles.groupA}>
                        <View style={[styles.flexRow, styles.item2]}>
                            <View style={[styles.w50, styles.text1]}>
                                <Text style={styles.text2}>Số lượng: {dataOrder?.tongsanpham ? dataOrder?.tongsanpham : 0} ({dataOrder?.soluongsp ? dataOrder?.soluongsp : 0})</Text>
                                <Text style={styles.text2}>Tiền hàng: {dataOrder?.toltal_price ? dataOrder?.toltal_price : 0}</Text>
                            </View>
                            <TextInput
                                style={[styles.w50, styles.text, styles.input1]}
                                multiline={true}
                                numberOfLines={2} placeholder='Ghi chú...'
                                value={ghiChu}
                                onChangeText={(text) => this.setState({ ghiChu: text })}
                            ></TextInput>
                        </View>
                        <View style={[styles.flexRow, styles.item3]}>
                            <View style={[styles.w50, styles.flexRow]}>
                                <Text style={[styles.w50, styles.text1]}>Phụ thu</Text>
                                <TextInput
                                    style={[styles.w50, styles.input2]}
                                    keyboardType="numeric"
                                    placeholder='Phụ thu...'
                                    value={phuThu}
                                    onChangeText={this.handlePriceChange(this.setPhuThu)}
                                ></TextInput>
                            </View>
                            <View style={[styles.w50, styles.flexRow]}>
                                <Text style={[styles.w50, styles.text1]}>Phụ chi</Text>
                                <TextInput
                                    style={[styles.w50, styles.input2]}
                                    keyboardType="numeric"
                                    placeholder='Phụ chi...'
                                    value={phuChi}
                                    onChangeText={this.handlePriceChange(this.setPhuChi)}
                                ></TextInput>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.setModalConfirm(true)}>
                            <Text style={styles.btnB}>Tạo phiếu trả xưởng</Text>
                        </TouchableOpacity>
                        <Modal visible={modalConfirm} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalContent}>
                                    <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ</Text>
                                    <View style={styles.btnGroupConfirm}>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalConfirm(false)}>
                                            <Text style={[styles.txtConfirm, styles.cancel]}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleConfirm()}>
                                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalConfirm(false)}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateFormFactory)
