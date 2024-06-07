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
import Search from '../elements/Search';
import { connect } from 'react-redux';

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

class CustomerDepartment extends Component {

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
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>Phân chia khách hành cho nhân viên</Text>

                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => this.setIsShowItem(!isShowItem)}>
                                <Svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Mask id="path-1-inside-1_696_19" fill="white">
                                        <Path d="M12.8571 1.07143V8.62835C12.8571 12.1138 9.97333 15 6.42857 15C2.88382 15 0 12.1413 0 8.62835V1.07143C0 0.479799 0.265513 0 0.857143 0C1.44877 0 1.71429 0.479799 1.71429 1.07143V4.71429V9C1.71429 11.3327 4.0654 13.2857 6.42857 13.2857C8.79174 13.2857 11.1429 10.9028 11.1429 8.57143V1.07143C11.1429 0.479799 11.4084 0 12 0C12.5916 0 12.8571 0.479799 12.8571 1.07143Z" />
                                    </Mask>
                                    <Path d="M12.8571 1.07143V8.62835C12.8571 12.1138 9.97333 15 6.42857 15C2.88382 15 0 12.1413 0 8.62835V1.07143C0 0.479799 0.265513 0 0.857143 0C1.44877 0 1.71429 0.479799 1.71429 1.07143V4.71429V9C1.71429 11.3327 4.0654 13.2857 6.42857 13.2857C8.79174 13.2857 11.1429 10.9028 11.1429 8.57143V1.07143C11.1429 0.479799 11.4084 0 12 0C12.5916 0 12.8571 0.479799 12.8571 1.07143Z" fill="white" />
                                    <Path d="M10.8571 1.07143V8.62835H14.8571V1.07143H10.8571ZM10.8571 8.62835C10.8571 10.9982 8.87986 13 6.42857 13V17C11.0668 17 14.8571 13.2295 14.8571 8.62835H10.8571ZM6.42857 13C3.97167 13 2 11.0201 2 8.62835H-2C-2 13.2625 1.79597 17 6.42857 17V13ZM2 8.62835V1.07143H-2V8.62835H2ZM2 1.07143C2 1.07185 2 1.07989 1.99816 1.09513C1.99633 1.11026 1.99234 1.13544 1.98337 1.16912C1.96619 1.23361 1.9247 1.35131 1.82692 1.48643C1.72416 1.62841 1.57186 1.77082 1.37044 1.87187C1.17006 1.97239 0.985065 2 0.857143 2V-2C-0.0585335 -2 -0.884533 -1.58961 -1.41349 -0.858723C-1.88059 -0.213315 -2 0.515033 -2 1.07143H2ZM0.857143 2C0.72922 2 0.544226 1.97239 0.34385 1.87187C0.142423 1.77082 -0.00987706 1.62841 -0.11263 1.48643C-0.210415 1.35131 -0.251908 1.23361 -0.269084 1.16912C-0.278053 1.13544 -0.282049 1.11026 -0.283874 1.09513C-0.285713 1.07989 -0.285714 1.07185 -0.285714 1.07143H3.71429C3.71429 0.515033 3.59488 -0.213315 3.12778 -0.858723C2.59882 -1.58961 1.77282 -2 0.857143 -2V2ZM-0.285714 9C-0.285714 10.8589 0.646354 12.4439 1.86145 13.5168C3.07426 14.5877 4.71365 15.2857 6.42857 15.2857V11.2857C5.78032 11.2857 5.06257 11.0072 4.50903 10.5184C3.95777 10.0317 3.71429 9.47382 3.71429 9H-0.285714ZM6.42857 15.2857C8.26655 15.2857 9.92875 14.3796 11.0893 13.2139C12.2486 12.0493 13.1429 10.3892 13.1429 8.57143H9.14286C9.14286 9.08504 8.86154 9.78204 8.25452 10.3918C7.64871 11.0003 6.95376 11.2857 6.42857 11.2857V15.2857ZM13.1429 8.57143V1.07143H9.14286V8.57143H13.1429ZM13.1429 1.07143C13.1429 1.07185 13.1429 1.07989 13.141 1.09513C13.1392 1.11026 13.1352 1.13544 13.1262 1.16912C13.1091 1.23361 13.0676 1.35131 12.9698 1.48643C12.867 1.62841 12.7147 1.77082 12.5133 1.87187C12.3129 1.97239 12.1279 2 12 2V-2C11.0843 -2 10.2583 -1.58961 9.72936 -0.858723C9.26227 -0.213315 9.14286 0.515033 9.14286 1.07143H13.1429ZM12 2C11.8721 2 11.6871 1.97239 11.4867 1.87187C11.2853 1.77082 11.133 1.62841 11.0302 1.48643C10.9324 1.35131 10.8909 1.23361 10.8738 1.16912C10.8648 1.13544 10.8608 1.11026 10.859 1.09513C10.8571 1.07989 10.8571 1.07185 10.8571 1.07143H14.8571C14.8571 0.515033 14.7377 -0.213315 14.2706 -0.858723C13.7417 -1.58961 12.9157 -2 12 -2V2ZM-0.285714 1.07143V4.71429H3.71429V1.07143H-0.285714ZM-0.285714 4.71429V9H3.71429V4.71429H-0.285714Z" fill="white" mask="url(#path-1-inside-1_696_19)" />
                                    <Path d="M0.75 16.75H6.5H12.25C12.3881 16.75 12.5 16.8619 12.5 17C12.5 17.1381 12.3881 17.25 12.25 17.25H0.75C0.611929 17.25 0.5 17.1381 0.5 17C0.5 16.8619 0.611929 16.75 0.75 16.75Z" fill="#D9D9D9" stroke="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <Search />

                    <ScrollView style={{ backgroundColor: "#fff" }}>

                    </ScrollView>


                    {isShowItem && (
                        <View style={styles.groupBtn}>
                            <TouchableOpacity>
                                <Text style={styles.btnSelectAll}>Chọn tất cả</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.gotoPage("ListEmployee")}>
                                <Text style={styles.btnPhanKhach}>Phân khách</Text>
                            </TouchableOpacity>
                        </View>
                    )}

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDepartment)
