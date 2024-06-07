/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import { connect } from 'react-redux';

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
import { SelectCountry } from 'react-native-element-dropdown';
class SelectNumber extends Component {
    // const { productId } = route.params;
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isEnabled: false,
            quantity: '0',
            isModalVisible: false,
            previousState: false,
        }
    }

    setIsEnabled(opt) {
        this.setState({ isEnabled: opt });
    }
    setQuantity(opt) {
        this.setState({ quantity: opt });
    }
    setModalVisible(opt) {
        this.setState({ isModalVisible: opt });
    }


    // toggleState = (key) => {
    //     this.setState((previousState) => ({
    //         [key]: !previousState[key],
    //     }));
    // };

    increaseQuantity = () => {
        const quantityNumber = parseInt(this.state.quantity, 10);
        this.setQuantity(quantityNumber + 1);
    };

    decreaseQuantity = () => {
        if (this.state.quantity > 0) {
            this.setQuantity(this.state.quantity - 1);
        }
    };

    toggleModal = () => {
        this.setModalVisible(!this.state.isModalVisible);
    };
    confirm = () => {
        this.setModalVisible(!this.state.isModalVisible);
    };

    listColor = () => {
        var items = new Array();
        for (var i = 0; i < 5; i++) {
            items.push(
                <View>
                    <View style={styles.flexBox}>
                        <Text style={styles.boxTitle}>Đen xanh ({this.state.quantity})</Text>
                        <Text style={{ backgroundColor: "#000", width: 22, height: 22, borderRadius: 6, marginRight: 10 }}></Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M11 0C4.92422 0 0 4.92422 0 11C0 17.0758 4.92422 22 11 22C17.0758 22 22 17.0758 22 11C22 4.92422 17.0758 0 11 0ZM15.125 12.0312H12.0312V15.125C12.0312 15.6922 11.5672 16.1562 11.0387 16.1562C10.4328 16.1562 9.96875 15.6922 9.96875 15.125V12.0312H6.875C6.30781 12.0312 5.84375 11.5672 5.84375 11C5.84375 10.4328 6.30781 9.96875 6.875 9.96875H9.96875V6.875C9.96875 6.30781 10.4328 5.84375 11 5.84375C11.5672 5.84375 12.0312 6.30781 12.0312 6.875V9.96875H15.125C15.6922 9.96875 16.1562 10.4328 16.1562 11C16.1562 11.5672 15.6922 12.0312 15.125 12.0312Z" fill="#2DCC6F" />
                            </Svg>
                        </TouchableOpacity>
                        <Modal visible={this.state.isModalVisible} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Nhập số lượng</Text>
                                    <TextInput
                                        style={styles.inputSL}
                                        keyboardType="numeric"
                                    />
                                    <View style={styles.btnGroupConfirm}>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible(false)}>
                                            <Text style={styles.txtConfirm}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.confirm()}>
                                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(false)}
                                style={styles.modalBackdrop}
                            />
                        </Modal>
                    </View>
                    <View style={styles.flexBox}>
                        <View style={styles.flexColum}>
                            {this.state.quantity > 0 && (
                                <TouchableOpacity onPress={this.decreaseQuantity}>
                                    <Text style={styles.quantity}>{this.state.quantity}</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={this.increaseQuantity}>
                                <Text style={styles.size}>30 ({this.state.quantity})</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.flexColum}>
                            {this.state.quantity > 0 && (
                                <TouchableOpacity onPress={this.decreaseQuantity}>
                                    <Text style={styles.quantity}>{this.state.quantity}</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={this.increaseQuantity}>
                                <Text style={styles.size}>30 ({this.state.quantity})</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.flexColum}>
                            {this.state.quantity > 0 && (
                                <TouchableOpacity onPress={this.decreaseQuantity}>
                                    <Text style={styles.quantity}>{this.state.quantity}</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={this.increaseQuantity}>
                                <Text style={styles.size}>30 ({this.state.quantity})</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.flexColum}>
                            {this.state.quantity > 0 && (
                                <TouchableOpacity onPress={this.decreaseQuantity}>
                                    <Text style={styles.quantity}>{this.state.quantity}</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={this.increaseQuantity}>
                                <Text style={styles.size}>30 ({this.state.quantity})</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.flexColum}>
                            {this.state.quantity > 0 && (
                                <TouchableOpacity onPress={this.decreaseQuantity}>
                                    <Text style={styles.quantity}>{quantity}</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={this.increaseQuantity}>
                                <Text style={styles.size}>30 ({this.state.quantity})</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.flexColum}>
                            {this.state.quantity > 0 && (
                                <TouchableOpacity onPress={this.decreaseQuantity}>
                                    <Text style={styles.quantity}>{this.state.quantity}</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={this.increaseQuantity}>
                                <Text style={styles.size}>30 ({this.state.quantity})</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        return items;
    }


    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => navigation.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Chọn số lượng</Text>
                        <View style={styles.headerRight}>
                        </View>
                    </View >

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <View style={styles.bgGrey}>
                            <TouchableOpacity style={styles.btnGroup} onPress={() => { }}>
                                <Svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M21.3054 14.0288V3.87942V3.71166C21.3054 2.72608 20.5085 1.90826 19.502 1.90826H16.3146C15.6016 0.859764 14.7208 0 13.7143 0H7.98952C6.98296 0 6.10223 0.859764 5.38925 1.90826H1.80341C0.817825 1.90826 0 2.70511 0 3.71166V4.82307C0 4.82307 0 4.82307 0 4.84404V13.0642C0 13.0642 0 13.0642 0 13.0852V14.1966C0 15.1822 0.796855 16 1.80341 16H19.502C20.4876 16 21.3054 15.2031 21.3054 14.1966V14.0288ZM7.98952 0.817824H13.7353C14.2595 0.817824 14.8257 1.27916 15.3499 1.92923H6.37484C6.89908 1.25819 7.4443 0.817824 7.98952 0.817824ZM5.89253 9.05898C5.89253 6.3329 8.03146 4.11009 10.6527 4.11009C13.2739 4.11009 15.4128 6.3329 15.4128 9.05898C15.4128 11.7851 13.2739 14.0079 10.6527 14.0079C8.03146 14.0079 5.89253 11.7851 5.89253 9.05898ZM6.52163 5.24246C5.64089 6.24902 5.09568 7.59109 5.09568 9.05898C5.09568 10.443 5.57798 11.7012 6.35387 12.7077H0.796854V5.24246H6.52163ZM16.2097 9.05898C16.2097 7.59109 15.6645 6.24902 14.7838 5.24246H20.5085V12.7077H14.9515C15.7274 11.7012 16.2097 10.443 16.2097 9.05898ZM20.5085 4.44561H13.9659C13.0433 3.73263 11.8899 3.31324 10.6527 3.31324C9.41547 3.31324 8.26212 3.73263 7.33945 4.44561H0.796854V3.90039C0.796854 3.25033 1.3211 2.72608 1.97117 2.72608H19.3342C19.9843 2.72608 20.5085 3.25033 20.5085 3.90039V4.44561ZM19.3342 15.2031H1.97117C1.3211 15.2031 0.796854 14.6789 0.796854 14.0288V13.4836H7.12975C8.09437 14.3014 9.33159 14.8047 10.6527 14.8047C11.9738 14.8047 13.232 14.3014 14.1756 13.4836H20.5085V14.0288C20.5085 14.6789 19.9843 15.2031 19.3342 15.2031Z" fill="#fff" />
                                    <Path d="M10.6527 13.1271C12.8335 13.1271 14.595 11.3028 14.595 9.059C14.595 6.81522 12.8335 4.99084 10.6527 4.99084C8.4718 4.99084 6.71033 6.81522 6.71033 9.059C6.71033 11.3028 8.4718 13.1271 10.6527 13.1271ZM10.6527 5.76673C12.3932 5.76673 13.8191 7.23462 13.8191 9.059C13.8191 10.8624 12.3932 12.3513 10.6527 12.3513C8.91216 12.3513 7.48621 10.8834 7.48621 9.059C7.48621 7.23462 8.91216 5.76673 10.6527 5.76673Z" fill="#fff" />
                                    <Path d="M19.6697 3.31326H17.6566C17.4469 3.31326 17.2582 3.48102 17.2582 3.71169C17.2582 3.92139 17.4259 4.11012 17.6566 4.11012H19.6697C19.8794 4.11012 20.0681 3.94236 20.0681 3.71169C20.0681 3.50199 19.8794 3.31326 19.6697 3.31326Z" fill="#fff" />
                                    <Path d="M2.60024 4.02623C2.91294 4.02623 3.16643 3.77274 3.16643 3.46005C3.16643 3.14735 2.91294 2.89386 2.60024 2.89386C2.28755 2.89386 2.03406 3.14735 2.03406 3.46005C2.03406 3.77274 2.28755 4.02623 2.60024 4.02623Z" fill="#fff" />
                                    <Path d="M11.5125 7.21366C11.5125 7.21366 12.3513 7.23463 12.5819 8.367C12.6239 8.55573 12.7916 8.68155 12.9594 8.68155C12.9804 8.68155 13.0013 8.68155 13.0433 8.68155C13.253 8.63961 13.3998 8.42991 13.3578 8.22021C13.0642 6.81523 12.0367 6.43777 11.5334 6.43777C11.3237 6.43777 11.135 6.60553 11.135 6.8362C11.1141 7.0459 11.3028 7.21366 11.5125 7.21366Z" fill="#fff" />
                                </Svg>
                                <Text style={styles.btnText}>Tải hình</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnGroup} onPress={() => { }}>
                                <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M10.2308 6.53846H11.7692C12.1773 6.53846 12.5686 6.70055 12.8571 6.98906C13.1456 7.27758 13.3077 7.6689 13.3077 8.07692V15.4615C13.3077 15.8696 13.1456 16.2609 12.8571 16.5494C12.5686 16.8379 12.1773 17 11.7692 17H2.53846C2.13044 17 1.73912 16.8379 1.4506 16.5494C1.16209 16.2609 1 15.8696 1 15.4615V8.07692C1 7.6689 1.16209 7.27758 1.4506 6.98906C1.73912 6.70055 2.13044 6.53846 2.53846 6.53846H4.07692" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M10.2308 4.07692L7.15383 1L4.0769 4.07692" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M7.15387 11.5V1" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                                <Text style={styles.btnText}>Chia sẻ</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.swiperContainer}>
                            <Swiper style={styles.wrapper} loop={true}
                                activeDot={
                                    <View
                                        style={{
                                            backgroundColor: '#B8101F',
                                            width: 8,
                                            height: 8,
                                            borderRadius: 4,
                                            marginLeft: 3,
                                            marginRight: 3,
                                            marginTop: 3,
                                            marginBottom: 3
                                        }}
                                    />
                                }>
                                <View style={styles.slide}>
                                    <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                                </View>
                                <View style={styles.slide}>
                                    <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                                </View>
                                <View style={styles.slide}>
                                    <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
                                </View>
                            </Swiper>
                            {/* <TouchableOpacity style={styles.editPictures} onPress={()=>{}}>
                            <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M14.988 0.012207L17.988 3.01221L15.701 5.30021L12.701 2.30021L14.988 0.012207ZM4 14.0002H7L14.287 6.71321L11.287 3.71321L4 11.0002V14.0002Z" fill="white" />
                                <Path d="M16 17H5.158C5.132 17 5.105 17.01 5.079 17.01C5.046 17.01 5.013 17.001 4.979 17H2V3H8.847L10.847 1H2C0.897 1 0 1.896 0 3V17C0 18.104 0.897 19 2 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V8.332L16 10.332V17Z" fill="white" />
                            </Svg>
                        </TouchableOpacity> */}
                        </View>

                        <View style={styles.listAttr}>

                        </View>

                        <View>

                            <View style={styles.productInfo}>
                                <Text style={styles.name}>CODE1 - Sp 1</Text>
                            </View>

                            <Text style={styles.inventory}>Chọn số lượng</Text>

                            <ScrollView horizontal={true}>
                                <View>
                                    {this.listColor()}
                                </View>
                            </ScrollView>
                        </View>
                    </ScrollView>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };

};
const mapStateToProps = state => ({
    product: state.product,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(SelectNumber)


