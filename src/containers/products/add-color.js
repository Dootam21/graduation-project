/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Footer from '../elements/Footer';
import ModalChonSize from '../elements/ModalChonSize';
import ModalChonMauBTN from '../elements/ModalChonMauBTN';
import { connect } from 'react-redux';
import sizeAction from '../../actions/sizeAction';
import colorAction from '../../actions/colorAction';
import { add_color_size } from '../../services/productService';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
class AddColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            color: [],
            size: [],
        }
    }

    componentDidMount() {
        this.props.sizeAction('update_size_id', []);
        this.props.sizeAction('list_show_size', []);
        this.props.colorAction('update_color_id', []);
        this.props.colorAction('list_show_color', []);
    }

    setColor = (opt) => {
        this.setState({ color: opt });
    }

    setSize = (opt) => {
        this.setState({ size: opt });
    }

    addColor() {
        // const dataLog = await add_color_size();
        this.setState({
            data: {
                id: this.props.product.id,
                color: this.state.color,
                size: this.state.size,
                u_id: this.props.admin.uid,
            }
        }, async () => {
            const dataLog = await add_color_size(this.state.data);
            this.props.navigation.goBack();
        });
    }

    render() {
        const navigation = this.props.navigation;
        // const data = this.state.data;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => navigation.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Chọn màu</Text>
                        <View style={styles.headerRight}>
                        </View>
                    </View >

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Màu</Text>
                            <View style={styles.flexWidth}>
                                {/* <TouchableOpacity onPress={()=>navigation.navigate('ChonMau')}>
                                <Text style={styles.listItem}>Chọn..</Text>
                            </TouchableOpacity> */}
                                <ModalChonMauBTN
                                    title='Chọn màu'
                                    setColor={(opt) => this.setColor(opt)}
                                    setFieldValue={() => { }}
                                />
                            </View>
                        </View>
                        <View style={[styles.flexRow, styles.productAttr]}>
                            <Text style={[styles.flexWidth, styles.attrName1]}>Size</Text>
                            <View style={styles.flexWidth}>
                                {/* <TouchableOpacity onPress={()=>{}}>
                                <Text style={styles.listItem}>Chọn..</Text>
                            </TouchableOpacity> */}
                                <ModalChonSize
                                    title='Chọn size'
                                    setSize={(opt) => this.setSize(opt)}
                                    setFieldValue={() => { }}
                                />
                            </View>

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this.addColor()}>
                                <Text style={styles.txtAddSubcode}>Thêm mã con</Text>
                            </TouchableOpacity>
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
    color: state.color,
    size: state.size,
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    colorAction: (act, data) => dispatch(colorAction(act, data)),
    sizeAction: (act, data) => dispatch(sizeAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(AddColor)


