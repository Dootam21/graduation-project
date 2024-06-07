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
import { connect } from 'react-redux';
import { get_category } from '../../services/categoryService';
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
import Header from '../elements/Header';
import styles from './styles.js';
import CategoryComponent from './CategoryComponent';

class FilterCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectedButton: 0,
            isViewVisible: false,
        }
    }

    componentDidMount() {
        this.getData();
    }

    setSelectedButton(opt) {
        this.setState({ selectedButton: opt });
    }
    setViewVisible(opt) {
        this.setState({ isViewVisible: opt });
    }

    handleButtonPress = (buttonName) => {
        this.setSelectedButton(buttonName);
    };

    handleShowView = () => {
        this.setViewVisible(!this.state.isViewVisible);
    };

    async getData() {
        const data = await get_category({
            u_id: this.props.admin.uid,
        });
        console.log(data);
        this.setState({ data: data });
        // console.log('datga', this.state.data);
    }

    // listChildCategory = () => {
    //     var items = new Array();
    //     for (var i = 0; i < 5; i++) {
    //         items.push(
    //             <View>
    //                 <TouchableOpacity onPress={() => this.handleShowView()}>
    //                     <View style={styles.groupBtn4}>
    //                         <Text style={[styles.txtChildCategoryName1]}>Áo 3 lỗ</Text>

    //                         {this.state.isViewVisible ?
    //                             (<Svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                                 <Path d="M1.15552 10.3312L5.33166 14.3205C5.56234 14.5591 5.87655 14.6784 6.22257 14.6784C6.56859 14.6784 6.87882 14.5591 7.11348 14.3205L11.3055 10.3312C11.8027 9.85795 11.8027 9.08636 11.3055 8.61306C10.8084 8.13977 10.005 8.13977 9.5078 8.61306L7.50325 10.5261L7.50325 1.89545C7.50325 1.22329 6.9345 0.678406 6.23052 0.678406C5.52655 0.678406 4.9578 1.22329 4.9578 1.89545L4.9578 10.5261L2.95325 8.60909C2.45609 8.13579 1.65268 8.13579 1.15552 8.60909C0.658364 9.08636 0.658364 9.85397 1.15552 10.3312Z" fill="#939393" />
    //                             </Svg>
    //                             ) :
    //                             (<Svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                                 <Path d="M11.3055 5.02556L7.1294 1.03636C6.89872 0.797724 6.58451 0.678406 6.23849 0.678406C5.89247 0.678406 5.58224 0.797724 5.34758 1.03636L1.15554 5.02556C0.658377 5.49886 0.658377 6.27045 1.15554 6.74375C1.6527 7.21704 2.4561 7.21704 2.95326 6.74375L4.95781 4.83068L4.95781 13.4614C4.95781 14.1335 5.52656 14.6784 6.23054 14.6784C6.93451 14.6784 7.50326 14.1335 7.50326 13.4614L7.50326 4.83068L9.50781 6.74772C10.005 7.22102 10.8084 7.22102 11.3055 6.74772C11.8027 6.27045 11.8027 5.50284 11.3055 5.02556Z" fill="#939393" />
    //                             </Svg>)}
    //                     </View>
    //                 </TouchableOpacity>
    //                 {this.state.isViewVisible && (
    //                     <View style={styles.groupBtn3}>
    //                         <TouchableOpacity onPress={() => this.gotoPage("ListProduct")}>
    //                             <View style={[styles.groupBtn4]}>
    //                                 <Text style={[styles.txtChildCategoryName1, styles.txtChildCategoryName2]}>Áo 3 lỗ</Text>
    //                                 <Svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                                     <Path d="M9.88337 10.7534L13.8726 6.57728C14.1112 6.34659 14.2305 6.03239 14.2305 5.68637C14.2305 5.34034 14.1112 5.03012 13.8726 4.79546L9.88337 0.603412C9.41008 0.106253 8.63848 0.106253 8.16519 0.603412C7.69189 1.10057 7.69189 1.90398 8.16519 2.40114L10.0783 4.40569L1.44758 4.40569C0.775417 4.40569 0.23053 4.97443 0.23053 5.67841C0.23053 6.38239 0.775417 6.95114 1.44758 6.95114L10.0783 6.95114L8.16121 8.95568C7.68792 9.45284 7.68792 10.2563 8.16121 10.7534C8.63848 11.2506 9.4061 11.2506 9.88337 10.7534Z" fill="#939393" />
    //                                 </Svg>
    //                             </View>
    //                         </TouchableOpacity>
    //                     </View>
    //                 )}
    //             </View>
    //         )
    //     }

    //     return items;
    // }

    gotoPage() {
        this.props.navigation.navigate("ListProduct");
    }

    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { selectedButton } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={'Lọc theo danh mục'} />

                    <View style={{ flex: 1 }}>
                        <View style={styles.GroupCategory}>
                            <View style={styles.listCategory1}>
                                <ScrollView>
                                    {
                                        data?.map((cate, index) => (
                                            <View key={index}>
                                                <TouchableOpacity onPress={() => this.handleButtonPress(index)}>
                                                    <View style={styles.xxxx}>
                                                        <Text style={[styles.boxColor]}></Text>
                                                        <Text style={[styles.txtCategoryName1, selectedButton === index && styles.tabActive]}>{cate?.Category?.title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View >
                                        ))
                                    }
                                </ScrollView >
                            </View >

                            <ScrollView>
                                <View style={styles.listChildCategory1}>
                                    <View >
                                        {
                                            data?.map((cate, index) => (
                                                cate?.children?.map((cateChild, indexChild) => (
                                                    selectedButton === index && (
                                                        < CategoryComponent
                                                            gotoPage={() => this.gotoPage()}
                                                            key={indexChild}
                                                            cateName={cateChild?.Category?.title}
                                                            children={cateChild?.children}
                                                            id={cateChild?.Category?.id}
                                                        />
                                                    )
                                                ))
                                            ))
                                        }
                                    </View>
                                </View>
                            </ScrollView>
                        </View >
                    </View >

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };

};
const mapStateToProps = state => ({
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategory)


