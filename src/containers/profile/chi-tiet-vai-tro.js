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
import { roleList, rolesListAdmin } from './Roles';



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
import CheckBoxRole from './CheckBoxRole';
import { get_role_list, update_role_list } from '../../services/accountService';

class DetailRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRole: [],
            modalConfirm: false,
        }
    }

    componentDidMount() {
        this.getListRole();
    }

    setListRole = (opt) => {
        this.setState({ listRole: opt });
    }

    setModalConfirm = (opt) => {
        this.setState({ modalConfirm: opt });
    }

    handleAddRole = (role) => {
        this.setListRole([...this.state.listRole, role]);
    }

    handleRemoveRole = (key) => {
        const newList = this.state.listRole.filter(item => item !== key);
        this.setListRole(newList);
    }

    async handleConfirm() {
        const data = await update_role_list({
            u_id: this.props.admin.uid,
            group_id: this.props?.route?.params?.role?.role,
            group_list: this.state.listRole,
        })
        this.setModalConfirm(false);
        this.props.navigation.goBack();
    }

    async getListRole() {
        if (this.props?.route?.params?.role.roleId === 'administrator') {
            this.setListRole(rolesListAdmin);
        }
        else {
            const data = await get_role_list({
                u_id: this.props.admin.uid,
                group_id: this.props?.route?.params?.role?.role,
            })
            this.setListRole(data.role_list);
        }
    }


    render() {
        const { listRole, modalConfirm } = this.state;
        const role = this.props?.route?.params?.role;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title='Chi tiết vai trò' />
                    <ScrollView>
                        <View style={styles.containerInfoRole}>
                            <View style={styles.coverInfoRole}>
                                <Text>Mã vai trò <Text style={styles.redStar}>*</Text></Text>
                                <Text style={styles.roleInfo}>{role.roleId}</Text>
                            </View>
                            <View style={styles.coverInfoRole}>
                                <Text>Tên vai trò <Text style={styles.redStar}>*</Text></Text>
                                <Text style={styles.roleInfo}>{role.roleName}</Text>
                            </View>
                        </View>
                        <View style={styles.lineRole}>
                            <Text>Danh sách quyền</Text>
                        </View>
                        {
                            roleList.map((item, index) => (
                                <View key={index} >
                                    <View style={styles.checkBoxRole}>
                                        <Text style={styles.checkBoxRoleTitle}>{item.text.toLocaleUpperCase()}</Text>
                                        {item.roles.map((roleItem, roleIndex) => (
                                            <CheckBoxRole
                                                key={roleIndex}
                                                roleKey={roleItem.key}
                                                roleName={roleItem.text}
                                                listRole={listRole}
                                                handleAddRole={(opt) => this.handleAddRole(opt)}
                                                handleRemoveRole={(opt) => this.handleRemoveRole(opt)}
                                            />
                                        ))}
                                    </View>
                                    <View style={styles.lineRoleList}></View>
                                </View>
                            ))
                        }
                        {
                            role.roleId !== 'administrator' &&
                            <TouchableOpacity onPress={() => this.setModalConfirm(true)}>
                                <Text style={styles.txtConfirm}>Xác nhận</Text>
                            </TouchableOpacity>
                        }
                    </ScrollView>
                    <Footer />
                </View >
                <Modal visible={modalConfirm} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Bạn chắc chắn chứ?</Text>
                            <View style={styles.btnGroupConfirm}>
                                <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalConfirm(false)}>
                                    <Text style={styles.txtConfirm}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleConfirm()}>
                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setModalConfirm(false)}
                        style={styles.modalBackdrop}
                    />
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailRole)
