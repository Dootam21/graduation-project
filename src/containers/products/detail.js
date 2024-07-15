/**
 * Sample React Native App
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
import SpinnerComponent from '../elements/Spinner';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
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
    Alert
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';

import { get_detail_product, delete_product, update_product_status, edit_product, add_nhap } from '../../services/productService';

import styles from './styles.js';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

class ProductDetail extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            statusEnabled: false,
            linkEnabled: false,
            spEnabled: false,
            isModalVisible: false,
            modalVisible: false,
            isActive: 0,
            colorList: [],
            sizeList: [],
            quantityList: [],
            list_quantity: this.props?.product?.list_quantity,
            statusTextMap: {
                1: 'Hàng mới',
                2: 'Bán tiếp',
                3: 'Gọi lại',
                4: 'Giảm giá',
                6: 'Hàng lỗi'
            },
            status: ['Hàng mới', 'Bán tiếp', 'Gọi lại', 'Giảm giá', 'Hàng lỗi'],
            cateName: '',
            hangName: '',
            suppName: '',
            images: [],
            date: '',
            spinner: false,
            showImageZoom: false,
            imageIndex: 0,
            imagesZoom: [],
            get_list_quantity: [],
        }
    }

    componentDidMount() {
        // this.getData();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.getData();
            }
        );
    }

    toggleStatus() {
        this.setState({
            statusEnabled: !this.state.statusEnabled,
            data: {
                ...this.state.data,
                status: !this.state.statusEnabled ? 1 : 0,
                u_id: this.props.admin.uid,
            }
        }, async () => {
            const dataLog = await edit_product(this.state.data);
        })
    }

    toggleSp() {
        this.setState({
            spEnabled: !this.state.spEnabled,
            data: {
                ...this.state.data,
                dutmau: !this.state.spEnabled ? 1 : 0,
                u_id: this.props.admin.uid,
            }
        }, async () => {
            const dataLog = await edit_product(this.state.data)
        });
    }


    setModalVisible1(opt) {
        this.setState({ modalVisible: opt });
    }

    setSpinner(opt) {
        this.setState({ spinner: opt });
    }

    async handleActive(option) {
        this.setIsActive(option);
        this.setModalVisible1(false);
        var opt = option
        if (option == 5) {
            opt = option + 1;
        }
        const datalog = await update_product_status({
            id: this.props.product.id,
            status: opt,
            u_id: this.props.admin.uid,
        })
    }

    Cancel = () => {
        this.setModalVisible1(false);
    }

    setIsActive(opt) {
        this.setState({ isActive: opt });
    }
    setModalVisible(opt) {
        this.setState({ isModalVisible: opt });
    }

    async btnConfirm() {
        await delete_product(this.props?.product?.id, this.props.admin.uid,);
        this.setModalVisible(false);
        this.props.navigation.goBack();
    };

    async getData() {
        if (this.props.admin.roles?.includes('product_detail') || this.props.admin.is_admin == 1) {
            this.setSpinner(true);


            const data = await get_detail_product({
                id: this.props.product.id,
                u_id: this.props.admin.uid,
            });

            console.log('prd data', data.product);
            this.setState({ data: data.product });
            this.setState({ get_list_quantity: data.product.list_quantity });



            // var date = Date.now();

            // const newColorList = this.props.color.listAllColor?.filter(color =>
            //     data.product?.list_quantity?.some(quantity => quantity.color_id === color.id)
            // );
            // this.setState({ colorList: newColorList });
            // const newSizeList = this.props.size?.listAllSize?.filter(size =>
            //     data.product?.list_quantity?.some(quantity => quantity.size_id === size.id)
            // );
            // this.setState({ sizeList: newSizeList });

            // console.log(newSizeList);
            // console.log(newColorList);

            // this.props.productAction('add_quantity', data.product?.list_quantity);
            // this.props.sizeAction('list_show_size', newSizeList);
            // this.props.colorAction('list_show_color', newColorList);



            var old_color = 0;
            const newColorList = [];
            data.product?.list_quantity.forEach(color => {
                if (old_color != color.color_id) {
                    old_color = color.color_id;
                    newColorList.push(this.props.color?.listColorObj[color.color_id]);
                }
            })
            // console.log(newColorList);

            this.setState({ colorList: newColorList });
            console.log('new color list', newColorList);



            // console.log(Date.now() - date);





            // this.props.sizeAction('update_size_id', []);
            // this.props.sizeAction('update_list_all_size', []);
            // this.props.colorAction('update_color_id', []);
            // this.props.colorAction('update_list_all_color', []);




            this.setIsActive(data.product?.status);
            if (data.product?.images?.length !== 0) {
                this.setState({ images: data.product?.images });
                const images = data.product?.images?.map(url => ({ url }));
                this.setState({ imagesZoom: images });
            }
            this.setState({ date: data.product?.ngaynhap?.split(' ')[0] });

            // console.log('cate', this.props.category.listCategory);
            // console.log('data', data);

            var date = Date.now();

            this.props?.category?.listCategory?.map(category => {
                category?.children?.map(categoryChild => {
                    if (data?.product?.category_id === categoryChild?.Category?.id) {
                        this.setState({ cateName: categoryChild?.Category?.title });
                    }
                    else {
                        categoryChild?.children?.map((child) => {
                            if (data?.product?.category_id === child?.Category?.id) {
                                this.setState({ cateName: categoryChild?.Category?.title });
                            }
                        })
                    }
                })
            });
            const hangName = this.props.hang?.listHang?.find(item => item.id === data?.product?.hang_id);
            this.setState({ hangName: hangName?.title });
            const suppName = this.props.supplier?.listSupplier?.find(item => item.id === data?.product?.supplier_id);
            this.setState({ suppName: suppName?.title });


            // this.setState({ cateName: this.props.category.listCategoryObj[data?.product?.category_id]?.Category?.title });
            // this.setState({ hangName: this.props.hang.listHangObj[data?.product?.hang_id]?.title });
            // this.setState({ suppName: this.props.supplier.listSupplierObj[data?.product?.supplier_id]?.title });


            console.log('tgian', Date.now() - date);
            // this.props.categoryAction('current_category_id', data?.product?.category_id);
            // this.props.hangAction('current_hang_id', data?.product?.hang_id);
            // this.props.supplierAction('current_supplier_id', data?.product?.supplier_id);




            if (data.product.status == 1) {
                this.setState({ statusEnabled: true })
            }

            if (data.product.dutmau == 1) {
                this.setState({ spEnabled: true })
            }

            this.setSpinner(false);
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
            this.props.navigation.pop()
        }







        // console.log(this.state?.data);
        // console.log(this.props.category.id);
        // console.log(this.props.hang.id);
        // console.log(this.props.supplier.id);


    }

    // async getData() {
    //     const dataLog = await get_detail_product(this.props.product.id);
    //     this.setState({ data: dataLog.product }, () => {
    //         const newColorList = this.props.color.listAllColor?.filter(color =>
    //             this.state.data?.list_quantity?.some(quantity => quantity.color_id === color.id)
    //         );
    //         this.setState({ colorList: newColorList });
    //         const newSizeList = this.props.size.listAllSize?.filter(size =>
    //             this.state.data?.list_quantity?.some(quantity => quantity.size_id === size.id)
    //         );
    //         this.setState({ sizeList: newSizeList });
    //         this.props.productAction('add_quantity', this.state.data.list_quantity);
    //     });
    // }

    gotoProductEdit() {
        this.props.categoryAction('current_category_id', this.state.data?.category_id);
        this.props.hangAction('current_hang_id', this.state.data?.hang_id);
        this.props.supplierAction('current_supplier_id', this.state.data?.supplier_id);
        // this.props.productAction('get_details_product', data);
        this.props.navigation.navigate("EditDetail");
    }

    async gotoNhapHangNhanh() {
        const data = await add_nhap({
            u_id: this.props.admin.uid,
            supplier_id: this.state.data?.supplier_id,
        });
        this.props.productAction('set_nhap_id', data.nhap_id);
        this.props.productAction('get_price', this.state.data?.price_buon);
        this.props.supplierAction('current_supplier_id', this.state.data?.supplier_id);
        // this.props.productAction('set_nhap_id', 0);
        // this.props.categoryAction('current_category_id', this.state.data?.category_id);
        // this.props.hangAction('current_hang_id', this.state.data?.hang_id);
        this.props.navigation.navigate("Receipt", { nhapNhanh: true });
    }

    goBackFactory() {
        this.props.categoryAction('current_category_id', this.state.data?.category_id);
        this.props.hangAction('current_hang_id', this.state.data?.hang_id);
        this.props.supplierAction('current_supplier_id', this.state.data?.supplier_id);
        this.props.navigation.navigate("BackToFactory", { getHistory: true });
    }

    gotoReturnForm() {
        this.props.categoryAction('current_category_id', this.state.data?.category_id);
        this.props.hangAction('current_hang_id', this.state.data?.hang_id);
        this.props.supplierAction('current_supplier_id', this.state.data?.supplier_id);
        this.props.navigation.navigate("ReturnForm", { getHistory: true });
    }

    gotoFreightWagons() {
        this.props.categoryAction('current_category_id', this.state.data?.category_id);
        this.props.hangAction('current_hang_id', this.state.data?.hang_id);
        this.props.supplierAction('current_supplier_id', this.state.data?.supplier_id);
        this.props.navigation.navigate("FreightWagons", { getHistory: true });
    }

    gotoListNhap() {
        this.props.categoryAction('current_category_id', this.state.data?.category_id);
        this.props.hangAction('current_hang_id', this.state.data?.hang_id);
        this.props.supplierAction('current_supplier_id', this.state.data?.supplier_id);
        this.props.navigation.navigate("DSPhieuNhap", { getHistory: true });
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
    // shareImages(lst)
    // {
    //     var imgs = [];

    //     for(var i=0; i< lst.length; i++)
    //     {
    //         let f = this.getImagetoShare(lst[i]);
    //         imgs.push(f);
    //     }

    //     let shareImage = {
    //         title: this.state.data.title,
    //         message: '', //string
    //         urls: imgs,
    //     };

    //     Share.open(shareImage)
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         err && console.log(err);
    //     });
    // }

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

    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { cateName, hangName, suppName, images, date, spinner, showImageZoom, imageIndex, imagesZoom, get_list_quantity } = this.state
        // console.log('list quan xxx', get_list_quantity);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => navigation.pop()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>

                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Chi tiết sản phẩm</Text>

                        <View style={styles.headerRight}>
                            {/* {
                                this.props.admin.groupId == 1 && */}
                            <TouchableOpacity onPress={() => {
                                if (this.props.admin.roles?.includes('product_delete') || this.props.admin.is_admin == 1) {
                                    this.setModalVisible(true)
                                } else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <Text style={styles.btnTextHeader}>Xóa</Text>
                            </TouchableOpacity>
                            {/* } */}
                            <Modal visible={this.state.isModalVisible} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn muốn xóa?</Text>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible(false)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmButton} onPress={() => this.btnConfirm()}>
                                                <Text style={styles.txtConfirm}>Xác nhận</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1}
                                    style={styles.modalBackdrop}
                                    onPress={() => this.setModalVisible(false)}
                                />
                            </Modal>
                            {/* {
                                this.props.admin.groupId == 1 && */}
                            <TouchableOpacity onPress={() => {
                                if (this.props.admin.roles?.includes('product_edit') || this.props.admin.is_admin == 1) {
                                    this.gotoProductEdit();
                                } else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <Text style={[styles.item, styles.btnTextHeader]}>Sửa</Text>
                            </TouchableOpacity>
                            {/* } */}
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
                                images?.every(item => item.trim() === "") ? (
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
                            <TouchableOpacity style={styles.editPictures} onPress={() => navigation.navigate('SuaAnhSanPham')}>
                                <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M14.988 0.012207L17.988 3.01221L15.701 5.30021L12.701 2.30021L14.988 0.012207ZM4 14.0002H7L14.287 6.71321L11.287 3.71321L4 11.0002V14.0002Z" fill="white" />
                                    <Path d="M16 17H5.158C5.132 17 5.105 17.01 5.079 17.01C5.046 17.01 5.013 17.001 4.979 17H2V3H8.847L10.847 1H2C0.897 1 0 1.896 0 3V17C0 18.104 0.897 19 2 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V8.332L16 10.332V17Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.listAttr}>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tên:</Text>
                                <Text style={{ ...styles.value, maxWidth: '50%' }}>{data?.title}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Danh mục:</Text>
                                <Text style={{ ...styles.value, }}>{cateName}</Text>
                            </View>
                            {/* <View style={styles.attr}>
                                <Text style={styles.attrName}>Thương hiệu:</Text>
                                <Text style={{ ...styles.value, }}>{hangName}</Text>
                            </View> */}
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Nhà cung cấp:</Text>
                                <Text style={{ ...styles.value, }}>{suppName}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Số lượng:</Text>
                                <Text style={{ ...styles.value, }}>{data?.totle_buy ? Number(data?.totle_buy).toLocaleString() : 0} / {data?.totle_quan ? Number(data?.totle_quan).toLocaleString() : 0}</Text>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Giá:</Text>
                                {/* <TouchableOpacity onPress={() => { }}>
                                    <Text style={{ ...styles.value, }}>{data?.price_nhap ? Number(data?.price_nhap).toLocaleString() : 0}/{data?.price_buon ? Number(data?.price_buon).toLocaleString() : 0}/{data?.price_ctv ? Number(data?.price_ctv).toLocaleString() : 0}/{data?.price_le ? Number(data?.price_le).toLocaleString() : 0}</Text>
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.attr1}>
                                <View style={[styles.attrPrice, styles.paddingRightPrice]}>
                                    <Text>Nhập:</Text>
                                    <Text style={styles.value}>{data?.price_nhap ? Number(data?.price_nhap).toLocaleString() : 0} đ</Text>
                                </View>
                                <View style={[styles.attrPrice, styles.paddingLeftPrice]}>
                                    <Text>Buôn:</Text>
                                    <Text style={styles.value}>{data?.price_buon ? Number(data?.price_buon).toLocaleString() : 0} đ</Text>
                                </View>
                            </View>
                            <View style={styles.attr1}>
                                <View style={[styles.attrPrice, styles.paddingRightPrice]}>
                                    <Text>Lẻ:</Text>
                                    <Text style={styles.value}>{data?.price_le ? Number(data?.price_le).toLocaleString() : 0} đ</Text>
                                </View>
                                <View style={[styles.attrPrice, styles.paddingLeftPrice]}>
                                    <Text>CTV:</Text>
                                    <Text style={styles.value}>{data?.price_ctv ? Number(data?.price_ctv).toLocaleString() : 0} đ</Text>
                                </View>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Ngày hàng về gần nhất:</Text>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={{ ...styles.value, }}>{date}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Trạng thái(Đóng bán tạm thời)</Text>
                                <Switch
                                    style={styles.customSwitch}
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={this.state.statusEnabled ? '#f4f3f4' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        if (this.props.admin.roles?.includes('product_change_status_temporary_sale') || this.props.admin.is_admin == 1) {
                                            this.toggleStatus();
                                        } else {
                                            Alert.alert('Bạn không phép thực hiện hành động này!');
                                        }
                                    }}
                                    value={this.state.statusEnabled}
                                // disabled={this.props.admin.groupId != 1}
                                />
                            </View>
                            {/* <View style={styles.attr}>
                                <Text style={styles.attrName}>Cho phép liên kết</Text>
                                <Switch
                                    style={styles.customSwitch}
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={this.state.linkEnabled ? '#f4f3f4' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => this.toggleState('linkEnabled')}
                                    value={this.state.linkEnabled}
                                />
                            </View> */}
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Dứt mẫu</Text>
                                <Switch
                                    style={styles.customSwitch}
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={this.state.spEnabled ? '#f4f3f4' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {
                                        if (this.props.admin.roles?.includes('product_change_dut_mau') || this.props.admin.is_admin == 1) {
                                            this.toggleSp();
                                        } else {
                                            Alert.alert('Bạn không phép thực hiện hành động này!');
                                        }
                                    }}
                                    value={this.state.spEnabled}
                                // disabled={this.props.admin.groupId != 1}
                                />
                            </View>
                            <View style={styles.attr}>
                                <Text style={styles.attrName}>Tình trạng hàng</Text>
                                {/* {
                                    this.props.admin.groupId == 1 ? ( */}
                                <TouchableOpacity onPress={() => {
                                    if (this.props.admin.roles?.includes('product_change_status') || this.props.admin.is_admin == 1) {
                                        this.setModalVisible1(true)
                                    } else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <Text style={[styles.status, styles.bgRed1]}>{
                                        this.state.isActive == 5 ? 'Hàng lỗi' :
                                            this.state.statusTextMap[this.state.isActive]
                                    }</Text>
                                </TouchableOpacity>
                                {/* ) : (
                                        <Text style={[styles.status, styles.bgRed1]}>{this.state.statusTextMap[this.state.isActive]}</Text>
                                    )
                                } */}
                            </View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    setModalVisible1(!modalVisible);
                                }}>
                                <View style={styles.centeredView3}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText1}>Tình trạng hàng</Text>
                                        {
                                            this.state.status.map((status, index) => (
                                                <TouchableOpacity key={index} onPress={() => this.handleActive(index + 1)}>
                                                    <Text style={[styles.txtFilter1, this.state.isActive === 1 && styles.activeCL]}>{status}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                </View>
                                <View style={styles.centeredView2}>
                                    <TouchableOpacity onPress={() => this.setModalVisible1(false)}>
                                        <Text style={styles.txtClose}>Hủy bỏ</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible1(false)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            {/* <View style={styles.attr}>
                                <Text style={styles.attrName}>Phân loại hàng</Text>
                                <Text style={styles.classify}>NONE</Text>
                            </View> */}
                            <View style={styles.attr}>
                                <TouchableOpacity style={styles.secondhand} onPress={() => this.getData()}>
                                    <Text style={styles.textSecondhand}>Mở bán hàng cũ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.inventory}>Tồn kho</Text>

                            {
                                this.state.colorList?.map((color, index) => (
                                    // console.log('dddđ',data?.list_quantity),
                                    <SelectQuantity
                                        key={index}
                                        colorName={color?.title}
                                        dataSize={this.state?.sizeList}
                                        idColor={color?.id}
                                        list_quantity={get_list_quantity}
                                        disable={true}
                                        colorContent={color?.content}
                                    />
                                ))
                            }
                        </View>
                        {/* {
                            this.props.admin.groupId == 1 && */}
                        <View>
                            <Text style={styles.bgGrey1}></Text>

                            <TouchableOpacity style={[styles.groupBtn, styles.flexRow, styles.btnAddItem]} onPress={() => {
                                if (this.props.admin.roles?.includes('product_them_ma_con') || this.props.admin.is_admin == 1) {
                                    navigation.navigate("AddColor");
                                } else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <Svg style={{ marginRight: 14 }} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.9641 5.41667H7.58333V1.03594C7.58333 0.463802 7.09922 0 6.5 0C5.90078 0 5.41667 0.463802 5.41667 1.03594V5.41667H1.03594C0.463802 5.41667 0 5.90078 0 6.5C0 7.09922 0.463802 7.58333 1.03594 7.58333H5.41667V11.9641C5.41667 12.5362 5.90078 13 6.5 13C7.09922 13 7.58333 12.5362 7.58333 11.9641V7.58333H11.9641C12.5362 7.58333 13 7.09922 13 6.5C13 5.90078 12.5362 5.41667 11.9641 5.41667Z" fill="white" />
                                </Svg>
                                <Text style={styles.text}>Thêm mã con</Text>
                            </TouchableOpacity>
                            {/* 
                        <TouchableOpacity onPress={() => navigation.navigate("AddColor")}>
                            <Text style={[styles.btnItem, styles.bgBlue]}>Thêm mã con</Text>
                        </TouchableOpacity> */}
                            <View style={styles.groupBtn}>
                                <TouchableOpacity style={styles.flexWidth} onPress={() => navigation.navigate("AddColor")}>
                                    <Text style={[styles.btnItem, styles.bgBlue]}>Thêm mã con</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexWidth} onPress={() => navigation.navigate("SuaTon")}>
                                    <Text style={[styles.btnItem, styles.bgBlue1]}>Sửa tồn (Kiểm kho)</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.groupBtn}>
                                <TouchableOpacity style={styles.flexWidth} onPress={() => this.gotoListNhap()}>
                                    <Text style={[styles.btnItem, styles.bgBlue]}>Lịch sử nhập</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexWidth} onPress={() => this.gotoFreightWagons()}>
                                    <Text style={[styles.btnItem, styles.bgBlue1]}>Lịch sử bán</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.groupBtn}>
                                <TouchableOpacity style={styles.flexWidth} onPress={() => this.gotoNhapHangNhanh()}>
                                    <Text style={[styles.btnItem, styles.bgBlue]}>Nhập hàng nhanh</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexWidth} onPress={() => {
                                    if (this.props.admin.roles?.includes('product_tk_ton') || this.props.admin.is_admin == 1) {
                                        navigation.navigate("StatisticsInventory");
                                    } else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <Text style={[styles.btnItem, styles.bgBlue1]}>Thống kê tồn kho</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.groupBtn}>
                                <TouchableOpacity style={styles.flexWidth} onPress={() => navigation.navigate('DSPhieuKiemKho')}>
                                    <Text style={[styles.btnItem, styles.bgBlue]}>Lịch sử kiểm kho</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexWidth} onPress={() => this.gotoReturnForm()}>
                                    <Text style={[styles.btnItem, styles.bgBlue1]}>Lịch sử KH trả</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.groupBtn}>
                                <TouchableOpacity style={styles.flexWidth} onPress={() => this.goBackFactory()}>
                                    <Text style={[styles.btnItem, styles.bgBlue]}>Lịch sử trả xưởng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexWidth} onPress={() => {
                                    if (this.props.admin.roles?.includes('product_tk_chi_tiet') || this.props.admin.is_admin == 1) {
                                        navigation.navigate("DetailedStatistics")
                                    } else {
                                        Alert.alert('Bạn không phép thực hiện hành động này!');
                                    }
                                }}>
                                    <Text style={[styles.btnItem, styles.bgBlue1]}>Thống kê chi tiết</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* } */}
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
    category: state.category,
    hang: state.hang,
    supplier: state.supplier,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    colorAction: (act, data) => dispatch(colorAction(act, data)),
    sizeAction: (act, data) => dispatch(sizeAction(act, data)),
    categoryAction: (act, data) => dispatch(categoryAction(act, data)),
    hangAction: (act, data) => dispatch(hangAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)