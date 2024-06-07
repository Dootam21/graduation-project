/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Footer from '../elements/Footer';
import Header from '../elements/Header';
import { connect } from 'react-redux';
import productAction from '../../actions/productAction';
import CartComponent from '../cart/CartComponent';

// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import { change_status_tra, get_order_list_tra, get_tra_detail } from '../../services/productService';
import { Path, Svg } from 'react-native-svg';
import customerAction from '../../actions/customerAction';
import supplierAction from '../../actions/supplierAction';


class ChiTietPhieuTraXuong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataOrder: {},
            data: {},
            status: '',
            modalConfirm: false,
            ghi_chu: '',
            phuthu: '',
            phuchi: '',

        }
    }
    componentDidMount() {
        this.getData();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.getData();
            }
        );
    }

    setPhuThu = (opt) => {
        this.setState({ phuthu: opt })
    }

    setPhuChi = (opt) => {
        this.setState({ phuchi: opt })
    }

    setModalConfirm(opt) {
        this.setState({ modalConfirm: opt });
    }

    async getData() {
        // console.log('product nhap', this.props.product.nhap_id);

        const dataLog = await get_tra_detail({
            u_id: this.props.admin.uid,
            trahang_id: this.props.product.tra_id,
            thuchi_id: this.props.product.chi_id,
            type: 2,
        })

        const data = await get_order_list_tra({
            u_id: this.props.admin.uid,
            trahang_id: this.props.product.tra_id,
            type: 2,
        });

        this.setState({ data: dataLog })
        this.setState({ status: data.status });
        this.setState({ phuchi: dataLog.phuchi });
        this.setState({ phuthu: dataLog.phuthu });
        this.setState({ ghi_chu: dataLog?.ghi_chu });

        this.setState({ dataOrder: data });

        const newColorList = this.props.color.listAllColor?.filter(color =>
            this.state.dataOrder?.order_list?.map((order) => {
                order?.list_quantity?.some(quantity => quantity.color_id === color.id);
            })
        );
        this.setState({ colorList: newColorList });
    }

    async handleConfirm() {
        const dataLog = await change_status_tra({
            u_id: this.props.admin.uid,
            phuchi: this.state?.phuchi ? this.state?.phuchi?.replace(/,/g, '') : "",
            phuthu: this.state?.phuthu ? this.state?.phuthu?.replace(/,/g, '') : "",
            ghi_chu: this.state?.ghi_chu ? this.state.ghi_chu : "",
            status: Number(this.state.status) + 1,
            trahang_id: this.props.product.tra_id,
        })
        this.setModalConfirm(false);
        this.props.navigation.goBack();
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

    gotoEditQuantity() {
        this.props.navigation.navigate('Quantity');
    }

    render() {
        const { dataOrder, ghi_chu, phuchi, phuthu, data, status, modalConfirm } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => {
                                this.props?.customerAction('current_customer_id', 0);
                                this.props?.supplierAction('current_supplier_id', 0);
                                this.props.navigation.goBack()
                            }}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerCenter}>
                            <Text style={styles.titletao}>Chi tiết phiếu trả xưởng</Text>
                        </View>

                        <View style={styles.headerRight}>
                        </View>
                    </View >
                    <ScrollView style={{ backgroundColor: "#fff", zIndex: 1 }}>

                        {
                            dataOrder?.order_list?.map((product, index) => (
                                <CartComponent
                                    key={index}
                                    productItem={product}
                                    data={dataOrder}
                                    reloadData={() => this.getData()}
                                    gotoQuantity={() => this.gotoEditQuantity()}
                                    traxuong={true}
                                    disableFunction={status == 2}
                                    goBack={() => this.props.navigation.pop()}
                                // gotoProductDetails={() => this.gotoProductDetails()}
                                >
                                </CartComponent>
                            ))
                        }


                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
                    </ScrollView>


                    <View style={styles.groupA}>
                        <View style={[styles.flexRow, styles.item2]}>
                            <View style={[styles.w50, styles.text1]}>
                                <Text style={styles.text2}>Số lượng: {data?.l_sp}/{data?.sl_sp} </Text>
                                <Text style={styles.text2}>Tiền hàng: {data?.totle_money}</Text>
                            </View>
                            <TextInput
                                style={[styles.w50, styles.text, styles.input1]}
                                multiline={true}
                                numberOfLines={2} placeholder='Ghi chú...'
                                value={ghi_chu}
                                onChangeText={(text) => this.setState({ ghi_chu: text })}

                            ></TextInput>
                        </View>
                        <View style={[styles.flexRow, styles.item3]}>
                            <View style={[styles.w50, styles.flexRow]}>
                                <Text style={[styles.w50, styles.text1]}>Phụ thu</Text>
                                {
                                    status == 2 ? (
                                        <Text style={[styles.w50, styles.input2]}>{data?.phuthu}</Text>
                                    ) :
                                        (
                                            <TextInput
                                                style={[styles.w50, styles.input2]}
                                                keyboardType="numeric"
                                                placeholder='Phụ chi...'
                                                value={phuthu}
                                                onChangeText={this.handlePriceChange(this.setPhuThu)}
                                            ></TextInput>
                                        )
                                }
                            </View>
                            <View style={[styles.w50, styles.flexRow]}>
                                <Text style={[styles.w50, styles.text1]}>Phụ chi</Text>
                                {
                                    status == 2 ? (
                                        <Text style={[styles.w50, styles.input2]}>{data?.phuchi}</Text>
                                    ) : (
                                        <TextInput
                                            style={[styles.w50, styles.input2]}
                                            keyboardType="numeric"
                                            placeholder='Phụ chi...'
                                            value={phuchi}
                                            onChangeText={this.handlePriceChange(this.setPhuChi)}
                                        ></TextInput>
                                    )
                                }
                            </View>
                        </View>
                        {
                            status == 2 ? (
                                <></>
                            ) : (
                                <>
                                    <TouchableOpacity onPress={() => {
                                        if (status == 0) {
                                            if (this.props.admin.roles?.includes('trahang_xuong_confirm') || this.props.admin.is_admin == 1) {
                                                this.setModalConfirm(true);
                                            }
                                            else {
                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                            }
                                        }
                                        else if (status == 1) {
                                            if (this.props.admin.roles?.includes('trahang_xuong_confirm_success') || this.props.admin.is_admin == 1) {
                                                this.setModalConfirm(true);
                                            }
                                            else {
                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                            }
                                        }
                                    }}>
                                        <Text style={styles.btnB}>Xác nhận phiếu trả hàng</Text>
                                    </TouchableOpacity>
                                    {/* ) : (
                                            <></>
                                        )
                                    } */}
                                    <Modal visible={modalConfirm} animationType="slide" transparent={true}>
                                        <View style={styles.modalContainer2}>
                                            <View style={styles.modalContent}>
                                                <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ</Text>
                                                <View style={styles.btnGroupConfirm}>
                                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalConfirm(false)}>
                                                        <Text style={[styles.txtConfirm, styles.cancel]}>Hủy</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.handleConfirm()}>
                                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalConfirm(false)}
                                            style={styles.modalBackdrop}
                                        />
                                    </Modal></>
                            )
                        }
                    </View>

                    <Footer />
                </View >

            </SafeAreaView >
        );
    };
};

const mapStateToProps = state => ({
    product: state.product,
    color: state.color,
    customer: state.customer,
    supplier: state.supplier,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    customerAction: (act, data) => dispatch(customerAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietPhieuTraXuong)
