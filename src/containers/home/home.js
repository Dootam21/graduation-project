/*
    File code
*/
import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    // StatusBar,
    // StyleSheet,
    // FlatList,
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
} from 'react-native';

import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';

// import { notifications } from "react-native-firebase-push-notifications"
// import NetInfo from "@react-native-community/netinfo";

import { connect } from 'react-redux';
// import { withNavigation } from '@react-navigation/native';
import { DOMAIN } from '../../../constants/config';

import styles from './styles.js';
import { get_home_products, get_category_products, get_product_list, search_products } from '../../services/productService';
import { get_all_color } from '../../services/colorService';
import { get_all_size } from '../../services/sizeService';
import { get_list_cart, get_number_cart } from '../../services/cartService';
import { get_all_supplier } from '../../services/supplierService';
import { get_category } from '../../services/categoryService';
import { get_hang } from '../../services/hangService';
import { get_all_customer } from '../../services/customerSevice';
import { get_user_list } from '../../services/accountService';
import productAction from '../../actions/productAction';
import colorAction from '../../actions/colorAction';
import sizeAction from '../../actions/sizeAction';
import customerAction from '../../actions/customerAction';
import cartAction from '../../actions/cartAction';
import supplierAction from '../../actions/supplierAction';
import hangAction from '../../actions/hangAction';
import categoryAction from '../../actions/categoryAction';
import accountAction from '../../actions/accountAction';
import SpinnerComponent from '../elements/Spinner';
import FastImage from 'react-native-fast-image';
// import image from '../../../asset/images/NoImageProduct.png'
import PushNotification, { Importance } from 'react-native-push-notification';
import BackgroundService from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            type: 2,
            modalVisible: false,
            typeCase: {
                1: 'Giá nhập',
                2: 'Giá buôn',
                3: 'Giá lẻ',
                4: 'Giá CTV'
            },
            dataSearch: [],
            dataSearchInput: [],
            price: 0,
            cartData: {},
            isInputFocused: false,
            textSearch: '',
            spinner: false,
            // search_key: '',
            // isRefreshing: false,
            // isLogged: false,
            // cityLabel: 'Toàn Quốc',

            options: {
                taskName: 'Example',
                taskTitle: 'New',
                taskDesc: 'Desc new',
                taskIcon: {
                    name: 'ic_launcher',
                    type: 'mipmap',
                },
                color: '#ff00ff',
                parameters: {
                    delay: 1000,
                },
            }
        }
        this.delay = 300; // 500ms delay
        this.typingTimer = null;
    }

    setInputFocused = (opt) => {
        this.setState({ isInputFocused: opt });
    }

    setSpinner = (spinner) => {
        this.setState({ spinner: spinner });
    }

    handleInputFocus = () => {
        // this.getSearchData();
        this.setInputFocused(true);
    };

    handleInputBlur = () => {
        this.setInputFocused(false);
    };

    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }

    componentDidMount() {
        // this.getCart();

        // this.getNumberCart();
        // this.getData();
        this.getColorList();
        this.getCateHangSuppList();
        this.getListCustomer();
        this.getListUsers();
        this.props.productAction('get_type', 2);


        this.props.navigation.addListener(
            'focus',
            () => {
                this.getData();
                this.getNumberCart();
                this.setState({ isInputFocused: false });
            }
        );
        // this.getSearchData();

        this.props.sizeAction('update_size_id', []);
        this.props.sizeAction('list_show_size', []);
        this.props.colorAction('update_color_id', []);
        this.props.colorAction('list_show_color', []);
        this.props.hangAction('current_hang_id', 0);
        this.props.supplierAction('current_supplier_id', 0);
        this.props.categoryAction('current_category_id', 0);
        this.props.productAction('add_quantity', []);

        this.startBackgroundTask();
    }


    veryIntensiveTask = async (taskDataArguments) => {
        const { delay } = taskDataArguments;
        await new Promise(async resolve => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                await sleep(delay);
                try {
                    const response = await fetch('https://truongdo-crmbuon.webi.vn/api/api_notify/api_sent_notify',
                        {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                u_id: this.props.admin.uid,
                                group_id: this.props.admin.groupId,
                            })
                        }
                    );

                    const data = await response.json();
                    // console.log('eee', {
                    //     u_id: this.props.admin.uid,
                    //     group_id: this.props.admin.groupId,
                    // });

                    // console.log(data);
                    var gid = parseInt(this.props.admin.groupId);

                    // if (data.res == 'done') {
                        if (data.res == 'done' && data.data.includes(gid) ) {
                        // if (data.res == 'done' && (data.data.includes(gid) || this.props.admin.is_admin == 1)) {
                        console.log(' -------------------------------------------------------------------- > day thong bao');
                        PushNotification.localNotificationSchedule({
                            title: 'CRM quan ao',
                            message: data.msg,
                            channelId: 'crm_quanao',
                            channelName: "crm_qlQuanAO", // (required)
                            channelDescription: "A channel to categorise your notifications",
                            repeatTime: 1,
                            date: new Date(Date.now() + 1 * 1000),
                        });
                    }
                    // this.updateBackgroundTaskNotification(data.data, data.msg);
                } catch (error) {
                    console.error('API call error', error);
                }
            }
        })
    };

    startBackgroundTask = async () => {
        if (!BackgroundService.isRunning()) {
            await BackgroundService.start(this.veryIntensiveTask, this.state.options);
        }
        // await BackgroundService.updateNotification('New');
    };






    async getData() {
        this.setSpinner(true);
        // console.log(this.props.admin.isAdmin);
        if (this.props.admin.roles?.includes('cart_home') || this.props.admin.is_admin == 1) {
            const data = await get_home_products({
                u_id: this.props.admin.uid,
            });
            const dataArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key]
            }));
            this.setState({ data: dataArray });
        }
        else {
            Alert.alert('Bạn không phép thực hiện hành động này!');
        }
        this.setSpinner(false);
    }

    async getSearchData() {
        this.setSpinner(true);
        const dataSearch = await get_product_list({
            u_id: this.props.admin.uid,
        });
        this.setState({ dataSearch });
        this.setSpinner(false);
        // console.log('dataa', dataSearch);
    }

    gotoDetail(id, type, nhap, buon, le, ctv) {
        if (type === 1) {
            this.setPrice(nhap,
                () => {
                    this.props.productAction('get_price', nhap)
                }
            );
        }
        else if (type === 2) {
            this.setPrice(buon,
                () => {
                    this.props.productAction('get_price', buon)
                }
            );
        }
        else if (type === 3) {
            this.setPrice(le,
                () => {
                    this.props.productAction('get_price', le)
                }
            );
        }
        else if (type === 4) {
            this.setPrice(ctv,
                () => {
                    this.props.productAction('get_price', ctv)
                }
            );
        }
        // console.log(this.state.cartData);
        this.props.productAction('current_product_id', id);
        this.gotoPage('ChonSoLuongMa', { homePage: true });
        // this.props.cartAction('current_cart_bill_id', 0);
        this.props.productAction('update_quantity', []);
    }

    setType(opt) {
        this.setState({ type: opt });
    }

    setModalVisible(opt) {
        this.setState({ modalVisible: opt });
    }

    setPrice(price, callback) {
        this.setState({ price: price }, () => callback());
    }

    handleActive = (option) => {
        this.props.productAction('get_type', option)
        this.setType(option);
        this.setModalVisible(false);
    }

    Cancel = () => {
        this.setModalVisible(false);
    }

    // async check_logged()
    // {
    //     var user = [];

    //     await AsyncStorage.getItem('user', (err, result) => {
    //         if (!err && result != null){
    //             user = JSON.parse(result);
    //             // user.verified = parseInt(user.verified);
    //             // console.log(user);



    //             this.props.update_user('update', user);
    //         }
    //     });
    // }

    // checkNetInfo()
    // {
    //     NetInfo.fetch().then(state => 
    //     {
    //         if(state.isConnected)
    //         {
    //             // this.props.category('get');
    //             // this.getCats();
    //             this.props.navigation.navigate('Main');
    //         }
    //         else
    //             Alert.alert("Thông báo", "Không có kết nối mạng, vui lòng thử lại!");
    //     });
    // }

    // async getCats()
    // {
    //     await fetch(DOMAIN + 'api_category/api_category_get_list', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     .then((response) => response.json())
    //     .then((responseJson) => 
    //     {
    //         console.log('responseJson');
    //         console.log(responseJson);
    //         this.props.dangtin('catproduct', responseJson.data);
    //     });
    // }

    gotoProductDetail(product_id, type, nhap, buon, le, ctv) {
        this.props.productAction('current_product_id', product_id);
        if (type === 1) {
            this.setPrice(nhap,
                () => {
                    this.props.productAction('get_price', nhap)
                }
            );
        }
        else if (type === 2) {
            this.setPrice(buon,
                () => {
                    this.props.productAction('get_price', buon)
                }
            );
        }
        else if (type === 3) {
            this.setPrice(le,
                () => {
                    this.props.productAction('get_price', le)
                }
            );
        }
        else if (type === 4) {
            this.setPrice(ctv,
                () => {
                    this.props.productAction('get_price', ctv)
                }
            );
        }
        // console.log(this.state.cartData);
        this.props.navigation.navigate("ChonSoLuongMa", { homePage: true });
        this.props.productAction('update_quantity', []);
        // this.props.cartAction('current_cart_bill_id', 0);

    }

    load_home_product_items(data) {
        var d = new Array();

        // console.log('load_home_product_items');

        for (var items in data) {
            var ds = [];

            var i = 0;
            var k = 0;
            var tmp = new Array();
            var n = data[items].products.length;

            for (var item in data[items].products) {
                // console.log(data[items].products[item]);
                i++;
                k++;

                var product = data[items].products[item];

                // for(var y = 0; y < items.products.length; y++)
                // {
                //     var item = items.products[y];
                let gia = product.gia_buon;

                if (this.state.isActive == 'Giá nhập') gia = product.gia_nhap;
                if (this.state.isActive == 'Giá lẻ') gia = product.gia_le;
                if (this.state.isActive == 'Giá CTV') gia = product.gia_ctv;

                tmp.push(
                    <TouchableOpacity style={styles.cardItem} onPress={() => this.gotoProductDetail(product.id)} >
                        <Image style={styles.thumbnail} source={{ uri: product.image }}></Image>
                        <View style={styles.card_content}>
                            <Text style={styles.namesp}>{product.title}</Text>
                            <Text style={styles.pricesp}>{gia}</Text>
                        </View>
                    </TouchableOpacity>
                )

                if (i == 3 || n == k) {

                    d.push(
                        <View style={styles.columnContainer}>
                            {tmp}
                        </View>
                    )
                    tmp = new Array();
                    i = 0;
                }
                // }
            }
        }



        // d.push(
        //     <View style={styles.columnContainer}>
        //         <TouchableOpacity style={styles.cardItem} onPress={() => navigation.navigate('EditQuantity')} >
        //             <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
        //             <View style={styles.card_content}>
        //                 <Text style={styles.namesp}>CODE1</Text>
        //                 <Text style={styles.pricesp}>300.000đ</Text>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity style={styles.cardItem} onPress={() => navigation.navigate('EditQuantity')} >
        //             <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
        //             <View style={styles.card_content}>
        //                 <Text style={styles.namesp}>CODE1</Text>
        //                 <Text style={styles.pricesp}>300.000đ</Text>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity style={styles.cardItem} onPress={() => navigation.navigate('EditQuantity')} >
        //             <Image style={styles.thumbnail} source={require('../../../asset/images/NoImageProduct.png')}></Image>
        //             <View style={styles.card_content}>
        //                 <Text style={styles.namesp}>CODE1</Text>
        //                 <Text style={styles.pricesp}>300.000đ</Text>
        //             </View>
        //         </TouchableOpacity>
        //     </View>

        // );
        return d;
    }

    load_home_products(data) {
        if (JSON.stringify(data) !== "{}") {
            var d = new Array();
            var items = this.load_home_product_items(data);

            d.push(
                <View style={styles.homeBox}>
                    <View style={styles.homeBoxHeader}>
                        <Text style={styles.homeTilte}>Sản phẩm mới render tu Fc</Text>
                        <TouchableOpacity onPress={() => this.goToAllofCate()} >
                            <Text style={styles.btnViewMore}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <Swiper style={styles.swiperContainer} showsPagination={false} autoplay={false} loop={false} showsButtons={false}>
                        {items}
                    </Swiper>
                </View>
            );

            return d;
        }
    }


    gotoBDS(category_id) {
        this.reset_search_conn();
        this.props.filterCategory('set_root', category_id);
        this.props.filterCategory('set_current', category_id);
        this.props.filterCategory('set_label', "Tất cả");
        this.props.navigation.navigate("Batdongsan");
    }

    // renderBoxLogin()
    // {
    //     var ad_pos = 'app_home';

    //     if(this.props.user.uid == '')
    //         return (
    //             <View style={[s.row, styles.homeBoxLogin]}>
    //                 <View style={[s.col12]}>
    //                     <Text style={[styles.homeSlogan]}>Đăng nhập Sóc lửa để không bỏ lỡ các sản phẩm giá rẻ</Text>

    //                     <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
    //                         <Text style={[s.btn, s.btnRed, styles.homeDNN]}>ĐĂNG NHẬP NGAY</Text>
    //                     </TouchableOpacity>

    //                     <TouchableOpacity onPress={()=>this.props.navigation.navigate("Dangky")}>
    //                         <Text style={[s.btn, styles.homeDKTK]}>Đăng ký tài khoản</Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         );

    //     return (
    //         <View style={[s.row, styles.homeBoxLogin]}>
    //             <View style={[s.col12]}>
    //                 <Ads ad_pos={ad_pos} />
    //             </View>
    //         </View>
    //     );
    // }

    goToAllofCate(id) {
        this.props.categoryAction('current_category_id', id);
        this.props.navigation.navigate('ListProduct');
    }

    getColorList = async () => {
        this.setSpinner(true);
        const allColor = await get_all_color();
        const allSize = await get_all_size();



        var arrColor = []
        var arrSize = []

        allColor?.forEach(res => {
            res?.children?.forEach(child => {
                arrColor.push(child);
            })
        })
        this.props.colorAction('update_list_all_color', arrColor);

        allSize?.forEach(res => {
            res?.children?.forEach(child => {
                arrSize.push(child);
            })
        })
        this.props.sizeAction('update_list_all_size', arrSize);






        var objColor = {}
        var objSize = {}

        allColor?.forEach(res => {
            res?.children?.forEach(child => {
                objColor[child.id] = child;
            })
        })
        this.props.colorAction('list_color_object', objColor);

        allSize?.forEach(res => {
            res?.children?.forEach(child => {
                objSize[child.id] = child;
            })
        })
        this.props.sizeAction('list_size_object', objSize);






        this.props.colorAction('current_color_id', allColor[0]?.id);
        this.props.sizeAction('current_size_id', allSize[0]?.id);

        this.setSpinner(false);
    };

    gotoCart() {
        this.props.customerAction('current_customer_id', 0);
        this.props.navigation.navigate('Cart', { numberCart: this.state.cartData.count_cart });
    }

    // async getCart() {
    //     const data = await get_list_cart();
    //     this.props?.cartAction('current_bill_id', data?.data?.bill_id);
    // }

    async getNumberCart() {
        this.setSpinner(true);
        const data = await get_number_cart(this.props.admin.uid);
        this.setState({ cartData: data?.data }, () => {
            this.props?.cartAction('current_cart_bill_id_temp', data?.data?.bill_id);
        });
        this.setSpinner(false);
    }

    setDataSearch = (opt) => {
        this.setState({ dataSearchInput: opt });
    }

    setInputSearch = (opt) => {
        this.setState({ textSearch: opt })
    }

    handleSearch = async (text) => {
        // this.setSpinner(true);
        const data = await search_products({
            key: text,
        });
        // console.log('data search tra ve', data);
        if (data.length === 0) {
            this.setDataSearch(data);
        }
        else {
            this.setDataSearch(data);
        }
        // this.setSpinner(false);
    };

    handleInputChange = async (text) => {
        // const filteredSuggestions = this.state.dataSearch.filter((data) => {
        //     const title = data?.title || '';
        //     const code = data?.code || '';

        //     return (
        //         title.toLowerCase().includes(text.toLowerCase()) ||
        //         code.toLowerCase().includes(text.toLowerCase())
        //     );
        // });
        this.setInputSearch(text);
        clearTimeout(this.typingTimer);

        if (text) {
            // Start a new timer
            this.typingTimer = setTimeout(() => {
                this.handleSearch(text);
            }, this.delay);
        }
        else {
            this.setDataSearch([]);
        }
        // if (text === '') {
        //     this.setDataSearch([]);
        //     this.setInputSearch(text);
        // }
        // else {
        //     this.setInputSearch(text);
        //     this.setSpinner(true);
        //     const data = await search_products({
        //         key: text,
        //     });
        //     console.log(data);
        //     this.setDataSearch(data);
        //     this.setSpinner(false);
        // }

        // console.log('text search', text);

    };

    async getCateHangSuppList() {
        this.setSpinner(true);
        var hangObj = {};
        var cateObj = {};
        var suppObj = {};


        // hang
        const hang = await get_hang({
            u_id: this.props.admin.uid,
        });
        this.props?.hangAction('get_list_hang', hang);
        // hang.forEach(h => {
        //     hangObj[h.id] = h
        // })
        // this.props?.hangAction('list_hang_object', hangObj);



        // category
        const cate = await get_category({
            u_id: this.props.admin.uid,
        });
        this.props.categoryAction('get_list_category', cate);
        // console.log(cate);

        // cate.forEach(c => {
        //     // console.log(c);
        //     cateObj[c.Category.id] = c;
        //     c.children.forEach(cChild => {
        //         cateObj[cChild.Category.id] = cChild;
        //         cChild.children.forEach(cChildren => {
        //             cateObj[cChildren.Category.id] = cChildren;
        //         })
        //     })
        // });
        // this.props?.categoryAction('list_category_object', cateObj);





        // supplier
        const supp = await get_all_supplier({
            u_id: this.props.admin.uid,
        });
        this.props?.supplierAction('get_list_supplier', supp);
        // supp.forEach(s => {
        //     suppObj[s.id] = s
        // })
        // this.props?.supplierAction('list_supplier_object', suppObj);
        this.setSpinner(false);
    }

    async getListCustomer() {
        this.setSpinner(true);
        const data = await get_all_customer({
            u_id: this.props.admin.uid,
        });
        this.props?.customerAction('get_list_customer', data);
        this.setSpinner(false);
    }

    async getListUsers() {
        this.setSpinner(true);
        const data = await get_user_list('', this.props.admin.uid,);
        this.props?.accountAction('set_list_user', data);
        this.setSpinner(false);
    }

    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { type, typeCase, cartData, spinner } = this.state;
        const dataSearch = this.state.dataSearch;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.headerLeft} onPress={() => {
                            if (this.props.admin.roles?.includes('cart_list') || this.props.admin.is_admin == 1) {
                                this.gotoCart()
                            }
                            else {
                                Alert.alert('Bạn không phép thực hiện hành động này!');
                            }
                        }}>
                            <View style={styles.gioHang}>
                                <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M15.375 14.375H6.45313L4.27344 2.39063C4.24793 2.2471 4.17307 2.11701 4.06179 2.02285C3.95051 1.9287 3.80982 1.8764 3.66406 1.875H2.25" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M7.25 17.5C8.11294 17.5 8.8125 16.8004 8.8125 15.9375C8.8125 15.0746 8.11294 14.375 7.25 14.375C6.38706 14.375 5.6875 15.0746 5.6875 15.9375C5.6875 16.8004 6.38706 17.5 7.25 17.5Z" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M15.375 17.5C16.2379 17.5 16.9375 16.8004 16.9375 15.9375C16.9375 15.0746 16.2379 14.375 15.375 14.375C14.5121 14.375 13.8125 15.0746 13.8125 15.9375C13.8125 16.8004 14.5121 17.5 15.375 17.5Z" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M5.88281 11.25H15.6953C15.9875 11.2509 16.2706 11.1488 16.4949 10.9616C16.7193 10.7744 16.8704 10.5142 16.9219 10.2266L17.875 5H4.75" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                                <Text style={styles.soLuong}>{cartData.count_cart}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.headerCenter}>
                            <Svg style={styles.iconSearch} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M20.043 18.3752L14.9047 13.2369C15.9367 11.8587 16.5553 10.1532 16.5553 8.29915C16.5553 3.73938 12.8589 0.0429688 8.29915 0.0429688C3.73938 0.0429688 0.0429688 3.73938 0.0429688 8.29915C0.0429688 12.8589 3.73938 16.5553 8.29915 16.5553C10.1532 16.5553 11.8587 15.9367 13.2369 14.9047L18.3752 20.043L20.043 18.3752ZM2.40188 8.29915C2.40188 5.04739 5.04739 2.40188 8.29915 2.40188C11.5509 2.40188 14.1964 5.04739 14.1964 8.29915C14.1964 11.5509 11.5509 14.1964 8.29915 14.1964C5.04739 14.1964 2.40188 11.5509 2.40188 8.29915Z" fill="#848484" />
                            </Svg>
                            <TextInput
                                onFocus={() => this.handleInputFocus()}
                                style={styles.inputsearch}
                                placeholder="Tìm kiếm"
                                value={this.state.textSearch}
                                onChangeText={(text) => this.handleInputChange(text)}
                            />
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.bntTest} onPress={() => this.setModalVisible(true)}>
                                <Text style={styles.btnText}>{typeCase[type]}</Text>
                            </TouchableOpacity>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!this.state.modalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Chọn loại giá</Text>
                                        <TouchableOpacity onPress={() => this.handleActive(1)}>
                                            <Text style={[styles.txtFilter, type === 1 && styles.activeCL]}>Giá nhập</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive(2)}>
                                            <Text style={[styles.txtFilter, type === 2 && styles.activeCL]}>Giá buôn</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive(3)}>
                                            <Text style={[styles.txtFilter, type === 3 && styles.activeCL]}>Giá lẻ</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleActive(4)}>
                                            <Text style={[styles.txtFilter, type === 4 && styles.activeCL]}>Giá CTV</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.centeredView1}>
                                    <TouchableOpacity onPress={this.state.Cancel}>
                                        <Text style={styles.txtClose}>Hủy bỏ</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(!this.state.modalVisible)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                        </View>
                    </View >
                    {this.state.isInputFocused && (
                        <View style={styles.modalOverlay}>
                            <View style={styles.modal}>
                                <ScrollView>
                                    {
                                        this.state.dataSearchInput.length === 0 ?
                                            (
                                                // this.state.dataSearch?.map((d, index) => (
                                                //     // console.log(d),
                                                //     <TouchableOpacity key={index} onPress={() => this.gotoDetail(d?.id, type, d?.price_nhap, d?.price_buon, d?.price_le, d?.price_ctv)}>
                                                //         <View style={styles.cardItemS}>
                                                //             <Image style={styles.thumbnail2} source={d?.image === null || d?.image?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>

                                                //             <View style={styles.cardContent}>
                                                //                 <View style={styles.itemInfo}>
                                                //                     <Text style={[styles.clback, styles.name]}>{d?.code} - {d?.title}</Text>
                                                //                     <Text style={{ color: '#000' }}>Giá: {
                                                //                         type === 1 ? d?.price_nhap_txt :
                                                //                             type === 2 ? d?.price_buon_txt :
                                                //                                 type === 3 ? d?.price_le_txt :
                                                //                                     type === 4 ? d?.price_ctv_txt : ''
                                                //                     } đ</Text>
                                                //                     <Text style={{ color: '#000' }}>Tồn: {d?.totle_buy ? Number(d?.totle_buy).toLocaleString() : 0} / {d?.totle_quan ? Number(d?.totle_quan).toLocaleString() : 0}</Text>
                                                //                 </View>
                                                //                 <View style={styles.date}>
                                                //                     <Text style={{ fontSize: 11 }}>Ngày về :  {d?.ngaynhap?.split(' ')[0]}</Text>
                                                //                 </View>
                                                //             </View>
                                                //         </View>
                                                //     </TouchableOpacity>
                                                // ))
                                                <View style={{ padding: 30, alignItems: 'center' }}>
                                                    <Text style={{ color: '#000' }}>Không có sản phẩm nào</Text>
                                                </View>
                                            ) : (
                                                this.state.dataSearchInput?.map((d, index) => (
                                                    <TouchableOpacity key={index} onPress={() => this.gotoDetail(d?.id, type, d?.price_nhap, d?.price_buon, d?.price_le, d?.price_ctv)}>
                                                        <View style={styles.cardItemS}>
                                                            <Image style={styles.thumbnail2} source={d?.image === null || d?.image?.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>
                                                            <View style={styles.cardContent}>
                                                                <View style={styles.itemInfo}>
                                                                    <Text style={[styles.clback, styles.name]}>{d?.code} - {d?.title}</Text>
                                                                    <Text style={{ color: '#000' }}>Giá: {
                                                                        type === 1 ? d?.price_nhap_txt :
                                                                            type === 2 ? d?.price_buon_txt :
                                                                                type === 3 ? d?.price_le_txt :
                                                                                    type === 4 ? d?.price_ctv_txt : ''
                                                                    } đ</Text>
                                                                    <Text style={{ color: '#000' }}>Tồn: {d?.totle_buy ? Number(d?.totle_buy).toLocaleString() : 0} / {d?.totle_quan ? Number(d?.totle_quan).toLocaleString() : 0}</Text>
                                                                </View>
                                                                <View style={styles.date}>
                                                                    <Text style={{ fontSize: 11 }}>Ngày về :{d?.ngaynhap?.split(' ')[0]}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            )
                                    }
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setInputFocused(false)}><Text style={{ color: "#0c8ce9", fontWeight: '600' }}>Đóng tìm kiếm</Text></TouchableOpacity>
                                </ScrollView>
                            </View>
                            <TouchableOpacity style={styles.modalBackdropFI} onPress={() => this.setInputFocused(false)} />
                        </View>

                    )}
                    <ScrollView>

                        {data?.map((d, index) => (
                            // console.log(d),
                            d?.products?.length !== 0 && (
                                <View key={index} style={styles.homeBox}>
                                    <View style={styles.homeBoxHeader}>
                                        <Text style={styles.homeTilte}>{d.category_title}</Text>
                                        <TouchableOpacity onPress={() => this.goToAllofCate(d?.id)} >
                                            <Text style={styles.btnViewMore}>Xem tất cả</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <ScrollView horizontal={true}>
                                        <View style={styles.columnContainerxxx}>
                                            {
                                                d?.products?.map((product, index) => (
                                                    // console.log(product),
                                                    <TouchableOpacity key={index} style={styles.cardItem1} onPress={() => this.gotoProductDetail(product?.id, type, product?.price_nhap, product?.price_buon, product?.price_le, product?.price_ctv)} >
                                                        {/* <Image style={styles.thumbnail1} source={product?.image === null || product?.image.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: product?.image }}></Image> */}
                                                        {/* <Image style={styles.thumbnail1} source={product?.image === null || product?.image.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: product?.image }}></Image> */}
                                                        <FastImage style={styles.thumbnail1} source={product?.image === null || product?.image.trim() === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: product?.image }} />
                                                        <View style={styles.card_content}>
                                                            <Text style={styles.namesp} numberOfLines={1}>{product?.code}</Text>
                                                            <Text style={styles.pricesp}>{
                                                                type === 1 ? product?.price_nhap2 :
                                                                    type === 2 ? product?.price_buon2 :
                                                                        type === 3 ? product?.price_le2 :
                                                                            type === 4 ? product?.price_ctv2 : ''
                                                            } đ</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    </ScrollView>
                                </View>
                            )
                        ))}
                        {/* {this.load_home_products()} */}
                    </ScrollView>

                    <TouchableOpacity onPress={() => navigation.navigate('FilterCategory')} style={styles.btnFilter}>
                        <Svg style={styles.iconfilter} width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M11.7188 6.09375C11.6079 4.89022 11.0779 3.76386 10.2211 2.91138C9.36433 2.0589 8.23532 1.53447 7.03125 1.42969V0H6.09375V1.42969C4.89387 1.53967 3.77039 2.06639 2.91839 2.91839C2.06639 3.77039 1.53967 4.89387 1.42969 6.09375H0V7.03125H1.42969C1.53447 8.23532 2.0589 9.36433 2.91138 10.2211C3.76386 11.0779 4.89022 11.6079 6.09375 11.7188V13.125H7.03125V11.7188C8.23897 11.6131 9.37087 11.0854 10.2281 10.2281C11.0854 9.37087 11.6131 8.23897 11.7188 7.03125H13.125V6.09375H11.7188ZM6.5625 10.7812C5.72811 10.7812 4.91246 10.5338 4.21869 10.0703C3.52492 9.6067 2.98419 8.94782 2.66488 8.17695C2.34558 7.40607 2.26203 6.55782 2.42481 5.73946C2.58759 4.92111 2.98939 4.1694 3.57939 3.57939C4.1694 2.98939 4.92111 2.58759 5.73946 2.42481C6.55782 2.26203 7.40607 2.34558 8.17695 2.66488C8.94782 2.98419 9.6067 3.52492 10.0703 4.21869C10.5338 4.91246 10.7812 5.72811 10.7812 6.5625C10.7812 7.68138 10.3368 8.75444 9.54561 9.54561C8.75444 10.3368 7.68138 10.7812 6.5625 10.7812Z" strokeWidth="2" fill="white" />
                        </Svg>
                    </TouchableOpacity>

                    <SpinnerComponent
                        spinner={spinner}
                    />

                    {/* </SpinnerComponent> */}


                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
}
const mapStateToProps = state => ({
    product: state.product,
    color: state.color,
    size: state.size,
    customer: state.customer,
    cart: state.cart,
    category: state.category,
    hang: state.hang,
    supplier: state.supplier,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    colorAction: (act, data) => dispatch(colorAction(act, data)),
    sizeAction: (act, data) => dispatch(sizeAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
    cartAction: (act, data) => dispatch(cartAction(act, data)),
    categoryAction: (act, data) => dispatch(categoryAction(act, data)),
    hangAction: (act, data) => dispatch(hangAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
    accountAction: (act, data) => dispatch(accountAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(Home)
