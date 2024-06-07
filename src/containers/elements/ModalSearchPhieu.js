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
    Modal,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from '../statistical/styles';

function ModalSearchPhieu() {

    const navigation = useNavigation();


    return (
        <View style={styles.Modal}>
            <View style={styles.listItem}>
                <ScrollView>
                    <View style={styles.flexRowitem}>
                        <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                        <View>
                            <Text style={[styles.txtProduct, styles.txtProductName]}>Áo ba lỗ</Text>
                            <Text style={styles.txtProduct}>Giá: 234/2421</Text>
                            <Text style={styles.txtProduct}>Tồn: 10 / 100</Text>
                        </View>
                    </View>
                    <View style={styles.flexRowitem}>
                        <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                        <View>
                            <Text style={[styles.txtProduct, styles.txtProductName]}>Áo ba lỗ</Text>
                            <Text style={styles.txtProduct}>Giá: 234/2421</Text>
                            <Text style={styles.txtProduct}>Tồn: 10 / 100</Text>
                        </View>
                    </View>
                    <View style={styles.flexRowitem}>
                        <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                        <View>
                            <Text style={[styles.txtProduct, styles.txtProductName]}>Áo ba lỗ</Text>
                            <Text style={styles.txtProduct}>Giá: 234/2421</Text>
                            <Text style={styles.txtProduct}>Tồn: 10 / 100</Text>
                        </View>
                    </View>
                    <View style={styles.flexRowitem}>
                        <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                        <View>
                            <Text style={[styles.txtProduct, styles.txtProductName]}>Áo ba lỗ</Text>
                            <Text style={styles.txtProduct}>Giá: 234/2421</Text>
                            <Text style={styles.txtProduct}>Tồn: 10 / 100</Text>
                        </View>
                    </View>
                    <View style={styles.flexRowitem}>
                        <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                        <View>
                            <Text style={[styles.txtProduct, styles.txtProductName]}>Áo ba lỗ</Text>
                            <Text style={styles.txtProduct}>Giá: 234/2421</Text>
                            <Text style={styles.txtProduct}>Tồn: 10 / 100</Text>
                        </View>
                    </View>
                    <View style={styles.flexRowitem}>
                        <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                        <View>
                            <Text style={[styles.txtProduct, styles.txtProductName]}>Áo ba lỗ</Text>
                            <Text style={styles.txtProduct}>Giá: 234/2421</Text>
                            <Text style={styles.txtProduct}>Tồn: 10 / 100</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity activeOpacity={0}
                style={styles.modalBackdrop}
            />
        </View>
    );
};

export default ModalSearchPhieu;
