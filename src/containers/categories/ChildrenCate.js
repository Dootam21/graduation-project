/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Footer from '../elements/Footer';
import { connect } from 'react-redux';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import Header from '../elements/Header';
import { get_categories, get_category_settings } from '../../services/categoryService';
import styles from './styles.js';

import categoryAction from '../../actions/categoryAction';
import { get_category, add_category, edit_category, delete_category } from '../../services/categoryService';
import category from './category';

class SettingCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalEdit: false,
            modalDelete: false,
            title: this.props.title,
        }
    }

    setModalEdit(opt) {
        this.setState({ modalEdit: opt })
    }

    setModalDelete(opt) {
        this.setState({ modalDelete: opt })
    }

    setTitle(opt) {
        this.setState({ title: opt })
    }

    async deleteCategory() {
        const dataLog = await delete_category({
            id: this.props.id,
            u_id: this.props.admin.uid,
        });
        this.setModalDelete(false);
        this.props.reloadData();
    }

    async editCategory() {
        const data = await edit_category({
            id: this.props.id,
            u_id: this.props.admin.uid,
            title: this.state.title,
        });
        this.setModalEdit(false);
        this.props.reloadData();
    }



    render() {
        const { modalEdit, modalDelete, title } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    <ScrollView>
                        <View style={[styles.flexRowC, styles.groupBtn6]}>
                            <Text style={styles.txtCateName}>{this.props?.title}</Text>
                            <View style={styles.flexRowC}>
                                <TouchableOpacity onPress={() => {
                                    if (this.props.admin.roles?.includes('category_edit') || this.props.admin.is_admin == 1) {
                                        this.setModalEdit(true);
                                    }
                                    else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M11.9627 10.5602L9.87774 11.0777C9.6837 11.1252 9.48488 11.1504 9.28517 11.1527C8.96426 11.1532 8.64643 11.0898 8.35026 10.9662C8.05409 10.8425 7.7855 10.6612 7.56016 10.4327C7.26524 10.1343 7.05177 9.76522 6.94016 9.36084C6.82854 8.95637 6.82251 8.53006 6.92265 8.12263L7.44766 6.0376C7.57977 5.51017 7.85186 5.02819 8.23517 4.64256L11.3777 1.5H3.00006C2.2044 1.5 1.44132 1.81608 0.878698 2.3787C0.316077 2.94131 0 3.7044 0 4.50006V15.0003C0 15.7959 0.316077 16.559 0.878698 17.1216C1.44132 17.6842 2.2044 18.0003 3.00006 18.0003H13.5002C14.2959 18.0003 15.059 17.6842 15.6217 17.1216C16.1843 16.559 16.5004 15.7959 16.5004 15.0003V6.6226L13.3578 9.76513C12.9726 10.1507 12.4907 10.4253 11.9627 10.5602Z" fill="black" />
                                        <Path d="M17.4703 0.969837L17.0308 0.530327C16.8627 0.362193 16.6631 0.228822 16.4434 0.137828C16.2238 0.0468341 15.9883 0 15.7506 0C15.5128 0 15.2773 0.0468341 15.0576 0.137828C14.838 0.228822 14.6384 0.362193 14.4703 0.530327L9.29515 5.70544C9.10299 5.89766 8.96659 6.13849 8.90065 6.4022L8.38014 8.48499C8.34082 8.64188 8.34281 8.80628 8.38593 8.96216C8.42905 9.11803 8.51184 9.26006 8.6262 9.37445C8.74057 9.48884 8.88262 9.57165 9.03846 9.61476C9.19434 9.65787 9.35878 9.65985 9.51565 9.62052L11.5985 9.10003C11.8622 9.03406 12.103 8.89771 12.2952 8.7055L17.4703 3.53039C17.6384 3.36227 17.7718 3.16267 17.8628 2.943C17.9538 2.72332 18.0007 2.48789 18.0007 2.25011C18.0007 2.01234 17.9538 1.7769 17.8628 1.55723C17.7718 1.33756 17.6384 1.13796 17.4703 0.969837Z" fill="black" />
                                    </Svg>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => {
                                    if (this.props.admin.roles?.includes('category_delete') || this.props.admin.is_admin == 1) {
                                        this.setModalDelete(true);
                                    }
                                    else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <Svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M13.1536 3.76923H2.07666V19H13.1536V3.76923Z" stroke="#152730" strokeWidth="2" stroke-miterlimit="10" />
                                        <Path d="M7.61523 5.84619V16.9231" stroke="#152730" strokeWidth="2" stroke-miterlimit="10" />
                                        <Path d="M10.3843 5.84619V16.9231" stroke="#152730" strokeWidth="2" stroke-miterlimit="10" />
                                        <Path d="M4.84668 5.84619V16.9231" stroke="#152730" strokeWidth="2" stroke-miterlimit="10" />
                                        <Path d="M0 3.76923H15.2308" stroke="#152730" strokeWidth="2" stroke-miterlimit="10" />
                                        <Path d="M9.69242 1H5.53857V3.76923H9.69242V1Z" stroke="#152730" strokeWidth="2" stroke-miterlimit="10" />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <Modal visible={modalEdit} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Thay đổi danh mục con</Text>
                                    <TextInput
                                        style={styles.inputSL}
                                        onChangeText={(text) => this.setTitle(text)}
                                        value={title}
                                    // value={addCate.title}
                                    />
                                    <View style={styles.btnGroupConfirm}>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalEdit(false)}>
                                            <Text style={styles.txtConfirm}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.editCategory()}>
                                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalEdit(false)}
                                style={styles.modalBackdrop}
                            />
                        </Modal>

                        <Modal visible={modalDelete} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Bạn chắc chắn chứ?</Text>
                                    <View style={styles.btnGroupConfirm}>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalDelete(false)}>
                                            <Text style={styles.txtConfirm}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.deleteCategory()}>
                                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalDelete(false)}
                                style={styles.modalBackdrop}
                            />
                        </Modal>
                    </ScrollView>
                </View >
            </SafeAreaView >
        );
    };

};
const mapStateToProps = state => ({
    category: state.category,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    categoryAction: (act, data) => dispatch(categoryAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(SettingCategory)

