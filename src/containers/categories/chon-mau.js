/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import CheckBox from '../elements/CheckBoxComponent';
import { TriangleColorPicker, fromHsv, toHex, toRgb } from 'react-native-color-picker';


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
    Switch,
    Modal

} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import Header from '../elements/Header';
import ModalChonMau from '../elements/ModalChonMau';
import styless from '../elements/styles';


// const colorList = [
//     {
//         name: 'Mau do',
//         color: '#FF0000',
//         children: [
//             {
//                 name: 'Do Dam',
//                 color: '#990000',
//                 isChecked: false
//             },
//             {
//                 name: 'Do Nhat',
//                 color: '#fff',
//                 isChecked: false
//             },
//         ]
//     },

//     {
//         name: 'Mau vang',
//         color: '#FFFF00',
//         children: [
//             {
//                 name: 'Vang Dam',
//                 color: '#FFFF33',
//                 isChecked: false
//             },
//             {
//                 name: 'Vang Nhat',
//                 color: '#FFFF99',
//                 isChecked: false

//             }
//         ]
//     }

// ]

const ChonMau = ({ navigation }) => {
    // const { productId } = route.params;

    const [selectedButton, setSelectedButton] = useState('1');

    const handleButtonPress = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const [colorList, setColorList] = useState([
        {
            name: 'Mau do',
            color: '#FF0000',
            children: [
                {
                    name: 'Do Dam',
                    color: '#990000',
                    isChecked: false
                },
                {
                    name: 'Do Nhat',
                    color: '#fff',
                    isChecked: false
                },
            ]
        },

        {
            name: 'Mau vang',
            color: '#FFFF00',
            children: [
                {
                    name: 'Vang Dam',
                    color: '#FFFF33',
                    isChecked: false
                },
                {
                    name: 'Vang Nhat',
                    color: '#FFFF99',
                    isChecked: false

                }
            ]
        }
    ]);


    const handleCheckBoxToggle = (index) => {
        setColorList((prevColorList) =>
            prevColorList.map((color, i) =>
                i === index ? { ...color, isChecked: !color.isChecked } : color
            )
        );
        console.log(colorList);
    };




    const [isModalVisible3, setModalVisible3] = useState(false);

    const [selectedColor, setSelectedColor] = useState({ h: 0, s: 1, v: 1 });

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const [nameColor, setNameColor] = useState('');

    const addItem = (newValue) => {
        setColorList([...colorList, newValue]);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header title={'Chọn màu'} />

                <View style={{ backgroundColor: "#000", height: "100%" }}>
                    <View>
                        <View style={styles.settingCategory}>

                        </View>

                        <ScrollView>
                            <View style={styles.GroupCategory1}>
                                <View style={styles.listCategory}>
                                    <ScrollView>
                                        <View>
                                            {
                                                colorList?.map((color, index) => (
                                                    <TouchableOpacity key={index} onPress={() => handleButtonPress(`${index + 1}`)}>
                                                        <View style={[styles.flexRow, selectedButton === `${index + 1}` && styles.tabActive]}>
                                                            <Text style={[styles.txtCategoryName, styles.border0]}>{color?.name}</Text>
                                                            <Text style={[styles.boxColor, styles.bgColor]}></Text>
                                                        </View>
                                                    </TouchableOpacity>


                                                ))
                                            }
                                        </View >
                                    </ScrollView >
                                </View >

                                <View style={styles.listChildCategory}>
                                    <ScrollView>
                                        <View >
                                            
                                            {
                                                colorList.map((color, index) => (
                                                    selectedButton === `${index + 1}` && (
                                                        color.children.map((colorChild, indexChild) => (
                                                            <CheckBox key={indexChild} isChecked={colorChild.isChecked} onPress={() => handleCheckBoxToggle(indexChild)} colorName={colorChild.name} />
                                                        ))
                                                    )
                                                ))
                                            }


                                        </View>

                                    </ScrollView>
                                </View>
                            </View >
                        </ScrollView >

                        <View style={styles.settingCategoryBottom}>
                            <View style={styles.flexRow}>
                                <View style={styles.addColor}>
                                    <View>
                                        <TouchableOpacity onPress={() => setModalVisible3(!isModalVisible3)}>
                                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M16.7143 7.71429H10.2857V1.28571C10.2857 0.576 9.70971 0 9 0C8.29029 0 7.71429 0.576 7.71429 1.28571V7.71429H1.28571C0.576 7.71429 0 8.29029 0 9C0 9.70971 0.576 10.2857 1.28571 10.2857H7.71429V16.7143C7.71429 17.424 8.29029 18 9 18C9.70971 18 10.2857 17.424 10.2857 16.7143V10.2857H16.7143C17.424 10.2857 18 9.70971 18 9C18 8.29029 17.424 7.71429 16.7143 7.71429Z" fill="#B8101F" />
                                            </Svg>
                                        </TouchableOpacity>
                                        <Modal visible={isModalVisible3} animationType="slide" transparent={true}>
                                            <View style={styless.modalContainerMau}>
                                                <View>
                                                    <TextInput
                                                        style={styless.inputNameColor}
                                                        placeholder='Nhập tên màu...'

                                                        onChangeText={(value) => { setNameColor(value) }}
                                                    />
                                                    <View style={styless.itemCenter}>
                                                        <TriangleColorPicker
                                                            style={styless.colorPicker}
                                                            color={fromHsv(selectedColor)}
                                                            onColorChange={handleColorChange}
                                                        />
                                                    </View>
                                                    {/* <Text>Mã màu {fromHsv(selectedColor)}</Text> */}
                                                    <TouchableOpacity onPress={() => addItem({
                                                        name: nameColor,
                                                        color: selectedColor
                                                    })}>
                                                        <Text style={[styless.btnAdd, styless.bgRed]}>Thêm</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity>
                                                        <Text style={[styless.btnAdd, styless.bgGrey1]}>Hủy</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible3(false)}
                                                style={styless.modalBackdrop}
                                            />
                                        </Modal>
                                    </View>
                                </View>
                                <View style={styles.addColor1}>
                                    <ModalChonMau />
                                </View>
                            </View>
                        </View>
                    </View>
                </View >
            </View >
        </SafeAreaView >
    );
};

export default ChonMau;
