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

class ListNews extends Component {

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
                            <Text style={styles.title}>Danh sách tin</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => this.gotoPage('AddNews')}>
                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M9 18C7.21997 18 5.47991 17.4722 3.99987 16.4832C2.51983 15.4943 1.36628 14.0887 0.685088 12.4442C0.00389956 10.7996 -0.17433 8.99002 0.172937 7.24419C0.520203 5.49836 1.37737 3.89471 2.63604 2.63604C3.89471 1.37737 5.49836 0.520203 7.24419 0.172937C8.99002 -0.17433 10.7996 0.00389956 12.4442 0.685088C14.0887 1.36628 15.4943 2.51983 16.4832 3.99987C17.4722 5.47991 18 7.21997 18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18ZM9 1.38462C7.49382 1.38462 6.02146 1.83125 4.76912 2.66804C3.51678 3.50483 2.5407 4.69419 1.96431 6.08572C1.38792 7.47725 1.23711 9.00845 1.53095 10.4857C1.82479 11.9629 2.55008 13.3199 3.61511 14.3849C4.68014 15.4499 6.03708 16.1752 7.51431 16.4691C8.99155 16.7629 10.5228 16.6121 11.9143 16.0357C13.3058 15.4593 14.4952 14.4832 15.332 13.2309C16.1688 11.9785 16.6154 10.5062 16.6154 9C16.6154 6.98028 15.8131 5.04327 14.3849 3.61511C12.9567 2.18695 11.0197 1.38462 9 1.38462Z" fill="white" />
                                    <Path d="M8.99992 13.8461C8.81631 13.8461 8.64022 13.7732 8.51039 13.6433C8.38056 13.5135 8.30762 13.3374 8.30762 13.1538V4.84612C8.30762 4.6625 8.38056 4.48641 8.51039 4.35658C8.64022 4.22675 8.81631 4.15381 8.99992 4.15381C9.18354 4.15381 9.35963 4.22675 9.48946 4.35658C9.61929 4.48641 9.69223 4.6625 9.69223 4.84612V13.1538C9.69223 13.3374 9.61929 13.5135 9.48946 13.6433C9.35963 13.7732 9.18354 13.8461 8.99992 13.8461Z" fill="white" />
                                    <Path d="M13.1538 9.69223H4.84612C4.6625 9.69223 4.48641 9.61929 4.35658 9.48946C4.22675 9.35963 4.15381 9.18354 4.15381 8.99992C4.15381 8.81631 4.22675 8.64022 4.35658 8.51039C4.48641 8.38056 4.6625 8.30762 4.84612 8.30762H13.1538C13.3374 8.30762 13.5135 8.38056 13.6433 8.51039C13.7732 8.64022 13.8461 8.81631 13.8461 8.99992C13.8461 9.18354 13.7732 9.35963 13.6433 9.48946C13.5135 9.61929 13.3374 9.69223 13.1538 9.69223Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <ScrollView style={{ backgroundColor: "#fff" }}>

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

export default connect(mapStateToProps, mapDispatchToProps)(ListNews)
