/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import Header from '../elements/Header';
import { connect } from 'react-redux';
import { save_user_data } from '../../services/accountService'


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
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class DoiMatKhau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            isModalVisible2: false,
            data: {
                id: 0,
                phone: '',
                old_pass: '',
                new_pass: '',
                re_pass: '',
            },
            name: '',
        }
    }

    componentDidMount() {
        this.getInfimation();
    }


    setIsEnabled = (opt) => {
        this.setState({ isEnabled: opt });
    }

    setModalVisible2 = (opt) => {
        this.setState({ isModalVisible2: opt });
    }

    toggleSwitch = () => this.setIsEnabled(!this.state.isEnabled);


    toggleModal2 = () => {
        this.setModalVisible2(!this.state.isModalVisible2);
    };


    setOldPass(txt)
    {
        var d = this.state.data;
            d.old_pass = txt;

        this.setState({data: d});
    }

    setPass(txt)
    {
        var d = this.state.data;
            d.new_pass = txt;

        this.setState({data: d});
    }

    setRePass(txt)
    {
        var d = this.state.data;
            d.re_pass = txt;

    }

    async getInfimation() {
        var d = {
            id: this.props.admin.uid,
            phone: this.props.admin.phone,
            old_pass: '',
            new_pass: '',
            re_pass: '',
        }
        console.log('getInfimation');
        console.log(d);

        console.log(this.props.admin);
        this.setState({data: d});
    }

    async editInfimation() {

        this.toggleModal2();

        const d = this.state.data;
        console.log('d');
        console.log(d);
        if(d.old_pass == '' || d.re_pass == '')
        {
            Alert.alert("Vui lòng nhập đủ thông tin");
            return false;
        }

        if(d.new_pass != d.re_pass)
        {
            Alert.alert("Mật khẩu mới và mật khẩu xác nhận không giống nhau");
            return false;
        }

        const data = await save_user_data(this.state.data);

        if(data === false)
            Alert.alert("Mật khẩu cũ không đúng");


        this.props.navigation.pop();
    }

    render() {
        const { isEnabled, isModalVisible2, data } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title='Đổi mật khẩu' />
                    <ScrollView>
                        <View style={[styles.flexRow, styles.borderBottom]}>
                            <Text style={[styles.nameAttr]}>Mật khẩu cũ</Text>
                            <TextInput style={[styles.val]} keyboardType="numeric" 
                                placeholder='Mật khẩu cũ...'
                                onChangeText={(text) => this.setOldPass(text)}></TextInput>
                        </View>
                        <View style={[styles.flexRow, styles.borderBottom]}>
                            <Text style={[styles.nameAttr]}>Mật khẩu mới</Text>
                            <TextInput style={[styles.val]} keyboardType="numeric" 
                                placeholder='Mật khẩu mới...'
                                onChangeText={(text) => this.setPass(text)}></TextInput>
                        </View>
                        <View style={[styles.flexRow, styles.borderBottom]}>
                            <Text style={[styles.nameAttr]}>Xác nhận Mật khẩu mới</Text>
                            <TextInput style={[styles.val]} keyboardType="numeric" 
                                placeholder='Xác nhận Mật khẩu mới...'
                                onChangeText={(text) => this.setRePass(text)}></TextInput>
                        </View>
                        <View style={styles.checkAll}>
                            <Switch style={styles.customSwitch}
                                trackColor={{ false: '#fff', true: '#2DCC70' }}
                                thumbColor={isEnabled ? '#fff' : '#fff'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>this.toggleSwitch()}
                                value={isEnabled}
                            />
                            <Text>Đăng xuất khỏi thiết bị khác</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.toggleModal2()}>
                            <Text style={styles.btnSave}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                        <Modal visible={isModalVisible2} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalContent}>
                                    <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                    <View style={styles.btnGroupConfirm}>
                                        <TouchableOpacity style={styles.closeButton} onPress={this.toggleModal2}>
                                            <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.confirmButton} onPress={()=>this.editInfimation()}>
                                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={this.toggleModal2}
                                style={styles.modalBackdrop}
                            />
                        </Modal>
                    </ScrollView>

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
});

export default connect(mapStateToProps, mapDispatchToProps)(DoiMatKhau)
