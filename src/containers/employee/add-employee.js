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
    Modal,
    Alert
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

import { list_group, add_user } from '../../services/accountService'


class AddEmployee extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {
                id: 0,
                fullname: '',
                username: '',
                password: '',
                repass: '',
                group_id: 0,
                chucvu: 'Chọn',
                status: 1,
            },
            isEnabled: true,
            isModalVisible3: false,
            groups: [],
            listQuanly: [],
            quanLy: {},
            isModalVisible4: false,
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const d = await list_group({
            u_id: this.props.admin.uid,
        });
        if (this.props.admin.is_admin == 1) {
            this.setState({ groups: d });
        }
        else {
            this.setState({
                groups: {
                    "3": "Nhân viên bán hàng",
                    "4": "Khách"
                }
            })
        }


        const d2 = this.state.data;
        d2.id = this.props.admin.uid;
        this.setState({ data: d2 });

        this.getListQuanly();

    }

    toggleState = (key) => {
        this.setState((prevState) => ({
            [key]: !prevState[key],
        }));

        var status = this.state.isEnabled == true ? 1 : 0;
        var d = this.state.data;
        d.state = status;
    };

    setUsername(txt) {
        var d = this.state.data;
        d.username = txt;

        this.setState({ data: d });
    }

    setPassword(txt) {
        var d = this.state.data;
        d.password = txt;

        this.setState({ data: d });
    }

    setRepass(txt) {
        var d = this.state.data;
        d.repass = txt;

        this.setState({ data: d });
    }

    setChucvu(id, txt) {
        var d = this.state.data;
        d.chucvu = txt;
        d.group_id = id;

        this.setState({ data: d });
        this.setModalVisible3(false);
    }

    setFullname(txt) {
        var d = this.state.data;
        d.fullname = txt;

        this.setState({ data: d });
    }

    setFullname(txt) {
        var d = this.state.data;
        d.fullname = txt;

        this.setState({ data: d });
    }

    setModalVisible3 = (options) => {
        this.setState({
            isModalVisible3: options,
        });
    }

    setModalVisible4 = (options) => {
        this.setState({
            isModalVisible4: options,
        });
    }

    async createUser() {
        const d = this.state.data;

        if (d.username == '') {
            Alert.alert("Vui lòng nhập đủ thông tin");
            return false;
        }

        if (d.password == '' || d.repass == '') {
            Alert.alert("Vui lòng nhập đủ thông tin");
            return false;
        }

        if (d.repass != d.password) {
            Alert.alert("Mật khẩu và mật khẩu xác nhận không giống nhau");
            return false;
        }

        const data = await add_user({
            ...this.state.data,
            parent_id: this.state.quanLy.id,
            u_id: this.props.admin.uid,
        });

        if (data === false)
            console.log("Có lỗi");


        this.props.navigation.pop();
    }

    render_group(groups) {
        var d = new Array();

        if (JSON.stringify(groups) !== '{}') {
            for (var k in groups) {
                let i = k;
                let item = groups[i];

                d.push(
                    <TouchableOpacity onPress={() => this.setChucvu(i, item)}>
                        <Text style={styles.txtChucVu}>{item}</Text>
                    </TouchableOpacity>
                )
            }
        }

        return d;
    }

    render_quanly(groups) {
        var d = new Array();

        if (JSON.stringify(groups) !== '{}') {
            for (var k in groups) {
                let i = k;
                let item = groups[i];

                d.push(
                    <TouchableOpacity onPress={() => {
                        this.setQuanLy(item);
                        this.setModalVisible4(false);
                    }}>
                        <Text style={styles.txtChucVu}>{item.name}</Text>
                    </TouchableOpacity>
                )
            }
        }

        return d;
    }

    setQuanLy(opt) {
        console.log(opt);
        this.setState({ quanLy: opt });
    }


    getListQuanly() {
        if (this.props.admin.is_admin == 1) {
            const data = [{ id: 1, name: 'Administrator' }]
            this.props.admin.listUsers.map(user => {
                if (user.group_id == 1) {
                    data.push({
                        id: user.id,
                        name: user.fullname
                    });
                }
            });
            this.setState({ listQuanly: data })
        }
        else {
            this.setState({
                listQuanly: [{
                    id: this.props.admin.uid,
                    name: this.props.admin.fullname,
                }]
            })
        }
    }

    render() {
        const navigation = this.props.navigation;
        const { data, groups, listQuanly, quanLy } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={"Thêm mới nhân viên"} />

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
                        {/* <Text style={styles.text4}>Không còn dữ liệu...</Text> */}

                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Họ và tên</Text>
                            <TextInput
                                style={styles.inputName}
                                placeholder="Họ và tên..."
                                onChangeText={(text) => this.setFullname(text)}
                            />
                        </View>
                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Tên đăng nhập</Text>
                            <TextInput
                                style={styles.inputName}
                                placeholder="Tên đăng nhập"
                                onChangeText={(text) => this.setUsername(text)}
                            />
                        </View>
                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Mật khẩu</Text>
                            <TextInput
                                style={styles.inputName}
                                secureTextEntry={true}
                                placeholder="Mật khẩu..."
                                onChangeText={(text) => this.setPassword(text)}
                            />
                        </View>
                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Nhập lại mật khẩu</Text>
                            <TextInput
                                style={styles.inputName}
                                secureTextEntry={true}
                                placeholder="Nhập lại mật khẩu..."
                                onChangeText={(text) => this.setRepass(text)}
                            />
                        </View>
                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Chức vụ</Text>
                            <TouchableOpacity onPress={() => this.setModalVisible3(true)}>
                                <Text style={styles.btnxxx}>{data.chucvu}</Text>
                            </TouchableOpacity>

                            <Modal visible={this.state.isModalVisible3} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        {this.render_group(groups)}
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={0} onPress={() => this.setModalVisible3(false)}
                                    style={styles.modalBackdrop1}
                                />
                            </Modal>
                        </View>
                        {/* {
                            (data.group_id == 3 || data.group_id == 4) && (
                                <View style={styles.groupInput}>
                                    <Text style={styles.textAttr}>Quản lý</Text>
                                    <TouchableOpacity onPress={() => this.setModalVisible4(true)}>
                                        <Text style={styles.btnxxx}>{quanLy?.name ? quanLy?.name : 'Chọn'}</Text>
                                    </TouchableOpacity>

                                    <Modal visible={this.state.isModalVisible4} animationType="slide" transparent={true}>
                                        <View style={styles.modalContainer2}>
                                            <View style={styles.modalContent}>
                                                {this.render_quanly(listQuanly)}
                                            </View>
                                        </View>
                                        <TouchableOpacity activeOpacity={0} onPress={() => this.setModalVisible4(false)}
                                            style={styles.modalBackdrop1}
                                        />
                                    </Modal>
                                </View>
                            )
                        } */}
                        <View style={styles.groupSwitch}>
                            <Text style={styles.attrName}>Trạng thái(Đóng/ Mở)</Text>
                            <Switch style={styles.cSwitch}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.toggleState('isEnabled')}
                                value={this.state.isEnabled}
                            />
                        </View>
                        <TouchableOpacity onPress={() => this.createUser()}>
                            <Text style={styles.btnAddCus}>Thêm</Text>
                        </TouchableOpacity>

                    </ScrollView>

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

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee)


