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
    Modal,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class CurrenlyList extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            isModalVisible: false,
            text: 'Tìm kiếm'
        }
    }

    setIsEnabled = (opt) => {
        this.setState({ isEnabled: opt });
    }

    setModalVisible = (opt) => {
        this.setState({ isModalVisible: opt });
    }

    onChangeText = (opt) => {
        this.setState({ text: opt });
    }

    toggleSwitch = () => this.setIsEnabled(!this.state.isEnabled);


    toggleModal = () => {
        this.setModalVisible(!this.state.isModalVisible);
    };

    render() {
        const { isEnabled, isModalVisible, text } = this.state;
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
                            <Text style={styles.title}>Danh sách tiền tệ</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity>

                            </TouchableOpacity>
                            <TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        <TouchableOpacity onPress={this.toggleModal}>
                            <View style={styles.btnEditRate}>
                                <View>
                                    <Text style={styles.currency}>USD</Text>
                                    <Text style={styles.exchangeRate}>Tỷ giá: 1</Text>
                                </View>
                                <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M9.03044 7.75767C8.93201 7.8561 8.85605 7.96844 8.78972 8.08613L8.74585 8.04226L8.7191 8.22843C8.61211 8.47985 8.57467 8.75589 8.60462 9.03299L8.17773 12.0244L11.1702 11.5975C11.4473 11.6275 11.7234 11.5901 11.9748 11.4831L12.161 11.4574L12.1171 11.4135C12.2337 11.3472 12.3471 11.2712 12.4456 11.1728L17.8518 5.76659L14.4377 2.35254L9.03044 7.75767Z" fill="#231F20" />
                                    <Path d="M19.4541 1.67816L18.5233 0.747351C17.8375 0.0615453 16.7718 0.0155396 16.1427 0.643571L15.29 1.49628L18.7041 4.91033L19.5568 4.05655C20.1859 3.42959 20.1399 2.36397 19.4541 1.67816Z" fill="#231F20" />
                                    <Path d="M16.0485 10.3737V18.1883H2.1398V2.1398H11.7186L13.3481 0.620542C13.5214 0.448288 13.7257 0.384094 13.9419 0.307061C13.9879 0.179743 14.0531 0.114479 14.1302 0H0V20.3281H18.1883V8.48216L16.0485 10.3737Z" fill="#231F20" />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Sửa tỷ giá</Text>
                                    <TextInput
                                        style={styles.inputSL}
                                        keyboardType="numeric"
                                    />
                                    <View style={styles.btnGroupConfirm}>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible(!isModalVisible)}>
                                            <Text style={styles.txtConfirm}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.setModalVisible(!isModalVisible)}>
                                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(!isModalVisible)}
                                style={styles.modalBackdrop}
                            />
                        </Modal>


                    </ScrollView>

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

export default connect(mapStateToProps, mapDispatchToProps)(CurrenlyList)
