/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useEffect, useState } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import categoryAction from '../../actions/categoryAction';
import { get_category, add_category, edit_category, delete_category } from '../../services/categoryService';

// import type {Node} from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
import styles from './styles';

class ModalChonCate extends Component {

    // const navigation = useNavigation();
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isModalVisible3: false,
            selectedButton: 0,
            isCategory: null,
            isViewVisible: false,
            idCategory: 0,
            cateName: '',
        }

    }

    componentDidMount() {
        this.getData();
    }

    setViewVisible(opt) {
        this.setState({ isViewVisible: opt });
    }

    setCategory(opt) {
        this.setState({ isCategory: opt });
    }

    setIdCategory = (opt) => {
        this.setState({ idCategory: opt })
    }

    setModalVisible3(opt) {
        this.setState({ isModalVisible3: opt });
    }

    setSelectedButton(opt) {
        this.setState({ selectedButton: opt })
    }

    toggleModal3 = () => {
        this.setModalVisible3(!this.state.isModalVisible3);
    };

    setCateName = (opt) => {
        this.setState({ cateName: opt })
    }


    handleButtonPress = (buttonName) => {
        this.setSelectedButton(buttonName);
    };


    handleShowView = (childID, title, childList) => {
        this.setViewVisible(!this.state.isViewVisible);
        if (childList?.length === 0) {
            this.setIdCategory(childID);
            this.setCateName(title);
            this.props.setCateId(childID);
            this.setModalVisible3(false);
        } else
            if (this.state.isCategory == null || this.state.isCategory != childID) {
                this.setCategory(childID);
            } else {
                this.setCategory(null);
            }
    };

    handleAddCate = (childId, title) => {
        this.setCateName(title);
        this.props.setCateId(childId);
        this.setModalVisible3(false);
    }

    async getData() {
        const data = await get_category();
        this.setState({ data: data });
        data?.map(category => {
            category?.children?.map(categoryChild => {
                // console.log(categoryChild?.Category.id === this.props?.idCate);
                if (this.props?.idCate === categoryChild?.Category?.id || this.props?.category?.id === categoryChild?.Category?.id) {
                    this.setCateName(categoryChild?.Category?.title);
                }
                else {
                    categoryChild?.children?.map((child) => {
                        // console.log(child?.Category?.id);
                        if (this.props?.idCate === child?.Category?.id || this.props?.category?.id === child?.Category?.id) {
                            this.setCateName(child?.Category?.title);
                        }
                    })
                }
            })
        })
    }




    render() {
        const { isModalVisible3, selectedButton, cateName } = this.state;
        const data = this.state.data;
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    // console.log('idcate', this.props?.idCate);
                    this.setModalVisible3(true);
                }}>
                    <Text style={[styles.listItem]}>{cateName ? cateName : 'Chọn danh mục'}</Text>
                </TouchableOpacity>
                <Modal visible={isModalVisible3} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer2}>

                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <TouchableOpacity style={styles.menu} onPress={() => this.setModalVisible3(false)}>
                                    <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headerCenter}>
                                <Text style={styles.title}>Chọn danh mục</Text>
                            </View>
                            <View style={styles.headerRight}>
                            </View>
                        </View >

                        <View style={styles.xxt}>
                            <View>
                                <View style={styles.settingCategory}>
                                    <TouchableOpacity onPress={() => {
                                        this.setModalVisible3(false);
                                        this.props.gotoSetting();
                                    }}>
                                        <Svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M17.1907 11.5633L16.2271 11.0012C15.1832 10.3588 15.1832 8.83309 16.2271 8.19069L17.1907 7.62858C17.9937 7.14678 18.2346 6.18317 17.7528 5.46046L16.9498 4.09534C16.468 3.29233 15.5044 3.05143 14.7817 3.53324L13.818 4.09534C12.7741 4.73775 11.409 3.93474 11.409 2.73023V1.60602C11.409 0.722708 10.6863 0 9.80301 0H8.19699C7.31368 0 6.59097 0.722708 6.59097 1.60602V2.64993C6.59097 3.85444 5.22586 4.65745 4.18195 4.01504L3.21834 3.53324C2.41533 3.05143 1.45172 3.37264 1.05022 4.09534L0.247208 5.46046C-0.154296 6.26347 0.0866063 7.22708 0.809314 7.70888L1.77292 8.27099C2.81684 8.83309 2.81684 10.4391 1.77292 11.0012L0.809314 11.5633C0.00630548 12.0451 -0.234597 13.0087 0.247208 13.7314L1.05022 15.0966C1.53202 15.8996 2.49563 16.1405 3.21834 15.6587L4.18195 15.1769C5.22586 14.5345 6.59097 15.3375 6.59097 16.542V17.6662C6.59097 18.5495 7.31368 19.2722 8.19699 19.2722H9.80301C10.6863 19.2722 11.409 18.5495 11.409 17.6662V16.6223C11.409 15.4178 12.7741 14.6148 13.818 15.2572L14.7817 15.8193C15.5847 16.3011 16.5483 15.9799 16.9498 15.2572L17.7528 13.892C18.1543 13.0087 17.9134 12.0451 17.1907 11.5633ZM9 12.8481C7.23338 12.8481 5.78797 11.4027 5.78797 9.6361C5.78797 7.86948 7.23338 6.42407 9 6.42407C10.7666 6.42407 12.212 7.86948 12.212 9.6361C12.212 11.4027 10.7666 12.8481 9 12.8481Z" fill="#B8101F" />
                                        </Svg>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.GroupCategory1}>
                                <View style={styles.listCategory}>
                                    <ScrollView>
                                        <View>
                                            {
                                                data?.map((category, index) => (
                                                    <TouchableOpacity key={index} onPress={() => this.handleButtonPress(index)}>
                                                        <Text style={[styles.txtCategoryName, this.setState.selectedButton === index && styles.tabActive]}>{category?.Category?.title}</Text>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View >
                                    </ScrollView >
                                </View >

                                <ScrollView>
                                    <View style={styles.listChildCategory}>
                                        {
                                            data?.map((data, index) => (
                                                data?.children?.map((child, indexChild) => (
                                                    this.state.selectedButton === index && (
                                                        <View key={indexChild} >
                                                            <TouchableOpacity onPress={() => this.handleShowView(child?.Category?.id, child?.Category?.title, child?.children)}>
                                                                <Text style={styles.txtChildCategoryName}>{child?.Category?.title}</Text>
                                                            </TouchableOpacity>

                                                            {
                                                                this.state.isCategory == child.Category.id && (
                                                                    <View>
                                                                        {
                                                                            child.children?.map((child1, indexChild1) => (
                                                                                (
                                                                                    <TouchableOpacity key={indexChild1} onPress={() => this.handleAddCate(child1?.Category?.id, child1?.Category?.title)}>
                                                                                        <View style={[styles.flexRowC, styles.groupBtn6]}>
                                                                                            <Text style={styles.txtCateName}>{child1?.Category?.title}</Text>
                                                                                        </View>
                                                                                    </TouchableOpacity>
                                                                                )
                                                                            ))
                                                                        }
                                                                    </View>
                                                                )
                                                            }
                                                        </View>
                                                    )
                                                ))
                                            ))
                                        }
                                    </View>
                                </ScrollView>
                            </View >
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
    category: state.category,
});

const mapDispatchToProps = dispatch => ({
    categoryAction: (act, data) => dispatch(categoryAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalChonCate)

