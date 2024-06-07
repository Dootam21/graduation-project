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
import Header from '../elements/Header';
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
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class DoiMatKhau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            isModalVisible2: false,
        }
    }

    setIsEnabled = (opt) => {
        this.setState({ isEnabled: opt });
    }

    setModalVisible2 = (opt) => {
        this.setState({ isModalVisible2: opt });
    }

    toggleSwitch = () => this.setIsEnabled(!this.state.isEnabled);


    toggleModal2 = () => {
        this.setModalVisible2(!this.state.isModalVisible2);
    };

    render() {
        const { isEnabled, isModalVisible2 } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title='Quản lí máy in' />
                    <ScrollView>

                        <TouchableOpacity onPress={() => this.toggleModal2()}>
                            <Text style={styles.btnSave}>Quét</Text>
                        </TouchableOpacity>
                        <View style={styles.btnGroup}>
                            <Text>Đã kết nối : <Text style={styles.txtMayIn}>Không có thiết bị</Text></Text>
                            <Text>Danh sách thiết bị (chọn kết nối)</Text>
                        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoiMatKhau)
