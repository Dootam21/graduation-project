/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, Component } from 'react';

import Footer from '../elements/Footer';
import Header from '../elements/Header';
import { connect } from 'react-redux';
import { save_user_data } from '../../services/accountService';
import accountAction from '../../actions/accountAction';


// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class ThongTinCaNhan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                ...this.props.admin,
            },
            phone: this.props.admin.phone,
        }
    }

    componentDidMount() {
        this.getQuanly();
    }

    setPhone(phone) {
        this.setState({ phone: phone });
    }

    async editInfimation() {
        const data = await save_user_data({
            id: this.props.admin.uid,
            phone: this.state.phone,
        });
        this.props.accountAction('update_phone', this.state.phone);

        if (data === false) {
            console.log("Có lỗi, không nhận diện được người dùng");
            return false;
        }

        this.props.navigation.pop();
    }

    getQuanly() {
        const quanly = this.props.admin.listUsers.find(user => user.id === this.props.admin.uid);
        this.setState({ quanly: quanly?.quanly });
    }

    render() {
        const { data, quanly, phone } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title='Thông tin cá nhân' />
                    <ScrollView>
                        <View style={[styles.flexRow, styles.borderBottom]}>
                            <Text style={[styles.nameAttr]}>Họ và tên</Text>
                            <Text style={[styles.val]}>{data?.fullname}</Text>
                        </View>
                        <View style={[styles.flexRow, styles.borderBottom]}>
                            <Text style={[styles.nameAttr]}>Số điện thoại</Text>
                            <TextInput style={[styles.val]}
                                keyboardType="numeric"
                                value={phone}
                                placeholder='Số điện thoại...'
                                onChangeText={(text) => this.setPhone(text)}
                            ></TextInput>
                        </View>
                        <View style={[styles.flexRow, styles.borderBottom]}>
                            <Text style={[styles.nameAttr]}>Username</Text>
                            <Text style={[styles.val]}>{data.username}</Text>
                        </View>
                        <View style={[styles.flexRow, styles.borderBottom]}>
                            <Text style={[styles.nameAttr]}>Quyền hạn</Text>
                            <Text style={[styles.val]}>{data?.group_title ? data?.group_title : 'Chưa có'}</Text>
                        </View>
                        <View style={[styles.flexRow, styles.borderBottom]}>
                            <Text style={[styles.nameAttr]}>Người phụ trách</Text>
                            <Text style={[styles.val]}>{quanly ? quanly : 'Chưa có'}</Text>
                        </View>
                    </ScrollView>

                    <TouchableOpacity onPress={() => this.editInfimation()}>
                        <Text style={styles.btnSave}>Lưu</Text>
                    </TouchableOpacity>
                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    accountAction: (act, data) => dispatch(accountAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThongTinCaNhan)

