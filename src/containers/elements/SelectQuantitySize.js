/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { fromHsv } from 'react-native-color-picker';
import CheckBox from './CheckBoxComponent';
import ModalChonMau from './ModalChonMau';
import { get_all_color, add_color } from '../../services/colorService';
import { connect } from 'react-redux';
import productAction from '../../actions/productAction';
// import type {Node} from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
import styles from '../products/styles';
import quantity from '../products/quantity';


class SelectQuantitySize extends Component {

    // const navigation = useNavigation();

    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            isModalVisible: false,
            quantityNumber: '',
            quantityOnServer: 0,
            checkList: false,
            defaultDisplay: 0,
            totalBuy: 0,
            oldTotalBuy: 0,
            quantityDefaults: 0,
            oldQuantityDefaults: 0,
        };
    }

    componentDidMount() {
        this.setState({ oldQuantityDefaults: this.props.totle_buy })
        this.setListQuantity();
    }

    componentDidUpdate(prevProps) {

        // var updateList = [];
        if (this.props.quantityForAllTemp) {
            if (this.props.inventory) {
                this.setState({
                    totalBuy: this.props.quantityForAll
                }, () => {
                    const updateList = this.props.list_quantity.map((item) => {
                        if (item?.color_id === this.props.idColor) {
                            return { ...item, totle_buy: this.props.quantityForAll };
                        }
                        return item;
                    })
                    // this.props.productAction('update_quantity', updateList);
                    this.props?.updateListQuantityAll(updateList)
                });
            }
            else if (this.props.nhapTra) {
                this.setState({
                    quantity: this.props.quantityForAll
                    // this.props.productAction('update_quantity', updateList);
                });
                const updateList = this.props.list_quantity.map((item) => {
                    if (item?.color_id === this.props.idColor) {
                        return { ...item, quantity: this.props.quantityForAll };
                    }
                    return item;
                })
                this.props?.updateListQuantityAll(updateList)
            }
            else if (this.props.chonSl) {
                this.setState({
                    quantity: this.props.quantityForAll,
                    quantityOnServer: Number(this.state.quantityOnServer) - Number(this.props.quantityForAll) + Number(this.state.quantity)
                });
                const updateList = this.props.list_quantity.map((item) => {
                    if (item?.color_id === this.props.idColor) {
                        return { ...item, quantity: this.props.quantityForAll };
                    }
                    return item;
                })
                this.props?.updateListQuantityAll(updateList)
            }
            // else if(this.props.disable){
            //     console.log(1);
            //     this.props?.updateListQuantityAll(this.props.list_quantity);
            // }
            else {
                this.setState({
                    quantity: this.props.quantityForAll
                    // this.props.productAction('update_quantity', updateList);
                });
                const updateList = this.props.list_quantity.map((item) => {
                    if (item?.color_id === this.props.idColor) {
                        return { ...item, quantity: this.props.quantityForAll };
                    }
                    return item;
                })
                this.props?.updateListQuantityAll(updateList)
            }
            this.props.setQuantityForAllTemp(false);
        }

    }

    setDefaultDisplay = (opt) => {
        this.setState({ defaultDisplay: opt });
    }

    setQuantity = (opt, callback = () => { }) => {
        this.setState({ quantity: opt }, callback);
    }

    setIsModalVisible = (opt) => {
        this.setState({ isModalVisible: opt });
    }

    setQuantityNumber = (opt, callback = () => { }) => {
        this.setState({ quantityNumber: opt }, callback);
    }

    setQuantityOnServer = (opt, callback = () => { }) => {
        this.setState({ quantityOnServer: opt }, callback);
    }

    setCheckList = (opt) => {
        this.setState({ checkList: opt });
    }

    setTotalBuy = (opt) => {
        this.setState({ totalBuy: opt });
    }

    setTotalQuantity = () => {

        if (this.props.inventory === true) {
            this.setTotalBuy(parseFloat(this.state.quantityNumber));
            this.setIsModalVisible(false);
            const updateList = this.props.list_quantity.map((item) => {
                if (item?.color_id === this.props.idColor && item?.size_id === this.props.idSize) {
                    return { ...item, totle_buy: this.state.quantityNumber, old_total_buy: this.state.oldTotalBuy };
                }
                return item;
            })
            this.props?.updateListQuantityAll(updateList);
        }
        else {
            this.setQuantity(parseFloat(this.state.quantityNumber));
            this.setIsModalVisible(false);
            // return true;
            // console.log({ color_id: this.props.idColor, size_id: this.props.idSize, quantity: this.state.quantity});
            // console.log('lsqunati', this.props.product.list_quantity);
            const updateList = this.props.list_quantity.map((item) => {
                if (item?.color_id === this.props.idColor && item?.size_id === this.props.idSize) {
                    return { ...item, quantity: this.state.quantityNumber };
                }
                return item;
            })
            this.props?.updateListQuantityAll(updateList);
            // console.log('updataReducer', updateList);
        }

        this.setQuantityNumber('');

    };

    setListQuantity() {
        this.props?.list_quantity?.map((item, index) => {
            if (this.props.chonSl) {
                // console.log(this.props.chonSl);
                // console.log(item?.totle_buy);
                if (item?.color_id === this.props?.idColor && item?.size_id === this.props?.idSize) {
                    this.setQuantityOnServer(Number(item?.totle_buy));
                    this.setState({ quantityDefaults: item?.quantity })
                    item.quantity = 0;
                    item.id = this.props?.product?.id;
                }
            }
            else if (this.props.disable) {
                return true;
            }
            else {
                if (item?.color_id === this.props?.idColor && item?.size_id === this.props?.idSize) {
                    this.setQuantityOnServer(item?.quantity);
                    this.setState({ quantityDefaults: item?.quantity })
                    item.quantity = 0;
                    item.id = this.props?.product?.id;
                }
                if (this?.props?.list_quantity?.length !== 0) {
                    this.setCheckList(true);
                }
            }
        })
        // this.setQuantity(this.props.quantityForAll);
    }

    handleAddQuantity = () => {
        // console.log(this.props.list_quantity);
        this.setQuantityOnServer((Number(this.state?.quantityOnServer) - 1).toString());
        this.setState({ quantity: (Number(this.state.quantity) + 1).toString() }, () => {
            // var updateList = [];
            const updateList = this.props.list_quantity.map((item) => {
                if (item?.color_id === this.props.idColor && item?.size_id === this.props.idSize) {
                    return { ...item, quantity: this.state.quantity };
                }
                return item;
            })
            this.props?.updateListQuantityAll(updateList);
        });
    }

    handleRemoveQuantity = () => {
        if (this.state.quantity > 0) {
            this.setState({ quantity: (Number(this.state.quantity) - 1).toString() }, () => {
                // var updateList = [];
                const updateList = this.props.list_quantity.map((item) => {
                    if (item?.color_id === this.props.idColor && item?.size_id === this.props.idSize) {
                        return { ...item, quantity: this.state.quantity };
                    }
                    return item;
                })
                this.props?.updateListQuantityAll(updateList);
            });
            this.setQuantityOnServer((Number(this.state?.quantityOnServer) + 1).toString());
        }
    }

    handleRemoveTotalBuy = () => {
        // console.log(this.state.oldQuantityDefaults);
        if (this.state.totalBuy > 0) {
            this.setState({ totalBuy: (Number(this.state.totalBuy) - 1).toString() }, () => {
                const updateList = this.props?.list_quantity.map((item) => {
                    if (item?.color_id === this.props.idColor && item?.size_id === this.props.idSize) {
                        return { ...item, totle_buy: this.state.totalBuy, old_total_buy: this.state.oldQuantityDefaults };
                    }
                    return item;
                })
                this.props?.updateListQuantityAll(updateList);
            });
        }
    }

    getQuantity() {
        const quantityItem = this.props?.list_quantity.find(item =>
            item?.color_id === this.props?.idColor && item?.size_id === this.props?.idSize
        );
        // console.log('aaaa',quantityItem);
        return quantityItem ? quantityItem.quantity : 0;
    }

    getTotalBuyFirst() {
        const quantityItem = this.props?.list_quantity.find(item =>
            item?.color_id === this.props?.idColor && item?.size_id === this.props?.idSize
        );
        return quantityItem ? quantityItem.totle_buy : 0;
    }

    getTotalBuy() {
        const quantityItem = this.props?.list_quantity.find(item =>
            item?.color_id === this.props?.idColor && item?.size_id === this.props?.idSize
        );

        if (quantityItem) {
            if (this.state.totalBuy !== quantityItem.totle_buy) {
                this.setState({ totalBuy: quantityItem.totle_buy });
                this.setState({ oldTotalBuy: quantityItem.totle_buy })
            }
            return quantityItem.totle_buy;
        } else {
            if (this.state.totalBuy !== 0) {
                this.setState({ totalBuy: 0 });
            }
            return 0;
        };
    }


    handleAddNhapTra = () => {
        this.setState({ quantity: (Number(this.state.quantity) + 1).toString() }, () => {
            const updateList = this.props?.list_quantity.map((item) => {
                if (item?.color_id === this.props.idColor && item?.size_id === this.props.idSize) {
                    return { ...item, quantity: this.state.quantity };
                }
                return item;
            })
            this.props?.updateListQuantityAll(updateList);
        });
    }

    handleRemoveNhapTra = () => {
        if (this.state.quantity > 0) {
            this.setState({ quantity: (Number(this.state.quantity) - 1).toString() }, () => {
                const updateList = this.props?.list_quantity.map((item) => {
                    if (item?.color_id === this.props.idColor && item?.size_id === this.props.idSize) {
                        return { ...item, quantity: this.state.quantity };
                    }
                    return item;
                })
                this.props?.updateListQuantityAll(updateList);
            });
        }
    }

    // getQuantity() {
    //     const quantityItem = this.props?.product?.list_quantity?.find(item =>
    //         item?.color_id === this.props?.idColor && item?.size_id === this.props?.idSize
    //     );

    //     if (quantityItem) {
    //         if (this.state.defaultDisplay !== quantityItem.quantity) {
    //             this.setState({ defaultDisplay: quantityItem.quantity });
    //         }
    //         return quantityItem.quantity;
    //     } else {
    //         if (this.state.defaultDisplay !== 0) {
    //             this.setState({ defaultDisplay: 0 });
    //         }
    //         return 0;
    //     }
    // }



    render() {
        const { quantity, isModalVisible, quantityNumber, quantityOnServer, checkList, defaultDisplay, totalBuy } = this.state;
        return (
            <View style={styles.flexColum}>
                <TouchableOpacity onPress={() => {
                    this.props?.disable ? () => { } :
                        this.props?.inventory ? this.handleRemoveTotalBuy() :
                            this.props?.nhapTra ? this.handleRemoveNhapTra() :
                                this.props?.addProduct ? this.handleRemoveQuantity() :
                                    this.props?.chonSl ? this.handleRemoveQuantity() :
                                        checkList ? this.handleRemoveQuantity() :
                                            () => { };
                }}>
                    <Text style={styles.quantity}>{
                        this.props?.disable ? `${this.getTotalBuy()}(${this.getQuantity()})` :
                            this.props?.inventory ? `${this.getTotalBuy()}(${this.getQuantity()})` :
                                `${quantity}`
                    }</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onLongPress={() => {
                        this.props?.disable ? () => { } :
                            this.setIsModalVisible(true)
                    }}
                    onPress={() => {
                        this.props?.disable ? () => { } :
                            this.props?.inventory ? this.setIsModalVisible(true) :
                                this.props?.nhapTra ? this.handleAddNhapTra() :
                                    this.props?.addProduct ? this.setIsModalVisible(true) :
                                        this.props?.chonSl ? this.handleAddQuantity() :
                                            checkList ? this.handleAddQuantity() : this.setIsModalVisible(true);
                    }}>
                    <Text style={styles.size}>{this.props?.sizeName}{
                        this.props.disable || this.props?.inventory ? "" :
                            this.props?.addProduct ? "" :
                                this.props?.chonSl ? `(${quantityOnServer})` :
                                    checkList ? `(${quantityOnServer})` :
                                        ''}</Text>
                </TouchableOpacity>
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
                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.setTotalQuantity()}>
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

        )
    }
};

const mapStateToProps = state => ({
    product: state.product,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectQuantitySize)
