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
    Alert,
    Image
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
import ChildrenCate from './ChildrenCate';

class ChildCate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            modalAdd: false,
            title: ''
        }
    }

    setOpenModal(opt) {
        this.setState({ openModal: opt })
    }

    setModalAdd(opt) {
        this.setState({ modalAdd: opt })
    }

    setTitle(opt) {
        this.setState({ title: opt })
    }

    async addCategory() {
        if (this.state.title === '') {
            Alert.alert('Vui lòng nhập tên danh mục')
            return true;
        }
        const data = await add_category({
            u_id: this.props.admin.uid,
            parentId: this.props.id,
            title: this.state.title,
        });
        this.setModalAdd(false);
        this.props.reloadData();
    }


    render() {
        const { openModal, modalAdd, title } = this.state;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <TouchableOpacity onPress={() => this.setOpenModal(!openModal)}>
                        <View style={styles.containCategoryName}>
                            <View style={{ marginRight: 10 }}>
                                <Image style={{ width: 25, height: 25 }} source={this.props?.image === null || this.props.image.trim() === '' ? require('../../../asset/images/categoryImage.png') : { uri: this.props.image }}></Image>
                            </View>
                            <Text style={styles.txtCategoryTitle}>{this.props?.title}</Text>
                        </View>
                    </TouchableOpacity>
                </View >

                {
                    openModal && (
                        <>
                            {
                                this.props.children?.map((child, index) => (
                                    <ChildrenCate
                                        key={index}
                                        title={child.Category.title}
                                        id={child.Category.id}
                                        reloadData={() => this.props.reloadData()}
                                    ></ChildrenCate>
                                ))
                            }

                            <View style={styles.groupBtn2}>
                                <TouchableOpacity onPress={() => {
                                    if (this.props.admin.roles?.includes('category_add') || this.props.admin.is_admin == 1) {
                                        this.setModalAdd(true);
                                    }
                                    else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <View style={styles.editcate}>
                                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M16.7143 7.71429H10.2857V1.28571C10.2857 0.576 9.70971 0 9 0C8.29029 0 7.71429 0.576 7.71429 1.28571V7.71429H1.28571C0.576 7.71429 0 8.29029 0 9C0 9.70971 0.576 10.2857 1.28571 10.2857H7.71429V16.7143C7.71429 17.424 8.29029 18 9 18C9.70971 18 10.2857 17.424 10.2857 16.7143V10.2857H16.7143C17.424 10.2857 18 9.70971 18 9C18 8.29029 17.424 7.71429 16.7143 7.71429Z" fill="#B8101F" />
                                        </Svg>
                                    </View>
                                </TouchableOpacity>

                                <Modal visible={modalAdd} animationType="slide" transparent={true}>
                                    <View style={styles.modalContainer2}>
                                        <View style={styles.modalContent}>
                                            <Text style={styles.modalTitle}>Thêm danh mục con</Text>
                                            <TextInput
                                                style={styles.inputSL}
                                                onChangeText={(text) => this.setTitle(text)}
                                                value={title}
                                            // value={addCate.title}
                                            />
                                            <View style={styles.btnGroupConfirm}>
                                                <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalAdd(false)}>
                                                    <Text style={styles.txtConfirm}>Hủy</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.addCategory()}>
                                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity activeOpacity={1} onPress={() => this.setModalAdd(false)}
                                        style={styles.modalBackdrop}
                                    />
                                </Modal>
                            </View>
                        </>
                    )
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ChildCate)

