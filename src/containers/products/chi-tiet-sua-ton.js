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
import SelectQuantity from '../elements/SelectQuantity';
import categoryAction from '../../actions/categoryAction';
import hangAction from '../../actions/hangAction';
import supplierAction from '../../actions/supplierAction';
import productAction from '../../actions/productAction';
import colorAction from '../../actions/colorAction';
import sizeAction from '../../actions/sizeAction';
import kiemkhoAction from '../../actions/kiemkhoAction';

import { get_detail_kiemkho } from '../../services/kiemkhoService';

// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
    Switch,
    Modal,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';

import { get_detail_product, delete_product, update_product_status, edit_product } from '../../services/productService';

import styles from './styles.js';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Header from '../elements/Header';
import { get_kiemkho_detail } from '../../services/kiemkhoService';

class ChiTietSuaTon extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isShowItem: true,
            u_id: this.props.admin.uid,
            product_id: 0,
            kiemkho_id: 0,
        }
        console.log(this.props.product.id, this.props.kiemkho.kiemkho_id);
    }

    componentDidMount() {
        this.setState({ uid: this.props.admin.uid, product_id: this.props.product.id, kiemkho_id: this.props.kiemkho.kiemkho_id });
        this.getData();
    }

    async getData() {
        var d = this.state;
        d.u_id = this.props.admin.uid;
        d.product_id = this.props.product.id;
        d.kiemkho_id = this.props.kiemkho.kiemkho_id;

        const data = await get_detail_kiemkho(d);
        this.setState({ data: data });
        console.log(data);
        console.log('data of data', data);
    }

    setIsShowItem(opt) {
        this.setState({ isShowItem: opt })
    }

    renderList(data, isShowItem) {
        var d = new Array();
        if (data.data) {
            //list cac size trong 1 mau
            // data.data.map((item) => {
            //     console.log(item);
            // })
            var lst = new Array();
            if (data.data && data.data.length > 0 && isShowItem == true)

            // if(data.data && data.data.length > 0)
            {
                for (var i = 0; i < data.data.length; i++) {
                    let k = i;
                    let item = data.data[k];
                    let color = item.color?.color;
                    let color_title = item.color.title ? item.color.title + ':' : '';
                    let sizes = item.sizes ? item.sizes : new Array();


                    var tmp = new Array();
                    var size_data = new Array();

                    for (var j = 0; j < sizes.length; j++) {
                        let x = j;
                        let sizeitem = sizes[x];

                        size_data.push(
                            <View style={styles.sizeBox}>
                                <Text style={styles.txtSize}>{sizeitem.size_name}</Text>
                                <Text style={styles.txtSizeX}>({sizeitem.old}-&gt;{sizeitem.new})</Text>
                                <Text style={styles.txtSoluong}>{sizeitem.change}</Text>
                            </View>
                        );
                    }

                    tmp.push(
                        <View style={styles.boxItem}>
                            <View style={styles.flexRow}>
                                <Text style={{ backgroundColor: color, width: 22, height: 22, borderRadius: 6, marginRight: 10 }}></Text>
                                <Text style={styles.nameColor}>{color_title}</Text>
                            </View>
                            {size_data}
                        </View>
                    );

                    lst.push(tmp);
                }
            }

            var tmp = new Array();

            // for(var i = 0; i<data.length; i++)
            // {
            // let k = i;
            // k = 0;
            // let item = data[k];

            tmp.push(
                <TouchableOpacity onPress={() => this.setIsShowItem(!this.state.isShowItem)}>
                    <View style={[styles.flexRow, styles.productElement]}>
                        <Image
                            style={styles.productImage}
                            source={data.image == null || data.image?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: data.image }}
                        />
                        <Text style={styles.productName}>{data.code_sp} - {data.title ? data.title : 'Không có tên'}</Text>
                    </View>
                </TouchableOpacity>
            );
            // }


            d.push(
                <View>
                    <Text style={styles.titleChiTiet}>Chi tiết sửa tồn</Text>
                    {/* <Text style={styles.bgGrey1} /> */}
                    {tmp}
                    <View style={styles.itemToggle}>
                        {lst}
                    </View>
                </View>
            );
        }

        return d;
    }
    render() {
        const navigation = this.props.navigation;
        const { cateName, hangName, suppName, images, date, data, isShowItem } = this.state

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => {
                                if (this.props?.route?.params?.list) {
                                    this.props.kiemkhoAction('current_kiemkho_id', 0);
                                    this.props.productAction('current_product_id', 0);
                                }
                                this.props.navigation.goBack()
                            }}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Chi tiết phiếu sửa tồn</Text>

                        
                    </View>
                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        {/* <Text style={[styles.txtChuThich, styles.colorRed]}>Ghi chú: Chưa có ghi chú</Text> */}
                        <View style={styles.info}>
                            <Text style={{ color: 'black', }}>Mã:</Text>
                            <Text style={{ fontWeight: '700', color: 'black', }}>{data.code}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ color: 'black', }}>Tạo bởi:</Text>
                            <Text style={{ fontWeight: '700', color: 'black', }}>{data.creator}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{ color: 'black', }}>Ngày tạo:</Text>
                            <Text style={{ fontWeight: '700', color: 'black', }}>{data.created}</Text>
                        </View>
                        {this.renderList(data, isShowItem)}
                    </ScrollView>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };
};

const mapStateToProps = state => ({
    // product: state.product,
    // color: state.color,
    // size: state.size,
    // category: state.category,
    // hang: state.hang,
    // supplier: state.supplier,
    product: state.product,
    color: state.color,
    size: state.size,
    category: state.category,
    hang: state.hang,
    supplier: state.supplier,
    product: state.product,
    admin: state.admin,
    kiemkho: state.kiemkho,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    colorAction: (act, data) => dispatch(colorAction(act, data)),
    sizeAction: (act, data) => dispatch(sizeAction(act, data)),
    categoryAction: (act, data) => dispatch(categoryAction(act, data)),
    hangAction: (act, data) => dispatch(hangAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
    kiemkhoAction: (act, data) => dispatch(kiemkhoAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietSuaTon)