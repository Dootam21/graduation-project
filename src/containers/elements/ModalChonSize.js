/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { TriangleColorPicker, fromHsv, toHex, toRgb } from 'react-native-color-picker';
import CheckBox from './CheckBoxComponent';
import ModalChonMau from './ModalChonMau';
import ModalComponent from './ModalComponent';
import { connect } from 'react-redux';
import sizeAction from '../../actions/sizeAction';
// import type {Node} from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    Dimensions
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
import styles from './styles';
import { add_size, get_all_size } from '../../services/sizeService';


class ModalChonMauBTN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible3: false,
            selectedButton: this.props.size.id,
            modalInputSizeParent: false,
            modalInputSizeChild: false,
            text: '',
            sizeList: [],
            sizeSelectList: [],
            sizeListPass: [],
        }
        // console.log(this.props.size);
    }

    componentDidMount() {
        this.getList();
    }

    setModalVisible3 = (opt) => {
        this.setState({ isModalVisible3: opt });
    }

    setSelectedButton = (opt) => {
        this.setState({ selectedButton: opt });
    }

    setModalInputSizeParent = (opt) => {
        this.setState({ modalInputSizeParent: opt });
    }

    setModalInputSizeChild = (opt) => {
        this.setState({ modalInputSizeChild: opt });
    }

    setText = (opt) => {
        this.setState({ text: opt });
    }

    setSizeList = (opt) => {
        this.setState({ sizeList: opt })
    }

    setSizeSelectList = (opt) => {
        this.setState({ sizeSelectList: opt })
    }

    setSizeListPass = (opt) => {
        this.setState({ sizeListPass: opt })
    }

    handleAddList = (opt) => {
        this.setSizeListPass([...this.state.sizeListPass, opt]);
    }

    handleRemoveList = (id) => {
        const newList = this.state.sizeListPass.filter(item => item.id !== id);
        this.setSizeListPass(newList);
    }


    handleButtonPress = (size_id) => {
        this.props.sizeAction('current_size_id', size_id);
        this.setSelectedButton(size_id);
    };

    handleCloseModal = () => {
        this.setModalInputSizeParent(false);
        this.setModalInputSizeChild(false);
        this.setText('');
    }

    async handleAddSizeParent() {
        if (this.state.text === '') {
            Alert.alert('Vui lòng nhập tên size')
            return true;
        }
        const updateList = {
            title: this.state.text,
        }
        await add_size(updateList);
        this.setModalInputSizeParent(false);
        this.setText('');
        this.getList();
    }

    async handleAddSizeChild(idParent) {
        if (this.state.text === '') {
            Alert.alert('Vui lòng nhập tên size')
            return true;
        }
        const updateList = {
            title: this.state.text,
            parent_id: idParent
        }
        const data = await add_size(updateList);
        const sizeObj = {
            [data.id]: {
                id: data.id,
                title: data.title,
                parent_id: data.parent_id
            }
        }

        const updatedObject = {
            ...this.props.size.listSizeObj,
            ...sizeObj,
        };

        this.props.sizeAction('list_size_object', updatedObject);
        this.setModalInputSizeChild(false);
        this.setText('');
        this.getList();
        // this.setSizeSelectList((prev) => {
        //     return [...prev]
        // })
    }

    getList = async () => {
        const response = await get_all_size();
        this.setSizeSelectList(response);
        // response?.map(res => {
        //     res?.children?.map(child => {
        //         if (this.props.size.listAllSize !== []) {
        //             this.props.sizeAction('get_all_size', child);
        //         }
        //     })
        // })
    };

    returnBack() {
        this.setModalVisible3(false);
    }

    selectedBtn() {
        this.setModalVisible3(false);
        this.props.setSize(this.state.sizeListPass);
        // this.props?.setdatacolor();
        this.props?.setFieldValue(this.state.sizeListPass);
    }


    render() {
        const wh = Dimensions.get('window').height;
        const { isModalVisible3, selectedButton, modalInputSizeParent, modalInputSizeChild, text, sizeList, sizeSelectList, sizeListPass } = this.state;
        return (
            <View>
                <TouchableOpacity onPress={() => this.setModalVisible3(!isModalVisible3)}>
                    <Text style={[styles.listItem]}> {
                        sizeListPass?.length !== 0
                            ? sizeListPass.map(size => size.title).join(', ')
                            : 'Chọn size'
                    }</Text>
                </TouchableOpacity>
                <Modal visible={isModalVisible3} animationType="slide" transparent={true}>
                    <View style={{
                        ...styles.modalContainer2,
                        marginTop: Platform.OS === 'ios' ? 50 : 0,
                    }}>

                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <TouchableOpacity style={styles.menu} onPress={() => this.returnBack()}>
                                    <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headerCenter}>
                                <Text style={styles.title}>{this.props.title}</Text>
                            </View>
                            <View style={styles.headerRight}>
                                <TouchableOpacity onPress={() => this.selectedBtn()}>
                                    <Text style={styles.btnChonR}>Chọn</Text>
                                </TouchableOpacity>
                            </View>
                        </View >

                        <View style={{
                            ...styles.xxtForIOS,
                            height: Platform.OS === 'ios' ? wh - 44 - 16 - 50 : wh - 44 - 16,
                        }}>
                            <View>
                                <View style={styles.settingCategory}>

                                </View>
                            </View>

                            <View style={{
                                ...styles.GroupCategory1,
                                height: Platform.OS === 'ios' ? wh - 120 - 50 : wh - 120,
                            }}>
                                <View style={styles.listCategory}>
                                    <ScrollView>
                                        <View>
                                            {
                                                sizeSelectList?.map((size, index) => (
                                                    <TouchableOpacity key={index} onPress={() => this.handleButtonPress(size?.id)}>
                                                        <View style={[styles.flexRow, selectedButton === size?.id && styles.tabActive]}>
                                                            <Text style={[styles.txtCategoryName, styles.border0]}>{size?.title}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View >
                                    </ScrollView >
                                </View >

                                <View style={styles.listChildCategory}>
                                    <ScrollView>
                                        <View >
                                            {
                                                sizeSelectList?.map((size, index) => (
                                                    selectedButton === size?.id && (
                                                        size?.children?.map((sizeChild, indexChild) => (
                                                            <CheckBox
                                                                key={indexChild}
                                                                sizeName={sizeChild?.title}
                                                                idSize={sizeChild?.id}
                                                                type='size'
                                                                list={sizeListPass}
                                                                handleAddList={(opt) => this.handleAddList(opt)}
                                                                handleRemoveList={(id) => this.handleRemoveList(id)}
                                                            />
                                                        ))
                                                    )
                                                ))
                                            }


                                        </View>

                                    </ScrollView>
                                </View>
                            </View >

                            <View style={styles.settingCategoryBottom}>
                                <View style={styles.flexRow}>
                                    <View style={styles.addColor}>
                                        <View>
                                            <TouchableOpacity onPress={() => {
                                                if (this.props.admin.roles?.includes('size_add') || this.props.admin.is_admin == 1) {
                                                    this.setModalInputSizeParent(true)
                                                }
                                                else {
                                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                                }
                                            }}>
                                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M16.7143 7.71429H10.2857V1.28571C10.2857 0.576 9.70971 0 9 0C8.29029 0 7.71429 0.576 7.71429 1.28571V7.71429H1.28571C0.576 7.71429 0 8.29029 0 9C0 9.70971 0.576 10.2857 1.28571 10.2857H7.71429V16.7143C7.71429 17.424 8.29029 18 9 18C9.70971 18 10.2857 17.424 10.2857 16.7143V10.2857H16.7143C17.424 10.2857 18 9.70971 18 9C18 8.29029 17.424 7.71429 16.7143 7.71429Z" fill="#B8101F" />
                                                </Svg>
                                            </TouchableOpacity>
                                            {modalInputSizeParent &&
                                                <ModalComponent
                                                    title='Nhập size'
                                                    onPress={() => this.handleAddSizeParent()}
                                                    onChangeText={this.setText}
                                                    inputText={text}
                                                    onClose={this.handleCloseModal}
                                                />
                                            }
                                        </View>
                                    </View>
                                    <View style={styles.addColor1}>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.admin.roles?.includes('color_add') || this.props.admin.is_admin == 1) {
                                                this.setModalInputSizeChild(true)
                                            }
                                            else {
                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                            }
                                        }}>
                                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M16.7143 7.71429H10.2857V1.28571C10.2857 0.576 9.70971 0 9 0C8.29029 0 7.71429 0.576 7.71429 1.28571V7.71429H1.28571C0.576 7.71429 0 8.29029 0 9C0 9.70971 0.576 10.2857 1.28571 10.2857H7.71429V16.7143C7.71429 17.424 8.29029 18 9 18C9.70971 18 10.2857 17.424 10.2857 16.7143V10.2857H16.7143C17.424 10.2857 18 9.70971 18 9C18 8.29029 17.424 7.71429 16.7143 7.71429Z" fill="#B8101F" />
                                            </Svg>
                                        </TouchableOpacity>
                                        {modalInputSizeChild &&
                                            <ModalComponent
                                                title='Nhập size'
                                                onPress={() => this.handleAddSizeChild(this.props.size.id)}
                                                onChangeText={this.setText}
                                                inputText={text}
                                                onClose={this.handleCloseModal}
                                            />
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible3(false)}
                        style={styles.modalBackdrop}
                    />
                </Modal>
            </View >
        );
    }
};


const mapStateToProps = state => ({
    size: state.size,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    sizeAction: (act, data) => dispatch(sizeAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalChonMauBTN)
