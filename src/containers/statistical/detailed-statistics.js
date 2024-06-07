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
import { get_thong_ke_chi_tiet } from '../../services/productService';
import DetailColor from './DetailColor';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';


// const { productId } = route.params;
class DetailedStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }

    componentDidMount() {
        this.getData();
    }

    setData = (opt) => {
        this.setState({ data: opt });
    }

    async getData() {
        const data = await get_thong_ke_chi_tiet({
            u_id: this.props.admin.uid,
            product_id: this.props.product.id,
        })
        console.log(data);
        this.setData(data);

    }

    getTitleColor(id) {
        const title = this.props.color?.listAllColor?.find((color) => color?.id === id);
        return title;
    }
    render() {
        const data = this.state.data;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title="Thống kê chi tiết" />

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        <View style={styles.totalOrder}>
                            <Text style={styles.txt1}>Tổng nhập: {data?.tong_nhap} - Tổng trả NCC: {data?.tong_tranhacungcap}</Text>
                            <Text style={styles.txt1}>Tổng bán: {data?.tong_banhang} - Tổng KH trả: {data?.tong_khachhangtra}</Text>
                            <Text style={styles.txt1}>Tổng kiểm: {data?.tong_kiemkho}</Text>
                        </View>
                        <Text style={styles.inventory}>Chi tiết</Text>
                        <ScrollView horizontal={true} style={{ backgroundColor: "#f5f5f5" }}>
                            <View style={styles.flexColum}>
                                {
                                    data?.thongke_list?.map((d, i) => {
                                        var color = this.getTitleColor(d?.color_id);
                                        return (
                                            <DetailColor key={i} colorName={color?.title} sizeList={d?.size_list} colorContent={color?.content} />
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </ScrollView>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };
};
const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
    color: state.color,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(DetailedStatistics)
