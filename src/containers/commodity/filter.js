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
import Header from '../elements/Header';
import { connect } from 'react-redux';
// import type {Node} from 'react';
import productAction from '../../actions/productAction';
import { get_home_products, get_category_products, get_product_list, get_category_products_by_option } from '../../services/productService';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSearch: [],
            dataSearchInput: [],
            textSearch: '',
        }
    }

    setInputFocused = (opt) => {
        this.setState({ isInputFocused: opt });
    }

    componentDidMount() {
        this.getSearchData();
    }
    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }
    gotoDetail(id) {
        this.gotoPage('ChonSoLuongMa')
        this.props.productAction('current_product_id', id);
        this.props.productAction('update_quantity', []);
    }
    async getSearchData() {
        const dataSearch = await get_category_products_by_option({
            u_id: this.props.admin.uid,
            option: 'Sản phẩm mới',
        });
        this.setState({ dataSearch: dataSearch });
        // console.log(this.state.dataSearch);
    }

    setDataSearch = (opt) => {
        this.setState({ dataSearchInput: opt });
    }

    setInputSearch = (opt) => {
        this.setState({ textSearch: opt })
    }

    handleInputChange = (text) => {
        this.setInputSearch(text);
        // console.log('Input Value', text);
        const filteredSuggestions = this.state.dataSearch.filter((data) => {
            const title = data?.title || '';
            const code = data?.code || '';

            return (
                title.toLowerCase().includes(text.toLowerCase()) ||
                code.toLowerCase().includes(text.toLowerCase())
            );
        });
        // console.log('sear', filteredSuggestions);
        this.setDataSearch(filteredSuggestions)
        console.log(filteredSuggestions);

    };




    render() {
        const navigation = this.props.navigation;
        const { dataSearchInput, textSearch, dataSearch } = this.state;


        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={'Tìm kiếm'} />

                    <View style={{ backgroundColor: "#f5f5f5" }}>
                        <View style={styles.inputGroup}>
                            <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M14.6339 12.8664L11.4607 9.69323C12.1164 8.70509 12.5001 7.52195 12.5001 6.25007C12.5001 2.80378 9.69635 0 6.25007 0C2.80378 0 0 2.80378 0 6.25007C0 9.69635 2.80378 12.5001 6.25007 12.5001C7.52195 12.5001 8.70509 12.1164 9.69323 11.4607L12.8664 14.6339C13.3539 15.122 14.1464 15.122 14.6339 14.6339C15.122 14.1458 15.122 13.3545 14.6339 12.8664ZM1.87502 6.25007C1.87502 3.83754 3.83754 1.87502 6.25007 1.87502C8.66259 1.87502 10.6251 3.83754 10.6251 6.25007C10.6251 8.66259 8.66259 10.6251 6.25007 10.6251C3.83754 10.6251 1.87502 8.66259 1.87502 6.25007Z" fill="#757575" />
                            </Svg>
                            <TextInput
                                style={styles.inputsearch1}
                                // style={styles.inputsearch}
                                placeholder="Tìm kiếm"
                                value={this.state.textSearch}
                                onChangeText={(text) => this.handleInputChange(text)}
                            />
                        </View>
                    </View>

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        {
                            textSearch === '' ?
                                dataSearch?.map((d, index) => (
                                    <TouchableOpacity key={index} onPress={() => this.gotoDetail(d?.id)}>
                                        <View style={styles.cardItem}>
                                            <Image style={styles.thumbnail} source={d?.image === null || d?.image.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>
                                            <View style={styles.cardContent}>
                                                <View style={styles.itemInfo}>
                                                    <Text style={[styles.clback, styles.name]}>{d?.code} - {d?.title}</Text>
                                                    <Text style={styles.clback}>Giá: {d?.price_buon_txt} / {d?.price_le_txt}</Text>
                                                    <Text style={styles.clback}>Tồn: {d?.totle_quuan}</Text>
                                                </View>
                                                <View style={styles.date}>
                                                    <Text style={{ fontSize: 11 }}>Ngày về :  {d?.ngaynhap?.split(' ')[0]}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )) :
                                dataSearchInput?.map((d, index) => (
                                    <TouchableOpacity key={index} onPress={() => this.gotoDetail(d?.id)}>
                                        <View style={styles.cardItem}>
                                            <Image style={styles.thumbnail} source={d?.image === null || d?.image.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>
                                            <View style={styles.cardContent}>
                                                <View style={styles.itemInfo}>
                                                    <Text style={[styles.clback, styles.name]}>{d?.code} - {d?.title}</Text>
                                                    <Text style={styles.clback}>Giá: {d?.price_buon_txt} / {d?.price_le_txt}</Text>
                                                    <Text style={styles.clback}>Tồn: {d?.totle_quuan}</Text>
                                                </View>
                                                <View style={styles.date}>
                                                    <Text style={{ fontSize: 11 }}>Ngày về :  {d?.ngaynhap?.split(' ')[0]}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                        }
                    </ScrollView>
                    <Footer />
                </View >


            </SafeAreaView >
        );
    };

};
const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(Filter)

