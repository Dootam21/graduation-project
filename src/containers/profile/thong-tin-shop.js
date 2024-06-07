/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, Component } from 'react';
import Footer from '../elements/Footer';
import Header from '../elements/Header';
import { connect } from 'react-redux';
import { get_infomation, edit_infomation } from '../../services/infoShopService'
import SelectCover from '../elements/selectCover';
import SelectAvatar from '../elements/selectAvatar';
import SelectQrBank from '../elements/selectQrBank';
import SelectQrZalo from '../elements/selectQrZalo';

// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';


class ThongTinShop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            name: '',
            ismodalQrZalo: false,
            ismodalQrBank: false,
            ismodalAvatar: false,
            ismodalCover: false,
            cover: '',
            avatar: '',
            qr_bank: '',
            qr_zalo: '',
        }
    }
    componentDidMount() {
        this.getInfimation();

    }

    setData(opt) {
        this.setState({ data: opt });
    }
    setDataInpur(opt) {
        this.setState({ data: opt });
    }

    // setName(opt) {
    //     this.setState({ data: { ...this.state.data, fullname: opt } });

    // }

    setAddress(opt) {
        this.setState({ data: { ...this.state.data, address: opt } });
        console.log('log', this.state.data);
    }
    setName(opt) {
        this.setState({ data: { ...this.state.data, name: opt } });
    }

    setBank(opt) {
        this.setState({ data: { ...this.state.data, bank_nganhang: opt } });
    }
    setSTK(opt) {
        this.setState({ data: { ...this.state.data, bank_stk: opt } });
    }

    setBankName(opt) {
        this.setState({ data: { ...this.state.data, bank_fullname: opt } });
    }
    setPhone(opt, index) {
        this.setState(prevState => {
            const newData = { ...prevState.data };
            newData.phone[index] = opt;
            return newData;
        });
        console.log('log', this.state.data);
    }

    async getInfimation() {
        const data = await get_infomation();
        this.setData(data);
        this.setState({ cover: data.banner, avatar: data.image, qr_bank: data.qr_bank, qr_zalo: data.qr_zalo });
        console.log(data);
    }

    async editInfimation() {
        var d = this.state.data;
        d.qr_bank = this.state.qr_bank;
        d.qr_zalo = this.state.qr_zalo;
        d.banner = this.state.cover;
        d.image = this.state.avatar;

        this.setState({ data: d });

        const data = await edit_infomation(d);
        console.log('editInfimation.data');
        console.log(data);
        console.log('editInfimation.d');
        console.log(d);

        this.getInfimation();

        this.props.navigation.pop();
    }

    setModalCover(opt) {
        this.setState({ ismodalCover: opt });
        // console.log(this.state.ismodal);
    }

    closeModalCover(txt) {
        this.setState({ ismodalCover: false, cover: txt });
        // console.log('txt');
        console.log(txt);
    }

    setModalAvatar(opt) {
        this.setState({ ismodalAvatar: opt });
        // console.log(this.state.ismodal);
    }

    closeModalAvatar(txt) {
        this.setState({ ismodalAvatar: false, avatar: txt });
        // console.log('txt');
        console.log(txt);
    }

    setModalQrBank(opt) {
        this.setState({ ismodalQrBank: opt });
        // console.log(this.state.ismodal);
    }

    closeModalQrBank(txt) {
        this.setState({ ismodalQrBank: false, qr_bank: txt });
        // console.log('txt');
        console.log(txt);
    }

    setModalQrZalo(opt) {
        this.setState({ ismodalQrZalo: opt });
        // console.log(this.state.ismodal);
    }

    closeModalQrZalo(txt) {
        this.setState({ ismodalQrZalo: false, qr_zalo: txt });
        console.log('txt');
        console.log(txt);
    }

    render() {
        const { data, cover, avatar, qr_zalo, qr_bank, ismodalCover, ismodalAvatar } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title='Thông tin shop' />
                    <ScrollView>

                        <View style={[styles.bgGrey, styles.relative]}>
                            <TouchableOpacity onPress={() => this.setModalCover(true)}>
                                <View style={styles.coverImageContainer}>
                                    <Image style={styles.coverImage} resizeMode="cover" source={cover === null || cover?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: cover }}></Image>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.boxAvatar}>
                                <TouchableOpacity onPress={() => this.setModalAvatar(true)}>
                                    <View style={styles.imgContainer}>
                                        <Image style={styles.coverImage} source={avatar === null || avatar?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: avatar }}></Image>
                                    </View>
                                </TouchableOpacity>
                                {/* <Text style={styles.username}>{data?.name}</Text> */}
                            </View>
                        </View>

                        <SelectCover
                            ismodal={ismodalCover}
                            setIsModal={(opt) => this.setState({ ismodalCover: opt })}
                            setImage={(img) => this.setState({ cover: img })}
                        />
                        <SelectAvatar
                            ismodal={ismodalAvatar}
                            setIsModal={(opt) => this.setState({ ismodalAvatar: opt })}
                            setImage={(img) => this.setState({ avatar: img })}
                        />
                        <SelectQrBank ismodal={this.state.ismodalQrBank} closeModal={(txt) => this.closeModalQrBank(txt)} />
                        <SelectQrZalo ismodal={this.state.ismodalQrZalo} closeModal={(txt) => this.closeModalQrZalo(txt)} />

                        <View>
                            <View style={[styles.flexRow, styles.borderBottom]}>
                                <Text style={[styles.nameAttr]}>Tên Shop</Text>
                                <TextInput style={[styles.val]} placeholder='Tên Shop...' value={data?.name} onChangeText={(text) => this.setName(text)} />
                            </View>
                            <View style={[styles.flexRow, styles.borderBottom]}>
                                <Text style={[styles.nameAttr]}>Địa chỉ</Text>
                                <TextInput style={[styles.val, styles.addres]} numberOfLines={3} multiline onChangeText={(text) => this.setAddress(text)} placeholder='Địa chỉ...' value={data?.address}></TextInput>
                            </View>
                            <View style={[styles.flexRow, styles.borderBottom]}>
                                <Text style={[styles.nameAttr]}>Ngân hàng hưởng thụ</Text>
                                <TextInput style={[styles.val]}
                                    placeholder='Ngân hàng hưởng thụ...' value={data?.bank_nganhang} onChangeText={(text) => this.setBank(text)}></TextInput>
                            </View>
                            <View style={[styles.flexRow, styles.borderBottom]}>
                                <Text style={[styles.nameAttr]}>Số tài khoản</Text>
                                <TextInput style={[styles.val]}
                                    keyboardType="numeric"
                                    placeholder='Số tài khoản...' value={data?.bank_stk} onChangeText={(text) => this.setSTK(text)}></TextInput>
                            </View>
                            <View style={[styles.flexRow, styles.borderBottom]}>
                                <Text style={[styles.nameAttr]}>Tên người hưởng thụ</Text>
                                <TextInput style={[styles.val]}
                                    placeholder='Tên người hưởng thụ...' value={data?.bank_fullname} onChangeText={(text) => this.setBankName(text)}></TextInput>
                            </View>

                            {
                                data?.phone?.map((v, index) => (
                                    <View key={index} style={[styles.flexRow, styles.borderBottom]}>
                                        <Text style={[styles.nameAttr]}>Số điện thoại</Text>
                                        <TextInput style={[styles.val]} value={v} onChangeText={(text) => this.setPhone(text, index)} placeholder={`SĐT ${index + 1}...`} />
                                    </View>
                                ))
                            }

                            <View style={[styles.flexRow, styles.elementUp]}>
                                <View style={styles.btnUpQr}>
                                    <TouchableOpacity onPress={() => this.setModalQrBank(true)}>
                                        <Text style={styles.txtQr}>QR Bank</Text>
                                        <View style={styles.boxqrImage}>
                                            <Image style={styles.qrImage} source={{ uri: qr_bank }}></Image>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.btnUpQr}>
                                    <TouchableOpacity onPress={() => this.setModalQrZalo(true)}>
                                        <Text style={styles.txtQr}>QR Zalo</Text>
                                        <View style={styles.boxqrImage}>
                                            <Image style={styles.qrImage} source={{ uri: qr_zalo }}></Image>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <TouchableOpacity>
                        <Text style={styles.btnSave} onPress={() => this.editInfimation()}>Lưu</Text>
                    </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongTinShop)

