/**
 * React Native App
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
import { get_detail_customer } from '../../services/customerSevice';
import { create_cart_quick } from '../../services/cartService';
import customerAction from '../../actions/customerAction';
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
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import OrderDetail from '../cart/order-details';
import DatePickerComponent from '../elements/DatePickerComponent';



class FreightWagons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerData: {},
            ghiChu: '',
            phone: ''
        }
    }

    componentDidMount() {
        this.getCustomer();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.getCustomer();
            }
        );
    }

    setCustomerData(data) {
        this.setState({ customerData: data })
    }

    setGhiChu(opt) {
        this.setState({ ghiChu: opt });
    }

    gotoCustomerList() {
        this.props.navigation.navigate('Customer', { cart: Math.random() })
    }

    async getCustomer() {
        if (this.props?.customer?.id !== 0) {
            const data = await get_detail_customer({
                id: this.props?.customer?.id,
                u_id: this.props.admin.uid,
            });
            this.setCustomerData(data);
            this.setState({ phone: data.phone[0] });
        }
    }

    async handleCreateCart() {
        const dataLog = await create_cart_quick({
            u_id: this.props.admin.uid,
            customer_id: this.props?.customer?.id,
            ghi_chu: this.state?.ghiChu,
        });
        this.props.customerAction('current_customer_id', 0);
        this.props.navigation.goBack();
    }

    render() {
        const { customerData, ghiChu, phone } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={'Tạo đơn hàng nhanh'} />
                    <ScrollView>
                        <View style={styles.client}>
                            <TouchableOpacity style={styles.customer} onPress={() => this.gotoCustomerList()}>
                                <Text style={styles.hText}>{this.props?.customer?.id !== 0 ? customerData?.fullname : 'Khách mới'}</Text>
                                {
                                    this.props?.customer?.id !== 0 && this.props.admin.is_show_phone_cus == 1 && (
                                        <View style={styles.groupIcon}>
                                            <Text style={styles.txtPhone}>
                                                SĐT:
                                                <Text style={styles.txtPhoneNumber}>
                                                    {phone}
                                                </Text>
                                            </Text>
                                        </View>
                                    )
                                }
                            </TouchableOpacity>
                            <View style={styles.ipGroup}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Ghi chú...'
                                    value={ghiChu}
                                    onChangeText={(text) => this.setGhiChu(text)}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <View>
                        <TouchableOpacity onPress={() => this.handleCreateCart()}>
                            <Text style={[styles.btnConfirm, styles.padding10]}>Tạo toa nhanh</Text>
                        </TouchableOpacity>
                    </View>
                    <Footer />
                </View >
            </SafeAreaView >
        );
    };
}


const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart,
    color: state.color,
    size: state.size,
    customer: state.customer,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FreightWagons)

