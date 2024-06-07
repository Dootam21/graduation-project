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
import Search from './Search';
import styles from './styles';

function ModalChonNCC({ title, txtBtn }) {

    const navigation = useNavigation();

    const [isModalVisible3, setModalVisible3] = useState(false);

    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };

    const btnConfirm = () => {
        setModalVisible3(false);
    };
    const btnClose = () => {
        setModalVisible3(false);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible3(!isModalVisible3)}>
                <Text style={styles.listItem}>{txtBtn}</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible3} animationType="slide" transparent={true}>
                <View style={styles.modalContainer2}>

                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => navigation.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.headerRight}>
                        </View>
                    </View >

                    <Search />
                    <View style={styles.xxt}>
                        <ScrollView>
                            <TouchableOpacity>
                                <View style={[styles.flexRowNCC]}>
                                    <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                                    <View style={styles.textRight}>
                                        <Text style={styles.txtBold}>NCC Mặc định</Text>
                                        <Text style={styles.clBlack}>SĐT: <Text style={styles.txtBold}>Mặc định</Text></Text>
                                        <Text style={styles.clBlack}>Đ/c: <Text style={styles.txtBold}>Mặc đinh</Text></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.flexRowVMore}>
                                    <Svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M7.06577 6.03738L2.36331 0.959025C2.17411 0.756324 1.90336 0.629353 1.61035 0.605917C1.31733 0.582481 1.02594 0.664489 0.799977 0.833983C0.574014 1.00348 0.431898 1.24664 0.40475 1.51023C0.377602 1.77382 0.467634 2.03635 0.65513 2.24033L6.21166 8.24061C6.31612 8.35311 6.44675 8.44362 6.59433 8.50572C6.74191 8.56782 6.90285 8.60001 7.06577 8.60001C7.22868 8.60001 7.38962 8.56782 7.5372 8.50572C7.68478 8.44362 7.81541 8.35311 7.91987 8.24061L13.4764 2.24033C13.6648 2.03644 13.7555 1.7736 13.7287 1.50953C13.7019 1.24547 13.5597 1.00178 13.3334 0.832001C13.107 0.662222 12.815 0.580236 12.5216 0.604053C12.2281 0.62787 11.9571 0.755543 11.7682 0.959025L7.06577 6.03738Z" fill="#989898" />
                                    </Svg>
                                    <Text style={styles.viewMore}>Xem thêm</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                        <TouchableOpacity onPress={() => navigation.navigate('AddSupplier')}>
                            <View style={styles.btnAddItem}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M14.8571 6.85714H9.14286V1.14286C9.14286 0.512 8.63086 0 8 0C7.36914 0 6.85714 0.512 6.85714 1.14286V6.85714H1.14286C0.512 6.85714 0 7.36914 0 8C0 8.63086 0.512 9.14286 1.14286 9.14286H6.85714V14.8571C6.85714 15.488 7.36914 16 8 16C8.63086 16 9.14286 15.488 9.14286 14.8571V9.14286H14.8571C15.488 9.14286 16 8.63086 16 8C16 7.36914 15.488 6.85714 14.8571 6.85714Z" fill="#B8101F" />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible3(false)}
                    style={styles.modalBackdrop}
                />
            </Modal>
        </View>
    );
};

export default ModalChonNCC;
