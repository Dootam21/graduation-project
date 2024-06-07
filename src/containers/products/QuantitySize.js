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
                u_id: 0,
                bill_id: this.props.cart.bill_id,
                order_id: this.props.cart.order_id,
                product_id: this.props.product.id
            },
            quantity: 0,
            totle_quantity: 0,
            isModalVisible: false,
            quantityNumber: '',
        }
        // console.log(this.props.totle_quantity);

    }
    componentDidMount() {
        this.setQuantity(this.props?.quantity);
        // this.setTotalQuantity(Number(this.props?.totle_quantity) - Number(this.props?.quantity));
        this.setTotalQuantity(Number(this.props?.totle_quantity));
    }

    componentDidUpdate() {
        if (this.props.quantityForAllTemp) {
            this.setState({
                ...this.state,
                quantity: this.props.quantityForAll,
                totle_quantity: Number(this.props.totle_quantity) - Number(this.props.quantityForAll) + Number(this.props.quantity)
            }, () => {
                this.handleSubmit();
            });
            this.props.setQuantityForAllTemp(false);
        }
    }

    setQuantity(opt, callback = () => { }) {
        this.setState({ quantity: opt }, callback);
    }

    setTotalQuantity(opt, callback = () => { }) {
        this.setState({ totle_quantity: opt }, callback);
    }

    setIsModalVisible = (opt) => {
        this.setState({ isModalVisible: opt });
    }

    setQuantityNumber = (opt, callback = () => { }) => {
        this.setState({ quantityNumber: opt }, callback);
    }

    getTitleSize(id) {
        const title = this.props.size?.listAllSize?.filter((size) => size?.id === id);
        return title[0];

    }

    getTitleColor(id) {
        const title = this.props.color?.listAllColor?.filter((color) => color?.id === id);
        return title[0];
    }

    increaseQuantity = () => {
        // this.setQuantity(Number(this.state.quantity) + 1, this.handleSubmit());
        // this.setTotalQuantity(this.state.totle_quantity - 1, this.handleSubmit());
        if (this.props?.nhapTra) {
            this.setState({ quantity: Number(this.state.quantity) + 1 }, () => {
                this.handleSubmit();
            })
        }
        else {
            this.setState({ quantity: Number(this.state.quantity) + 1 }, () => {
                this.handleSubmit();
            })

            this.setState({ totle_quantity: Number(this.state.totle_quantity) - 1 }, () => {
                this.handleSubmit();
            })
        }
    };

    decreaseQuantity = () => {
        if (this.state.quantity > 0) {
            if (this.props?.nhapTra) {
                this.setState({ quantity: Number(this.state.quantity) - 1 }, () => {
                    this.handleSubmit();
                })
            }
            else {
                this.setState({ quantity: Number(this.state.quantity) - 1 }, () => {
                    this.handleSubmit();
                })

                this.setState({ totle_quantity: Number(this.state.totle_quantity) + 1 }, () => {
                    this.handleSubmit();
                })
            }
        }
    };

    setMultiQuantity = () => {
        if (this.props?.nhapTra) {
            this.setState({ quantity: Number(this.state.quantityNumber) }, () => {
                this.handleSubmit();
            })
        }
        else {
            this.setState({ quantity: Number(this.state.quantityNumber) }, () => {
                this.handleSubmit();
            })

            this.setState({ totle_quantity: Number(this.state.totle_quantity) + Number(this.state.quantity) - Number(this.state.quantityNumber) }, () => {
                this.handleSubmit();
            })
        }
        this.setQuantityNumber('');
        this.setIsModalVisible(false);
    }

    handleSubmit() {
        const updateList = this.props?.list_quantity_update?.map((item) => {
            if (item?.color_id === this.props.idColor && item?.size_id === this.props.idSize) {
                return { ...item, quantity: this.state.quantity, totle_quantity: this.state.totle_quantity };
            }
            return item;
        })
        // console.log(updateList);
        this.props.setListQuantity(updateList);
        this.props.setChangingQuantity(true);
        // this.props.productAction('update_quantity', updateList);
    };



    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { isModalVisible, quantityNumber } = this.state;
        return (

            <View style={[styles.flexBox, styles.flexBox1]}>
                <View style={styles.flexColum}>
                    <TouchableOpacity onPress={() => this.decreaseQuantity()}>
                        <Text style={styles.quantity}>{this.state.quantity}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onLongPress={() => this.setIsModalVisible(true)} onPress={() => this.increaseQuantity()}>
                        <Text style={styles.size}>{this.props?.sizeName} ({this.state.totle_quantity})</Text>
                    </TouchableOpacity>
                </View>


                <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Nhập số lượng</Text>
                            <TextInput
                                style={styles.inputSL}
                                keyboardType="numeric"
                                value={quantityNumber}
                                onChangeText={(text) => this.setQuantityNumber(text)}
                            />
                            <View style={styles.btnGroupConfirm}>
                                <TouchableOpacity style={styles.closeButton} onPress={() => this.setIsModalVisible(false)}>
                                    <Text style={styles.txtConfirm}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.setMultiQuantity()}>
                                    <Text style={styles.txtConfirm}>Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setIsModalVisible(false)}
                        style={styles.modalBackdrop}
                    />
                </Modal>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuantityColor)