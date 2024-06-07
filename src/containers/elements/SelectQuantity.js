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
import colorAction from '../../actions/colorAction';
import SelectQuantitySize from './SelectQuantitySize';

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


class SelectQuantity extends Component {

    // const navigation = useNavigation();

    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            index: 0,
            // colorNameList: [],
            modalSetSizeAll: false,
            quantityForAll: 0,
            quantityInput: '',
            quantityForAllTemp: false,
        };
    }

    // componentDidMount() {
    //     this.getColorName();
    // }

    // setColorNameList = (opt) => {
    //     this.setState({ colorNameList: opt });
    // }

    // getColorName() {
    //     console.log(this.props.color.);
    // }

    setModalSetSizeAll = (opt) => {
        this.setState({ modalSetSizeAll: opt });
    }
    setQuantityInput = (opt) => {
        this.setState({ quantityInput: opt });
    }
    setQuantityForAllTemp = (opt) => {
        this.setState({ quantityForAllTemp: opt });
    }

    setQuantityAll() {
        // console.log(this.props.list_quantity);
        this.setModalSetSizeAll(false);
        this.setQuantityForAllTemp(true);
        this.setQuantityInput('');
        this.setState({ quantityForAll: this.state.quantityInput });
        if (this.props.inventory) {
            const updateList = this.props?.list_quantity?.map((item) => {
                if (item?.color_id === this.props.idColor) {
                    return { ...item, totle_buy: this.state.quantityInput, old_total_buy: item.totle_buy };
                }
                return item;
            });
            this.props.setListQuantity(updateList);
        }
    }
    render() {
        const { modalSetSizeAll, quantityForAll, quantityInput, newListQuantity, quantityForAllTemp } = this.state;
        return (
            <View>
                <View style={[styles.flexBox, styles.flexBox2]}>
                    <View style={[styles.flexRow]}>
                        <Text style={styles.boxTitle}>{this.props?.colorName}
                            {
                                this.props?.chonSl && `(${this.props?.sumQuantity})`
                            }
                        </Text>
                        <Text style={{ backgroundColor: `${this.props?.colorContent}`, width: 22, height: 22, borderRadius: 6, marginRight: 10 }}></Text>
                        {this.props.disable !== true &&
                            (
                                <View>
                                    <TouchableOpacity onPress={() => this.setModalSetSizeAll(true)}>
                                        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M11 0C4.92422 0 0 4.92422 0 11C0 17.0758 4.92422 22 11 22C17.0758 22 22 17.0758 22 11C22 4.92422 17.0758 0 11 0ZM15.125 12.0312H12.0312V15.125C12.0312 15.6922 11.5672 16.1562 11.0387 16.1562C10.4328 16.1562 9.96875 15.6922 9.96875 15.125V12.0312H6.875C6.30781 12.0312 5.84375 11.5672 5.84375 11C5.84375 10.4328 6.30781 9.96875 6.875 9.96875H9.96875V6.875C9.96875 6.30781 10.4328 5.84375 11 5.84375C11.5672 5.84375 12.0312 6.30781 12.0312 6.875V9.96875H15.125C15.6922 9.96875 16.1562 10.4328 16.1562 11C16.1562 11.5672 15.6922 12.0312 15.125 12.0312Z" fill="#2DCC6F" />
                                        </Svg>
                                    </TouchableOpacity>
                                    <Modal visible={modalSetSizeAll} animationType="slide" transparent={true}>
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
                                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalSetSizeAll(false)}>
                                                        <Text style={styles.txtConfirm}>Hủy</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.setQuantityAll()}>
                                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalSetSizeAll(false)}
                                            style={styles.modalBackdrop}
                                        />
                                    </Modal>
                                </View>
                            )
                        }
                    </View>
                </View>
                <ScrollView horizontal={true}>
                    <View style={[styles.flexBox, styles.flexBox1]}>
                        {
                            this.props.list_quantity?.map((obj, index) => {
                                var newColor = obj.color_id;
                                // console.log('ccccc',this.props.list_quantity);
                                return this.props.idColor === newColor &&
                                    (
                                        <SelectQuantitySize
                                            key={index}
                                            sizeName={this.props.size?.listSizeObj[obj.size_id]?.title}
                                            idSize={obj.size_id}
                                            idColor={this.props.idColor}
                                            disable={this.props.disable}
                                            list_quantity={this.props.list_quantity}
                                            quantity={obj.quantity}
                                            totle_buy={obj.totle_buy}
                                            quantityForAll={quantityForAll}
                                            setQuantityAll={() => this.setQuantityAll()}
                                            quantityForAllTemp={quantityForAllTemp}
                                            setQuantityForAllTemp={(opt) => this.setQuantityForAllTemp(opt)}
                                            inventory={this.props.inventory}
                                            nhapTra={this.props?.nhapTra}
                                            addProduct={this.props.addProduct}
                                            updateListQuantityAll={(opt) => this.props.setListQuantity(opt)}
                                            chonSl={this.props.chonSl}
                                        />
                                    )
                            })
                        }

                    </View>
                </ScrollView>
            </View>
        )
    }
};

const mapStateToProps = state => ({
    product: state.product,
    color: state.color,
    size: state.size,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    colorAction: (act, data) => dispatch(colorAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectQuantity)
