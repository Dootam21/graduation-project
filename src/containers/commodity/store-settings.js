/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Footer from '../elements/Footer';
import Header from '../elements/Header';
import { connect } from 'react-redux';
import { get_cua_hang, edit_cua_hang } from '../../services/cuahangSettingService';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    Switch,
    TouchableOpacity,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class StoreSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            statusEnabled: false,
        }
    }

    toggleState = (key) => {
        this.setState((prevState) => ({
            [key]: !prevState[key],
        }));
    };

    componentDidMount() {
        this.getList();
    }

    setChamNgay = (opt) => {
        this.setState({ data: { ...this.state.data, chamngay: opt } });
    }
    setChamDoanhThu = (opt) => {
        this.setState({ data: { ...this.state.data, chamdoanhthu: opt } });
    }
    setLeSize = (opt) => {
        this.setState({ data: { ...this.state.data, lesize: opt } });
    }
    setChenhLechGiaLe = (opt) => {
        this.setState({ data: { ...this.state.data, chenhgiale: opt } });
    }
    setChenhGiaCTV = (opt) => {
        this.setState({ data: { ...this.state.data, chenhgiactv: opt } });
    }

    setData = (data) => {
        this.setState({ data: data });
    }

    async getList() {
        const dataLog = await get_cua_hang({
            u_id: this.props.admin.uid,
        });
        this.setData(dataLog);
    }
    async editCuaHang() {
        // console.log(this.props.admin.uid);
        const dataLog = await edit_cua_hang({
            ...this.state.data,
            u_id: this.props.admin.uid,
        });
        this.getList();
        this.props.navigation.pop();
    }

    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title='Cài đặt cửa hàng' />

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <View style={styles.attr}>
                            <Text style={styles.attrName}>Chạm ngày</Text>
                            <TextInput
                                style={styles.address1}
                                placeholder="Chạm ngày..." onChangeText={(text) => this.setChamNgay(text)} value={data?.chamngay}
                            />
                        </View>
                        <View style={styles.attr}>
                            <Text style={styles.attrName}>Chạm doanh thu(%)</Text>
                            <TextInput
                                style={styles.address1}
                                placeholder="Chạm doanh thu(%)..."
                                onChangeText={(text) => this.setChamDoanhThu(text)} value={data?.chamdoanhthu}
                            />
                        </View>
                        <View style={styles.attr}>
                            <Text style={styles.attrName}>Lẻ size</Text>
                            <TextInput
                                style={styles.address1}
                                placeholder="Lẻ size..."
                                onChangeText={(text) => this.setLeSize(text)} value={data?.lesize}
                            />
                        </View>
                        <View style={styles.attr}>
                            <Text style={styles.attrName}>Chênh lệnh giá lẻ(%)</Text>
                            <TextInput
                                style={styles.address1}
                                placeholder="Chênh lệnh giá lẻ(%)..."
                                onChangeText={(text) => this.setChenhLechGiaLe(text)}
                                value={data?.chenhgiale}
                            />
                        </View>
                        {/* <View style={styles.attr}>
                            <Text style={styles.attrName}>Cho phép liên kết</Text>
                            <Switch
                                style={styles.customSwitch}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={this.state.statusEnabled ? '#f4f3f4' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.toggleState('statusEnabled')}
                                value={this.state.statusEnabled}
                            />
                        </View> */}
                        <View style={styles.attr}>
                            <Text style={styles.attrName}>Chênh giá CTV (%)</Text>
                            <TextInput
                                style={styles.address1}
                                placeholder="Chênh giá CTV (%)..."
                                onChangeText={(text) => this.setChenhGiaCTV(text)} value={data?.chenhgiactv}
                            />
                        </View>
                    </ScrollView>

                    <TouchableOpacity onPress={() => this.editCuaHang()}>
                        <Text style={styles.btnSave}>Lưu lại</Text>
                    </TouchableOpacity>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };

};
const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(StoreSettings)

