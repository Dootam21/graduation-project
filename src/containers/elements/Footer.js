/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import customerAction from '../../actions/customerAction.js';
import productAction from '../../actions/productAction.js';
import cartAction from '../../actions/cartAction.js';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useSelector } from 'react-redux';


import styles from './styles.js';

function Footer({ customerAction }) {

    const role = useSelector(state => state.admin.roles);

    const navigation = useNavigation();

    const goToCommodity = () => {
        // if (role['product_list'] === 'product_list') {
        navigation.navigate('Commodity');
        cartAction('current_cart_auto', 0);
        // }
        // else {
        //     Alert.alert('Bạn không phép thực hiện hành động này!');
        // }
    };
    const goToFreightwagons = () => {
        // console.log('cusstomr action', customerAction());
        // if (role['order_list'] === 'order_list') {
        customerAction('current_customer_id_finder', 0);
        productAction('current_product_id', 0);
        cartAction('current_cart_auto', 0);
        navigation.navigate('FreightWagons', { footer: true });
        // }
        // else {
        //     Alert.alert('Bạn không phép thực hiện hành động này!');
        // }
    };
    const goToProfile = () => {
        navigation.navigate('Profile');
        cartAction('current_cart_auto', 0);
    };
    const goToHome = () => {
        navigation.navigate('Home');
        cartAction('current_cart_auto', 0);
    };

    // console.log(this.props.admin.role);

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.footer_item} onPress={goToHome}>
                <Svg style={styles.footer_item1} width="20" height="20" viewBox="0 0 48 48" fill="none">
                    <Path d="M6 18L24 4L42 18V40C42 41.0609 41.5786 42.0783 40.8284 42.8284C40.0783 43.5786 39.0609 44 38 44H10C8.93913 44 7.92172 43.5786 7.17157 42.8284C6.42143 42.0783 6 41.0609 6 40V18Z" stroke="#7d7d7d" stroke-linecap="round" strokeWidth="4" stroke-linejoin="round" />
                    <Path d="M18 44V24H30V44" stroke="#7d7d7d" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round" />
                </Svg>
                <Text style={styles.nav_link} >Trang chủ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footer_item} onPress={goToCommodity}>


                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M13.75 7.83333L6.25 3.50833" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M17.5 13.3333V6.66666C17.4997 6.37439 17.4225 6.08733 17.2763 5.83429C17.13 5.58125 16.9198 5.37113 16.6667 5.22499L10.8333 1.89166C10.58 1.74538 10.2926 1.66837 10 1.66837C9.70744 1.66837 9.42003 1.74538 9.16667 1.89166L3.33333 5.22499C3.08022 5.37113 2.86998 5.58125 2.72372 5.83429C2.57745 6.08733 2.5003 6.37439 2.5 6.66666V13.3333C2.5003 13.6256 2.57745 13.9126 2.72372 14.1657C2.86998 14.4187 3.08022 14.6289 3.33333 14.775L9.16667 18.1083C9.42003 18.2546 9.70744 18.3316 10 18.3316C10.2926 18.3316 10.58 18.2546 10.8333 18.1083L16.6667 14.775C16.9198 14.6289 17.13 14.4187 17.2763 14.1657C17.4225 13.9126 17.4997 13.6256 17.5 13.3333Z" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M2.7417 5.83334L10 10L17.2584 5.83334" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M10 18.3333V10" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                </Svg>


                <Text style={styles.nav_link} >Hàng hóa</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.footer_item} onPress={goToMessage}>
                <Svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M13.5 14C13.5 11.2386 15.7386 9 18.5 9H21V12C21 14.7614 18.7614 17 16 17H13.5V14Z" fill="#D9D9D9" />
                    <Path d="M1 9H3.5C6.26142 9 8.5 11.2386 8.5 14V17H6C3.23858 17 1 14.7614 1 12V9Z" fill="#D9D9D9" />
                    <Rect x="15" y="12" width="5" height="8" transform="rotate(90 15 12)" fill="#D9D9D9" />
                    <Path d="M21 9H15L13 12H9L7 9H1" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M4.45 2.11L1 9V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H19C19.5304 17 20.0391 16.7893 20.4142 16.4142C20.7893 16.0391 21 15.5304 21 15V9L17.55 2.11C17.3844 1.77679 17.1292 1.49637 16.813 1.30028C16.4967 1.10419 16.1321 1.0002 15.76 1H6.24C5.86792 1.0002 5.50326 1.10419 5.18704 1.30028C4.87083 1.49637 4.61558 1.77679 4.45 2.11Z" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                </Svg>

                <Text style={styles.nav_link} >Tin nhắn</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.footer_item} onPress={goToFreightwagons}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M5 1.66666L2.5 4.99999V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 17.1087 17.5 16.6667V4.99999L15 1.66666H5Z" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M2.5 5H17.5" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M13.3333 8.33334C13.3333 9.2174 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.884 11.6667 9.99996 11.6667C9.1159 11.6667 8.26806 11.3155 7.64294 10.6904C7.01782 10.0652 6.66663 9.2174 6.66663 8.33334" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                </Svg>
                <Text style={styles.nav_link} >Toa hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footer_item} onPress={goToProfile}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Rect width="20" height="20" fill="white" />
                    <Path d="M15.8333 17.5V15.8333C15.8333 14.9493 15.4821 14.1014 14.857 13.4763C14.2319 12.8512 13.384 12.5 12.5 12.5H7.49996C6.6159 12.5 5.76806 12.8512 5.14294 13.4763C4.51782 14.1014 4.16663 14.9493 4.16663 15.8333V17.5" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M9.99996 9.16667C11.8409 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.8409 2.5 9.99996 2.5C8.15901 2.5 6.66663 3.99238 6.66663 5.83333C6.66663 7.67428 8.15901 9.16667 9.99996 9.16667Z" stroke="#7D7D7D" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                </Svg>

                <Text style={styles.nav_link} >Cá nhân</Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = state => ({
    customer: state.customer,
    admin: state.admin,

});

const mapDispatchToProps = dispatch => ({
    customerAction: (act, data) => dispatch(customerAction(act, data)),
    productAction: (act, data) => dispatch(productAction(act, data)),
    cartAction: (act, data) => dispatch(cartAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
