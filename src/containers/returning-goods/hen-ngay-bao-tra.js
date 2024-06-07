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
// import DatePicker from 'react-native-datepicker';
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

class HNBaoTra extends Component {
    // const { productId } = route.params;
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            selectedDate: '',
        }
    }

    setIsEnabled = (opt) => {
        this.setState({ isEnabled: opt });
    }

    setSelectedDate = (opt) => {
        this.setState({ selectedDate: opt });
    }

    toggleSwitch = () => this.setIsEnabled(!this.state.isEnabled);

    handleDateChange = (date) => {
        this.setSelectedDate(date);
    };

    render() {
        const { isEnabled, selectedDate } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={'Ngày hẹn báo trả'} />

                    {/* <Header {[title = "home"]} /> */}

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <View>
                            <View style={styles.flexRowDate}>
                                <Text style={styles.textDate}>Ngày hẹn nợ:</Text>
                                <View>
                                    <DatePicker
                                        style={styles.datePicker}
                                        date={selectedDate}
                                        mode="date"
                                        format="YYYY-MM-DD"
                                        minDate="1900-01-01"
                                        maxDate="2100-01-01"
                                        onDateChange={this.handleDateChange}
                                    />
                                </View>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: '#E9E8E8',
                                    borderBottomWidth: 1,
                                }}>
                                <TextInput
                                    editable
                                    multiline
                                    numberOfLines={4}
                                    style={{ padding: 10 }}
                                    placeholder='Ghi chú'
                                />
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Text style={styles.btnConfirm}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HNBaoTra)
