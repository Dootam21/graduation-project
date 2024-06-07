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
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';

import styles from './styles.js';


// const { productId } = route.params;
class DetailColor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        console.log(this.props.colorContent);
    }

    getTitleSize(id) {
        const title = this.props.size?.listAllSize?.find((size) => size?.id === id);
        return title;

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ marginBottom: 8 }}>
                    <View style={styles.flexBox}>
                        <Text style={styles.boxTitle}>{this.props?.colorName}</Text>
                        <Text style={{ backgroundColor: `${this.props?.colorContent}`, width: 22, height: 22, borderRadius: 6 }}></Text>
                    </View>
                    <View style={styles.boxInfo1}>
                        {
                            this.props?.sizeList?.map((size, index) => {
                                var sizeName = this.getTitleSize(size?.size_id);
                                return (
                                    <View key={index} style={styles.boxInfo}>
                                        <Text style={[styles.txtBox, styles.txtBoxHeader]}>{sizeName?.title}</Text>
                                        <View>
                                            <Text style={styles.txtBox}>Tổng nhập: {size?.tong_nhap}</Text>
                                            <Text style={styles.txtBox}>Tổng trả NCC: {size?.tong_tranhacungcap}</Text>
                                            <Text style={styles.txtBox}>Tổng bán: {size?.tong_banhang}</Text>
                                            <Text style={styles.txtBox}>Tổng KH trả: {size?.tong_khachhangtra}</Text>
                                            <Text style={styles.txtBox}>Tổng kiểm: {size?.tong_kiemkho}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </SafeAreaView >
        );
    };
};
const mapStateToProps = state => ({
    product: state.product,
    size: state.size,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailColor)
