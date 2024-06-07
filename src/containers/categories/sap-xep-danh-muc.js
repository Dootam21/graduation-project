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

import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import Header from '../elements/Header';
import { category_update_pos, get_category } from '../../services/categoryService';
import categoryAction from '../../actions/categoryAction';


class SapXepDanhMuc extends Component {
    // const { productId } = route.params;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isActive: false,
        }
    }

    componentDidMount() {
        this.getData();
    }

    async savepos() {
        console.log(this.state.data);
        const data = await category_update_pos(this.state.data);

        if (data === false) {
            console.log("Có lỗi, không nhận diện được người dùng");
            return true;
        }

        const cate = await get_category();
        console.log(cate);

        this.props.categoryAction('get_list_category', cate);
        this.getData();

        this.props.navigation.pop();
    }

    async getData() {
        var d = new Array();
        const data = this.props.category.listCategory;
        for (var i = 0; i < data.length; i++) {
            var item1 = data[i];
            let tmp = {
                key: item1.Category.id,
                label: item1.Category.title
            }

            d.push(tmp);

            if (item1.children.length > 0) {
                for (var j = 0; j < data.length; j++) {
                    var item2 = data[j];

                    let tmp = {
                        key: item2.Category.id,
                        label: item2.Category.title
                    }

                    // d.push(tmp);
                }
            }
        }
        console.log(data);
        console.log(d);
        this.setState({ data: d });
    }

    render() {
        const navigation = this.props.navigation;
        const { isActive } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ ...styles.container, backgroundColor: '#f2f2f2' }}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => navigation.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>Sắp xếp danh mục bán hàng</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => this.savepos()}>
                                <Text style={styles.btnSave}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    {/* <ScrollView> */}
                    {/* <TouchableOpacity>
                            <Text style={styles.categoryName}>Áo ba lỗ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.categoryName}>Áo ba lỗ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.categoryName}>Áo ba lỗ</Text>
                        </TouchableOpacity> */}


                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <DraggableFlatList
                            data={this.state.data}
                            renderItem={({ item, index, drag }) => (
                                <ScaleDecorator>
                                    <TouchableOpacity
                                        onLongPress={drag}
                                        disabled={isActive}
                                        style={[
                                            styles.rowItem,
                                            { backgroundColor: isActive ? "red" : item.backgroundColor },
                                        ]}
                                    >
                                        <View style={styles.categoryName}>
                                            <Text style={styles.textCate}>{item.label}</Text>
                                            <Svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M3 3H25M3 10.5862H25" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                                            </Svg>

                                        </View>

                                    </TouchableOpacity>
                                </ScaleDecorator>

                            )}
                            keyExtractor={(item) => item.key}
                            onDragEnd={({ data }) => {
                                console.log(data);
                                this.setState({ data }); // Cập nhật lại dữ liệu sau khi kéo và thả
                            }}
                        />

                    </GestureHandlerRootView>

                    {/* </ScrollView > */}

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };

};
const mapStateToProps = state => ({
    category: state.category,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    categoryAction: (act, data) => dispatch(categoryAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SapXepDanhMuc)


