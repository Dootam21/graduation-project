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
import productAction from '../../actions/productAction';
import { get_category_products } from '../../services/productService';
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
    FlatList,
    Modal,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

// var stopFetchMore = true;
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

class ListProduct extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loadingMore: false,
            stopFetchMore: true,
            isOpen: false,
            isActive: false,
            modalVisible: false,
            selectedOption: 'Sản phẩm mới',
            current_category_title: '',
            hh_status: '',
            price_from: 0,
            price_to: 0,
            price_type: 2, //giá buôn
            price_field: '', //giá buôn
            // this.setState({stopFetchMore: true});
        }
    }

    componentDidMount() {
        // this.getData(this.props.category.id, this.state.selectedOption, this.state.price_from, this.state.price_to, this.state.hh_status, from);

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
                from = 0;
                this.getData(this.props.category.id, this.state.selectedOption, this.state.price_from, this.state.price_to, this.state.hh_status, from);
            }
        );
    }

    setIsOpen(opt) {
        this.setState({ isOpen: opt });
    }
    setIsActive(opt) {
        this.setState({ isActive: opt });
    }
    setSelectedOption(opt) {
        this.setState({ selectedOption: opt });
    }
    setModalVisible(opt) {
        this.setState({ modalVisible: opt });
    }

    handleOptionSelect = (option) => {
        this.setSelectedOption(option);
        this.setIsOpen(false);
        this.getData(this.props.category.id, option, this.state.price_from, this.state.price_to, this.state.hh_status, from);
    };

    handleActive = (option) => {
        this.setIsActive(option);
        this.setModalVisible(false);
    }

    resetState = () => {
        this.setState({
            data: {},
            isActive: false,
        });
    };

    gotoProductDetail(product_id) {
        this.props.productAction('current_product_id', product_id);
        this.props.navigation.navigate("ChonSoLuongMa");
        this.props.productAction('update_quantity', []);
    }

    async getData(category_id, option, price_from, price_to, hh_status, from) {
        const dataLog = await get_category_products(category_id, option, price_from, price_to, hh_status, from);
        this.setState({ data: dataLog });

        if (dataLog[0].category_title)
            this.setState({ current_category_title: dataLog[0].category_title });

        from = 0 + limit;
    }

    async handleOnEndReached() {
        this.setState({ loadingMore: true });//(true);

        console.log('handleOnEndReached...........');
        console.log(from);
        if (!this.state.stopFetchMore) {
            console.log('from...........');
            console.log(from);

            const newData = await get_category_products(this.props.category.id, this.state.selectedOption, this.state.price_from, this.state.price_to, this.state.hh_status, from);
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

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }

    render() {
        const navigation = this.props.navigation;
        const { current_category_title, data, price_field, price_type, loadingMore, stopFetchMore } = this.state;

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

                        <Text style={styles.title}>{current_category_title}</Text>

                        <View style={styles.headerRight}>
                            {/* <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M17.1554 0H0.84473C0.0952696 0 -0.282906 0.909352 0.248129 1.44039L6.74999 7.94324V15.1875C6.74999 15.4628 6.88433 15.7208 7.10989 15.8787L9.92239 17.8468C10.4773 18.2352 11.25 17.8415 11.25 17.1555V7.94324L17.752 1.44039C18.282 0.910406 17.9064 0 17.1554 0Z" fill="white" />
                                </Svg>
                            </TouchableOpacity> */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    this.setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Lọc theo khoảng giá</Text>
                                        <View style={[styles.flexRow, styles.flexRow1]}>
                                            <View style={[styles.flexRow, styles.flexRow2,]}>
                                                <TextInput
                                                    style={styles.inputNumber}
                                                    keyboardType="numeric"
                                                    placeholder='Từ'
                                                />
                                                <Text style={{ marginTop: 4, marginLeft: 4 }}>K</Text>
                                            </View>
                                            <View style={[styles.flexRow, styles.flexRow3,]}>
                                                <Text style={styles.line}>
                                                </Text>
                                            </View>
                                            <View style={[styles.flexRow, styles.flexRow2,]}>
                                                <TextInput
                                                    style={styles.inputNumber}
                                                    keyboardType="numeric"
                                                    placeholder='Đến'
                                                />
                                                <Text style={{ marginTop: 4, marginLeft: 4 }}>K</Text>
                                            </View>
                                        </View>

                                        <Text style={styles.modalText}>Lọc theo tình trạng hàng hóa</Text>

                                        <View style={styles.flexRow4}>
                                            <TouchableOpacity onPress={() => this.handleActive('Bán chạy')}>
                                                <Text style={[styles.txtFilter, this.state.isActive === 'Bán chạy' && styles.colorRed]}>Bán chạy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleActive('Bán chậm')}>
                                                <Text style={[styles.txtFilter, this.state.isActive === 'Bán chậm' && styles.colorRed]}>Bán chậm</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleActive('Lẻ size')}>
                                                <Text style={[styles.txtFilter, this.state.isActive === 'Lẻ size' && styles.colorRed]}>Lẻ size</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => this.resetState()}>
                                                <Text style={styles.txtReset}>Reset</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(false)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                        </View>
                    </View >

                    <View>
                        <TouchableOpacity onPress={() => this.setIsOpen(true)} style={styles.selectedDropdown}>
                            <Text style={[styles.txtSelect, this.state.isOpen && styles.slActive]}>{this.state.selectedOption}</Text>
                            <View style={this.state.isOpen && styles.rotate}>
                                <Svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M0.054375 0.463125L0.0881249 0.5025L2.63812 3.43687C2.72437 3.53625 2.85375 3.59812 2.99813 3.59812C3.1425 3.59812 3.27188 3.53437 3.35813 3.43687L5.90625 0.508125L5.94938 0.459375C5.98125 0.4125 6 0.35625 6 0.29625C6 0.133125 5.86125 0 5.68875 0H0.31125C0.13875 0 0 0.133125 0 0.29625C0 0.358125 0.020625 0.41625 0.054375 0.463125Z" fill="#8F8F8F" />
                                </Svg>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ ...styles.containerFluid, backgroundColor: "#000" }}>
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
                        <View>
                            <FlatList
                                data={data}
                                keyExtractor={(item) => item.id}
                                numColumns={3}
                                renderItem={({ item }) => {
                                    let d = item;

                                    if (!d.id)
                                        return;

                                    else
                                        return (
                                            <View key={d?.id} style={styles.cardItem1}>
                                                <TouchableOpacity onPress={() => this.gotoProductDetail(d.id)}>
                                                    <Image style={styles.thumbnail1} source={d?.image === null || d?.image?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>
                                                    <View style={styles.card_content}>
                                                        <Text style={styles.namesp}>{d?.code}</Text>
                                                        <Text style={styles.pricesp}>{price_type == 1 ? d?.price_nhap_txt : ''}{price_type == 2 ? d?.price_buon_txt : ''}{price_type == 3 ? d?.price_le_txt : ''}{price_type == 4 ? d?.price_ctv_txt : ''}đ</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                }}
                                onEndReached={() => this.handleOnEndReached()}
                                onEndReachedThreshold={0.5}
                                onScrollBeginDrag={() => {
                                    this.updateStopFetchMore();
                                }}
                                ListFooterComponent={() => loadingMore && <ListFooterComponent />}
                            />

                        </View>
                    </View>

                    <Footer />
                </View >

            </SafeAreaView >
        );
    };

}

const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
    category: state.category,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    categoryAction: (act, data) => dispatch(categoryAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(ListProduct)

