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
import { get_payment_history } from '../../services/thuchiService';
import thuchiAction from '../../actions/thichiAction';
import productAction from '../../actions/productAction';

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

class PaymentHistory extends Component {
    // const { productId } = route.params;
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            data: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    setIsEnabled = (opt) => {
        this.setState({ isEnabled: opt });
    }

    toggleSwitch = () => setIsEnabled(!this.state.isEnabled);

    async getData() {
        var data = [];
        if (this.props?.route?.params?.supplier) {
            data = await get_payment_history({
                u_id: this.props.admin.uid,
                supplier_id: this.props.supplier.id,
            });
        }
        else if (this.props?.route?.params?.customer) {
            data = await get_payment_history({
                u_id: this.props.admin.uid,
                customer_id: this.props.customer.id,
            });
        }
        this.setState({ data: data });
        // console.log(data);
    }

    render() {
        const { data } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={"Lịch sử thanh toán"} />

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        {
                            data.map((d, index) => (
                                // console.log(d),
                                <TouchableOpacity key={index} onPress={() => {
                                    this.props.thuchiAction('get_detail', d);
                                    this.props.productAction('set_chi_id', d?.id);
                                    this.props.navigation.navigate('TransactionDetail', {
                                        supplier: this.props?.route?.params?.supplier,
                                        customer: this.props?.route?.params?.customer
                                    });
                                }}>
                                    <View style={styles.flexBox}>
                                        <View style={styles.txtRight}>
                                            {
                                                d?.type == 1 ?
                                                    <Text style={styles.textGreen}>+{d?.totle_thanhtoan}</Text> :
                                                    d?.type == 2 ?
                                                        <Text style={styles.textRed}>-{d?.totle_thanhtoan}</Text> :
                                                        <></>
                                            }
                                            <Text style={styles.textNote}>Ghi chú: {d?.ghi_chu ? d?.ghi_chu : 'Không có ghi chú'}</Text>
                                        </View>
                                        <View style={styles.textLeft}>
                                            <Text style={styles.txtWagon}>{d?.txt}</Text>
                                            <Text style={styles.txtTime}>{d?.created}</Text>
                                            <Text style={styles.txtAuthor}>Tạo bởi: {d?.user_name}</Text>
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
}
const mapStateToProps = state => ({
    supplier: state.supplier,
    customer: state.customer,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    thuchiAction: (act, data) => dispatch(thuchiAction(act, data)),
    productAction: (act, data) => dispatch(productAction(act, data)),


});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistory)
