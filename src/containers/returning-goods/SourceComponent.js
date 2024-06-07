/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';
import styles from './styles.js';

class SourceComponent extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);
        this.state = {
            modalEdit: false,
            modalDelete: false,
            title: '',
            id: '',
        }
    }
    setModalEdit = (opt) => {
        this.setState({ modalEdit: opt })
    }

    setModalDelete = (opt) => {
        this.setState({ modalDelete: opt })
    }

    setTitle = (opt) => {
        this.setState({ title: opt })
    }

    setId = (opt) => {
        this.setState({ id: opt })
    }

    editItem(id, title) {
        this.setId(id);
        this.setTitle(title);
        this.setModalEdit(true)
    }

    deleteItem(id) {
        this.setId(id);
        this.setModalDelete(true);
    }

    handleEditSource() {
        this.props.handleEdit(this.state.id, this.state.title);
        this.setModalEdit(false);
    }

    handleDeleteSource() {
        this.props.handleDelete(this.state.id);
        this.setModalDelete(false);
    }

    render() {
        const { modalEdit, modalDelete, title, id } = this.state;
        const item = this.props.item;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <TouchableOpacity onPress={() => {
                        if(this.props.admin.roles?.includes('thuchi_add') || this.props.admin.is_admin == 1){
                            this.props.gotoCreate(item?.id, item?.title);
                        }
                        else{
                            Alert.alert('Bạn không phép thực hiện hành động này!');
                        }
                    }}>
                        <View style={styles.addElement}>
                            <Text style={styles.textAttr}>{item?.title}</Text>
                            <View style={styles.flexRow}>
                                <TouchableOpacity onPress={() => this.editItem(item?.id, item?.title)}>
                                    <Svg style={styles.mr10} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M15 19.4355H3C2.20435 19.4355 1.44129 19.1194 0.87868 18.5568C0.316071 17.9942 0 17.2311 0 16.4355V4.43549C0 3.63984 0.316071 2.87677 0.87868 2.31417C1.44129 1.75156 2.20435 1.43549 3 1.43549H7C7.26522 1.43549 7.51957 1.54084 7.70711 1.72838C7.89464 1.91592 8 2.17027 8 2.43549C8 2.7007 7.89464 2.95506 7.70711 3.14259C7.51957 3.33013 7.26522 3.43549 7 3.43549H3C2.73478 3.43549 2.48043 3.54084 2.29289 3.72838C2.10536 3.91592 2 4.17027 2 4.43549V16.4355C2 16.7007 2.10536 16.9551 2.29289 17.1426C2.48043 17.3301 2.73478 17.4355 3 17.4355H15C15.2652 17.4355 15.5196 17.3301 15.7071 17.1426C15.8946 16.9551 16 16.7007 16 16.4355V12.4355C16 12.1703 16.1054 11.9159 16.2929 11.7284C16.4804 11.5408 16.7348 11.4355 17 11.4355C17.2652 11.4355 17.5196 11.5408 17.7071 11.7284C17.8946 11.9159 18 12.1703 18 12.4355V16.4355C18 17.2311 17.6839 17.9942 17.1213 18.5568C16.5587 19.1194 15.7956 19.4355 15 19.4355Z" fill="#464646" />
                                        <Path d="M12.6002 3.30548L7.65016 8.30548C7.58264 8.3657 7.53693 8.44657 7.52016 8.53548L6.52016 12.3555C6.49593 12.4397 6.49524 12.529 6.51816 12.6136C6.54107 12.6982 6.58673 12.775 6.65016 12.8355C6.69892 12.8746 6.75499 12.9036 6.81509 12.9207C6.87519 12.9379 6.93811 12.9429 7.00016 12.9355C7.04304 12.9444 7.08729 12.9444 7.13016 12.9355L10.9502 11.9355C11.0391 11.9187 11.1199 11.873 11.1802 11.8055L16.1302 6.83548L12.6002 3.30548Z" fill="#464646" />
                                        <Path d="M19 1.88548L17.55 0.435484C17.2658 0.156377 16.8833 0 16.485 0C16.0867 0 15.7042 0.156377 15.42 0.435484L14 1.88548L17.55 5.43548L19 4.01548C19.2791 3.73126 19.4355 3.34883 19.4355 2.95048C19.4355 2.55213 19.2791 2.1697 19 1.88548Z" fill="#464646" />
                                    </Svg>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deleteItem(item?.id)}>
                                    <Svg style={styles.mr10} width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M13.818 3.90906H2.18164V19.9091H13.818V3.90906Z" stroke="#152730" strokeWidth="1.8" stroke-miterlimit="10" />
                                        <Path d="M8 6.09094V17.7273" stroke="#152730" strokeWidth="1.8" stroke-miterlimit="10" />
                                        <Path d="M10.9087 6.09094V17.7273" stroke="#152730" strokeWidth="1.8" stroke-miterlimit="10" />
                                        <Path d="M5.09131 6.09094V17.7273" stroke="#152730" strokeWidth="1.8" stroke-miterlimit="10" />
                                        <Path d="M0 3.90906H16" stroke="#152730" strokeWidth="1.8" stroke-miterlimit="10" />
                                        <Path d="M10.182 1H5.81836V3.90909H10.182V1Z" stroke="#152730" strokeWidth="1.8" stroke-miterlimit="10" />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.paddingH10}>
                    <Modal visible={modalEdit} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Sửa nguồn</Text>
                                <TextInput
                                    style={styles.inputSL}
                                    value={title}
                                    onChangeText={(text) => this.setTitle(text)}
                                />
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalEdit(false)}>
                                        <Text style={styles.txtConfirm}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleEditSource()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalEdit(false)}
                            style={styles.modalBackdrop}
                        />
                    </Modal>
                </View>



                <View style={styles.paddingH10}>
                    <Modal visible={modalDelete} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Bạn chắc chắn chứ</Text>
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalDelete(false)}>
                                        <Text style={styles.txtConfirm}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleDeleteSource()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalDelete(false)}
                            style={styles.modalBackdrop}
                        />
                    </Modal>
                </View>


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


export default connect(mapStateToProps, mapDispatchToProps)(SourceComponent)
