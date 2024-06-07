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
import Header from '../elements/Header';
import { connect } from 'react-redux';
import { get_detail_quantity_cart, edit_quantity_cart, change_status } from '../../services/cartService';
import { get_detail_quantity_nhap, edit_quantity_nhap, get_detail_quantity_tra, edit_quantity_tra } from '../../services/productService';
import QuantityColor from './QuantityColor';
import productAction from '../../actions/productAction';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import SpinnerComponent from '../elements/Spinner';

class EditQuantityItem extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isModalVisible: false,
            allId: {
                u_id: this.props.admin.uid,
                bill_id: this.props.cart.bill_id,
                order_id: this.props.cart.order_id,
                product_id: this.props.product.id,

            },

            allIdNhap: {
                u_id: this.props.admin.uid,
                order_id: this.props.cart.order_id,
                product_id: this.props.product.id,
                nhap_id: this.props.product.nhap_id
            },

            allIdTra: {
                u_id: this.props.admin.uid,
                order_id: this.props.cart.order_id,
                product_id: this.props.product.id,
                trahang_id: this.props.product.tra_id,
                type: this.props.product.typeTra,
            },

            quantity: 0,
            totle_quantity: 0,
            list_quantity: [],
            changing_quantity: false,
            spinner: false,
        }
    }

    componentDidMount() {
        this.getData();
    }
    setQuantity(opt) {
        this.setState({ quantity: opt })
    }

    setModalVisible(opt) {
        this.setState({ isModalVisible: opt })
    }

    setQuantity(opt) {
        this.setState({ quantity: opt });
    }

    setTotalQuantity(opt) {
        this.setState({ totle_quantity: opt });
    }

    setChangingQuantity(opt) {
        this.setState({ changing_quantity: opt });
    }

    setSpinner(opt) {
        this.setState({ spinner: opt });
    }

    async getData() {
        this.setSpinner(true);
        if (this.state.allIdNhap?.nhap_id) {
            const dataLog = await get_detail_quantity_nhap(this.state.allIdNhap);
            this.setState({ data: dataLog });
            this.props.productAction('update_quantity', dataLog?.list_quantity);
            this.setListQuantity(dataLog?.list_quantity)
            // console.log('nhap', dataLog.list_quantity);
        }
        else if (this.state.allIdTra?.trahang_id) {
            const dataLog = await get_detail_quantity_tra(this.state.allIdTra);
            this.setState({ data: dataLog });
            this.props.productAction('update_quantity', dataLog?.list_quantity);
            this.setListQuantity(dataLog?.list_quantity)
            // console.log('tra', dataLog.list_quantity);
        }
        else if (this.state.allId?.bill_id) {
            const dataLog = await get_detail_quantity_cart(this.state.allId);
            this.setState({ data: dataLog?.data });
            this.props.productAction('update_quantity', dataLog?.data?.list_quantity);
            this.setListQuantity(dataLog?.data?.list_quantity);
            // console.log('khong co gi', dataLog.data.list_quantity);
        }
        this.setSpinner(false);
    }

    async handleSubmit() {
        var sum_quantity = 0;
        console.log(this.state?.list_quantity);

        this.state?.list_quantity.map((quantity) => {
            sum_quantity += Number(quantity.quantity);
        })

        if (sum_quantity == 0 && this.props?.route?.params?.cart) {
            Alert.alert('Thông báo', 'Vui lòng nhập số lượng lớn hơn 0');
        }
        else {
            if (this.state.allIdNhap?.nhap_id) {
                const dataLog = await edit_quantity_nhap(this.state.allIdNhap, this.state?.list_quantity);
                this.props.navigation.goBack()
            }
            else if (this.state.allIdTra?.trahang_id) {
                const dataLog = await edit_quantity_tra(this.state.allIdTra, this.state?.list_quantity);
                this.props.navigation.goBack()
            }
            else if (this.props?.route?.params?.orderDetail) {
                const dataLog = await edit_quantity_cart(this.state.allId, this.state?.list_quantity);
                if (this.props.cart.status == 2) {
                    const dataLog11 = await change_status({
                        u_id: this.props.admin.uid,
                        bill_id: this.props?.cart?.bill_id,
                        nhat_lai: 1,
                        status: 1,
                    });
                }
                this.props.navigation.navigate('OrderDetail', { change_quantity: this.state.changing_quantity });
            }
            else if (this.state.allId?.bill_id) {
                const dataLog = await edit_quantity_cart(this.state.allId, this.state?.list_quantity);
                this.props.navigation.goBack();
                // this.props.navigation.navigate('Cart', { state: Math.random() })
            }
        }


    }

    getTitleColor(id) {
        const title = this.props.color?.listAllColor?.find((color) => color?.id === id);
        return title;
    }

    setListQuantity(opt) {
        this.setState({ list_quantity: opt })
    }


    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { disable, list_quantity, spinner } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => {
                                navigation.goBack();
                                this.setChangingQuantity(false);
                            }}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>Sửa số lượng</Text>
                        </View>

                        <View style={styles.headerRight}>
                        </View>
                    </View >
                    <ScrollView >
                        <View>
                            {
                                data?.list_color?.map((color, index) => {
                                    var objectColor = this?.getTitleColor(color);

                                    var sumQuantity = 0;
                                    list_quantity.forEach(e => {
                                        if (e.color_id == color) {
                                            sumQuantity = sumQuantity + Number(e.quantity);
                                        }
                                    })
                                    return (
                                        <QuantityColor
                                            colorId={color}
                                            index={index}
                                            colorData={data?.list_color}
                                            sizeData={data?.list_quantity}
                                            list_quantity={data?.list_quantity}
                                            colorObject={objectColor}
                                            nhapTra={this.props.route.params?.nhapTra}
                                            list_quantity_update={list_quantity}
                                            setListQuantity={(opt) => this.setListQuantity(opt)}
                                            setChangingQuantity={(opt) => this.setChangingQuantity(opt)}
                                            sumQuantity={sumQuantity}
                                        />
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                    <View>
                        <TouchableOpacity>
                            <Text style={styles.btnSave} onPress={() => this.handleSubmit()}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                    <Footer />
                </View >
                <SpinnerComponent
                    spinner={spinner}
                />


            </SafeAreaView >
        );
    };
};

const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart,
    color: state.color,
    size: state.size,
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuantityItem)