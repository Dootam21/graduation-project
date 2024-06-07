/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

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
    Dimensions,
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';

import styles from '../supplier/styles';

function SelectImage({ ismodal, closeModal }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setModalVisible(ismodal);
    }, [ismodal]);
    console.log('xx', ismodal);
    console.log('xx1', modalVisible);
    //setIsActive = (opt) => {
    //    this.setState({ isActive: opt });
    //}
    // setModalVisible(ismodal);

    const handleActive = (option) => {
        setIsActive(option);
        setModalVisible(false);
    }
    const handleClose = () => {
        setModalVisible(false);
        closeModal();
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                this.setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Cập nhật ảnh</Text>
                    <TouchableOpacity onPress={() => handleActive('Tên A-Z')}>
                        <Text style={[styles.txtFilter, isActive === 'Tên A-Z' && styles.activeCL]}>Chụp ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleActive('Tên Z-A')}>
                        <Text style={[styles.txtFilter, isActive === 'Tên Z-A' && styles.activeCL]}>Thư viện ảnh</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.centeredView1}>
                <TouchableOpacity onPress={this.Cancel}>
                    <Text style={styles.txtClose}>Hủy bỏ</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={() => handleClose()}
                style={styles.modalBackdrop}
            />
        </Modal>
    );
};

export default SelectImage;
