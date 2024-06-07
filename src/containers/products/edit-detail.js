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
import ModalChonTH from '../elements/ModalChonTH';
import ModalChonNCC from '../elements/ModalChonNCC';
import ModalChonCate from '../elements/ModalChonCate';
import { edit_product, get_detail_product } from '../../services/productService';

import { connect } from 'react-redux';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Modal,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class EditDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isModalVisible3: false,
            price_nhap: '',
            price_buon: '',
            price_le: '',
            price_ctv: '',
        }
    }

    componentDidMount() {
        this.getData();
    }

    setData(opt) {
        this.setState({ data: opt });
    }

    setCode = (opt) => {
        this.setState({ data: { ...this.state.data, code: opt } })
    }

    setTitle = (opt) => {
        this.setState({ data: { ...this.state.data, title: opt } })
    }

    setCategoryId = (opt) => {
        this.setState({ data: { ...this.state.data, category_id: opt } })
    }

    setHangId = (opt) => {
        this.setState({ data: { ...this.state.data, hang_id: opt } })
    }

    setSupplierId = (opt) => {
        this.setState({ data: { ...this.state.data, supplier_id: opt } })
    }

    setPriceNhap = (opt) => {
        this.setState({ price_nhap: opt })
    }

    setPriceBuon = (opt) => {
        this.setState({ price_buon: opt })
    }

    setPriceCtv = (opt) => {
        this.setState({ price_ctv: opt })
    }

    setPriceLe = (opt) => {
        this.setState({ price_le: opt })
    }

    setModalVisible3(opt) {
        this.setState({ isModalVisible3: opt })
    }

    async getData() {
        const dataLog = await get_detail_product({
            id: this.props?.product?.id,
            u_id: this.props.admin.uid,
        });
        // console.log(dataLog?.product?.price_nhap);
        // this.setState({ price_nhap: Number(dataLog?.product?.price_nhap).toLocaleString() });
        // this.setState({ price_le: Number(dataLog?.product?.price_le).toLocaleString() });
        // this.setState({ price_ctv: Number(dataLog?.product?.price_ctv).toLocaleString() });
        // this.setState({ price_buon: Number(dataLog?.product?.price_buon).toLocaleString() });
        this.setState({ price_nhap: this.formatWithCommas(dataLog?.product?.price_nhap) });
        this.setState({ price_le: this.formatWithCommas(dataLog?.product?.price_le) });
        this.setState({ price_ctv: this.formatWithCommas(dataLog?.product?.price_ctv) });
        this.setState({ price_buon: this.formatWithCommas(dataLog?.product?.price_buon) });
        this.setState({ data: dataLog?.product });
    }

    btnConfirm() {
        const newCate = this.props.category?.id;
        const newSupp = this.props.supplier?.id;
        const newHang = this.props.hang?.id;

        this.setState({
            data: {
                ...this.state.data,
                // category_id: newCate,
                supplier_id: newSupp,
                hang_id: newHang,
                u_id: this.props.admin.uid,
                price_nhap: this.state?.price_nhap?.replace(/,/g, ''),
                price_buon: this.state?.price_buon?.replace(/,/g, ''),
                price_le: this.state?.price_le?.replace(/,/g, ''),
                price_ctv: this.state?.price_ctv?.replace(/,/g, ''),
            }
        }, async () => {
            console.log('data sua', this.state.data);
            // return true
            const datalog = await edit_product(this.state.data);
            this.setModalVisible3(false);
            this.props.navigation.navigate('ProductDetail');
        });
    }

    gotoSettingCate() {
        this.props.navigation.navigate('SettingCategory');
    }

    gotoAddSupp() {
        this.props.navigation.navigate('AddSupplier');
    }


    formatWithCommas = (value) => {
        if (value === null) {
            return '0';
        }
        else {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    };

    handlePriceChange = (setPrice) => {
        return (value) => {
            const numericValue = value.replace(/,/g, ''); // Remove existing commas
            const formattedValue = this.formatWithCommas(numericValue);
            setPrice(formattedValue);
        };
    };




    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { price_buon, price_le, price_nhap, price_ctv, isModalVisible3 } = this.state;
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

                        <Text style={styles.title}>Sửa chi tiết sản phẩm</Text>
                        <View style={styles.headerRight}>
                        </View>
                    </View >

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Mã sản phẩm</Text>
                            <View style={styles.flexWidth}>
                                <TextInput
                                    style={[styles.inputValue]}
                                    value={data?.code}
                                    onChangeText={(text) => this.setCode(text)}
                                />
                            </View>
                        </View>
                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Tên sản phẩm</Text>
                            <View style={styles.flexWidth}>
                                <TextInput
                                    style={[styles.inputValue]}
                                    value={data?.title}
                                    onChangeText={(text) => this.setTitle(text)}
                                />
                            </View>
                        </View>
                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Danh mục</Text>
                            <View style={styles.flexWidth}>
                                <ModalChonCate
                                    setCateId={(opt) => this.setCategoryId(opt)}
                                    idCate={data?.category_id}
                                    gotoSetting={() => this.gotoSettingCate()}
                                />
                            </View>
                        </View>
                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Thương hiệu</Text>
                            <View style={styles.flexWidth}>
                                <ModalChonTH
                                    setHangId={(opt) => this.setHangId(opt)}
                                    idHang={data?.hang_id}
                                />
                            </View>
                        </View>
                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Nhà cung cấp</Text>
                            <View style={styles.flexWidth}>
                                <ModalChonNCC
                                    setSuppId={(opt) => this.setSupplierId(opt)}
                                    idSupp={data?.supplier_id}
                                    gotoAddSupp={() => this.gotoAddSupp()}
                                />
                            </View>
                        </View>

                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Giá nhập</Text>
                            <View style={styles.flexWidth}>
                                <TextInput
                                    style={[styles.inputValue]}
                                    value={price_nhap}
                                    onChangeText={this.handlePriceChange(this.setPriceNhap)}
                                />
                            </View>
                        </View>
                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Giá buôn</Text>
                            <View style={styles.flexWidth}>
                                <TextInput
                                    style={[styles.inputValue]}
                                    value={price_buon}
                                    onChangeText={this.handlePriceChange(this.setPriceBuon)}
                                />
                            </View>
                        </View>
                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Giá bán cộng tác viên</Text>
                            <View style={styles.flexWidth}>
                                <TextInput
                                    style={[styles.inputValue]}
                                    value={price_ctv}
                                    onChangeText={this.handlePriceChange(this.setPriceCtv)}
                                />
                            </View>
                        </View>
                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Giá bán lẻ</Text>
                            <View style={styles.flexWidth}>
                                <TextInput
                                    style={[styles.inputValue]}
                                    value={price_le}
                                    onChangeText={this.handlePriceChange(this.setPriceLe)}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.btnGroup1}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={[styles.btnW, styles.bgRed1]}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setModalVisible3(true)}>
                            <Text style={[styles.btnW, styles.bgGreen]}>Lưu</Text>
                        </TouchableOpacity>
                        <Modal visible={isModalVisible3} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalContent}>
                                    <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
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
                    </View>
                    <Footer />
                </View >
            </SafeAreaView >
        );
    };
};

const mapStateToProps = state => ({
    product: state.product,
    category: state.category,
    hang: state.hang,
    supplier: state.supplier,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(EditDetail)

