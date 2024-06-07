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
import QuantitySize from './QuantitySize';

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
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class QuantityColor extends Component {
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
                product_id: this.props.product.id
            },
            quantity: 0,
            totle_quantity: 0,
            quantityForAll: 0,
            quantityInput: '',
            quantityForAllTemp: false,
        }
        // console.log('ls quan', this.props.colorData)
    }

    getTitleSize(id) {
        const title = this.props.size?.listAllSize?.filter((size) => size?.id === id);
        return title[0];

    }

    getTitleColor(id) {
        const title = this.props.color?.listAllColor?.filter((color) => color?.id === id);
        return title[0];
    }

    setModalVisible = (opt) => {
        this.setState({ isModalVisible: opt });
    }
    setQuantityInput = (opt) => {
        this.setState({ quantityInput: opt });
    }

    setQuantityForAllTemp = (opt) => {
        this.setState({ quantityForAllTemp: opt });
    }

    setQuantityAll() {
        this.setModalVisible(false);
        this.setState({ quantityForAll: this.state.quantityInput });
        this.setQuantityForAllTemp(true);
        this.setState({ quantityInput: '' });
        const updateList = this.props?.list_quantity_update?.map((item) => {
            if (item?.color_id === this.props.colorId) {
                return { ...item, quantity: this.state.quantityInput };
            }
            return item;
        });
        this.props.setListQuantity(updateList);
        // console.log(updateList);
    }

    getTotal() {

    }


    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const color = this.props?.colorObject;
        const { isModalVisible, quantityInput, quantityForAll, quantityForAllTemp } = this.state;
        return (
            <View >
                <View style={[styles.flexBox, styles.flexBox2]}>
                    <View style={[styles.flexRow]}>
                        <Text style={styles.boxTitle}>{color?.title} ({this.props.sumQuantity})</Text>
                        <Text style={{ backgroundColor: `${color?.content}`, width: 22, height: 22, borderRadius: 6, marginRight: 10 }}></Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.setModalVisible(true);
                        this.setState({ quantityForAllTemp: 0 })
                    }}>
                        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M11 0C4.92422 0 0 4.92422 0 11C0 17.0758 4.92422 22 11 22C17.0758 22 22 17.0758 22 11C22 4.92422 17.0758 0 11 0ZM15.125 12.0312H12.0312V15.125C12.0312 15.6922 11.5672 16.1562 11.0387 16.1562C10.4328 16.1562 9.96875 15.6922 9.96875 15.125V12.0312H6.875C6.30781 12.0312 5.84375 11.5672 5.84375 11C5.84375 10.4328 6.30781 9.96875 6.875 9.96875H9.96875V6.875C9.96875 6.30781 10.4328 5.84375 11 5.84375C11.5672 5.84375 12.0312 6.30781 12.0312 6.875V9.96875H15.125C15.6922 9.96875 16.1562 10.4328 16.1562 11C16.1562 11.5672 15.6922 12.0312 15.125 12.0312Z" fill="#2DCC6F" />
                        </Svg>
                    </TouchableOpacity>
                    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Nhập số lượng</Text>
                                <TextInput
                                    style={styles.inputSL}
                                    keyboardType="numeric"
                                    value={quantityInput}
                                    onChangeText={(text) => this.setQuantityInput(text)}
                                />
                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => {
                                        this.setModalVisible(false);
                                        this.setState({ quantityInput: '' });
                                        this.setState({ quantityForAllTemp: 0 })
                                    }}>
                                        <Text style={styles.txtConfirm}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.setQuantityAll()}>
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
                <ScrollView horizontal={true}>
                    {
                        this.props?.sizeData?.map((item, i) => {
                            var newColor = item.color_id;
                            // console.log(item);
                            var size = this.getTitleSize(item.size_id);
                            return color?.id === newColor ? (
                                <QuantitySize
                                    key={i}
                                    idColor={item.color_id}
                                    idSize={item.size_id}
                                    color={color} quantity={item?.quantity}
                                    totle_quantity={item?.totle_quantity}
                                    sizeName={size?.title}
                                    list_quantity={this.props?.list_quantity}
                                    quantityForAll={quantityForAll}
                                    quantityForAllTemp={quantityForAllTemp}
                                    setQuantityForAllTemp={(opt) => this.setQuantityForAllTemp(opt)}
                                    setQuantityAll={() => this.setQuantityAll()}
                                    nhapTra={this.props?.nhapTra}
                                    setListQuantity={(opt) => this.props.setListQuantity(opt)}
                                    list_quantity_update={this.props.list_quantity_update}
                                    setChangingQuantity={(opt) => this.props.setChangingQuantity(opt)}
                                />
                            ) : ''
                        })
                    }
                </ScrollView>

            </View>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(QuantityColor)