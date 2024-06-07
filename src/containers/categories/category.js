/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';

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
    Switch,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import Header from '../elements/Header';


class Category extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            selectedButton: '',
        }
    }

    setSelectedButton(opt) {
        this.setState({ selectedButton: opt });
    }

    handleButtonPress = (buttonName) => {
        this.setSelectedButton(buttonName);
    };

    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }

    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={'Chọn danh mục'} />

                    <View style={{ backgroundColor: "#000", height: "100%" }}>
                        <View>
                            <View style={styles.settingCategory}>
                                <TouchableOpacity onPress={() => this.gotoPage('SettingCategory')}>
                                    <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M17.1907 11.5633L16.2271 11.0012C15.1832 10.3588 15.1832 8.83309 16.2271 8.19069L17.1907 7.62858C17.9937 7.14678 18.2346 6.18317 17.7528 5.46046L16.9498 4.09534C16.468 3.29233 15.5044 3.05143 14.7817 3.53324L13.818 4.09534C12.7741 4.73775 11.409 3.93474 11.409 2.73023V1.60602C11.409 0.722708 10.6863 0 9.80301 0H8.19699C7.31368 0 6.59097 0.722708 6.59097 1.60602V2.64993C6.59097 3.85444 5.22586 4.65745 4.18195 4.01504L3.21834 3.53324C2.41533 3.05143 1.45172 3.37264 1.05022 4.09534L0.247208 5.46046C-0.154296 6.26347 0.0866063 7.22708 0.809314 7.70888L1.77292 8.27099C2.81684 8.83309 2.81684 10.4391 1.77292 11.0012L0.809314 11.5633C0.00630548 12.0451 -0.234597 13.0087 0.247208 13.7314L1.05022 15.0966C1.53202 15.8996 2.49563 16.1405 3.21834 15.6587L4.18195 15.1769C5.22586 14.5345 6.59097 15.3375 6.59097 16.542V17.6662C6.59097 18.5495 7.31368 19.2722 8.19699 19.2722H9.80301C10.6863 19.2722 11.409 18.5495 11.409 17.6662V16.6223C11.409 15.4178 12.7741 14.6148 13.818 15.2572L14.7817 15.8193C15.5847 16.3011 16.5483 15.9799 16.9498 15.2572L17.7528 13.892C18.1543 13.0087 17.9134 12.0451 17.1907 11.5633ZM9 12.8481C7.23338 12.8481 5.78797 11.4027 5.78797 9.6361C5.78797 7.86948 7.23338 6.42407 9 6.42407C10.7666 6.42407 12.212 7.86948 12.212 9.6361C12.212 11.4027 10.7666 12.8481 9 12.8481Z" fill="#B8101F" />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView>
                            <View style={styles.GroupCategory1}>
                                <View style={styles.listCategory}>
                                    <ScrollView>
                                        <View>
                                            <TouchableOpacity onPress={() => this.handleButtonPress('1')}>
                                                <Text style={[styles.txtCategoryName, this.state.selectedButton === '1' && styles.tabActive]}>Thời Trang Nam</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleButtonPress('2')}>
                                                <Text style={[styles.txtCategoryName, this.state.selectedButton === '2' && styles.tabActive]}>Thời Trang Nữ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleButtonPress('3')}>
                                                <Text style={[styles.txtCategoryName, this.state.selectedButton === '3' && styles.tabActive]}>Thời Trang  Nhí</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleButtonPress('4')}>
                                                <Text style={[styles.txtCategoryName, this.state.selectedButton === '4' && styles.tabActive]}>Giày dép - Túi xách</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleButtonPress('5')}>
                                                <Text style={[styles.txtCategoryName, this.state.selectedButton === '5' && styles.tabActive]}>Đồng hồ - Trang sức</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleButtonPress('6')}>
                                                <Text style={[styles.txtCategoryName, this.state.selectedButton === '6' && styles.tabActive]}>Phụ Liệu May </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleButtonPress('7')}>
                                                <Text style={[styles.txtCategoryName, this.state.selectedButton === '7' && styles.tabActive]}>Phụ Liệu In</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleButtonPress('8')}>
                                                <Text style={[styles.txtCategoryName, this.state.selectedButton === '8' && styles.tabActive]}>Vải</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.handleButtonPress('9')}>
                                                <Text style={[styles.txtCategoryName, this.state.selectedButton === '9' && styles.tabActive]}>Phụ liệu khác</Text>
                                            </TouchableOpacity >
                                        </View >
                                    </ScrollView >
                                </View >

                                <View style={styles.listChildCategory}>
                                    <ScrollView>
                                        <View >
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={styles.txtChildCategoryName}>Áo 3 lỗ</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View >
                        </ScrollView >
                    </View >
                </View >
            </SafeAreaView >
        );
    };

};
const mapStateToProps = state => ({
    product: state.product,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(Category)
