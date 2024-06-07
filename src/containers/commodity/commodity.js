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
import { connect } from 'react-redux';
import { get_category_products_by_option } from '../../services/productService';
import productAction from '../../actions/productAction';
import supplierAction from '../../actions/supplierAction';
import hangAction from '../../actions/hangAction';
import categoryAction from '../../actions/categoryAction';
import colorAction from '../../actions/colorAction';
import sizeAction from '../../actions/sizeAction';
import FastImage from 'react-native-fast-image';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
    FlatList
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import CategoryComponent from './CategoryComponent';

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
class Commodity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isOpen: false,
            selectedOption: 'Sản phẩm mới',
            selecteCate: 'Sản phẩm mới',
            modalVisible: false,
            isOpen1: false,
            hh_status: '',
            price_from: 0,
            price_to: 0,
            price_type: 2, //giá buôn
            price_field: '', //giá buôn
            loadingMore: false,


            category_id: '',
            supplier_id: '',
            hang_id: '',
            price_from: '',
            price_to: '',
            quantity_from: '',
            quantity_to: '',
            phanLoai: -1,
            trangThai: -1,
            dungBan: -1,
            index: '',
            from: 0,
        }

        // console.log(this.props.category.listCategory);
    }

    componentDidMount() {
        this.setState({ from: 0 })
        // this.getData(this.state.selectedOption, {
        //     category_id: this.state.category_id,
        //     supplier_id: this.state.supplier_id,
        //     hang_id: this.state.hang_id,
        //     price_from: this.state.price_from,
        //     price_to: this.state.price_to,
        //     quantity_from: this.state.quantity_from,
        //     quantity_to: this.state.quantity_to,
        //     phan_loai: this.state.phanLoai,
        //     trang_thai: this.state.trangThai,
        //     dung_ban: this.state.dungBan,
        // });

        price_field = 'price_buon_txt';

        if (this.state.price_type == 1)
            price_field = 'price_nhap_txt';

        if (this.state.price_type == 3)
            price_field = 'price_le_txt';

        if (this.state.price_type == 4)
            price_field = 'price_ctv_txt';


        this.setState({ price_field: price_field });


        this.props.navigation.addListener(
            'focus',
            () => {
                this.setState({ from: 0 })
                this.getData(this.state.selectedOption, {
                    category_id: this.state.category_id,
                    supplier_id: this.state.supplier_id,
                    hang_id: this.state.hang_id,
                    price_from: this.state.price_from,
                    price_to: this.state.price_to,
                    quantity_from: this.state.quantity_from,
                    quantity_to: this.state.quantity_to,
                    phan_loai: this.state.phanLoai,
                    trang_thai: this.state.trangThai,
                    dung_ban: this.state.dungBan,
                });
            }
        );
    }

    setCategory(opt) {
        this.setState({ category_id: opt });
    }

    setIndex(opt) {
        this.setState({ index: opt })
    }

    setSupplier(opt) {
        this.setState({ supplier_id: opt });
    }

    setHang(opt) {
        this.setState({ hang_id: opt });
    }

    setPriceFrom(opt) {
        this.setState({ price_from: opt });
    }

    setPriceTo(opt) {
        this.setState({ price_to: opt });
    }

    setQuantityFrom(opt) {
        this.setState({ quantity_from: opt });
    }

    setQuantityTo(opt) {
        this.setState({ quantity_to: opt });
    }

    setPhanLoai(opt) {
        this.setState({ phanLoai: opt });
    }

    setTrangThai(opt) {
        this.setState({ trangThai: opt });
    }

    setDungBan(opt) {
        console.log(opt);
        this.setState({ dungBan: opt });
    }


    setIsOpen(opt) {
        this.setState({ isOpen: opt });
    }
    setSelectedOption(opt) {
        this.setState({ selectedOption: opt });
    }
    setModalVisible(opt) {
        this.setState({ modalVisible: opt });
    }
    setSelecteCate(opt) {
        this.setState({ selecteCate: opt });
    }
    setIsOpen1(opt) {
        this.setState({ isOpen1: opt });
    }

    handleToggle = () => {
        this.setIsOpen(!this.state.isOpen);
    };

    handleDropdown(option) {
        this.setSelectedOption(option);
        this.setIsOpen(false);
    };

    handleToggle1 = (option) => {
        this.setIsOpen1(option);
    };
    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }

    async getData(option, dataFilter) {
        // console.log('datafirlte', dataFilter);
        if (this.props.admin.roles?.includes('product_list') || this.props.admin.is_admin == 1) {
            const dataLog = await get_category_products_by_option({
                option: option,
                u_id: this.props.admin.uid,
                category_id: dataFilter.category_id,
                supplier_id: dataFilter.supplier_id,
                hang_id: dataFilter.hang_id,
                price_from: dataFilter.price_from,
                price_to: dataFilter.price_to,
                quantity_from: dataFilter.quantity_from,
                quantity_to: dataFilter.quantity_to,
                phan_loai: dataFilter.phan_loai,
                trang_thai: dataFilter.trang_thai,
                dung_ban: dataFilter.dung_ban,
                from: 0,
            });
            // console.log(dataLog);
            this.setState({ data: dataLog });
            this.setState({ from: this.state.from + 10 })
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }

        // console.log(option);

        // if (dataLog[0].category_title)
        //     this.setState({ current_category_title: dataLog[0].category_title });
    }

    async handleOnEndReached() {
        this.setState({ loadingMore: true });//(true);

        console.log('handleOnEndReached...........');
        console.log(from);

        if (!this.state.stopFetchMore) {

            console.log('from...........');
            console.log(from);
            var newData = [];

            newData = await get_category_products_by_option({
                option: this.state.selectedOption,
                u_id: this.props.admin.uid,
                category_id: this.state.category_id,
                supplier_id: this.state.supplier_id,
                hang_id: this.state.hang_id,
                price_from: this.state.price_from,
                price_to: this.state.price_to,
                quantity_from: this.state.quantity_from,
                quantity_to: this.state.quantity_to,
                phan_loai: this.state.phanLoai,
                trang_thai: this.state.trangThai,
                dung_ban: this.state.dungBan,
                from: this.state.from,
            });

            this.setState({ from: this.state.from + 10 })

            // from = from + limit;

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



    handleOptionSelect = (option) => {
        from = 0;
        this.setSelectedOption(option);
        this.setIsOpen(false);
        this.getData(option, {
            category_id: this.state.category_id,
            supplier_id: this.state.supplier_id,
            hang_id: this.state.hang_id,
            price_from: this.state.price_from,
            price_to: this.state.price_to,
            quantity_from: this.state.quantity_from,
            quantity_to: this.state.quantity_to,
            phan_loai: this.state.phanLoai,
            trang_thai: this.state.trangThai,
            dung_ban: this.state.dungBan,
        });
    };

    gotoDetail(id) {
        // if (this.props.admin.groupId != 4) {
        // if (this.props.admin.roles?.includes('product_detail')) {
        this.gotoPage('ProductDetail')
        this.props.productAction('current_product_id', id);
        // }
        // else {
        //     Alert.alert('Bạn không phép thực hiện hành động này!');
        // }
        // this.props.productAction('update_quantity', []);
        // }
        // else {
        //     return
        // }
    }

    addProduct() {
        // this.props.sizeAction('list_show_size', []);
        // this.props.colorAction('list_show_color', []);
        // this.props.productAction('update_quantity', []);
        // this.props.sizeAction('update_size_id', []);
        // this.props.colorAction('update_color_id', []);
        // this.props.productAction('add_quantity', []);
        if (this.props.admin.roles?.includes('product_add') || this.props.admin.is_admin == 1) {
            this.props.categoryAction('current_category_id', 0);
            this.props.hangAction('current_hang_id', 0);
            this.props.supplierAction('current_supplier_id', 0);
            this.gotoPage('AddProduct');
        } else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }

    }

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }

    handleFilter() {
        from = 0;
        this.getData(this.state.selectedOption, {
            category_id: this.state.category_id,
            supplier_id: this.state.supplier_id,
            hang_id: this.state.hang_id,
            price_from: this.state.price_from,
            price_to: this.state.price_to,
            quantity_from: this.state.quantity_from,
            quantity_to: this.state.quantity_to,
            phan_loai: this.state.phanLoai,
            trang_thai: this.state.trangThai,
            dung_ban: this.state.dungBan,
        })
        this.setModalVisible(false)
    }

    handleReset() {
        this.setState({
            category_id: '',
            supplier_id: '',
            hang_id: '',
            price_from: '',
            price_to: '',
            quantity_from: '',
            quantity_to: '',
            phanLoai: -1,
            trangThai: -1,
            dungBan: -1,
        });
    }


    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { price_field, loadingMore, hang_id, supplier_id, quantity_from, quantity_to, price_from, price_to, phanLoai, trangThai, dungBan, category_id, index } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => this.setModalVisible(true)}>
                                <Svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.3636C0 12.1708 0.0766233 11.9858 0.213013 11.8494C0.349403 11.713 0.534388 11.6364 0.727273 11.6364H15.2727C15.4656 11.6364 15.6506 11.713 15.787 11.8494C15.9234 11.9858 16 12.1708 16 12.3636C16 12.5565 15.9234 12.7415 15.787 12.8779C15.6506 13.0143 15.4656 13.0909 15.2727 13.0909H0.727273C0.534388 13.0909 0.349403 13.0143 0.213013 12.8779C0.0766233 12.7415 0 12.5565 0 12.3636ZM0 6.54545C0 6.35257 0.0766233 6.16759 0.213013 6.0312C0.349403 5.89481 0.534388 5.81818 0.727273 5.81818H15.2727C15.4656 5.81818 15.6506 5.89481 15.787 6.0312C15.9234 6.16759 16 6.35257 16 6.54545C16 6.73834 15.9234 6.92332 15.787 7.05971C15.6506 7.1961 15.4656 7.27273 15.2727 7.27273H0.727273C0.534388 7.27273 0.349403 7.1961 0.213013 7.05971C0.0766233 6.92332 0 6.73834 0 6.54545ZM0 0.727273C0 0.534388 0.0766233 0.349403 0.213013 0.213013C0.349403 0.0766233 0.534388 0 0.727273 0H15.2727C15.4656 0 15.6506 0.0766233 15.787 0.213013C15.9234 0.349403 16 0.534388 16 0.727273C16 0.920157 15.9234 1.10514 15.787 1.24153C15.6506 1.37792 15.4656 1.45455 15.2727 1.45455H0.727273C0.534388 1.45455 0.349403 1.37792 0.213013 1.24153C0.0766233 1.10514 0 0.920157 0 0.727273Z" fill="#fff" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Hàng hóa</Text>

                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.item} onPress={() => this.gotoPage("Filter")}>
                                <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M20.25 18.5192L14.2846 12.5529C15.246 11.2318 15.7631 9.63962 15.7615 8.00577C15.7615 3.72933 12.2822 0.25 8.00577 0.25C3.72933 0.25 0.25 3.72933 0.25 8.00577C0.25 12.2822 3.72933 15.7615 8.00577 15.7615C9.63962 15.7631 11.2318 15.246 12.5529 14.2846L18.5192 20.25L20.25 18.5192ZM8.00577 13.312C6.95616 13.3121 5.93009 13.0009 5.05733 12.4179C4.18457 11.8348 3.50431 11.006 3.1026 10.0363C2.70089 9.06661 2.59576 7.99956 2.8005 6.97011C3.00525 5.94066 3.51067 4.99505 4.25286 4.25286C4.99505 3.51067 5.94066 3.00525 6.97011 2.8005C7.99956 2.59576 9.06661 2.70089 10.0363 3.1026C11.006 3.50431 11.8348 4.18457 12.4179 5.05733C13.0009 5.93009 13.3121 6.95616 13.312 8.00577C13.3104 9.41257 12.7508 10.7613 11.756 11.756C10.7613 12.7508 9.41257 13.3104 8.00577 13.312Z" fill="white" />
                                </Svg>

                            </TouchableOpacity>
                            {/* {
                                this.props.admin.groupId == 1 ? ( */}
                            <TouchableOpacity style={styles.item} onPress={() => this.addProduct()}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8 1V15" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M1 8H15" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </TouchableOpacity>
                            {/* ) : (
                                    <></>
                                )
                            } */}
                        </View>
                    </View >

                    <View>
                        <TouchableOpacity onPress={() => this.handleToggle()} style={styles.selectedDropdown}>
                            <Text style={[styles.txtSelect, this.state.isOpen && styles.slActive]}>{this.state.selectedOption}</Text>
                            <View style={this.state.isOpen && styles.rotate}>
                                <Svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M0.054375 0.463125L0.0881249 0.5025L2.63812 3.43687C2.72437 3.53625 2.85375 3.59812 2.99813 3.59812C3.1425 3.59812 3.27188 3.53437 3.35813 3.43687L5.90625 0.508125L5.94938 0.459375C5.98125 0.4125 6 0.35625 6 0.29625C6 0.133125 5.86125 0 5.68875 0H0.31125C0.13875 0 0 0.133125 0 0.29625C0 0.358125 0.020625 0.41625 0.054375 0.463125Z" fill="#8F8F8F" />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {this.state.isOpen && (
                        <View style={styles.option}>
                            <TouchableOpacity onPress={() => this.handleOptionSelect('Sản phẩm mới')} style={styles.selectedDropdown1}>
                                <View style={styles.flexRowCB}>
                                    <Text style={[styles.txtSelect, this.state.selectedOption === 'Sản phẩm mới' && styles.slActive]}>Sản phẩm mới</Text>
                                    {this.state.selectedOption === 'Sản phẩm mới' && <Text style={[styles.txtCheckmark]}></Text>}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleOptionSelect('Sản phẩm cũ')} style={styles.selectedDropdown1}>
                                <View style={styles.flexRowCB}>
                                    <Text style={[styles.txtSelect, this.state.selectedOption === 'Sản phẩm cũ' && styles.slActive]}>Sản phẩm cũ</Text>
                                    {this.state.selectedOption === 'Sản phẩm cũ' && <Text style={[styles.txtCheckmark]}></Text>}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleOptionSelect('Số lượng giảm dần')} style={styles.selectedDropdown1}>
                                <View style={styles.flexRowCB}>
                                    <Text style={[styles.txtSelect, this.state.selectedOption === 'Số lượng giảm dần' && styles.slActive]}>Số lượng giảm dần</Text>
                                    {this.state.selectedOption === 'Số lượng giảm dần' && <Text style={[styles.txtCheckmark]}></Text>}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleOptionSelect('Số lượng tăng dần')} style={styles.selectedDropdown1}>
                                <View style={styles.flexRowCB}>
                                    <Text style={[styles.txtSelect, this.state.selectedOption === 'Số lượng tăng dần' && styles.slActive]}>Số lượng tăng dần</Text>
                                    {this.state.selectedOption === 'Số lượng tăng dần' && <Text style={[styles.txtCheckmark]}></Text>}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleOptionSelect('Giá giảm dần')} style={styles.selectedDropdown1}>
                                <View style={styles.flexRowCB}>
                                    <Text style={[styles.txtSelect, this.state.selectedOption === 'Giá giảm dần' && styles.slActive]}>Giá giảm dần</Text>
                                    {this.state.selectedOption === 'Giá giảm dần' && <Text style={[styles.txtCheckmark]}></Text>}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleOptionSelect('Giá tăng dần')} style={styles.selectedDropdown1}>
                                <View style={styles.flexRowCB}>
                                    <Text style={[styles.txtSelect, this.state.selectedOption === 'Giá tăng dần' && styles.slActive]}>Giá tăng dần</Text>
                                    {this.state.selectedOption === 'Giá tăng dần' && <Text style={[styles.txtCheckmark]}></Text>}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* <ScrollView style={{ backgroundColor: "#000" }}>
                        {
                            data?.map((d, index) => (
                                
                            ))
                        }
                    </ScrollView> */}

                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index}
                        numColumns={1}
                        renderItem={({ item }) => {
                            let d = item;
                            if (!d.id)
                                return;

                            else
                                return (
                                    <TouchableOpacity onPress={() => this.gotoDetail(d?.id)}>
                                        <View style={styles.cardItem}>
                                            <FastImage style={styles.thumbnail} source={d?.image === null || d?.image?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }} />
                                            <View style={{ ...styles.cardContent }}>
                                                <View style={styles.itemInfo}>
                                                    <Text style={{ ...styles.clback, ...styles.name, maxWidth: "70%" }}>{d?.code} - {d?.title}</Text>
                                                    <Text style={styles.clback}>Giá: {d?.price_buon_txt} / {d?.price_le_txt}</Text>
                                                    <Text style={styles.clback}>Tồn: {d?.totle_buy ? Number(d?.totle_buy).toLocaleString() : 0} / {d?.totle_quan ? Number(d?.totle_quan).toLocaleString() : 0}</Text>
                                                </View>
                                                <View style={styles.date}>
                                                    <Text style={{ fontSize: 11 }}>Ngày về : {d?.ngaynhap?.split(' ')[0]}</Text>
                                                </View>
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
                    >

                    </FlatList>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.headerFilter}>
                                    <Text style={styles.txtHeaderFilter}>Bộ lọc sản phẩm</Text>
                                    <View style={styles.flexRow}>
                                        <TouchableOpacity onPress={() => this.gotoPage('StoreSettings')}>
                                            <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M17.1907 11.5633L16.2271 11.0012C15.1832 10.3588 15.1832 8.83309 16.2271 8.19069L17.1907 7.62858C17.9937 7.14677 18.2346 6.18316 17.7528 5.46046L16.9498 4.09534C16.468 3.29233 15.5044 3.05143 14.7817 3.53324L13.818 4.09534C12.7741 4.73775 11.409 3.93474 11.409 2.73023V1.60602C11.409 0.722708 10.6863 0 9.80301 0H8.19699C7.31368 0 6.59097 0.722708 6.59097 1.60602V2.64993C6.59097 3.85444 5.22586 4.65745 4.18195 4.01504L3.21834 3.53324C2.41533 3.05143 1.45172 3.37264 1.05022 4.09534L0.247208 5.46046C-0.154296 6.26347 0.0866063 7.22708 0.809314 7.70888L1.77292 8.27099C2.81684 8.83309 2.81684 10.4391 1.77292 11.0012L0.809314 11.5633C0.00630548 12.0451 -0.234597 13.0087 0.247208 13.7314L1.05022 15.0966C1.53202 15.8996 2.49563 16.1405 3.21834 15.6587L4.18195 15.1769C5.22586 14.5345 6.59097 15.3375 6.59097 16.542V17.6662C6.59097 18.5495 7.31368 19.2722 8.19699 19.2722H9.80301C10.6863 19.2722 11.409 18.5495 11.409 17.6662V16.6223C11.409 15.4178 12.7741 14.6148 13.818 15.2572L14.7817 15.8193C15.5847 16.3011 16.5483 15.9799 16.9498 15.2572L17.7528 13.892C18.1543 13.0087 17.9134 12.0451 17.1907 11.5633ZM9 12.8481C7.23338 12.8481 5.78797 11.4027 5.78797 9.6361C5.78797 7.86948 7.23338 6.42407 9 6.42407C10.7666 6.42407 12.212 7.86948 12.212 9.6361C12.212 11.4027 10.7666 12.8481 9 12.8481Z" fill="black" />
                                            </Svg>

                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                                            <Text style={styles.bntCancle}>Đóng</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <ScrollView>
                                <View style={styles.bodyFilter}>
                                    <Text style={styles.titleFilter}>
                                        Lọc theo khoảng giá
                                    </Text>
                                    <View>
                                        <View style={[styles.flexRow, styles.flexRow1]}>
                                            <View style={[styles.flexRow, styles.flexRow2,]}>
                                                <TextInput
                                                    style={styles.inputNumber}
                                                    keyboardType="numeric"
                                                    placeholder='Bắt đầu ở giá'
                                                    value={price_from}
                                                    onChangeText={(opt) => this.setPriceFrom(opt)}
                                                />
                                                {/* <Text style={{ marginTop: 4, marginLeft: 4, color: "#000" }}>K</Text> */}
                                            </View>
                                            <View style={[styles.flexRow, styles.flexRow3,]}>
                                                <Text style={styles.line}>
                                                </Text>
                                            </View>
                                            <View style={[styles.flexRow, styles.flexRow2,]}>
                                                <TextInput
                                                    style={styles.inputNumber}
                                                    keyboardType="numeric"
                                                    placeholder='Kết thúc ở giá'
                                                    value={price_to}
                                                    onChangeText={(opt) => this.setPriceTo(opt)}
                                                />
                                                {/* <Text style={{ marginTop: 4, marginLeft: 4, color: "#000" }}>K</Text> */}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.bodyFilter}>
                                    <Text style={styles.titleFilter}>Lọc theo khoảng số lượng</Text>
                                    <View>
                                        <View style={[styles.flexRow, styles.flexRow1]}>
                                            <View style={[styles.flexRow, styles.flexRow2,]}>
                                                <TextInput
                                                    style={styles.inputNumber}
                                                    keyboardType="numeric"
                                                    placeholder='Bắt đầu ở số lượng'
                                                    value={quantity_from}
                                                    onChangeText={(opt) => this.setQuantityFrom(opt)}
                                                />
                                            </View>
                                            <View style={[styles.flexRow, styles.flexRow3,]}>
                                                <Text style={styles.line}>
                                                </Text>
                                            </View>
                                            <View style={[styles.flexRow, styles.flexRow2,]}>
                                                <TextInput
                                                    style={styles.inputNumber}
                                                    keyboardType="numeric"
                                                    placeholder='Kết thúc ở số lượng'
                                                    value={quantity_to}
                                                    onChangeText={(opt) => this.setQuantityTo(opt)}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    {/* <TouchableOpacity>
                                        <Text style={styles.btnCheck1}>Chưa có giá nhập</Text>
                                    </TouchableOpacity> */}
                                </View>

                                <View style={[styles.bodyFilter, styles.boderBottom]}>
                                    <Text style={styles.titleFilter}>
                                        Phân loại hàng
                                    </Text>
                                    <View style={styles.flexRowCheckFilter}>
                                        <TouchableOpacity onPress={() => this.setPhanLoai(1)}>
                                            <Text style={[styles.btnCheckFilter, phanLoai == 1 ? styles.btnRed : '']}>Hàng mới</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setPhanLoai(2)}>
                                            <Text style={[styles.btnCheckFilter, phanLoai == 2 ? styles.btnRed : '']}>Bán tiếp</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setPhanLoai(3)}>
                                            <Text style={[styles.btnCheckFilter, phanLoai == 3 ? styles.btnRed : '']}>Gọi lại</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setPhanLoai(4)}>
                                            <Text style={[styles.btnCheckFilter, phanLoai == 4 ? styles.btnRed : '']}>Giảm giá</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setPhanLoai(5)}>
                                            <Text style={[styles.btnCheckFilter, phanLoai == 5 ? styles.btnRed : '']}>Dứt mẫu</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setPhanLoai(6)}>
                                            <Text style={[styles.btnCheckFilter, phanLoai == 6 ? styles.btnRed : '']}>Hàng lỗi</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[styles.bodyFilter, styles.boderBottom]}>
                                    <Text style={styles.titleFilter}>Tình trạng hàng</Text>
                                    <View style={styles.flexRowCheckFilter}>
                                        <TouchableOpacity onPress={() => this.setTrangThai(1)}>
                                            <Text style={[styles.btnCheckFilter, trangThai == 1 ? styles.btnRed : '']}>Bán chạy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setTrangThai(2)}>
                                            <Text style={[styles.btnCheckFilter, trangThai == 2 ? styles.btnRed : '']}>Bán chậm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setTrangThai(3)}>
                                            <Text style={[styles.btnCheckFilter, trangThai == 3 ? styles.btnRed : '']}>Lẻ size</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setTrangThai(4)}>
                                            <Text style={[styles.btnCheckFilter, trangThai == 4 ? styles.btnRed : '']}>Hàng âm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setTrangThai(5)}>
                                            <Text style={[styles.btnCheckFilter, trangThai == 5 ? styles.btnRed : '']}>Đề xuất kiểm tra lại</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[styles.bodyFilter, styles.boderBottom]}>
                                    <Text style={styles.titleFilter}>Trạng thái</Text>
                                    <View style={styles.flexRowCheckFilter}>
                                        <TouchableOpacity onPress={() => this.setDungBan(1)}>
                                            <Text style={[styles.btnCheckFilter, dungBan == 1 ? styles.btnRed : '']}>Dừng bán</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setDungBan(0)}>
                                            <Text style={[styles.btnCheckFilter, dungBan == 0 ? styles.btnRed : '']}>Đang bán</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* <View style={[styles.bodyFilter, styles.boderBottom]}>
                                    <Text style={styles.titleFilter}>Trạng thái liên kết</Text>
                                    <View style={styles.flexRowCheckFilter}>
                                        <TouchableOpacity>
                                            <Text style={styles.btnCheckFilter}>Đóng</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={styles.btnCheckFilter}>Mở</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                <View style={[styles.bodyFilter, styles.boderBottom]}>
                                    <Text style={styles.titleFilter}>Trạng thái hết hàng(đóng bán)</Text>
                                    <View style={styles.flexRowCheckFilter}>
                                        <TouchableOpacity>
                                            <Text style={styles.btnCheckFilter}>Còn hàng</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={styles.btnCheckFilter}>Hết hàng/Đóng bán</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> */}
                                <View>
                                    <View style={[styles.listCategory, styles.boderBottom]}>
                                        <Text style={styles.titleFilter}>Danh mục</Text>
                                        <View>
                                            {
                                                this.props.category?.listCategory?.map((category, index) => (
                                                    <CategoryComponent
                                                        key={index}
                                                        childList={category.children}
                                                        id={category.Category.id}
                                                        name={category.Category.title}
                                                        setCategory={(opt) => this.setCategory(opt)}
                                                        idCategory={category_id}
                                                        setIndex={(opt) => this.setIndex(opt)}
                                                        index={this.state.index}
                                                    />
                                                ))
                                            }
                                        </View>



                                        {/* <View>
                                            <TouchableOpacity onPress={() => this.handleToggle1('2')}>
                                                <View style={[styles.flexRow, styles.groupItem]}>
                                                    <Text style={styles.txtCategory}>Thời trang nam</Text>
                                                    <Text style={styles.txtQuantity}>(1/662)</Text>
                                                </View>
                                            </TouchableOpacity>
                                            {this.state.isOpen1 === '2' && (
                                                <View style={styles.childListCategory}>
                                                    <TouchableOpacity>
                                                        <View style={[styles.flexRow, styles.groupItem]}>
                                                            <Text style={styles.txtCategory}>Áo sát nách</Text>
                                                            <Text>(0/0)</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <View style={[styles.flexRow, styles.groupItem]}>
                                                            <Text style={styles.txtCategory}>Áo sát nách</Text>
                                                            <Text>(0/0)</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View> */}

                                    </View>

                                    {/* <View style={[styles.bodyFilter, styles.boderBottom]}>
                                        <Text style={styles.titleFilter}>Trạng thái hết hàng(đóng bán)</Text>
                                    </View> */}
                                    <View style={[styles.bodyFilter, styles.boderBottom]}>
                                        <Text style={styles.titleFilter}>Nhà cung cấp</Text>
                                        <View style={styles.flexRowCheckFilter}>
                                            {
                                                this.props?.supplier?.listSupplier?.map((supp, index) => (
                                                    <TouchableOpacity key={index} onPress={() => this.setSupplier(supp.id)}>
                                                        <Text style={[styles.btnCheckFilter, supplier_id === supp.id ? styles.btnRed : '']}>{supp.title}</Text>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    </View>
                                    <View style={[styles.bodyFilter, styles.boderBottom]}>
                                        <Text style={styles.titleFilter}>Thương hiệu</Text>
                                        <View style={styles.flexRowCheckFilter}>
                                            {
                                                this.props?.hang?.listHang?.map((hang, index) => (
                                                    <TouchableOpacity key={index} onPress={() => this.setHang(hang.id)}>
                                                        <Text style={[styles.btnCheckFilter, hang_id === hang.id ? styles.btnRed : '']}>{hang.title}</Text>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={styles.containerBtn}>
                                <TouchableOpacity onPress={() => this.handleReset()}>
                                    <Text style={styles.btnReset}>Thiết lập lại</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.handleFilter()}>
                                    <Text style={styles.btnFilter}>Tìm kiếm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(false)}
                            style={styles.modalBackdrop}
                        />

                    </Modal>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };

};
const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
    supplier: state.supplier,
    hang: state.hang,
    category: state.category,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    categoryAction: (act, data) => dispatch(categoryAction(act, data)),
    hangAction: (act, data) => dispatch(hangAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
    colorAction: (act, data) => dispatch(colorAction(act, data)),
    sizeAction: (act, data) => dispatch(sizeAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Commodity)

