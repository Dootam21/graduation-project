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
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';

function ReturnOder() {

    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.FlexRow}>
                <Text style={styles.textSubf}>Tổng SP:</Text>
                <Text style={[styles.bold, styles.textSubf]}>4/1</Text>
            </View>
            <View style={styles.FlexRow}>
                <Text style={styles.textSubf}>Tổng tiền:</Text>
                <Text style={[styles.bold, styles.textSubf]}>1.200.200</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text style={styles.btnReturn}>Trả hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    FlexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F1F8FF",
        borderBottomColor: "#EEF0EF",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 3,
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
    btnReturn: {
        padding: 10,
        backgroundColor: "#2D3E50",
        textAlign: "center",
        fontWeight: "700",
        color: "#fff",
    }
});

export default ReturnOder;
