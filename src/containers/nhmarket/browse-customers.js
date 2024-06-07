/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, Component } from 'react';
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
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class BrowseCustomers extends Component {
    // const { productId } = route.params;
    constructor(props) {
        super(props);
    }

    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }
    
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title="Chờ phê duyệt" />

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

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCustomers)
