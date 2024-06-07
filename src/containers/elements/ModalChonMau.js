/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
// import { ColorPicker } from 'react-native-color-picker'
// import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker'
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';

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

function ModalChonMau({ colorName, onClose, setColorName, selectedColor, setSelectedColor, handleAddColor }) {
    return (
        <View>
            <Modal visible={true} animationType="slide" transparent={true}>
                <View style={styles.modalContainerMau}>
                    <View>
                        <TextInput
                            style={styles.inputNameColor}
                            placeholder='Nhập tên màu...'
                            onChangeText={setColorName}
                            value={colorName}
                        />
                        <View style={styles.itemCenter}>
                            <TriangleColorPicker
                                style={styles.colorPicker}
                                color={fromHsv(selectedColor)}
                                onColorChange={setSelectedColor}
                            />
                        </View>
                        {/* <Text>Mã màu {fromHsv(selectedColor)}</Text> */}
                        <TouchableOpacity onPress={handleAddColor}>
                            <Text style={[styles.btnAdd, styles.bgRed]}>Thêm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={[styles.btnAdd, styles.bgGrey1]}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={1}
                    style={styles.modalBackdrop}
                />
            </Modal>
        </View>
    );
};

export default ModalChonMau;
