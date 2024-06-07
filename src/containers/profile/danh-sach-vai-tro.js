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
import Header from '../elements/Header';
import { connect } from 'react-redux';



// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Switch,
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class ListRole extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    gotoDetail(value) {
        if (this.props.admin.roles?.includes('role_detail') || this.props.admin.is_admin == 1) {
            this.props.navigation.navigate('DetailRole', {
                role: {
                    roleId: value.roleId,
                    roleName: value.nameRole,
                    role: value.role,
                }
            })
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
    }


    render() {
        const { isEnabled, isModalVisible2, data } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title='Danh sách vai trò' />
                    <ScrollView>
                        <TouchableOpacity style={styles.roles} onPress={() => this.gotoDetail({
                            roleId: 'administrator',
                            nameRole: 'Administrator',
                            role: 1,
                        })}>
                            <View>
                                <Text style={styles.titleRole}>Administrator</Text>
                                <Text>Mã administrator</Text>
                            </View>
                            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M10 0C4.47254 0 0 4.47293 0 10C0 15.5275 4.47293 20 10 20C15.5275 20 20 15.5271 20 10C20 4.47254 15.527 0 10 0ZM10 18.4375C5.33621 18.4375 1.5625 14.6635 1.5625 10C1.5625 5.33621 5.33652 1.5625 10 1.5625C14.6638 1.5625 18.4375 5.33652 18.4375 10C18.4375 14.6638 14.6634 18.4375 10 18.4375Z" fill="black" />
                                <Path d="M10 8.37305C9.56852 8.37305 9.21875 8.72281 9.21875 9.1543V14.1853C9.21875 14.6168 9.56852 14.9665 10 14.9665C10.4315 14.9665 10.7812 14.6167 10.7812 14.1852V9.1543C10.7812 8.72281 10.4315 8.37305 10 8.37305Z" fill="black" />
                                <Path d="M10 7.41602C10.5825 7.41602 11.0547 6.94382 11.0547 6.36133C11.0547 5.77884 10.5825 5.30664 10 5.30664C9.41751 5.30664 8.94531 5.77884 8.94531 6.36133C8.94531 6.94382 9.41751 7.41602 10 7.41602Z" fill="black" />
                            </Svg>
                        </TouchableOpacity>
                        <Text style={styles.borderBottomRole}></Text>

                        <TouchableOpacity style={styles.roles} onPress={() => this.gotoDetail({
                            roleId: 'manager',
                            nameRole: 'Quản lý',
                            role: 1,
                        })}>
                            <View>
                                <Text style={styles.titleRole}>Quản lý</Text>
                                <Text>Mã manager</Text>
                            </View>
                            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M10 0C4.47254 0 0 4.47293 0 10C0 15.5275 4.47293 20 10 20C15.5275 20 20 15.5271 20 10C20 4.47254 15.527 0 10 0ZM10 18.4375C5.33621 18.4375 1.5625 14.6635 1.5625 10C1.5625 5.33621 5.33652 1.5625 10 1.5625C14.6638 1.5625 18.4375 5.33652 18.4375 10C18.4375 14.6638 14.6634 18.4375 10 18.4375Z" fill="black" />
                                <Path d="M10 8.37305C9.56852 8.37305 9.21875 8.72281 9.21875 9.1543V14.1853C9.21875 14.6168 9.56852 14.9665 10 14.9665C10.4315 14.9665 10.7812 14.6167 10.7812 14.1852V9.1543C10.7812 8.72281 10.4315 8.37305 10 8.37305Z" fill="black" />
                                <Path d="M10 7.41602C10.5825 7.41602 11.0547 6.94382 11.0547 6.36133C11.0547 5.77884 10.5825 5.30664 10 5.30664C9.41751 5.30664 8.94531 5.77884 8.94531 6.36133C8.94531 6.94382 9.41751 7.41602 10 7.41602Z" fill="black" />
                            </Svg>
                        </TouchableOpacity>

                        <Text style={styles.borderBottomRole}></Text>
                        <TouchableOpacity style={styles.roles} onPress={() => this.gotoDetail({
                            roleId: 'warehouse',
                            nameRole: 'Nhân viên kho',
                            role: 2,
                        })}>
                            <View>
                                <Text style={styles.titleRole}>Nhân viên kho</Text>
                                <Text>Mã warehouse</Text>
                            </View>
                            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M10 0C4.47254 0 0 4.47293 0 10C0 15.5275 4.47293 20 10 20C15.5275 20 20 15.5271 20 10C20 4.47254 15.527 0 10 0ZM10 18.4375C5.33621 18.4375 1.5625 14.6635 1.5625 10C1.5625 5.33621 5.33652 1.5625 10 1.5625C14.6638 1.5625 18.4375 5.33652 18.4375 10C18.4375 14.6638 14.6634 18.4375 10 18.4375Z" fill="black" />
                                <Path d="M10 8.37305C9.56852 8.37305 9.21875 8.72281 9.21875 9.1543V14.1853C9.21875 14.6168 9.56852 14.9665 10 14.9665C10.4315 14.9665 10.7812 14.6167 10.7812 14.1852V9.1543C10.7812 8.72281 10.4315 8.37305 10 8.37305Z" fill="black" />
                                <Path d="M10 7.41602C10.5825 7.41602 11.0547 6.94382 11.0547 6.36133C11.0547 5.77884 10.5825 5.30664 10 5.30664C9.41751 5.30664 8.94531 5.77884 8.94531 6.36133C8.94531 6.94382 9.41751 7.41602 10 7.41602Z" fill="black" />
                            </Svg>
                        </TouchableOpacity>

                        <Text style={styles.borderBottomRole}></Text>
                        <TouchableOpacity style={styles.roles} onPress={() => this.gotoDetail({
                            roleId: 'sale',
                            nameRole: 'Nhân viên bán hàng',
                            role: 3,
                        })}>
                            <View>
                                <Text style={styles.titleRole}>Nhân viên bán hàng</Text>
                                <Text>Mã sale</Text>
                            </View>
                            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M10 0C4.47254 0 0 4.47293 0 10C0 15.5275 4.47293 20 10 20C15.5275 20 20 15.5271 20 10C20 4.47254 15.527 0 10 0ZM10 18.4375C5.33621 18.4375 1.5625 14.6635 1.5625 10C1.5625 5.33621 5.33652 1.5625 10 1.5625C14.6638 1.5625 18.4375 5.33652 18.4375 10C18.4375 14.6638 14.6634 18.4375 10 18.4375Z" fill="black" />
                                <Path d="M10 8.37305C9.56852 8.37305 9.21875 8.72281 9.21875 9.1543V14.1853C9.21875 14.6168 9.56852 14.9665 10 14.9665C10.4315 14.9665 10.7812 14.6167 10.7812 14.1852V9.1543C10.7812 8.72281 10.4315 8.37305 10 8.37305Z" fill="black" />
                                <Path d="M10 7.41602C10.5825 7.41602 11.0547 6.94382 11.0547 6.36133C11.0547 5.77884 10.5825 5.30664 10 5.30664C9.41751 5.30664 8.94531 5.77884 8.94531 6.36133C8.94531 6.94382 9.41751 7.41602 10 7.41602Z" fill="black" />
                            </Svg>
                        </TouchableOpacity>

                        <Text style={styles.borderBottomRole}></Text>
                        <TouchableOpacity style={styles.roles} onPress={() => this.gotoDetail({
                            roleId: 'guest',
                            nameRole: 'Khách',
                            role: 4,
                        })}>
                            <View>
                                <Text style={styles.titleRole}>Khách</Text>
                                <Text>Mã guest</Text>
                            </View>
                            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M10 0C4.47254 0 0 4.47293 0 10C0 15.5275 4.47293 20 10 20C15.5275 20 20 15.5271 20 10C20 4.47254 15.527 0 10 0ZM10 18.4375C5.33621 18.4375 1.5625 14.6635 1.5625 10C1.5625 5.33621 5.33652 1.5625 10 1.5625C14.6638 1.5625 18.4375 5.33652 18.4375 10C18.4375 14.6638 14.6634 18.4375 10 18.4375Z" fill="black" />
                                <Path d="M10 8.37305C9.56852 8.37305 9.21875 8.72281 9.21875 9.1543V14.1853C9.21875 14.6168 9.56852 14.9665 10 14.9665C10.4315 14.9665 10.7812 14.6167 10.7812 14.1852V9.1543C10.7812 8.72281 10.4315 8.37305 10 8.37305Z" fill="black" />
                                <Path d="M10 7.41602C10.5825 7.41602 11.0547 6.94382 11.0547 6.36133C11.0547 5.77884 10.5825 5.30664 10 5.30664C9.41751 5.30664 8.94531 5.77884 8.94531 6.36133C8.94531 6.94382 9.41751 7.41602 10 7.41602Z" fill="black" />
                            </Svg>
                        </TouchableOpacity>
                    </ScrollView>
                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListRole)
