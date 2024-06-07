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
import '../categories/styles';

// import type {Node} from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Modal,
} from 'react-native';

function ModalComponent({ title, onPress, onChangeText, inputText, onClose }) {

    return (
        <Modal visible={true} animationType="slide" transparent={true}>
            <View style={styles.modalContainer2}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <TextInput
                        style={styles.inputSL}
                        value={inputText}
                        onChangeText={onChangeText}
                    />
                    <View style={styles.btnGroupConfirm}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.txtConfirm}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={onPress}>
                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity activeOpacity={1}
                style={styles.modalBackdrop}
            />
        </Modal>
    );

};
const styles = StyleSheet.create({
    modalContainer2: {
        backgroundColor: "#fff",
        width: "75%",
        top: '35%',
        verticalAlign: "middle",
        left: "15%",
        borderRadius: 8,
        zIndex: 2,
        position: "absolute",
    },
    modalTitle: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomColor: "#ddd",
        borderBottomWidth: 0.5,
        fontWeight: '600',
        color: 'black',
        fontSize: 17
    },
    borderRight: {
        borderRightWidth: 0.5,
        borderRightColor: "#ddd",
    },
    btnGroupConfirm: {
        flexDirection: "row",
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
        padding: 10,
    },
    inputSL: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 17,
        textAlignVertical: 'top'
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

export default ModalComponent;
