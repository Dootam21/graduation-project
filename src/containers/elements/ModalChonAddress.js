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
import Search from './Search';

// import type {Node} from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
import styles from './styles';

function ModalChonAddress({ title, txtBtn }) {

    const navigation = useNavigation();

    const [isModalVisible3, setModalVisible3] = useState(false);

    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };


    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonPress = (buttonName) => {
        setSelectedButton(buttonName);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible3(!isModalVisible3)}>
                <Text style={[styles.listItem]}>{txtBtn}</Text>
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

                    <View style={styles.xxt}>
                        <Text style={styles.txtTitle}>Chọn tỉnh/thành phố</Text>
                        <Search />
                        <ScrollView>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.txtAddr}>Điện biên</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible3(false)}
                    style={styles.modalBackdrop}
                />
            </Modal>
        </View>
    );
};

export default ModalChonAddress;
