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

function ModalConfirm({ saveImages, title, txtBtn }) {

    const navigation = useNavigation();

    const [isModalVisible3, setModalVisible3] = useState(false);

    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };

    const btnConfirm = () => {
        saveImages();
        setModalVisible3(false);
    };
    const btnClose = () => {
        setModalVisible3(false);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible3(!isModalVisible3)}>
                <Text style={styles.btnSaveSX}>{txtBtn}</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible3} animationType="slide" transparent={true}>
                <View style={styles.modalContainer2}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.modalTitle, styles.textCenter]}>{title}</Text>
                        <View style={styles.btnGroupConfirm}>
                            <TouchableOpacity style={styles.closeButton} onPress={btnClose}>
                                <Text style={[styles.txtConfirm, styles.cancel]}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={btnConfirm}>
                                <Text style={styles.txtConfirm}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={()=>setModalVisible3(false)}
                    style={styles.modalBackdrop}
                />
            </Modal>
        </View>
    );
};
const ww = Dimensions.get('window').width;
const styles = StyleSheet.create({
    modalContainer2: {
        backgroundColor: "#fff",
        width: ww / 4 * 3,
        top: '35%',
        verticalAlign: "middle",
        left: ww / 8,
        borderRadius: 8,
        zIndex: 2,
        position: "absolute",
    },
    modalTitle: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomColor: "#ddd",
        borderBottomWidth: 0.5,
        fontWeight: "600",
        color: 'black',
        fontSize: 17
    },
    btnGroupConfirm: {
        flexDirection: "row",
        padding: 0,
        borderTopColor: "#ddd",
        borderTopWidth: 0.5,
        justifyContent: "space-around"
    },
    closeButton: {
        flex: 1,
    },
    confirmButton: {
        flex: 1,
    },
    txtConfirm: {
        textAlign: "center",
        color: "#3598DB",
        fontSize: 17,
        padding: 9,
    },
    textCenter: {
        textAlign: "center",
    },
    cancel: {
        borderColor: "#ddd",
        borderRightWidth: 0.5,
        fontWeight: "600",
    },
    btnSaveSX: {
        backgroundColor: "#B8101F",
        color: "#fff",
        fontWeight: "700",
        marginHorizontal: 20,
        marginVertical: 5,
        textAlign: "center",
        padding: 8,
        borderRadius: 5,
    },
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(000, 0, 0, 0.5)', // Transparent red color (adjust opacity as needed)
    },
});

export default ModalConfirm;
