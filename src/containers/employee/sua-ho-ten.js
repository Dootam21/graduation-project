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
    Switch,
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
            txt: '',
        }
    }

    setTxt(txt)
    {
        this.setState({txt: txt});
    }

    async saveData(d)
    {
        var ad = this.props.admin;
            ad.nv_edit_fullname = d;

        // this.props.setName(d);
        this.props.accountAction("user_info", ad);
        var update = {
            id: ad.active_uid,
            field: 'fullname',
            data: d,
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
        const {data, txt} = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={"Sửa họ và tên"} />

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
                        {/* <Text style={styles.text4}>Không còn dữ liệu...</Text> */}

                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Họ và tên</Text>
                            
                            <TextInput
                                style={styles.inputName}
                                placeholder="Họ và tên..."
                                onChangeText={(txt)=>this.setTxt(txt)}
                                value={txt}
                            />
                        </View>
                        
                        <TouchableOpacity onPress={()=>this.saveData(txt)}>
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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(EditHoten)


