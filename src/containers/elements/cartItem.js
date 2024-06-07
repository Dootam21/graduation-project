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

function CartItem() {

    const navigation = useNavigation();

    const [showItem, setShowItem] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [isModalVisible3, setModalVisible3] = useState(false)

    const deleteItem = () => {
        console.log("xxx")
        this.setModalVisible(false);
        this.setModalVisible3(true);

    }

    const btnConfirmDelete = () => {
        this.setModalVisible(false);
        this.setModalVisible3(false);
    }

    const btnAddGhiChu = () => {
        this.setModalNhapGhiChu(false);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setShowItem(!showItem)}>
                <View style={styles.cardItem}>
                    <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                    <View style={styles.cardContent}>
                        <View style={styles.itemInfo}>
                            <Text style={[styles.clback, styles.name1]}>CODE - Sp1</Text>
                            <View style={styles.textGroup}>
                                <Text style={styles.clback}>Số lượng: </Text>
                                <Text style={[styles.clback, styles.bold]}>10</Text>
                            </View>
                            <View style={styles.textGroup}>
                                <Text style={styles.clback}>Đơn giá: </Text>
                                <Text style={[styles.clback, styles.bold]}>300.000</Text>
                            </View>
                            <View style={styles.textGroup}>
                                <Text style={styles.clback}>Tổng tiền: </Text>
                                <Text style={[styles.clback, styles.bold]}>3.000.000</Text>
                            </View>
                        </View>
                        <View style={styles.iconList}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M1.14286 2.28571H14.8571C15.488 2.28571 16 1.77371 16 1.14286C16 0.512 15.488 0 14.8571 0H1.14286C0.512 0 0 0.512 0 1.14286C0 1.77371 0.512 2.28571 1.14286 2.28571ZM14.8571 4.57143H1.14286C0.512 4.57143 0 5.08343 0 5.71429C0 6.34514 0.512 6.85714 1.14286 6.85714H14.8571C15.488 6.85714 16 6.34514 16 5.71429C16 5.08343 15.488 4.57143 14.8571 4.57143ZM14.8571 9.14286H1.14286C0.512 9.14286 0 9.65486 0 10.2857C0 10.9166 0.512 11.4286 1.14286 11.4286H14.8571C15.488 11.4286 16 10.9166 16 10.2857C16 9.65486 15.488 9.14286 14.8571 9.14286Z" fill="#B8101F" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {showItem && (
                <View style={styles.quantity}>
                    <Text style={[styles.color, styles.red]}></Text>
                    <Text style={[styles.textColor, styles.bold]}>Cam đậm: </Text>
                    <View style={styles.groupSize}>
                        <Text style={styles.size}>30</Text>
                        <Text style={styles.soluong}>(2)</Text>
                    </View>
                    <View style={styles.groupSize}>
                        <Text style={styles.size}>30</Text>
                        <Text style={styles.soluong}>(2)</Text>
                    </View>
                </View>
            )}

            <View style={styles.bgGrey1}></View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(true);
                }}>
                <View style={styles.centeredView1}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Quantity')}>
                            <View style={styles.flexColumn1}>
                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M7.67549 6.59339C7.59182 6.67705 7.52725 6.77254 7.47087 6.87258L7.43358 6.83529L7.41085 6.99353C7.31991 7.20724 7.28808 7.44187 7.31354 7.67741L6.95068 10.2201L9.49432 9.85727C9.72985 9.88274 9.96448 9.85091 10.1782 9.75997L10.3364 9.73814L10.2991 9.70085C10.3983 9.64447 10.4947 9.5799 10.5783 9.49624L15.1736 4.90096L12.2717 1.99902L7.67549 6.59339Z" fill="#231F20" />
                                    <Path d="M16.5358 1.42585L15.7446 0.634662C15.1617 0.0517276 14.2559 0.0126227 13.7211 0.546449L12.9963 1.27125L15.8983 4.17319L16.6231 3.44748C17.1578 2.91456 17.1187 2.00879 16.5358 1.42585Z" fill="#231F20" />
                                    <Path d="M13.6412 8.81768V15.46H1.81883V1.81883H9.96082L11.3459 0.52746C11.4932 0.381045 11.6669 0.32648 11.8506 0.261002C11.8897 0.152782 11.9452 0.0973073 12.0106 0H0V17.2789H15.46V7.20984L13.6412 8.81768Z" fill="#231F20" />
                                </Svg>
                                <Text style={styles.txtVal}>Sửa số lượng</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteItem()}>
                            <View style={styles.flexColumn1}>
                                <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M15.2727 2.90909H10.9091V2.18182C10.9091 1.60316 10.6792 1.04821 10.2701 0.63904C9.86088 0.229869 9.30593 0 8.72727 0L7.27273 0C6.69407 0 6.13912 0.229869 5.72995 0.63904C5.32078 1.04821 5.09091 1.60316 5.09091 2.18182V2.90909H0.727273C0.534388 2.90909 0.349403 2.98571 0.213013 3.1221C0.0766231 3.25849 0 3.44348 0 3.63636C0 3.82925 0.0766231 4.01423 0.213013 4.15062C0.349403 4.28701 0.534388 4.36364 0.727273 4.36364H2.18182V14.5455C2.18182 15.1241 2.41169 15.6791 2.82086 16.0882C3.23003 16.4974 3.78498 16.7273 4.36364 16.7273H11.6364C12.215 16.7273 12.77 16.4974 13.1791 16.0882C13.5883 15.6791 13.8182 15.1241 13.8182 14.5455V4.36364H15.2727C15.4656 4.36364 15.6506 4.28701 15.787 4.15062C15.9234 4.01423 16 3.82925 16 3.63636C16 3.44348 15.9234 3.25849 15.787 3.1221C15.6506 2.98571 15.4656 2.90909 15.2727 2.90909ZM6.54545 2.18182C6.54545 1.98893 6.62208 1.80395 6.75847 1.66756C6.89486 1.53117 7.07984 1.45455 7.27273 1.45455H8.72727C8.92016 1.45455 9.10514 1.53117 9.24153 1.66756C9.37792 1.80395 9.45455 1.98893 9.45455 2.18182V2.90909H6.54545V2.18182ZM5.81818 13.0909C5.81818 13.2838 5.74156 13.4688 5.60517 13.6052C5.46878 13.7416 5.28379 13.8182 5.09091 13.8182C4.89802 13.8182 4.71304 13.7416 4.57665 13.6052C4.44026 13.4688 4.36364 13.2838 4.36364 13.0909V7.27273C4.36364 7.07984 4.44026 6.89486 4.57665 6.75847C4.71304 6.62208 4.89802 6.54545 5.09091 6.54545C5.28379 6.54545 5.46878 6.62208 5.60517 6.75847C5.74156 6.89486 5.81818 7.07984 5.81818 7.27273V13.0909ZM8.72727 13.0909C8.72727 13.2838 8.65065 13.4688 8.51426 13.6052C8.37787 13.7416 8.19288 13.8182 8 13.8182C7.80712 13.8182 7.62213 13.7416 7.48574 13.6052C7.34935 13.4688 7.27273 13.2838 7.27273 13.0909V7.27273C7.27273 7.07984 7.34935 6.89486 7.48574 6.75847C7.62213 6.62208 7.80712 6.54545 8 6.54545C8.19288 6.54545 8.37787 6.62208 8.51426 6.75847C8.65065 6.89486 8.72727 7.07984 8.72727 7.27273V13.0909ZM11.6364 13.0909C11.6364 13.2838 11.5597 13.4688 11.4234 13.6052C11.287 13.7416 11.102 13.8182 10.9091 13.8182C10.7162 13.8182 10.5312 13.7416 10.3948 13.6052C10.2584 13.4688 10.1818 13.2838 10.1818 13.0909V7.27273C10.1818 7.07984 10.2584 6.89486 10.3948 6.75847C10.5312 6.62208 10.7162 6.54545 10.9091 6.54545C11.102 6.54545 11.287 6.62208 11.4234 6.75847C11.5597 6.89486 11.6364 7.07984 11.6364 7.27273V13.0909Z" fill="#333333" />
                                </Svg>
                                <Text style={styles.txtVal}>Xóa</Text>
                            </View>
                        </TouchableOpacity>



                        <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetail')}>
                            <View style={styles.flexColumn1}>
                                <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.5 15.9375C6.52745 15.9375 4.6357 15.1539 3.24089 13.7591C1.84609 12.3643 1.0625 10.4725 1.0625 8.5C1.0625 6.52745 1.84609 4.6357 3.24089 3.24089C4.6357 1.84609 6.52745 1.0625 8.5 1.0625C10.4725 1.0625 12.3643 1.84609 13.7591 3.24089C15.1539 4.6357 15.9375 6.52745 15.9375 8.5C15.9375 10.4725 15.1539 12.3643 13.7591 13.7591C12.3643 15.1539 10.4725 15.9375 8.5 15.9375ZM8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 6.24566 16.1045 4.08365 14.5104 2.48959C12.9163 0.895533 10.7543 0 8.5 0C6.24566 0 4.08365 0.895533 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C4.08365 16.1045 6.24566 17 8.5 17Z" fill="black" />
                                    <Path d="M5.58348 6.14762C5.58202 6.18194 5.5876 6.21618 5.59987 6.24826C5.61214 6.28034 5.63085 6.30956 5.65483 6.33415C5.67881 6.35873 5.70757 6.37814 5.73934 6.3912C5.7711 6.40425 5.8052 6.41067 5.83954 6.41006H6.7161C6.86273 6.41006 6.9796 6.29 6.99873 6.14444C7.09435 5.44744 7.57248 4.93956 8.4246 4.93956C9.15348 4.93956 9.82073 5.304 9.82073 6.18056C9.82073 6.85525 9.42335 7.1655 8.79542 7.63725C8.08035 8.15681 7.51404 8.7635 7.55442 9.74844L7.5576 9.979C7.55872 10.0487 7.5872 10.1152 7.63689 10.1641C7.68658 10.213 7.75351 10.2404 7.82323 10.2404H8.68492C8.75536 10.2404 8.82293 10.2124 8.87274 10.1626C8.92255 10.1128 8.95054 10.0452 8.95054 9.97475V9.86319C8.95054 9.10031 9.2406 8.87825 10.0237 8.28431C10.6707 7.79237 11.3454 7.24625 11.3454 6.09981C11.3454 4.49438 9.98967 3.71875 8.50535 3.71875C7.15917 3.71875 5.68442 4.34562 5.58348 6.14762ZM7.23779 12.2708C7.23779 12.8371 7.68935 13.2557 8.31092 13.2557C8.95798 13.2557 9.40317 12.8371 9.40317 12.2708C9.40317 11.6843 8.95692 11.2721 8.30985 11.2721C7.68935 11.2721 7.23779 11.6843 7.23779 12.2708Z" fill="black" />
                                </Svg>
                                <Text style={styles.txtVal}>Xem sản phẩm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.flexColumn1}>
                                <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.5 15.9375C6.52745 15.9375 4.6357 15.1539 3.24089 13.7591C1.84609 12.3643 1.0625 10.4725 1.0625 8.5C1.0625 6.52745 1.84609 4.6357 3.24089 3.24089C4.6357 1.84609 6.52745 1.0625 8.5 1.0625C10.4725 1.0625 12.3643 1.84609 13.7591 3.24089C15.1539 4.6357 15.9375 6.52745 15.9375 8.5C15.9375 10.4725 15.1539 12.3643 13.7591 13.7591C12.3643 15.1539 10.4725 15.9375 8.5 15.9375ZM8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 6.24566 16.1045 4.08365 14.5104 2.48959C12.9163 0.895533 10.7543 0 8.5 0C6.24566 0 4.08365 0.895533 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C4.08365 16.1045 6.24566 17 8.5 17Z" fill="black" />
                                    <Path d="M5.58348 6.14762C5.58202 6.18194 5.5876 6.21618 5.59987 6.24826C5.61214 6.28034 5.63085 6.30956 5.65483 6.33415C5.67881 6.35873 5.70757 6.37814 5.73934 6.3912C5.7711 6.40425 5.8052 6.41067 5.83954 6.41006H6.7161C6.86273 6.41006 6.9796 6.29 6.99873 6.14444C7.09435 5.44744 7.57248 4.93956 8.4246 4.93956C9.15348 4.93956 9.82073 5.304 9.82073 6.18056C9.82073 6.85525 9.42335 7.1655 8.79542 7.63725C8.08035 8.15681 7.51404 8.7635 7.55442 9.74844L7.5576 9.979C7.55872 10.0487 7.5872 10.1152 7.63689 10.1641C7.68658 10.213 7.75351 10.2404 7.82323 10.2404H8.68492C8.75536 10.2404 8.82293 10.2124 8.87274 10.1626C8.92255 10.1128 8.95054 10.0452 8.95054 9.97475V9.86319C8.95054 9.10031 9.2406 8.87825 10.0237 8.28431C10.6707 7.79237 11.3454 7.24625 11.3454 6.09981C11.3454 4.49438 9.98967 3.71875 8.50535 3.71875C7.15917 3.71875 5.68442 4.34562 5.58348 6.14762ZM7.23779 12.2708C7.23779 12.8371 7.68935 13.2557 8.31092 13.2557C8.95798 13.2557 9.40317 12.8371 9.40317 12.2708C9.40317 11.6843 8.95692 11.2721 8.30985 11.2721C7.68935 11.2721 7.23779 11.6843 7.23779 12.2708Z" fill="black" />
                                </Svg>
                                <Text style={[styles.txtVal]}>Chia sẻ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible(false)}
                    style={styles.modalBackdrop}
                />
            </Modal>

            <Modal visible={isModalVisible3} animationType="slide" transparent={true}>
                <View style={styles.modalContainer2}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                        <View style={styles.btnGroupConfirm}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible3(false)}>
                                <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={() => btnConfirmDelete()}>
                                <Text style={styles.txtConfirm}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible3(false)}
                    style={styles.modalBackdrop}
                />
            </Modal>
        </View>
    );
};

export default CartItem;
