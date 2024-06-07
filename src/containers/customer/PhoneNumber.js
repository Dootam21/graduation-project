/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import customerAction from '../../actions/customerAction';
import { connect } from 'react-redux';

// import type {Node} from 'react';
import {
    TextInput,
    Text,
    View,
} from 'react-native';

import { DOMAIN } from '../../constants/config';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const options = {
    title: 'Chọn ảnh',
    takePhotoButtonTitle: 'Chụp ảnh',
    chooseFromLibraryButtonTitle: 'Chọn từ Thư viện',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
    },
};

import styles from './styles.js';

class PhoneNumber extends Component {
    // const { productId } = route.params;
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: this.props.text,
        };
        // console.log('index', this.props.index);
    }


    setPhoneNumber(opt) {
        this.setState({ phoneNumber: opt });
    }

    handleAddPhone() {
        this.props.customerAction('get_list_phone', this.state.phoneNumber);
    }

    handleRemovePhone() {
        this.props.customerAction('remove_phone', this.props?.index);
    }

    render() {
        const { phoneNumber } = this.state;
        const data = this.state.data;
        return (
            <View style={styles.groupInput}>
                <Text style={styles.textAttr}>SĐT {this.props?.index + 1}</Text>
                <TextInput
                    style={styles.inputName}
                    placeholder={`SĐT ${this.props?.index + 1}...`}
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={(text) => this.setPhoneNumber(text)}
                    onBlur={() => this.handleAddPhone()}
                    onFocus={() => this.handleRemovePhone()}
                />
            </View>
        );
    }
};

const mapStateToProps = state => ({
    customer: state.customer,
});

const mapDispatchToProps = dispatch => ({
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber)
