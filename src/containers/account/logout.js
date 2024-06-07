/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
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
    Modal,
    Alert,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import { login, get_user_data } from '../../services/accountService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import accountAction from '../../actions/accountAction';
import BackgroundService from 'react-native-background-actions';

class Logout extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            pass: '',
            token: '',
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        try {
            await BackgroundService.stop();
            await AsyncStorage.removeItem('appID');

        }
        catch (e) {
        }

        // this.props.accountAction('user_info', []);
        await AsyncStorage.removeItem('appID');
        this.props.navigation.navigate('Login');
    }

    render() {
        const data = this.state.data;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    accountAction: (act, data) => dispatch(accountAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
