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
    Dimensions
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';

function ReturnOder() {

    const navigation = useNavigation();

    return (
        <View style={styles.groupItem}>
            <View style={styles.flexColumn}>
                <View style={[styles.flexRow, styles.flexRow1]}>
                    <Text style={styles.textSubf}>Số lượng/ Mã sp</Text>
                    <Text style={[styles.bold, styles.textSubf]}>10/1</Text>
                </View>
                <View style={[styles.flexRow, styles.flexRow1]}>
                    <Text style={styles.textSubf}>Tổng tiền</Text>
                    <Text style={[styles.bold, styles.textSubf]}>3.000.00</Text>
                </View>
            </View>
            <View style={styles.flexColumn}>
                <TouchableOpacity style={styles.btnConfirm1} onPress={() => navigation.navigate('OrderConfirm')}>
                    <Text style={[styles.btnConfirm, styles.btnConfirm1]}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const ww = Dimensions.get('window').width;
const styles = StyleSheet.create({
    groupItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexRow: {
        flexDirection: "row",
        paddingVertical: 6,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
    },
    flexColumn: {
        flexDirection: "column",
        width: (ww / 2) - 1,
    },
    btnConfirm: {
        textAlign: "center",
        backgroundColor: "#B8101F",
        padding: 8,
        textAlign: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "700",
        fontSize: 13,
    },
    textSubf: {
        color: "#000",
        fontSize: 13,
    },
    btnConfirm1: {
        flex: 1,
        verticalAlign: "middle"
    },
    bold: {
        fontWeight: "700",
    },
    flexRow1: {
        paddingVertical: 2,
        backgroundColor: "#F5F5F5",
    },
});

export default ReturnOder;
