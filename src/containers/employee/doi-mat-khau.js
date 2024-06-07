/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../elements/Footer';
import Header from '../elements/Header';

// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';

import accountAction from '../../actions/accountAction';
import { update_nhanvien } from '../../services/accountService';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class EditHoten extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isEnabled: false,
            mk: '',
            mk2: '',
        }
    }

    setMK(txt)
    {
        this.setState({mk: txt});
    }

    setMK2(txt)
    {
        this.setState({mk2: txt});
    }

    async saveData(m1, m2)
    {
        if(m1 == '' || m2 == '')
        {
            Alert.alert("Vui lòng nhập mật khẩu");
            return false;
        }

        if(m1 != m2)
        {
            Alert.alert("Mật khẩu và Mật khẩu nhập lại không khớp");
            return false;
        }

        var ad = this.props.admin;
            ad.nv_edit_pass = m1;

        // this.props.setName(d);
        this.props.accountAction("user_info", ad);

        var update = {
            id: ad.active_uid,
            field: 'pass',
            data: m1,
            u_id: this.props.admin.uid,
        };


        const data = await update_nhanvien(update);
        
        if(data === false)
        {
            return false;
        }

        this.props.navigation.pop();
    }
    render() {
        const navigation = this.props.navigation;
        const {data, mk, mk2} = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={"Đổi mật khẩu"} />

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
                        {/* <Text style={styles.text4}>Không còn dữ liệu...</Text> */}

                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Mật khẩu</Text>
                            <TextInput
                                style={styles.inputName}
                                placeholder="Mật khẩu..."
                                onChangeText={(txt)=>this.setMK(txt)}
                                value={mk}
                            />
                        </View>
                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Nhập lại mật khẩu</Text>
                            <TextInput
                                style={styles.inputName}
                                placeholder="Nhập lại mật khẩu..."
                                onChangeText={(txt)=>this.setMK2(txt)}
                                value={mk2}
                            />
                        </View>
                        
                        <TouchableOpacity onPress={()=>this.saveData(mk, mk2)}>
                            <Text style={styles.btnAddCus}>Cập nhật</Text>
                        </TouchableOpacity>

                    </ScrollView>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };
};
const mapStateToProps = state => ({
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    accountAction: (act, data) => dispatch(accountAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditHoten)


