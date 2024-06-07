/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import { get_list_cart, update_price, update_customer, payment_cart } from '../../services/cartService';
import { get_detail_customer } from '../../services/customerSevice';
import productAction from '../../actions/productAction';
import cartAction from '../../actions/cartAction';
import customerAction from '../../actions/customerAction';

// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import quantity from '../products/quantity';
import CartComponent from './CartComponent';
import SpinnerComponent from '../elements/Spinner';

class Cart extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            // isActive: 'Giá buôn',
            // modalVisible: false,
            // search_key: '',
            // isRefreshing: false,
            // isLogged: false,
            // cityLabel: 'Toàn Quốc',

            colorList: [],
            sizeList: [],
            state: 0,
            updatePrice: 0,
            customerData: {},
            bill_id: 0,
            customer_id: 0,
            isModalVisible2: false,
            isModalGhiChu: false,
            ghiChu: '',
            ghi_chu: '',
            spinner: false,
        }


    }

    componentDidMount() {
        // this.getData();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.getData();
                this.getCustomer();
            }
        );

    }

    setData(data) {
        this.setState({ data: data })
    }
    setUpdatePrice(opt) {
        this.setState({ updatePrice: opt });
    }

    setCustomerData(data) {
        this.setState({ customerData: data })
    }

    setModalVisible2(opt) {
        this.setState({ isModalVisible2: opt })
    }
    setModalNhapGhiChu(opt) {
        this.setState({ isModalGhiChu: opt })
    }

    setSpinner(opt) {
        this.setState({ spinner: opt })
    }

    btnAddGhiChu = () => {
        this.setState({ ghi_chu: this.state.ghiChu })
        this.setModalNhapGhiChu(false);
    }

    async getData() {
        const dataLog = await get_list_cart({
            u_id: this.props.admin.uid,
            bill_id: this.props.cart.bill_id_temp,
        });
        // console.log(dataLog);
        this.setData(dataLog);

        // console.log('cart_data', dataLog.data.order_list);

        const newColorList = this.props.color.listAllColor?.filter(color =>
            this.state.data?.data?.order_list?.map((order) => {
                order?.list_quantity?.some(quantity => quantity.color_id === color.id);
            })
        );
        this.setState({ colorList: newColorList });

        this.setState({ bill_id: dataLog.data.bill_id });

        const customer = this.props.customer.listCustomers.find(e => e.id == dataLog.data.customer_id);
        this.setCustomerData(customer);

        // this.setState({ customer_id: dataLog.data.customer_id }, async () => {
        //     if (this.props?.customer?.id === 0) {
        //         const data = await get_detail_customer({
        //             id: this.state?.customer_id,
        //             u_id: this.props.admin.uid,
        //         });
        //         this.setCustomerData(data);
        //     }
        // });
    }


    async getCustomer() {
        if (this.props?.customer?.id !== 0) {
            const dataLog = await update_customer({
                u_id: this.props.admin.uid,
                bill_id: this.props.cart.bill_id_temp,
                customer_id: this.props?.customer?.id,
            })
            // console.log('customer update', dataLog);
            const customer = this.props.customer.listCustomers.find(e => e.id == this.props?.customer?.id);
            this.setCustomerData(customer);
            this.getData();
        }
    }

    gotoCustomerList() {
        this.props.navigation.navigate('Customer', { cart: Math.random() })
    }

    gotoEditQuantity() {
        this.props.navigation.navigate('Quantity', { cart: true });
    }

    gotoProductDetails() {
        this.props.navigation.navigate('ProductDetail')
    }

    async btnConfirmCart() {
        this.setModalVisible2(false);
        this.setSpinner(true);
        const dataLog = await payment_cart({
            u_id: this.props.admin.uid,
            bill_id: this.state?.bill_id,
            ghi_chu: this.state?.ghi_chu
        });
        this.props.customerAction('current_customer_id', this.state.customerData?.id ? this.state.customerData?.id : 0);
        this.props.cartAction('current_cart_thu_id', dataLog?.data?.thu_id);
        this.props.cartAction('current_cart_status', 0);
        this.props.cartAction('current_cart_bill_id_temp', 0);
        this.setSpinner(false);
        if (this.props.admin.is_admin == 1) {
            this.props?.navigation?.navigate('OrderConfirm', { cart: true });
        }
        else {
            this.props.navigation.goBack();
        }
    }


    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const customerData = this.state.customerData;
        const { colorList, sizeList, updatePrice, ghiChu, ghi_chu, spinner } = this.state;

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

                        <Text style={styles.title}>Giỏ hàng</Text>

                        <View style={styles.headerRight}>
                        </View>
                    </View>

                    {
                        this.props.route.params.numberCart == 0 ?
                            (
                                <View style={styles.containCart}>
                                    <Text style={styles.emptyCart}>Giỏ hàng rỗng</Text>
                                </View>
                            ) :
                            (
                                <View style={styles.containCart}>
                                    <ScrollView style={{ backgroundColor: "#fff" }}>
                                        <View style={styles.bodyTop}>
                                            <TouchableOpacity>
                                                <Text style={styles.btnMyCart}>Giỏ hàng của tôi</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.client}>
                                            {/* 1,3 */}
                                            {
                                                this.props.admin.roles?.includes('cart_change_status') || this.props.admin.is_admin == 1 ? (
                                                    <TouchableOpacity onPress={() => this.gotoCustomerList()}>
                                                        <View style={styles.customer}>
                                                            <View>
                                                                <Text style={styles.hText}>{customerData?.fullname ? customerData?.fullname : 'Khách mới'}</Text>
                                                                {
                                                                    this.props.admin.is_show_phone_cus == 1 &&
                                                                    <Text style={styles.hText1}>{customerData?.fullname ? customerData?.phone : 'Không có số'}</Text>
                                                                }
                                                            </View>
                                                            <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                                <Path d="M18.3335 5.5C18.3335 4.41221 18.0109 3.34884 17.4066 2.44437C16.8022 1.5399 15.9433 0.834947 14.9383 0.418665C13.9333 0.00238307 12.8274 -0.106535 11.7605 0.105683C10.6936 0.317902 9.7136 0.841726 8.94441 1.61092C8.17522 2.3801 7.6514 3.36011 7.43918 4.42701C7.22696 5.4939 7.33588 6.59977 7.75216 7.60476C8.16844 8.60976 8.87339 9.46874 9.77786 10.0731C10.6823 10.6774 11.7457 11 12.8335 11C14.2917 10.9985 15.6898 10.4186 16.721 9.38748C17.7521 8.35635 18.332 6.95825 18.3335 5.5ZM9.16683 5.5C9.16683 4.7748 9.38188 4.06589 9.78478 3.46291C10.1877 2.85993 10.7603 2.38997 11.4303 2.11244C12.1003 1.83492 12.8376 1.76231 13.5488 1.90379C14.2601 2.04527 14.9134 2.39449 15.4262 2.90728C15.939 3.42007 16.2882 4.07341 16.4297 4.78467C16.5712 5.49594 16.4986 6.23318 16.2211 6.90318C15.9435 7.57317 15.4736 8.14583 14.8706 8.54872C14.2676 8.95162 13.5587 9.16667 12.8335 9.16667C11.861 9.16667 10.9284 8.78036 10.2408 8.09273C9.55314 7.40509 9.16683 6.47246 9.16683 5.5Z" fill="black" />
                                                                <Path d="M15.5832 12.834H10.0832C8.38196 12.8359 6.75098 13.5126 5.54805 14.7155C4.34511 15.9185 3.66844 17.5494 3.6665 19.2507V21.084C3.6665 21.3271 3.76308 21.5603 3.93499 21.7322C4.1069 21.9041 4.34006 22.0007 4.58317 22.0007C4.82629 22.0007 5.05944 21.9041 5.23135 21.7322C5.40326 21.5603 5.49984 21.3271 5.49984 21.084V19.2507C5.50129 18.0355 5.98465 16.8706 6.84387 16.0114C7.7031 15.1521 8.86804 14.6688 10.0832 14.6673H15.5832C16.7983 14.6688 17.9632 15.1521 18.8225 16.0114C19.6817 16.8706 20.165 18.0355 20.1665 19.2507V21.084C20.1665 21.3271 20.2631 21.5603 20.435 21.7322C20.6069 21.9041 20.8401 22.0007 21.0832 22.0007C21.3263 22.0007 21.5594 21.9041 21.7314 21.7322C21.9033 21.5603 21.9998 21.3271 21.9998 21.084V19.2507C21.9979 17.5494 21.3212 15.9185 20.1183 14.7155C18.9154 13.5126 17.2844 12.8359 15.5832 12.834Z" fill="black" />
                                                                <Path d="M3.66667 6.41602C3.42355 6.41602 3.19039 6.51259 3.01849 6.6845C2.84658 6.85641 2.75 7.08957 2.75 7.33268V9.16602H0.916667C0.673552 9.16602 0.440394 9.26259 0.268485 9.4345C0.0965771 9.60641 0 9.83957 0 10.0827C0 10.3258 0.0965771 10.559 0.268485 10.7309C0.440394 10.9028 0.673552 10.9993 0.916667 10.9993H2.75V12.8327C2.75 13.0758 2.84658 13.309 3.01849 13.4809C3.19039 13.6528 3.42355 13.7493 3.66667 13.7493C3.90978 13.7493 4.14294 13.6528 4.31485 13.4809C4.48676 13.309 4.58333 13.0758 4.58333 12.8327V10.9993H6.41667C6.65978 10.9993 6.89294 10.9028 7.06485 10.7309C7.23676 10.559 7.33333 10.3258 7.33333 10.0827C7.33333 9.83957 7.23676 9.60641 7.06485 9.4345C6.89294 9.26259 6.65978 9.16602 6.41667 9.16602H4.58333V7.33268C4.58333 7.08957 4.48676 6.85641 4.31485 6.6845C4.14294 6.51259 3.90978 6.41602 3.66667 6.41602Z" fill="black" />

                                                            </Svg>

                                                        </View>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                            <TouchableOpacity onPress={() => this.setModalNhapGhiChu(true)}>
                                                <Text style={styles.txtGhiChu}>Ghi chú: {ghiChu == '' ? 'Chưa có ghi chú' : ghiChu}</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.listItem}>Danh sách trong giỏ hàng</Text>
                                        </View>

                                        {
                                            data?.data?.order_list?.map((product, index) => (
                                                <CartComponent
                                                    key={index}
                                                    productItem={product}
                                                    data={data}
                                                    reloadData={() => this.getData()}
                                                    gotoQuantity={() => this.gotoEditQuantity()}
                                                    gotoProductDetails={() => this.gotoProductDetails()}
                                                    goBack={() => this.props.navigation.pop()}
                                                    cartFunction={true}
                                                >
                                                </CartComponent>
                                            ))
                                        }

                                    </ScrollView>
                                    {/* {
                                        this.props.admin.groupId != 2 ? ( */}
                                    <>
                                        <View style={styles.groupItem}>
                                            <View style={styles.flexColumn}>
                                                <View style={styles.flexRow}>
                                                    <Text style={styles.textSubf}>Số lượng/ Mã sp</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>{data?.data?.soluongsp ? Number(data?.data?.soluongsp).toLocaleString() : 0}/{data?.data?.tongsanpham ? data?.data?.tongsanpham : 0}</Text>
                                                </View>
                                                {/* <TouchableOpacity onPress={() => this.setModalNhapGhiChu(true)}>
                                                    <Text style={styles.btnConfirm}>Ghi chú</Text>
                                                </TouchableOpacity> */}
                                                <Modal visible={this.state.isModalGhiChu} animationType="slide" transparent={true}>
                                                    <View style={styles.modalContainer2}>
                                                        <View style={styles.modalContent}>
                                                            <Text style={styles.modalTitle}>Nhập ghi chú</Text>
                                                            <TextInput
                                                                style={styles.inputSL1}
                                                                multiline={true}
                                                                numberOfLines={4}
                                                                value={ghiChu}
                                                                onChangeText={(text) => this.setState({ ghiChu: text })}
                                                            />
                                                            <View style={styles.btnGroupConfirm}>
                                                                <TouchableOpacity style={styles.closeButton} onPress={() => {
                                                                    this.setState({ ghiChu: ghi_chu })
                                                                    this.setModalNhapGhiChu(false)
                                                                }}>
                                                                    <Text style={styles.txtConfirm}>Hủy</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.btnAddGhiChu()}>
                                                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        this.setState({ ghiChu: ghi_chu })
                                                        this.setModalNhapGhiChu(false)
                                                    }}
                                                        style={styles.modalBackdrop}
                                                    />
                                                </Modal>
                                            </View>

                                            <View style={styles.flexColumn}>
                                                <View style={styles.flexRow}>
                                                    <Text style={styles.textSubf}>Tổng tiền</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>{data?.data?.toltal_price} đ</Text>
                                                </View>
                                            </View>


                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => {
                                                if (this.props.admin.roles?.includes('order_add') || this.props.admin.is_admin == 1) {
                                                    this.setModalVisible2(true)
                                                }
                                                else {
                                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                                }
                                            }}>
                                                <Text style={styles.btnConfirm}>Xác nhận</Text>
                                            </TouchableOpacity>
                                            <Modal visible={this.state.isModalVisible2} animationType="slide" transparent={true}>
                                                <View style={styles.modalContainer2}>
                                                    <View style={styles.modalContent}>
                                                        <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                                        <View style={styles.btnGroupConfirm}>
                                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible2(false)}>
                                                                <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={styles.confirmButton} onPress={() => this.btnConfirmCart()}>
                                                                <Text style={styles.txtConfirm}>Xác nhận</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible2(false)}
                                                    style={styles.modalBackdrop}
                                                />
                                            </Modal>
                                        </View>
                                    </>
                                    {/* ) : (
                                            <></>
                                        )
                                    } */}
                                </View>
                            )
                    }

                    <SpinnerComponent
                        spinner={spinner}
                    />

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };
}


const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart,
    color: state.color,
    size: state.size,
    customer: state.customer,
    account: state.account,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    cartAction: (act, data) => dispatch(cartAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

