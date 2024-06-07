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
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { connect } from 'react-redux';
import { RadioButton } from 'react-native-paper';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

import { thongketon } from '../../services/kiemkhoService';


class StatisticsInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            uid: this.props.admin.uid,
            product_id: 0,
            tableData: [
                ['', '', '', '', '', '', '', '', '', '', ''],
            ]
        }
    }

    tableHead = ['Đợt', 'Thời gian', 'Tồn đầu', 'Giá nhập', 'Giá bán', 'SL bán', 'Tiền bán', 'Tiền nhập', 'Lãi ước tính', 'SL tồn', 'Tiền tồn']
    widthArr = [50, 110, 80, 80, 100, 80, 100, 100, 100, 80, 80]

    componentDidMount() {
        this.setState({ uid: this.props.admin.uid, product_id: this.props.product.id });
        this.getData();
    }

    async getData(category_id, option, price_from, price_to, hh_status) {
        const data = {
            uid: this.props.admin.uid, 
            product_id: this.props.product.id
        }
        const dataLog = await thongketon(data);
        console.log(dataLog);
        if (dataLog === false) { }
        else {
            var d = [];
            for (var i = 0; i < dataLog.length; i++) {
                let k = i;
                let item = dataLog[k];
                let tmp = [];
                tmp.push(k + 1);
                tmp.push(item.from + '-' + item.to);
                tmp.push(item.tondau);
                tmp.push(item.gianhap);
                tmp.push(item.giaban);
                tmp.push(item.slban);
                tmp.push(item.tienban);
                tmp.push(item.tiennhap);
                tmp.push(item.laiuoctinh);
                tmp.push(item.slton);
                tmp.push(item.tienton);
                d.push(tmp);
            }

            if (d.length > 0)
                this.setState({ tableData: d });
        }

    }

    render() {
        const navigation = this.props.navigation;
        const { data, tableData } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title="Thống kê tồn kho" />

                    <ScrollView horizontal={true} style={{ backgroundColor: "#f5f5f5" }}>
                        <View>
                            <Table>
                                <Row data={this.tableHead} widthArr={this.widthArr} style={styles.headTable} textStyle={styles.textTable} />
                                <Rows data={tableData} widthArr={this.widthArr} textStyle={styles.textTable} />
                            </Table>
                        </View>

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
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(StatisticsInventory)
