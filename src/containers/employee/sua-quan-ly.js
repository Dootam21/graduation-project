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
    Modal,
} from 'react-native';

import accountAction from '../../actions/accountAction';
import { update_nhanvien } from '../../services/accountService';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class EditQuanly extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isEnabled: false,
            txt: '',
            isModalVisible3: false,
            listQuanly: [],
            quanLy: {},
            id: '',
        }
        // console.log(this.props.route.params.data.parent_id);
    }
    componentDidMount() {
        this.getListQuanly();
        this.setState({
            quanLy: {
                id: this.props.route.params.data.parent_id,
                name: this.props.route.params.data.quanly,
            },
            id: this.props.route.params.data.id,
        })

        // console.log(this.props.route.params.data.group_id);
    }
    setTxt(txt) {
        this.setState({ txt: txt });
    }

    setModalVisible3 = (options) => {
        this.setState({
            isModalVisible3: options,
        });
    }

    async saveData(d) {
        // var ad = this.props.admin;
        // ad.quanly = d.name;
        // ad.parent_id = d.id;
        // this.props.accountAction("user_info", ad);

        var update = {
            field: 'quanly',
            data: d.id,
            id: this.state.id,
        };

        const data = await update_nhanvien(update);
        if (data === false) {
            return false;
        }

        this.props.navigation.pop();
    }

    getListQuanly() {
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


    render_group(groups) {
        var d = new Array();

        if (JSON.stringify(groups) !== '{}') {
            for (var k in groups) {
                let i = k;
                let item = groups[i];

                d.push(
                    <TouchableOpacity onPress={() => {
                        this.setQuanLy(item);
                        this.setModalVisible3(false);
                    }}>
                        <Text style={styles.txtChucVu}>{item.name}</Text>
                    </TouchableOpacity>
                )
            }
        }

        return d;
    }

    setQuanLy(opt) {
        this.setState({ quanLy: opt });
    }


    render() {
        const navigation = this.props.navigation;
        const { data, isModalVisible3, listQuanly, quanLy } = this.state;
        const group_id = this.props.route.params.data.group_id;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={"Sửa quản lý"} />

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        {/*  */}
                        {
                            group_id == 3 || group_id == 4 ? (
                                <View style={styles.groupInput}>
                                    <Text style={styles.textAttr}>Quản lý</Text>
                                    <TouchableOpacity onPress={() => this.setModalVisible3(true)}>
                                        <Text style={styles.btnxxx}>{quanLy?.name}</Text>
                                    </TouchableOpacity>

                                    <Modal visible={isModalVisible3} animationType="slide" transparent={true}>
                                        <View style={styles.modalContainer2}>
                                            <View style={styles.modalContent}>
                                                {this.render_group(listQuanly)}
                                            </View>
                                        </View>
                                        <TouchableOpacity activeOpacity={0} onPress={() => this.setModalVisible3(false)}
                                            style={styles.modalBackdrop1}
                                        />
                                    </Modal>
                                </View>
                            ) : (
                                <Text style={styles.emptyList}>Danh sách rỗng</Text>
                            )
                        }

                        <TouchableOpacity onPress={() => this.saveData(quanLy)}>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditQuanly)


