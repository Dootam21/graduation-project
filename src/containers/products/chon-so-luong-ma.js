/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import { get_detail_product } from '../../services/productService';
import { add_cart, change_status } from '../../services/cartService';
import { add_nhap, add_tra } from '../../services/productService';
import SelectQuantity from '../elements/SelectQuantity';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import SpinnerComponent from '../elements/Spinner';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import cartAction from '../../actions/cartAction';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    Alert
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import productAction from '../../actions/productAction';
import colorAction from '../../actions/colorAction';
import sizeAction from '../../actions/sizeAction';
import styles from './styles.js';

class ChonSoLuongMa extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            dataCart: {
                u_id: this.props.admin.uid,
                bill_id: this.props.cart.bill_id,
                product_id: this.props.product.id,
                list_quantity: this.props.product.list_quantity
            },
            dataNhap: {},
            dataTra: {},
            dataKhachTra: {},
            quantity: '0',
            isModalVisible: false,
            modalVisible1: false,
            colorList: [],
            sizeList: [],
            statusTextMap: {
                1: 'Hàng mới',
                2: 'Bán tiếp',
                3: 'Gọi lại',
                4: 'Giảm giá',
                5: 'Dứt mẫu',
                6: 'Hàng lỗi'
            },
            price: 0,
            type: 0,
            images: [],
            spinner: false,
            showImageZoom: false,
            imageIndex: 0,
            imagesZoom: [],
        }
        console.log('nhap nhanh cslm', this.props?.route?.params?.nhap);
        console.log('tra xuong', this.props?.route?.params?.traxuong);
        console.log('khach tra', this.props?.route?.params?.khachtra);
    }

    componentDidMount() {
        this.getData();
        // this.props.navigation.addListener(
        //     'focus',
        //     () => {
        //         this.props.productAction('update_quantity', []);
        //         this.getData();
        //     }
        // );
        // this.props.sizeAction('list_show_size', []);
        // this.props.colorAction('list_show_color', []);
        // this.props.productAction('update_quantity', []);
    }
    setListQuantity(opt) {
        // console.log(opt);
        this.setState({ data: { ...this.state.data, list_quantity: opt } })
    }

    setQuantity(opt) {
        this.setState({ quantity: opt })
    }

    setModalVisible(opt) {
        this.setState({ isModalVisible: opt })
    }

    setModalVisible1(opt) {
        this.setState({ modalVisible1: opt })
    }

    setData(opt) {
        this.setState({ data: opt })
    }

    setSpinner(opt) {
        this.setState({ spinner: opt });
    }

    checkItem = () => {
        this.setModalVisible1(false)
    }

    async getData() {
        // this.props.productAction('update_quantity', []);
        this.setSpinner(true);
        const dataLog = await get_detail_product({
            id: this.props.product.id,
            u_id: this.props.admin.uid,
        });
        // console.log(dataLog);
        this.setState({ data: dataLog.product });



        var old_color = 0;
        const newColorList = [];
        dataLog.product?.list_quantity.forEach(color => {
            if (old_color != color.color_id) {
                old_color = color.color_id;
                newColorList.push(this.props.color?.listColorObj[color.color_id]);
            }
        })

        this.setState({ colorList: newColorList });



        // const newColorList = this.props.color.listAllColor?.filter(color =>
        //     dataLog.product?.list_quantity?.some(quantity => quantity.color_id === color.id)
        // );
        // this.setState({ colorList: newColorList });
        // const newSizeList = this.props.size.listAllSize?.filter(size =>
        //     dataLog.product?.list_quantity?.some(quantity => quantity.size_id === size.id)
        // );
        // this.setState({ sizeList: newSizeList });



        // this.props.productAction('add_quantity', dataLog.product?.list_quantity);
        // console.log('ls quan', dataLog.product?.list_quantity);


        if (dataLog.product.images?.length !== 0) {
            this.setState({ images: dataLog.product.images });
            const images = dataLog.product?.images?.map(url => ({ url }));
            this.setState({ imagesZoom: images });
        }


        this.setSpinner(false);
        // console.log(dataLog.product);
        // console.log(this.props?.cart?.bill_id);

        // console.log(this.state.data.images);

        // const allElementsEmpty = this.state.data.images.every(item => item.trim() === "");
        // console.log(allElementsEmpty);
    }

    renderListItem(list_image) {
        // console.log('imtam', list_image);
        var d = new Array();
        if (list_image.length > 0) {
            for (var i = 0; i < list_image.length; i++) {
                let stt = i;
                var item = list_image[stt];

                d.push(
                    <View style={styles.slide} key={i}>
                        <Image style={{ width: 400, height: 400 }} source={{ uri: item }}></Image>
                    </View>
                );
            }
        }
        return d;
    }

    addCart() {
        const newList = this.state.data.list_quantity.filter(e => e.quantity != 0);
        // var sumQuantity = 0;
        // newList.forEach(e => {
        //     sumQuantity = sumQuantity + Number(e.quantity);
        // })
        if (newList.length === 0) {
            Alert.alert("Vui lòng chọn số lượng các mã hàng!");
            return false;
        }
        else if (this.props?.route?.params?.nhap) {
            this.setState({
                dataNhap: {
                    ...this.state.dataNhap,
                    u_id: this.props.admin.uid,
                    list_quantity: newList,
                    supplier_id: this.props.supplier?.id,
                    product_id: this.props.product.id,
                    price: this.props.product?.price,
                    nhap_id: this.props.product?.nhap_id,
                }
            }, async () => {
                // console.log(this.props.product?.nhap_id);
                const dataLog = await add_nhap(this.state.dataNhap);
                this.props.productAction('set_nhap_id', dataLog.nhap_id);
                this.props.navigation.goBack();
                // console.log('data at function add', this.state.dataCart);
            })
        }
        else if (this.props?.route?.params?.traxuong) {
            this.setState({
                dataTra: {
                    ...this.state.dataTra,
                    u_id: this.props.admin.uid,
                    list_quantity: newList,
                    supplier_id: this.props.supplier?.id,
                    product_id: this.props.product.id,
                    price: this.props.product?.price,
                    trahang_id: this.props.product?.tra_id,
                    type: 2,
                }
            }, async () => {
                console.log(this.props.product?.tra_id);
                const dataLog = await add_tra(this.state.dataTra);
                this.props.navigation.goBack();
                // console.log('data at function add', this.state.dataCart);
            })
        }
        else if (this.props?.route?.params?.khachtra) {
            this.setState({
                dataKhachTra: {
                    ...this.state.dataKhachTra,
                    u_id: this.props.admin.uid,
                    list_quantity: newList,
                    customer_id: this.props.customer?.id,
                    product_id: this.props.product.id,
                    price: this.props.product?.price,
                    trahang_id: this.props?.product?.tra_id,
                    type: 1,
                }
            }, async () => {
                const dataLog = await add_tra(this.state.dataKhachTra);
                this.props.navigation.goBack();
                // console.log('data at function add', this.state.dataCart);
            })
        }
        else if (this.props?.route?.params?.changing_quantity) {
            this.setState({
                dataCart: {
                    ...this.state.dataCart,
                    list_quantity: newList,
                    price: this.props.product.price,
                    type: this.props.product.type,
                    bill_id: this.props?.cart?.bill_id,
                    u_id: this.props.admin.uid,
                }
            }, async () => {
                const dataLog = await add_cart(this.state.dataCart);
                const dataLog11 = await change_status({
                    u_id: this.props.admin.uid,
                    bill_id: this.props?.cart?.bill_id,
                    nhat_lai: 1,
                    status: 1,
                });
                this.props.navigation.navigate('OrderDetail', { change_quantity: this.props?.route?.params?.changing_quantity });
                // console.log('data at function add', this.state.dataCart);
            })
        }
        else if (this.props?.route?.params?.change_quantity_no2) {
            // console.log(1);
            this.setState({
                dataCart: {
                    ...this.state.dataCart,
                    list_quantity: newList,
                    price: this.props.product.price,
                    type: this.props.product.type,
                    bill_id: this.props?.cart?.bill_id,
                    u_id: this.props.admin.uid,
                }
            }, async () => {
                const dataLog = await add_cart(this.state.dataCart);
                this.props.navigation.goBack();
                // console.log('data at function add', this.state.dataCart);
            })
        }
        else {
            this.setState({
                dataCart: {
                    ...this.state.dataCart,
                    list_quantity: newList,
                    price: this.props.product.price,
                    type: this.props.product.type,
                    bill_id: this.props?.cart?.bill_id_temp,
                    u_id: this.props.admin.uid,
                }
            }, async () => {
                if (this.props.admin.roles?.includes('cart_add') || this.props.admin.is_admin == 1) {
                    const dataLog = await add_cart(this.state.dataCart);
                    if (this.props?.cart?.bill_id_temp === 0) {
                        this.props.cartAction('current_cart_bill_id_temp', dataLog.data.bill_id);
                    }
                    this.props.navigation.goBack();
                    // console.log(dataLog);
                } else {
                    Alert.alert('Bạn không phép thực hiện hành động này!');
                }
                // console.log('data at function add', this.state.dataCart);
            })
        }
        // console.log(dataLog);
    }



    downloadImages(d) {
        // console.log(d);
        // return;
        if (d.length === 0) {
            Alert.alert('Thông báo', 'Không có hình ảnh')
        }
        else {
            for (var i = 0; i < d.length; i++) {
                this.downloadImage(d[i]);
            }
        }
    }

    downloadImage(image) {
        if (image === null || image === undefined || image?.trim() === '') {
            Alert.alert('Thông báo', 'Không có hình ảnh')
        }
        else {
            var date = new Date();
            var url = image;
            var ext = this.getExtention(url);
            ext = "." + ext[0];
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir
            let options =
            {
                fileCache: true,
                addAndroidDownloads:
                {
                    useDownloadManager: true,
                    notification: true,
                    path: PictureDir + "/image_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                    description: 'Image'
                }
            }

            config(options).fetch('GET', url).then((res) => {
                console.log("Download Success !");
            });
        }
    }

    getExtention(filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }


    shareImages(images) {
        if (images.length <= 0) return false;
        // const { fs } = RNFetchBlob ; 


        let Pictures = images.map(item =>
            RNFetchBlob.config({
                fileCache: true
            })
                .fetch("GET", item)
                .then(resp => {
                    let base64s = RNFetchBlob.fs
                        .readFile(resp.data, "base64")
                        .then(data => "data:image/jpeg;base64," + data);
                    return base64s;
                })
        );


        Promise.all(Pictures).then(completed => {
            const options = {
                title: this.state.data.title,
                urls: completed
            };
            Share.open(options);
        });

    }

    gotoDetail(id) {
        if (this.props.admin.roles?.includes('product_detail') || this.props.admin.is_admin == 1) {
            this.props.navigation.navigate('ProductDetail')
            this.props.productAction('current_product_id', id);
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
        // this.props.productAction('update_quantity', []);
    }

    render() {
        const navigation = this.props.navigation;
        const { data, statusTextMap, images, spinner, total_quantity, showImageZoom, imageIndex, imagesZoom } = this.state;
        // const data = this.state.data;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => {
                                // this.props.productAction('update_quantity', []);
                                if (this.props.route?.params?.nhapNhanh) {
                                    this.props.navigation.navigate('ProductDetail');
                                    // this.props.productAction('current_product_id', id);
                                }
                                else {
                                    navigation.goBack();
                                }
                            }}>
                                <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M0.293723 0.293723C0.386594 0.200617 0.496921 0.126747 0.618385 0.076345C0.739849 0.0259431 0.870063 0 1.00157 0C1.13307 0 1.26329 0.0259431 1.38475 0.076345C1.50622 0.126747 1.61654 0.200617 1.70941 0.293723L7.00026 5.58657L12.2911 0.293723C12.3841 0.200767 12.4944 0.127031 12.6159 0.0767236C12.7373 0.0264163 12.8675 0.000523453 12.999 0.000523453C13.1304 0.000523453 13.2606 0.0264163 13.382 0.0767236C13.5035 0.127031 13.6138 0.200767 13.7068 0.293723C13.7998 0.386679 13.8735 0.497033 13.9238 0.618485C13.9741 0.739938 14 0.87011 14 1.00157C14 1.13303 13.9741 1.2632 13.9238 1.38465C13.8735 1.50611 13.7998 1.61646 13.7068 1.70941L8.41395 7.00026L13.7068 12.2911C13.7998 12.3841 13.8735 12.4944 13.9238 12.6159C13.9741 12.7373 14 12.8675 14 12.999C14 13.1304 13.9741 13.2606 13.9238 13.382C13.8735 13.5035 13.7998 13.6138 13.7068 13.7068C13.6138 13.7998 13.5035 13.8735 13.382 13.9238C13.2606 13.9741 13.1304 14 12.999 14C12.8675 14 12.7373 13.9741 12.6159 13.9238C12.4944 13.8735 12.3841 13.7998 12.2911 13.7068L7.00026 8.41395L1.70941 13.7068C1.61646 13.7998 1.50611 13.8735 1.38465 13.9238C1.2632 13.9741 1.13303 14 1.00157 14C0.87011 14 0.739938 13.9741 0.618485 13.9238C0.497033 13.8735 0.386679 13.7998 0.293723 13.7068C0.200767 13.6138 0.127031 13.5035 0.0767236 13.382C0.0264163 13.2606 0.000523453 13.1304 0.000523453 12.999C0.000523453 12.8675 0.0264163 12.7373 0.0767236 12.6159C0.127031 12.4944 0.200767 12.3841 0.293723 12.2911L5.58657 7.00026L0.293723 1.70941C0.200617 1.61654 0.126747 1.50622 0.076345 1.38475C0.0259431 1.26329 0 1.13307 0 1.00157C0 0.870063 0.0259431 0.739849 0.076345 0.618385C0.126747 0.496921 0.200617 0.386594 0.293723 0.293723Z" fill="white" />
                                </Svg>

                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Chọn số lượng mã</Text>
                        <View style={styles.headerRight}>
                            {
                                this.props?.route?.params?.homePage && (
                                    <TouchableOpacity style={styles.item} onPress={() => this.gotoDetail(data?.id)}>
                                        <Svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M7.23073 5.15385C8.37778 5.15385 9.30765 4.22398 9.30765 3.07692C9.30765 1.92987 8.37778 1 7.23073 1C6.08368 1 5.15381 1.92987 5.15381 3.07692C5.15381 4.22398 6.08368 5.15385 7.23073 5.15385Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M15.5388 12.0777C16.6859 12.0777 17.6158 11.1478 17.6158 10.0008C17.6158 8.8537 16.6859 7.92383 15.5388 7.92383C14.3918 7.92383 13.4619 8.8537 13.4619 10.0008C13.4619 11.1478 14.3918 12.0777 15.5388 12.0777Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M7.23073 18.9995C8.37778 18.9995 9.30765 18.0697 9.30765 16.9226C9.30765 15.7756 8.37778 14.8457 7.23073 14.8457C6.08368 14.8457 5.15381 15.7756 5.15381 16.9226C5.15381 18.0697 6.08368 18.9995 7.23073 18.9995Z" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M5.15385 3.07617H1" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M10.6923 10H1" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M5.15385 16.9238H1" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M21.7695 16.9238H12.0771" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M21.7691 10H17.6152" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <Path d="M21.7695 3.07617H12.0771" stroke="#fff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </Svg>
                                    </TouchableOpacity>
                                )
                            }
                            {
                                // this.props.admin.groupId == 2 ? (
                                //     <></>
                                // ) : (
                                <TouchableOpacity style={styles.item} onPress={() => this.addCart()}>
                                    <Svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.4 11.4131L1.92 6.93311L0.426666 8.42645L6.4 14.3998L19.2 1.59978L17.7067 0.106445L6.4 11.4131Z" fill="white" />
                                    </Svg>
                                </TouchableOpacity>
                                // )
                            }
                            {/* <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible1}
                                onRequestClose={() => {
                                    this.setModalVisible1(!modalVisible1);
                                }}>
                                <View style={[styles.centeredView, styles.centeredView1]}>
                                    <View style={styles.modalView1}>
                                        <View>
                                            <Text style={styles.txtWarning}>Bạn cần chọn số lượng các mã hàng!</Text>
                                            <TouchableOpacity onPress={() => this.checkItem()}>
                                                <Text style={styles.btnOk}>OK</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible1(false)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal> */}
                        </View>
                    </View >

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <View style={styles.bgGrey}>
                            <TouchableOpacity style={styles.btnGroup} onPress={() => this.downloadImages(images)}>
                                <Svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M21.3054 14.0288V3.87942V3.71166C21.3054 2.72608 20.5085 1.90826 19.502 1.90826H16.3146C15.6016 0.859764 14.7208 0 13.7143 0H7.98952C6.98296 0 6.10223 0.859764 5.38925 1.90826H1.80341C0.817825 1.90826 0 2.70511 0 3.71166V4.82307C0 4.82307 0 4.82307 0 4.84404V13.0642C0 13.0642 0 13.0642 0 13.0852V14.1966C0 15.1822 0.796855 16 1.80341 16H19.502C20.4876 16 21.3054 15.2031 21.3054 14.1966V14.0288ZM7.98952 0.817824H13.7353C14.2595 0.817824 14.8257 1.27916 15.3499 1.92923H6.37484C6.89908 1.25819 7.4443 0.817824 7.98952 0.817824ZM5.89253 9.05898C5.89253 6.3329 8.03146 4.11009 10.6527 4.11009C13.2739 4.11009 15.4128 6.3329 15.4128 9.05898C15.4128 11.7851 13.2739 14.0079 10.6527 14.0079C8.03146 14.0079 5.89253 11.7851 5.89253 9.05898ZM6.52163 5.24246C5.64089 6.24902 5.09568 7.59109 5.09568 9.05898C5.09568 10.443 5.57798 11.7012 6.35387 12.7077H0.796854V5.24246H6.52163ZM16.2097 9.05898C16.2097 7.59109 15.6645 6.24902 14.7838 5.24246H20.5085V12.7077H14.9515C15.7274 11.7012 16.2097 10.443 16.2097 9.05898ZM20.5085 4.44561H13.9659C13.0433 3.73263 11.8899 3.31324 10.6527 3.31324C9.41547 3.31324 8.26212 3.73263 7.33945 4.44561H0.796854V3.90039C0.796854 3.25033 1.3211 2.72608 1.97117 2.72608H19.3342C19.9843 2.72608 20.5085 3.25033 20.5085 3.90039V4.44561ZM19.3342 15.2031H1.97117C1.3211 15.2031 0.796854 14.6789 0.796854 14.0288V13.4836H7.12975C8.09437 14.3014 9.33159 14.8047 10.6527 14.8047C11.9738 14.8047 13.232 14.3014 14.1756 13.4836H20.5085V14.0288C20.5085 14.6789 19.9843 15.2031 19.3342 15.2031Z" fill="#fff" />
                                    <Path d="M10.6527 13.1271C12.8335 13.1271 14.595 11.3028 14.595 9.059C14.595 6.81522 12.8335 4.99084 10.6527 4.99084C8.4718 4.99084 6.71033 6.81522 6.71033 9.059C6.71033 11.3028 8.4718 13.1271 10.6527 13.1271ZM10.6527 5.76673C12.3932 5.76673 13.8191 7.23462 13.8191 9.059C13.8191 10.8624 12.3932 12.3513 10.6527 12.3513C8.91216 12.3513 7.48621 10.8834 7.48621 9.059C7.48621 7.23462 8.91216 5.76673 10.6527 5.76673Z" fill="#fff" />
                                    <Path d="M19.6697 3.31326H17.6566C17.4469 3.31326 17.2582 3.48102 17.2582 3.71169C17.2582 3.92139 17.4259 4.11012 17.6566 4.11012H19.6697C19.8794 4.11012 20.0681 3.94236 20.0681 3.71169C20.0681 3.50199 19.8794 3.31326 19.6697 3.31326Z" fill="#fff" />
                                    <Path d="M2.60024 4.02623C2.91294 4.02623 3.16643 3.77274 3.16643 3.46005C3.16643 3.14735 2.91294 2.89386 2.60024 2.89386C2.28755 2.89386 2.03406 3.14735 2.03406 3.46005C2.03406 3.77274 2.28755 4.02623 2.60024 4.02623Z" fill="#fff" />
                                    <Path d="M11.5125 7.21366C11.5125 7.21366 12.3513 7.23463 12.5819 8.367C12.6239 8.55573 12.7916 8.68155 12.9594 8.68155C12.9804 8.68155 13.0013 8.68155 13.0433 8.68155C13.253 8.63961 13.3998 8.42991 13.3578 8.22021C13.0642 6.81523 12.0367 6.43777 11.5334 6.43777C11.3237 6.43777 11.135 6.60553 11.135 6.8362C11.1141 7.0459 11.3028 7.21366 11.5125 7.21366Z" fill="#fff" />
                                </Svg>
                                <Text style={styles.btnText}>Tải hình</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnGroup} onPress={() => this.shareImages(images)}>
                                <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M10.2308 6.53846H11.7692C12.1773 6.53846 12.5686 6.70055 12.8571 6.98906C13.1456 7.27758 13.3077 7.6689 13.3077 8.07692V15.4615C13.3077 15.8696 13.1456 16.2609 12.8571 16.5494C12.5686 16.8379 12.1773 17 11.7692 17H2.53846C2.13044 17 1.73912 16.8379 1.4506 16.5494C1.16209 16.2609 1 15.8696 1 15.4615V8.07692C1 7.6689 1.16209 7.27758 1.4506 6.98906C1.73912 6.70055 2.13044 6.53846 2.53846 6.53846H4.07692" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M10.2308 4.07692L7.15383 1L4.0769 4.07692" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M7.15387 11.5V1" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                                <Text style={styles.btnText}>Chia sẻ</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.swiperContainer}>
                            {
                                images.every(item => item.trim() === "") ? (
                                    <FastImage style={{ width: "100%", height: "100%" }} source={require('../../../asset/images/NoBgImage.png')}></FastImage>
                                ) : (
                                    <Swiper style={styles.wrapper} loop={false}
                                        activeDot={
                                            <View
                                                style={{
                                                    backgroundColor: '#B8101F',
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: 4,
                                                    marginLeft: 3,
                                                    marginRight: 3,
                                                    marginTop: 3,
                                                    marginBottom: 3
                                                }}
                                            />
                                        }>
                                        {
                                            images?.map((img, index) => (
                                                <View style={styles.slide} key={index}>
                                                    <TouchableOpacity onPress={() => this.setState({ showImageZoom: true, imageIndex: 0 })}>
                                                        <FastImage style={{ width: 400, height: 400 }} source={{ uri: img }}></FastImage>
                                                    </TouchableOpacity>
                                                </View>
                                            ))
                                            // this.renderListItem(images)
                                        }
                                    </Swiper>

                                )
                            }
                        </View>

                        <Modal visible={showImageZoom} transparent={true}>
                            <ImageViewer
                                imageUrls={imagesZoom}
                                index={imageIndex}
                                enableSwipeDown
                                onSwipeDown={() => this.setState({ showImageZoom: false })}
                                onSave={(index) => this.downloadImage(index)}
                                menuContext={{ saveToLocal: 'Tải ảnh về máy', cancel: 'Hủy' }}
                            />
                        </Modal>

                        <View>

                            <View style={styles.productInfo}>
                                <Text style={{ ...styles.name, maxWidth: "60%" }} >{data?.code}-{data?.title} | {
                                    this.props?.product?.type === 1 ? data?.price_nhap :
                                        this.props?.product?.type === 2 ? data?.price_buon :
                                            this.props?.product?.type === 3 ? data?.price_le :
                                                this.props?.product?.type === 4 ? data?.price_ctv : ''
                                } đ</Text>
                                <Text style={[styles.bgGreen, styles.status]}>{statusTextMap[data?.status]}</Text>
                            </View>

                            <Text style={styles.inventory}>Chọn số lượng {data?.totle_buy ? Number(data?.totle_buy).toLocaleString() : 0} / {data?.totle_quan ? Number(data?.totle_quan).toLocaleString() : 0}</Text>

                            {
                                this.state.colorList?.map((color, index) => {
                                    var sumQuantity = 0;
                                    data?.list_quantity.forEach(e => {
                                        if (e.color_id == color.id) {
                                            sumQuantity = sumQuantity + Number(e.quantity);
                                        }
                                    })
                                    return (
                                        <SelectQuantity
                                            key={index}
                                            colorName={color?.title}
                                            dataSize={this.state?.sizeList}
                                            idColor={color?.id}
                                            list_quantity={data?.list_quantity}
                                            colorContent={color?.content}
                                            nhapTra={this.props?.route?.params?.nhap || this.props?.route?.params?.khachtra || this.props?.route?.params?.traxuong}
                                            setListQuantity={(opt) => this.setListQuantity(opt)}
                                            chonSl={true}
                                            sumQuantity={sumQuantity}
                                        />
                                    )
                                })
                            }
                        </View>

                        <View>
                            <Text style={styles.inventory}>Có thể bạn quan tâm</Text>
                        </View>
                    </ScrollView>

                    <Footer />

                </View >

                <SpinnerComponent
                    spinner={spinner}
                />
            </SafeAreaView >
        );
    };
};

const mapStateToProps = state => ({
    product: state.product,
    color: state.color,
    size: state.size,
    cart: state.cart,
    supplier: state.supplier,
    customer: state.customer,
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    colorAction: (act, data) => dispatch(colorAction(act, data)),
    sizeAction: (act, data) => dispatch(sizeAction(act, data)),
    cartAction: (act, data) => dispatch(cartAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChonSoLuongMa)
