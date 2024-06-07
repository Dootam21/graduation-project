/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, Component } from 'react';
import Svg, { Path, Rect, Mask } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import Header from '../elements/Header';
import HeaderNews from '../elements/HeaderNews';
import Search from '../elements/Search';
import { connect } from 'react-redux';

// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class AddNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowItem: false,
        }
    }

    setIsShowItem = (opt) => {
        this.setState({ isShowItem: opt });
    }

    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }

    render() {
        const { isShowItem } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <HeaderNews />

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <View style={styles.btnGAdd}>
                            <TouchableOpacity>
                                <Text style={styles.btnAdd}>Thêm</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.boxContent}>
                            <TextInput
                                style={styles.inputContent}
                                numberOfLines={2}
                                editable
                                multiline
                                placeholder='Nội dung bạn muốn chia sẻ...'
                            />
                        </View>

                        <View style={styles.boxAddItem}>
                            <Text style={styles.txtRong}>Danh sách rỗng</Text>
                            <TouchableOpacity>
                                <Text style={styles.btnAddSp}>Thêm sản phẩm</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                    <View>
                        <TouchableOpacity>
                            <Text style={styles.btnDangNgay}>Đăng ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <Footer />

                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    product: state.product,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNews);
