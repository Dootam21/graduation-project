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
import { update_price, delete_cart } from '../../services/cartService';
import productAction from '../../actions/productAction';
import cartAction from '../../actions/cartAction';

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
import { delete_nhap, delete_return, delete_tra, update_price_nhap, update_price_tra } from '../../services/productService';

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showItem: false,
            modalVisible: false,
            isModalVisible3: false,
            suaGia: false,
            updatePrice: '',
        }
    }

    componentDidMount() {
        if (this.props?.openDetail) {
            this.setShowItem(true);
        }
    }


    setShowItem(opt) {
        this.setState({ showItem: opt })
    }
    setModalVisible(opt) {
        this.setState({ modalVisible: opt })
    }

    setSuaGia(opt) {
        this.setState({ suaGia: opt })
    }
    setModalVisible3(opt) {
        this.setState({ isModalVisible3: opt })
    }
    setUpdatePrice = (opt) => {
        this.setState({ updatePrice: opt });
    }

    getTitleColor(id) {
        const title = this.props.color?.listAllColor?.filter((color) => color?.id === id);
        return title[0];
    }

    getTitleSize(id) {
        // console.log(this.props.size?.listAllSize);
        const title = this.props.size?.listAllSize?.filter((size) => size?.id === id);
        return title[0];

    }

    gotoQuantityPage(idBill, idProduct, idOrder, idNhap, idTra) {
        this.props.productAction('current_product_id', idProduct);
        this.props.cartAction('current_cart_bill_id', idBill);
        this.props.cartAction('current_cart_order_id', idOrder);
        this.props.productAction('set_nhap_id', idNhap);
        this.props.productAction('set_tra_id', idTra);
        this.props?.gotoQuantity();
        // console.log(idProduct, idBill, idOrder, idNhap);
    }

    gotoProductDetail(product_id) {
        this.props.productAction('current_product_id', product_id);
        // console.log(product_id);
        this.props?.gotoProductDetails();
    }

    async handleUpdate(idBill, idOrder) {
        if (this.props.nhap) {
            const dataLog = await update_price_nhap({
                u_id: this.props.admin.uid,
                order_id: idOrder,
                nhap_id: this.props.product.nhap_id,
                price: this.state?.updatePrice?.replace(/,/g, ''),
            })
        }
        else if (this.props.khachtra) {
            const dataLog = await update_price_tra({
                u_id: this.props.admin.uid,
                order_id: idOrder,
                price: this.state?.updatePrice?.replace(/,/g, ''),
                type: 1,
                trahang_id: this.props.product.tra_id,
            })
        }
        else if (this.props.traxuong) {
            const dataLog = await update_price_tra({
                u_id: this.props.admin.uid,
                order_id: idOrder,
                price: this.state?.updatePrice?.replace(/,/g, ''),
                type: 2,
                trahang_id: this.props.product.tra_id,
            })
        }
        else {
            const dataLog = await update_price({
                u_id: this.props.admin.uid,
                order_id: idOrder,
                price: this.state?.updatePrice?.replace(/,/g, ''),
                bill_id: idBill,
            })
        }
        this.setUpdatePrice('');
        this.setSuaGia(false);
        this.props?.reloadData();
    }

    deleteItem = () => {
        this.setModalVisible(false);
        this.setModalVisible3(true);
    }

    async btnConfirmDelete(idBill, idOrder) {
        if (this.props.nhap) {
            const dataLog = await delete_nhap({
                u_id: this.props.admin.uid,
                order_id: idOrder,
                nhap_id: this.props.product.nhap_id,
            });
            this.props?.reloadData();
        }
        else if (this.props.khachtra) {
            const dataLog = await delete_tra({
                u_id: this.props.admin.uid,
                order_id: idOrder,
                trahang_id: this.props.product.tra_id,
            });
            this.props?.reloadData();
        }
        else if (this.props.traxuong) {
            const dataLog = await delete_tra({
                u_id: this.props.admin.uid,
                order_id: idOrder,
                trahang_id: this.props.product.tra_id,
            });
            this.props?.reloadData();
        }
        else {
            if (this.props?.cart?.status == 2) {
                const data = await delete_return({
                    u_id: this.props.admin.uid,
                    ghi_chu: 'Tự động tạo từ toa bán đã nhặt có chỉnh sửa giảm số lượng',
                    bill_id: idBill,
                    order_id: idOrder,
                })
            }
            const dataLog = await delete_cart({
                u_id: this.props.admin.uid,
                bill_id: idBill,
                order_id: idOrder,
            });

            if (dataLog.data.bill_id == 0) {
                this.props?.goBack();
            }
            else {
                this.props?.reloadData();
            }

        }
        this.setModalVisible(false);
        this.setModalVisible3(false);

    }

    formatWithCommas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    handlePriceChange = (setPrice) => {
        return (value) => {
            const numericValue = value.replace(/,/g, ''); // Remove existing commas
            const formattedValue = this.formatWithCommas(numericValue);
            setPrice(formattedValue);
        };
    };



    render() {
        const { showItem, modalVisible, isModalVisible2, isModalVisible3, isModalGhiChu, suaGia, updatePrice } = this.state;
        const product = this.props.productItem;
        const data = this.props.data;
        return (
            <View >
                <TouchableOpacity onPress={() => this.setShowItem(!showItem)}>
                    <View style={styles.cardItem}>
                        <Image style={styles.thumbnail} source={product?.product?.image === null || product?.product?.image?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: product?.product?.image }}></Image>
                        <View style={styles.cardContent}>
                            <View style={styles.itemInfo}>
                                {/* {
                                    this.props.productItem?.code ? (
                                        <> */}
                                <Text style={[styles.clback, styles.name]}>{product?.product?.code} - {product?.product?.title}</Text>
                                <View style={styles.textGroup}>
                                    <Text style={styles.clback}>Số lượng: </Text>
                                    <Text style={[styles.clback, styles.bold]}>{Number(product?.product?.quantity).toLocaleString()}</Text>
                                </View>
                                <View style={{ ...styles.textGroup, alignItems: 'center' }}>
                                    <Text style={styles.clback}>Đơn giá: </Text>
                                    <Text style={[styles.clback, styles.bold]}>{Number(parseFloat(product?.product?.custom_price).toLocaleString('en')) > 0 ? product?.product?.custom_price : product?.product?.price} đ</Text>
                                    {
                                        Number(parseFloat(product?.product?.custom_price).toLocaleString('en')) > 0 &&
                                        <Text style={styles.clback1}>{product?.product?.price} đ</Text>
                                    }
                                </View>
                                <View style={styles.textGroup}>
                                    <Text style={styles.clback}>Tổng tiền: </Text>
                                    <Text style={[styles.clback, styles.bold]}>{product?.product?.totle_price} đ</Text>
                                </View>
                                {/* </>
                                    ) : (
                                        <>
                                            <Text style={[styles.clback, styles.name]}>Sản phẩm đã bị xóa</Text>
                                        </>
                                    )
                                } */}
                            </View>



                            <View style={styles.iconList}>
                                {
                                    Number(product?.product?.quantity) === 0 &&
                                    <View style={styles.warningIcon}>
                                        <Svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M9.66473 1.76843L0.541165 17.5698C0.376361 17.8551 0.289581 18.1788 0.289551 18.5083C0.28952 18.8379 0.37624 19.1616 0.540991 19.447C0.705742 19.7323 0.942718 19.9693 1.2281 20.1341C1.51347 20.2988 1.8372 20.3856 2.16672 20.3855H20.4124C20.7419 20.3856 21.0656 20.2988 21.351 20.1341C21.6364 19.9693 21.8734 19.7323 22.0381 19.447C22.2029 19.1616 22.2896 18.8379 22.2896 18.5083C22.2895 18.1788 22.2027 17.8551 22.0379 17.5698L12.9153 1.76843C12.7506 1.48313 12.5137 1.24622 12.2284 1.08151C11.9431 0.916793 11.6195 0.830078 11.29 0.830078C10.9606 0.830078 10.637 0.916793 10.3517 1.08151C10.0664 1.24622 9.82946 1.48313 9.66473 1.76843Z" fill="#EE404C" />
                                            <Path d="M11.4093 6.64062H11.1713C10.5853 6.64062 10.1104 7.11562 10.1104 7.70156V12.7726C10.1104 13.3586 10.5853 13.8336 11.1713 13.8336H11.4093C11.9952 13.8336 12.4702 13.3586 12.4702 12.7726V7.70156C12.4702 7.11562 11.9952 6.64062 11.4093 6.64062Z" fill="#FFF7ED" />
                                            <Path d="M11.2903 17.8559C11.9419 17.8559 12.4702 17.3277 12.4702 16.676C12.4702 16.0244 11.9419 15.4961 11.2903 15.4961C10.6386 15.4961 10.1104 16.0244 10.1104 16.676C10.1104 17.3277 10.6386 17.8559 11.2903 17.8559Z" fill="#FFF7ED" />
                                        </Svg>
                                    </View>

                                }
                                {
                                    this.props?.disableFunction !== true &&
                                    (
                                        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                                            <Svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M1.78572 3.57142H23.2142C24.2 3.57142 25 2.77142 25 1.78572C25 0.8 24.2 0 23.2142 0H1.78572C0.8 0 0 0.8 0 1.78572C0 2.77142 0.8 3.57142 1.78572 3.57142ZM23.2142 7.14286H1.78572C0.8 7.14286 0 7.94286 0 8.92858C0 9.91428 0.8 10.7143 1.78572 10.7143H23.2142C24.2 10.7143 25 9.91428 25 8.92858C25 7.94286 24.2 7.14286 23.2142 7.14286ZM23.2142 14.2857H1.78572C0.8 14.2857 0 15.0857 0 16.0714C0 17.0572 0.8 17.8572 1.78572 17.8572H23.2142C24.2 17.8572 25 17.0572 25 16.0714C25 15.0857 24.2 14.2857 23.2142 14.2857Z" fill="#B8101F" />
                                            </Svg>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {showItem && (
                    product?.product?.color_list?.map((elements, i) => {
                        // var color = this.getTitleColor(elements);
                        var sum_quantity = 0;
                        product?.list_quantity.map((e) => {
                            if (e.color_id === elements) {
                                sum_quantity += Number(e.quantity);
                            }
                        })
                        if (sum_quantity == 0) {
                            return (
                                <></>
                            )
                        }
                        else {
                            return (
                                <View key={i} style={styles.quantity}>
                                    <ScrollView horizontal={true}>
                                        <Text style={{ ...styles.color, backgroundColor: `${this.props.color?.listColorObj[elements]?.content}` }}></Text>
                                        <Text style={{ ...styles.textColor, ...styles.bold, marginRight: 20 }}>{this.props.color?.listColorObj[elements]?.title}</Text>
                                        {
                                            product?.list_quantity?.map((e, index) => {
                                                // console.log(e);
                                                var newColor = e.color_id;
                                                // var size = this.getTitleSize(e.size_id);
                                                {
                                                    return elements == newColor && (this.props?.cartFunction || this.props?.freightWagon) ? (
                                                        <View key={index} style={styles.groupSize}>
                                                            <Text style={styles.size}>{this.props.size?.listSizeObj[e.size_id]?.title}</Text>
                                                            <Text style={styles.soluong}> ({e?.quantity})</Text>
                                                            {
                                                                e?.change_quantity == 1 &&
                                                                <Text style={styles.soluongcu}>{e?.old_quantity}</Text>
                                                            }
                                                        </View>

                                                    ) : elements == newColor && (
                                                        <View key={index} style={styles.groupSize}>
                                                            <Text style={styles.size}>{this.props.size?.listSizeObj[e.size_id]?.title}</Text>
                                                            <Text style={styles.soluong}> ({e?.quantity})</Text>
                                                        </View>
                                                    )
                                                }
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            )
                        }
                        // console.log(this.props.color?.listColorObj);
                    })

                )}

                <View style={styles.bgGrey1}></View>
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}
                >
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(false)} style={styles.centeredView}>
                        <View style={styles.modalView}>

                            {
                                this.props?.cartFunction ? (
                                    <>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.admin.roles?.includes('cart_change_price') || this.props.admin.is_admin == 1) {
                                                this.setSuaGia(true);
                                                this.setModalVisible(false);
                                            }
                                            else {
                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M7.67549 6.59339C7.59182 6.67705 7.52725 6.77254 7.47087 6.87258L7.43358 6.83529L7.41085 6.99353C7.31991 7.20724 7.28808 7.44187 7.31354 7.67741L6.95068 10.2201L9.49432 9.85727C9.72985 9.88274 9.96448 9.85091 10.1782 9.75997L10.3364 9.73814L10.2991 9.70085C10.3983 9.64447 10.4947 9.5799 10.5783 9.49624L15.1736 4.90096L12.2717 1.99902L7.67549 6.59339Z" fill="#231F20" />
                                                    <Path d="M16.5358 1.42585L15.7446 0.634662C15.1617 0.0517276 14.2559 0.0126227 13.7211 0.546449L12.9963 1.27125L15.8983 4.17319L16.6231 3.44748C17.1578 2.91456 17.1187 2.00879 16.5358 1.42585Z" fill="#231F20" />
                                                    <Path d="M13.6412 8.81768V15.46H1.81883V1.81883H9.96082L11.3459 0.52746C11.4932 0.381045 11.6669 0.32648 11.8506 0.261002C11.8897 0.152782 11.9452 0.0973073 12.0106 0H0V17.2789H15.46V7.20984L13.6412 8.81768Z" fill="#231F20" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Sửa giá</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.admin.roles?.includes('cart_edit_quantity') || this.props.admin.is_admin == 1) {
                                                this.gotoQuantityPage(data?.data?.bill_id, product?.product?.id, product?.product?.order_id, data?.nhap_id, data?.trahang_id)
                                                this.setModalVisible(false);
                                            }
                                            else {
                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M7.67549 6.59339C7.59182 6.67705 7.52725 6.77254 7.47087 6.87258L7.43358 6.83529L7.41085 6.99353C7.31991 7.20724 7.28808 7.44187 7.31354 7.67741L6.95068 10.2201L9.49432 9.85727C9.72985 9.88274 9.96448 9.85091 10.1782 9.75997L10.3364 9.73814L10.2991 9.70085C10.3983 9.64447 10.4947 9.5799 10.5783 9.49624L15.1736 4.90096L12.2717 1.99902L7.67549 6.59339Z" fill="#231F20" />
                                                    <Path d="M16.5358 1.42585L15.7446 0.634662C15.1617 0.0517276 14.2559 0.0126227 13.7211 0.546449L12.9963 1.27125L15.8983 4.17319L16.6231 3.44748C17.1578 2.91456 17.1187 2.00879 16.5358 1.42585Z" fill="#231F20" />
                                                    <Path d="M13.6412 8.81768V15.46H1.81883V1.81883H9.96082L11.3459 0.52746C11.4932 0.381045 11.6669 0.32648 11.8506 0.261002C11.8897 0.152782 11.9452 0.0973073 12.0106 0H0V17.2789H15.46V7.20984L13.6412 8.81768Z" fill="#231F20" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Sửa số lượng</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.admin.roles?.includes('cart_delete') || this.props.admin.is_admin == 1) {
                                                this.deleteItem();
                                            }
                                            else {
                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M15.2727 2.90909H10.9091V2.18182C10.9091 1.60316 10.6792 1.04821 10.2701 0.63904C9.86088 0.229869 9.30593 0 8.72727 0L7.27273 0C6.69407 0 6.13912 0.229869 5.72995 0.63904C5.32078 1.04821 5.09091 1.60316 5.09091 2.18182V2.90909H0.727273C0.534388 2.90909 0.349403 2.98571 0.213013 3.1221C0.0766231 3.25849 0 3.44348 0 3.63636C0 3.82925 0.0766231 4.01423 0.213013 4.15062C0.349403 4.28701 0.534388 4.36364 0.727273 4.36364H2.18182V14.5455C2.18182 15.1241 2.41169 15.6791 2.82086 16.0882C3.23003 16.4974 3.78498 16.7273 4.36364 16.7273H11.6364C12.215 16.7273 12.77 16.4974 13.1791 16.0882C13.5883 15.6791 13.8182 15.1241 13.8182 14.5455V4.36364H15.2727C15.4656 4.36364 15.6506 4.28701 15.787 4.15062C15.9234 4.01423 16 3.82925 16 3.63636C16 3.44348 15.9234 3.25849 15.787 3.1221C15.6506 2.98571 15.4656 2.90909 15.2727 2.90909ZM6.54545 2.18182C6.54545 1.98893 6.62208 1.80395 6.75847 1.66756C6.89486 1.53117 7.07984 1.45455 7.27273 1.45455H8.72727C8.92016 1.45455 9.10514 1.53117 9.24153 1.66756C9.37792 1.80395 9.45455 1.98893 9.45455 2.18182V2.90909H6.54545V2.18182ZM5.81818 13.0909C5.81818 13.2838 5.74156 13.4688 5.60517 13.6052C5.46878 13.7416 5.28379 13.8182 5.09091 13.8182C4.89802 13.8182 4.71304 13.7416 4.57665 13.6052C4.44026 13.4688 4.36364 13.2838 4.36364 13.0909V7.27273C4.36364 7.07984 4.44026 6.89486 4.57665 6.75847C4.71304 6.62208 4.89802 6.54545 5.09091 6.54545C5.28379 6.54545 5.46878 6.62208 5.60517 6.75847C5.74156 6.89486 5.81818 7.07984 5.81818 7.27273V13.0909ZM8.72727 13.0909C8.72727 13.2838 8.65065 13.4688 8.51426 13.6052C8.37787 13.7416 8.19288 13.8182 8 13.8182C7.80712 13.8182 7.62213 13.7416 7.48574 13.6052C7.34935 13.4688 7.27273 13.2838 7.27273 13.0909V7.27273C7.27273 7.07984 7.34935 6.89486 7.48574 6.75847C7.62213 6.62208 7.80712 6.54545 8 6.54545C8.19288 6.54545 8.37787 6.62208 8.51426 6.75847C8.65065 6.89486 8.72727 7.07984 8.72727 7.27273V13.0909ZM11.6364 13.0909C11.6364 13.2838 11.5597 13.4688 11.4234 13.6052C11.287 13.7416 11.102 13.8182 10.9091 13.8182C10.7162 13.8182 10.5312 13.7416 10.3948 13.6052C10.2584 13.4688 10.1818 13.2838 10.1818 13.0909V7.27273C10.1818 7.07984 10.2584 6.89486 10.3948 6.75847C10.5312 6.62208 10.7162 6.54545 10.9091 6.54545C11.102 6.54545 11.287 6.62208 11.4234 6.75847C11.5597 6.89486 11.6364 7.07984 11.6364 7.27273V13.0909Z" fill="#333333" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Xóa</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ) : this.props?.disableFunction == false ? (
                                    <>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.cart.auto == 0) {
                                                this.setSuaGia(true);
                                                this.setModalVisible(false);
                                            }
                                            else {
                                                Alert.alert('Thông báo', 'Phiếu trả tự động không được phép chỉnh sửa');
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M7.67549 6.59339C7.59182 6.67705 7.52725 6.77254 7.47087 6.87258L7.43358 6.83529L7.41085 6.99353C7.31991 7.20724 7.28808 7.44187 7.31354 7.67741L6.95068 10.2201L9.49432 9.85727C9.72985 9.88274 9.96448 9.85091 10.1782 9.75997L10.3364 9.73814L10.2991 9.70085C10.3983 9.64447 10.4947 9.5799 10.5783 9.49624L15.1736 4.90096L12.2717 1.99902L7.67549 6.59339Z" fill="#231F20" />
                                                    <Path d="M16.5358 1.42585L15.7446 0.634662C15.1617 0.0517276 14.2559 0.0126227 13.7211 0.546449L12.9963 1.27125L15.8983 4.17319L16.6231 3.44748C17.1578 2.91456 17.1187 2.00879 16.5358 1.42585Z" fill="#231F20" />
                                                    <Path d="M13.6412 8.81768V15.46H1.81883V1.81883H9.96082L11.3459 0.52746C11.4932 0.381045 11.6669 0.32648 11.8506 0.261002C11.8897 0.152782 11.9452 0.0973073 12.0106 0H0V17.2789H15.46V7.20984L13.6412 8.81768Z" fill="#231F20" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Sửa giá</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.cart.auto == 0) {
                                                this.gotoQuantityPage(data?.data?.bill_id, product?.product?.id, product?.product?.order_id, data?.nhap_id, data?.trahang_id)
                                                this.setModalVisible(false);
                                            }
                                            else {
                                                Alert.alert('Thông báo', 'Phiếu trả tự động không được phép chỉnh sửa');
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M7.67549 6.59339C7.59182 6.67705 7.52725 6.77254 7.47087 6.87258L7.43358 6.83529L7.41085 6.99353C7.31991 7.20724 7.28808 7.44187 7.31354 7.67741L6.95068 10.2201L9.49432 9.85727C9.72985 9.88274 9.96448 9.85091 10.1782 9.75997L10.3364 9.73814L10.2991 9.70085C10.3983 9.64447 10.4947 9.5799 10.5783 9.49624L15.1736 4.90096L12.2717 1.99902L7.67549 6.59339Z" fill="#231F20" />
                                                    <Path d="M16.5358 1.42585L15.7446 0.634662C15.1617 0.0517276 14.2559 0.0126227 13.7211 0.546449L12.9963 1.27125L15.8983 4.17319L16.6231 3.44748C17.1578 2.91456 17.1187 2.00879 16.5358 1.42585Z" fill="#231F20" />
                                                    <Path d="M13.6412 8.81768V15.46H1.81883V1.81883H9.96082L11.3459 0.52746C11.4932 0.381045 11.6669 0.32648 11.8506 0.261002C11.8897 0.152782 11.9452 0.0973073 12.0106 0H0V17.2789H15.46V7.20984L13.6412 8.81768Z" fill="#231F20" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Sửa số lượng</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.cart.auto == 0) {
                                                this.deleteItem();
                                            }
                                            else {
                                                Alert.alert('Thông báo', 'Phiếu trả tự động không được phép chỉnh sửa');
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M15.2727 2.90909H10.9091V2.18182C10.9091 1.60316 10.6792 1.04821 10.2701 0.63904C9.86088 0.229869 9.30593 0 8.72727 0L7.27273 0C6.69407 0 6.13912 0.229869 5.72995 0.63904C5.32078 1.04821 5.09091 1.60316 5.09091 2.18182V2.90909H0.727273C0.534388 2.90909 0.349403 2.98571 0.213013 3.1221C0.0766231 3.25849 0 3.44348 0 3.63636C0 3.82925 0.0766231 4.01423 0.213013 4.15062C0.349403 4.28701 0.534388 4.36364 0.727273 4.36364H2.18182V14.5455C2.18182 15.1241 2.41169 15.6791 2.82086 16.0882C3.23003 16.4974 3.78498 16.7273 4.36364 16.7273H11.6364C12.215 16.7273 12.77 16.4974 13.1791 16.0882C13.5883 15.6791 13.8182 15.1241 13.8182 14.5455V4.36364H15.2727C15.4656 4.36364 15.6506 4.28701 15.787 4.15062C15.9234 4.01423 16 3.82925 16 3.63636C16 3.44348 15.9234 3.25849 15.787 3.1221C15.6506 2.98571 15.4656 2.90909 15.2727 2.90909ZM6.54545 2.18182C6.54545 1.98893 6.62208 1.80395 6.75847 1.66756C6.89486 1.53117 7.07984 1.45455 7.27273 1.45455H8.72727C8.92016 1.45455 9.10514 1.53117 9.24153 1.66756C9.37792 1.80395 9.45455 1.98893 9.45455 2.18182V2.90909H6.54545V2.18182ZM5.81818 13.0909C5.81818 13.2838 5.74156 13.4688 5.60517 13.6052C5.46878 13.7416 5.28379 13.8182 5.09091 13.8182C4.89802 13.8182 4.71304 13.7416 4.57665 13.6052C4.44026 13.4688 4.36364 13.2838 4.36364 13.0909V7.27273C4.36364 7.07984 4.44026 6.89486 4.57665 6.75847C4.71304 6.62208 4.89802 6.54545 5.09091 6.54545C5.28379 6.54545 5.46878 6.62208 5.60517 6.75847C5.74156 6.89486 5.81818 7.07984 5.81818 7.27273V13.0909ZM8.72727 13.0909C8.72727 13.2838 8.65065 13.4688 8.51426 13.6052C8.37787 13.7416 8.19288 13.8182 8 13.8182C7.80712 13.8182 7.62213 13.7416 7.48574 13.6052C7.34935 13.4688 7.27273 13.2838 7.27273 13.0909V7.27273C7.27273 7.07984 7.34935 6.89486 7.48574 6.75847C7.62213 6.62208 7.80712 6.54545 8 6.54545C8.19288 6.54545 8.37787 6.62208 8.51426 6.75847C8.65065 6.89486 8.72727 7.07984 8.72727 7.27273V13.0909ZM11.6364 13.0909C11.6364 13.2838 11.5597 13.4688 11.4234 13.6052C11.287 13.7416 11.102 13.8182 10.9091 13.8182C10.7162 13.8182 10.5312 13.7416 10.3948 13.6052C10.2584 13.4688 10.1818 13.2838 10.1818 13.0909V7.27273C10.1818 7.07984 10.2584 6.89486 10.3948 6.75847C10.5312 6.62208 10.7162 6.54545 10.9091 6.54545C11.102 6.54545 11.287 6.62208 11.4234 6.75847C11.5597 6.89486 11.6364 7.07984 11.6364 7.27273V13.0909Z" fill="#333333" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Xóa</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ) : this.props?.nhapFunction ? (
                                    <>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.checkedStatus) {
                                                if (this.props.admin.roles?.includes('nhap_edit') || this.props.admin.is_admin == 1) {
                                                    this.setSuaGia(true);
                                                    this.setModalVisible(false);
                                                }
                                                else {
                                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                                }
                                            }
                                            else {
                                                this.setSuaGia(true);
                                                this.setModalVisible(false);
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M7.67549 6.59339C7.59182 6.67705 7.52725 6.77254 7.47087 6.87258L7.43358 6.83529L7.41085 6.99353C7.31991 7.20724 7.28808 7.44187 7.31354 7.67741L6.95068 10.2201L9.49432 9.85727C9.72985 9.88274 9.96448 9.85091 10.1782 9.75997L10.3364 9.73814L10.2991 9.70085C10.3983 9.64447 10.4947 9.5799 10.5783 9.49624L15.1736 4.90096L12.2717 1.99902L7.67549 6.59339Z" fill="#231F20" />
                                                    <Path d="M16.5358 1.42585L15.7446 0.634662C15.1617 0.0517276 14.2559 0.0126227 13.7211 0.546449L12.9963 1.27125L15.8983 4.17319L16.6231 3.44748C17.1578 2.91456 17.1187 2.00879 16.5358 1.42585Z" fill="#231F20" />
                                                    <Path d="M13.6412 8.81768V15.46H1.81883V1.81883H9.96082L11.3459 0.52746C11.4932 0.381045 11.6669 0.32648 11.8506 0.261002C11.8897 0.152782 11.9452 0.0973073 12.0106 0H0V17.2789H15.46V7.20984L13.6412 8.81768Z" fill="#231F20" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Sửa giá</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.checkedStatus) {
                                                if (this.props.admin.roles?.includes('nhap_edit') || this.props.admin.is_admin == 1) {
                                                    this.gotoQuantityPage(data?.data?.bill_id, product?.product?.id, product?.product?.order_id, data?.nhap_id, data?.trahang_id)
                                                    this.setModalVisible(false);
                                                }
                                                else {
                                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                                }
                                            }
                                            else {
                                                this.gotoQuantityPage(data?.data?.bill_id, product?.product?.id, product?.product?.order_id, data?.nhap_id, data?.trahang_id)
                                                this.setModalVisible(false);
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M7.67549 6.59339C7.59182 6.67705 7.52725 6.77254 7.47087 6.87258L7.43358 6.83529L7.41085 6.99353C7.31991 7.20724 7.28808 7.44187 7.31354 7.67741L6.95068 10.2201L9.49432 9.85727C9.72985 9.88274 9.96448 9.85091 10.1782 9.75997L10.3364 9.73814L10.2991 9.70085C10.3983 9.64447 10.4947 9.5799 10.5783 9.49624L15.1736 4.90096L12.2717 1.99902L7.67549 6.59339Z" fill="#231F20" />
                                                    <Path d="M16.5358 1.42585L15.7446 0.634662C15.1617 0.0517276 14.2559 0.0126227 13.7211 0.546449L12.9963 1.27125L15.8983 4.17319L16.6231 3.44748C17.1578 2.91456 17.1187 2.00879 16.5358 1.42585Z" fill="#231F20" />
                                                    <Path d="M13.6412 8.81768V15.46H1.81883V1.81883H9.96082L11.3459 0.52746C11.4932 0.381045 11.6669 0.32648 11.8506 0.261002C11.8897 0.152782 11.9452 0.0973073 12.0106 0H0V17.2789H15.46V7.20984L13.6412 8.81768Z" fill="#231F20" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Sửa số lượng</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.checkedStatus) {
                                                if (this.props.admin.roles?.includes('nhap_edit') || this.props.admin.is_admin == 1) {
                                                    this.deleteItem();
                                                }
                                                else {
                                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                                }
                                            }
                                            else {
                                                this.deleteItem();
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M15.2727 2.90909H10.9091V2.18182C10.9091 1.60316 10.6792 1.04821 10.2701 0.63904C9.86088 0.229869 9.30593 0 8.72727 0L7.27273 0C6.69407 0 6.13912 0.229869 5.72995 0.63904C5.32078 1.04821 5.09091 1.60316 5.09091 2.18182V2.90909H0.727273C0.534388 2.90909 0.349403 2.98571 0.213013 3.1221C0.0766231 3.25849 0 3.44348 0 3.63636C0 3.82925 0.0766231 4.01423 0.213013 4.15062C0.349403 4.28701 0.534388 4.36364 0.727273 4.36364H2.18182V14.5455C2.18182 15.1241 2.41169 15.6791 2.82086 16.0882C3.23003 16.4974 3.78498 16.7273 4.36364 16.7273H11.6364C12.215 16.7273 12.77 16.4974 13.1791 16.0882C13.5883 15.6791 13.8182 15.1241 13.8182 14.5455V4.36364H15.2727C15.4656 4.36364 15.6506 4.28701 15.787 4.15062C15.9234 4.01423 16 3.82925 16 3.63636C16 3.44348 15.9234 3.25849 15.787 3.1221C15.6506 2.98571 15.4656 2.90909 15.2727 2.90909ZM6.54545 2.18182C6.54545 1.98893 6.62208 1.80395 6.75847 1.66756C6.89486 1.53117 7.07984 1.45455 7.27273 1.45455H8.72727C8.92016 1.45455 9.10514 1.53117 9.24153 1.66756C9.37792 1.80395 9.45455 1.98893 9.45455 2.18182V2.90909H6.54545V2.18182ZM5.81818 13.0909C5.81818 13.2838 5.74156 13.4688 5.60517 13.6052C5.46878 13.7416 5.28379 13.8182 5.09091 13.8182C4.89802 13.8182 4.71304 13.7416 4.57665 13.6052C4.44026 13.4688 4.36364 13.2838 4.36364 13.0909V7.27273C4.36364 7.07984 4.44026 6.89486 4.57665 6.75847C4.71304 6.62208 4.89802 6.54545 5.09091 6.54545C5.28379 6.54545 5.46878 6.62208 5.60517 6.75847C5.74156 6.89486 5.81818 7.07984 5.81818 7.27273V13.0909ZM8.72727 13.0909C8.72727 13.2838 8.65065 13.4688 8.51426 13.6052C8.37787 13.7416 8.19288 13.8182 8 13.8182C7.80712 13.8182 7.62213 13.7416 7.48574 13.6052C7.34935 13.4688 7.27273 13.2838 7.27273 13.0909V7.27273C7.27273 7.07984 7.34935 6.89486 7.48574 6.75847C7.62213 6.62208 7.80712 6.54545 8 6.54545C8.19288 6.54545 8.37787 6.62208 8.51426 6.75847C8.65065 6.89486 8.72727 7.07984 8.72727 7.27273V13.0909ZM11.6364 13.0909C11.6364 13.2838 11.5597 13.4688 11.4234 13.6052C11.287 13.7416 11.102 13.8182 10.9091 13.8182C10.7162 13.8182 10.5312 13.7416 10.3948 13.6052C10.2584 13.4688 10.1818 13.2838 10.1818 13.0909V7.27273C10.1818 7.07984 10.2584 6.89486 10.3948 6.75847C10.5312 6.62208 10.7162 6.54545 10.9091 6.54545C11.102 6.54545 11.287 6.62208 11.4234 6.75847C11.5597 6.89486 11.6364 7.07984 11.6364 7.27273V13.0909Z" fill="#333333" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Xóa</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ) : this.props?.cart?.status != 3 ? (
                                    <>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.admin.roles?.includes('order_change_price') || this.props.admin.is_admin == 1) {
                                                this.setSuaGia(true);
                                                this.setModalVisible(false);
                                            }
                                            else {
                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M7.67549 6.59339C7.59182 6.67705 7.52725 6.77254 7.47087 6.87258L7.43358 6.83529L7.41085 6.99353C7.31991 7.20724 7.28808 7.44187 7.31354 7.67741L6.95068 10.2201L9.49432 9.85727C9.72985 9.88274 9.96448 9.85091 10.1782 9.75997L10.3364 9.73814L10.2991 9.70085C10.3983 9.64447 10.4947 9.5799 10.5783 9.49624L15.1736 4.90096L12.2717 1.99902L7.67549 6.59339Z" fill="#231F20" />
                                                    <Path d="M16.5358 1.42585L15.7446 0.634662C15.1617 0.0517276 14.2559 0.0126227 13.7211 0.546449L12.9963 1.27125L15.8983 4.17319L16.6231 3.44748C17.1578 2.91456 17.1187 2.00879 16.5358 1.42585Z" fill="#231F20" />
                                                    <Path d="M13.6412 8.81768V15.46H1.81883V1.81883H9.96082L11.3459 0.52746C11.4932 0.381045 11.6669 0.32648 11.8506 0.261002C11.8897 0.152782 11.9452 0.0973073 12.0106 0H0V17.2789H15.46V7.20984L13.6412 8.81768Z" fill="#231F20" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Sửa giá</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.admin.roles?.includes('order_change_quantity') || this.props.admin.is_admin == 1) {
                                                this.gotoQuantityPage(data?.data?.bill_id, product?.product?.id, product?.product?.order_id, data?.nhap_id, data?.trahang_id)
                                                this.setModalVisible(false);
                                            }
                                            else {
                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M7.67549 6.59339C7.59182 6.67705 7.52725 6.77254 7.47087 6.87258L7.43358 6.83529L7.41085 6.99353C7.31991 7.20724 7.28808 7.44187 7.31354 7.67741L6.95068 10.2201L9.49432 9.85727C9.72985 9.88274 9.96448 9.85091 10.1782 9.75997L10.3364 9.73814L10.2991 9.70085C10.3983 9.64447 10.4947 9.5799 10.5783 9.49624L15.1736 4.90096L12.2717 1.99902L7.67549 6.59339Z" fill="#231F20" />
                                                    <Path d="M16.5358 1.42585L15.7446 0.634662C15.1617 0.0517276 14.2559 0.0126227 13.7211 0.546449L12.9963 1.27125L15.8983 4.17319L16.6231 3.44748C17.1578 2.91456 17.1187 2.00879 16.5358 1.42585Z" fill="#231F20" />
                                                    <Path d="M13.6412 8.81768V15.46H1.81883V1.81883H9.96082L11.3459 0.52746C11.4932 0.381045 11.6669 0.32648 11.8506 0.261002C11.8897 0.152782 11.9452 0.0973073 12.0106 0H0V17.2789H15.46V7.20984L13.6412 8.81768Z" fill="#231F20" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Sửa số lượng</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (this.props.admin.roles?.includes('order_delete_product') || this.props.admin.is_admin == 1) {
                                                this.deleteItem();
                                            }
                                            else {
                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                            }
                                        }}>
                                            <View style={styles.flexColumn1}>
                                                <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path d="M15.2727 2.90909H10.9091V2.18182C10.9091 1.60316 10.6792 1.04821 10.2701 0.63904C9.86088 0.229869 9.30593 0 8.72727 0L7.27273 0C6.69407 0 6.13912 0.229869 5.72995 0.63904C5.32078 1.04821 5.09091 1.60316 5.09091 2.18182V2.90909H0.727273C0.534388 2.90909 0.349403 2.98571 0.213013 3.1221C0.0766231 3.25849 0 3.44348 0 3.63636C0 3.82925 0.0766231 4.01423 0.213013 4.15062C0.349403 4.28701 0.534388 4.36364 0.727273 4.36364H2.18182V14.5455C2.18182 15.1241 2.41169 15.6791 2.82086 16.0882C3.23003 16.4974 3.78498 16.7273 4.36364 16.7273H11.6364C12.215 16.7273 12.77 16.4974 13.1791 16.0882C13.5883 15.6791 13.8182 15.1241 13.8182 14.5455V4.36364H15.2727C15.4656 4.36364 15.6506 4.28701 15.787 4.15062C15.9234 4.01423 16 3.82925 16 3.63636C16 3.44348 15.9234 3.25849 15.787 3.1221C15.6506 2.98571 15.4656 2.90909 15.2727 2.90909ZM6.54545 2.18182C6.54545 1.98893 6.62208 1.80395 6.75847 1.66756C6.89486 1.53117 7.07984 1.45455 7.27273 1.45455H8.72727C8.92016 1.45455 9.10514 1.53117 9.24153 1.66756C9.37792 1.80395 9.45455 1.98893 9.45455 2.18182V2.90909H6.54545V2.18182ZM5.81818 13.0909C5.81818 13.2838 5.74156 13.4688 5.60517 13.6052C5.46878 13.7416 5.28379 13.8182 5.09091 13.8182C4.89802 13.8182 4.71304 13.7416 4.57665 13.6052C4.44026 13.4688 4.36364 13.2838 4.36364 13.0909V7.27273C4.36364 7.07984 4.44026 6.89486 4.57665 6.75847C4.71304 6.62208 4.89802 6.54545 5.09091 6.54545C5.28379 6.54545 5.46878 6.62208 5.60517 6.75847C5.74156 6.89486 5.81818 7.07984 5.81818 7.27273V13.0909ZM8.72727 13.0909C8.72727 13.2838 8.65065 13.4688 8.51426 13.6052C8.37787 13.7416 8.19288 13.8182 8 13.8182C7.80712 13.8182 7.62213 13.7416 7.48574 13.6052C7.34935 13.4688 7.27273 13.2838 7.27273 13.0909V7.27273C7.27273 7.07984 7.34935 6.89486 7.48574 6.75847C7.62213 6.62208 7.80712 6.54545 8 6.54545C8.19288 6.54545 8.37787 6.62208 8.51426 6.75847C8.65065 6.89486 8.72727 7.07984 8.72727 7.27273V13.0909ZM11.6364 13.0909C11.6364 13.2838 11.5597 13.4688 11.4234 13.6052C11.287 13.7416 11.102 13.8182 10.9091 13.8182C10.7162 13.8182 10.5312 13.7416 10.3948 13.6052C10.2584 13.4688 10.1818 13.2838 10.1818 13.0909V7.27273C10.1818 7.07984 10.2584 6.89486 10.3948 6.75847C10.5312 6.62208 10.7162 6.54545 10.9091 6.54545C11.102 6.54545 11.287 6.62208 11.4234 6.75847C11.5597 6.89486 11.6364 7.07984 11.6364 7.27273V13.0909Z" fill="#333333" />
                                                </Svg>
                                                <Text style={styles.txtVal}>Xóa</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <></>
                                )
                            }
                            <TouchableOpacity onPress={() => {
                                this.gotoProductDetail(product?.product?.id);
                                this.setModalVisible(false);
                            }}>
                                <View style={styles.flexColumn1}>
                                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M8.5 15.9375C6.52745 15.9375 4.6357 15.1539 3.24089 13.7591C1.84609 12.3643 1.0625 10.4725 1.0625 8.5C1.0625 6.52745 1.84609 4.6357 3.24089 3.24089C4.6357 1.84609 6.52745 1.0625 8.5 1.0625C10.4725 1.0625 12.3643 1.84609 13.7591 3.24089C15.1539 4.6357 15.9375 6.52745 15.9375 8.5C15.9375 10.4725 15.1539 12.3643 13.7591 13.7591C12.3643 15.1539 10.4725 15.9375 8.5 15.9375ZM8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 6.24566 16.1045 4.08365 14.5104 2.48959C12.9163 0.895533 10.7543 0 8.5 0C6.24566 0 4.08365 0.895533 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C4.08365 16.1045 6.24566 17 8.5 17Z" fill="black" />
                                        <Path d="M5.58348 6.14762C5.58202 6.18194 5.5876 6.21618 5.59987 6.24826C5.61214 6.28034 5.63085 6.30956 5.65483 6.33415C5.67881 6.35873 5.70757 6.37814 5.73934 6.3912C5.7711 6.40425 5.8052 6.41067 5.83954 6.41006H6.7161C6.86273 6.41006 6.9796 6.29 6.99873 6.14444C7.09435 5.44744 7.57248 4.93956 8.4246 4.93956C9.15348 4.93956 9.82073 5.304 9.82073 6.18056C9.82073 6.85525 9.42335 7.1655 8.79542 7.63725C8.08035 8.15681 7.51404 8.7635 7.55442 9.74844L7.5576 9.979C7.55872 10.0487 7.5872 10.1152 7.63689 10.1641C7.68658 10.213 7.75351 10.2404 7.82323 10.2404H8.68492C8.75536 10.2404 8.82293 10.2124 8.87274 10.1626C8.92255 10.1128 8.95054 10.0452 8.95054 9.97475V9.86319C8.95054 9.10031 9.2406 8.87825 10.0237 8.28431C10.6707 7.79237 11.3454 7.24625 11.3454 6.09981C11.3454 4.49438 9.98967 3.71875 8.50535 3.71875C7.15917 3.71875 5.68442 4.34562 5.58348 6.14762ZM7.23779 12.2708C7.23779 12.8371 7.68935 13.2557 8.31092 13.2557C8.95798 13.2557 9.40317 12.8371 9.40317 12.2708C9.40317 11.6843 8.95692 11.2721 8.30985 11.2721C7.68935 11.2721 7.23779 11.6843 7.23779 12.2708Z" fill="black" />
                                    </Svg>
                                    <Text style={styles.txtVal}>Xem sản phẩm</Text>
                                </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity>
                                <View style={styles.flexColumn1}>
                                    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M8.5 15.9375C6.52745 15.9375 4.6357 15.1539 3.24089 13.7591C1.84609 12.3643 1.0625 10.4725 1.0625 8.5C1.0625 6.52745 1.84609 4.6357 3.24089 3.24089C4.6357 1.84609 6.52745 1.0625 8.5 1.0625C10.4725 1.0625 12.3643 1.84609 13.7591 3.24089C15.1539 4.6357 15.9375 6.52745 15.9375 8.5C15.9375 10.4725 15.1539 12.3643 13.7591 13.7591C12.3643 15.1539 10.4725 15.9375 8.5 15.9375ZM8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 6.24566 16.1045 4.08365 14.5104 2.48959C12.9163 0.895533 10.7543 0 8.5 0C6.24566 0 4.08365 0.895533 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C4.08365 16.1045 6.24566 17 8.5 17Z" fill="black" />
                                        <Path d="M5.58348 6.14762C5.58202 6.18194 5.5876 6.21618 5.59987 6.24826C5.61214 6.28034 5.63085 6.30956 5.65483 6.33415C5.67881 6.35873 5.70757 6.37814 5.73934 6.3912C5.7711 6.40425 5.8052 6.41067 5.83954 6.41006H6.7161C6.86273 6.41006 6.9796 6.29 6.99873 6.14444C7.09435 5.44744 7.57248 4.93956 8.4246 4.93956C9.15348 4.93956 9.82073 5.304 9.82073 6.18056C9.82073 6.85525 9.42335 7.1655 8.79542 7.63725C8.08035 8.15681 7.51404 8.7635 7.55442 9.74844L7.5576 9.979C7.55872 10.0487 7.5872 10.1152 7.63689 10.1641C7.68658 10.213 7.75351 10.2404 7.82323 10.2404H8.68492C8.75536 10.2404 8.82293 10.2124 8.87274 10.1626C8.92255 10.1128 8.95054 10.0452 8.95054 9.97475V9.86319C8.95054 9.10031 9.2406 8.87825 10.0237 8.28431C10.6707 7.79237 11.3454 7.24625 11.3454 6.09981C11.3454 4.49438 9.98967 3.71875 8.50535 3.71875C7.15917 3.71875 5.68442 4.34562 5.58348 6.14762ZM7.23779 12.2708C7.23779 12.8371 7.68935 13.2557 8.31092 13.2557C8.95798 13.2557 9.40317 12.8371 9.40317 12.2708C9.40317 11.6843 8.95692 11.2721 8.30985 11.2721C7.68935 11.2721 7.23779 11.6843 7.23779 12.2708Z" fill="black" />
                                    </Svg>
                                    <Text style={[styles.txtVal]}>Chia sẻ</Text>
                                </View>
                            </TouchableOpacity> */}
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(false)}
                        style={styles.modalBackdrop}
                    ></TouchableOpacity> */}
                </Modal>

                <Modal visible={suaGia} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Sửa giá</Text>
                            <TextInput
                                style={styles.inputSL}
                                keyboardType="numeric"
                                value={updatePrice}
                                onChangeText={this.handlePriceChange(this.setUpdatePrice)}
                            />
                            <View style={styles.btnGroupConfirm}>
                                <TouchableOpacity style={styles.closeButton} onPress={() => this.setSuaGia(false)}>
                                    <Text style={styles.txtConfirm}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleUpdate(data?.data?.bill_id, product?.product?.order_id)}>
                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setSuaGia(false)}
                        style={styles.modalBackdrop}
                    />
                </Modal>

                <Modal visible={isModalVisible3} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalContent}>
                            <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                            <View style={styles.btnGroupConfirm}>
                                <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible3(false)}>
                                    <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.btnConfirmDelete(data?.data?.bill_id, product?.product?.order_id)}>
                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible3(false)}
                        style={styles.modalBackdrop}
                    />
                </Modal>
            </View>
        );
    };
}


const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart,
    color: state.color,
    size: state.size,
    customer: state.customer,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    cartAction: (act, data) => dispatch(cartAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

