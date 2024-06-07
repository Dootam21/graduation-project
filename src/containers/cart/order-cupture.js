/**
 * React Native App
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
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    FlatList,
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Switch,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import { get_list_cart_bill_id, get_thu_detail } from '../../services/cartService';
import CartComponent from './CartComponent';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import App from '../../../App';

class OrderCupture extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            showItem: false,
            customerName: 'Khách mới',
            customerPhone: '',
        }
    }

    componentDidMount() {
        this.getData();
    }

    setShowItem(opt) {
        this.setState({ showItem: opt });
    }

    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }

    async getData() {
        const dataLog = await get_list_cart_bill_id({
            u_id: this.props.admin.uid,
            bill_id: this.props.cart.bill_id,
        });
        console.log('orderlist', dataLog);
        this.setState({ data: dataLog.data });
        const newColorList = this.props.color.listAllColor?.filter(color =>
            this.state.data?.data?.order_list?.map((order) => {
                order?.list_quantity?.some(quantity => quantity.color_id === color.id);
            })
        );
        this.setState({ colorList: newColorList });
        const customerName = this.props.customer.listCustomers?.find(customer => customer.id === this.props.customer.id);
        this.setState({ customerName: customerName?.fullname });
        this.setState({ customerPhone: customerName?.phone[0] });
        if (this.props?.cart?.status == 3) {
            const getThuDetail = await get_thu_detail({
                u_id: this.props.admin.uid,
                thu_id: this.props?.cart?.thu_id,
            });
            this.setState({ dataThu: getThuDetail?.data });
            console.log(getThuDetail?.data);
        }
    }

    viewShotRef = React.createRef();

    saveCapturedImage = () => {
        this.viewShotRef.current.capture().then(async (uri) => {
            // if (Platform.OS === 'android') {
            //     const granted = await App.getPermissionAndroid();
            //     if (!granted) {
            //         return;
            //     }
            // }

            // cameraroll saves image
            const image = CameraRoll.save(uri, 'photo');
            console.log(image);
            if (image) {
                Alert.alert('Thông báo', 'Lưu ảnh thành công.',
                    [{ text: 'OK', onPress: () => { } }],
                    { cancelable: false },
                );
            }
        });
    };


    shareImages() {
        this.viewShotRef.current.capture().then(uri => {
            const options = {
                url: uri,
            }
            // console.log(Share.open(options));
            Share.open(options)
        });
    }

    gotoEditQuantity() {
        this.props.navigation.navigate('Quantity');
    }


    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { customerName, customerPhone, image, dataThu } = this.state

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

                        <Text style={styles.title}>Chụp ảnh đơn hàng</Text>

                        <View style={[styles.headerRight]}>

                        </View>
                    </View >


                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <ViewShot ref={this.viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                            <View style={styles.client}>
                                <TouchableOpacity style={styles.customer}>
                                    <Text style={styles.hText}>{this.props?.customer?.id == 0 ? 'Khách mới' : customerName}</Text>
                                    {
                                        this.props.admin.is_show_phone_cus == 1 &&
                                        <Text style={styles.hText}>{this.props?.customer?.id == 0 ? 'Không có số' : customerPhone}</Text>
                                    }
                                </TouchableOpacity>
                                {
                                    this.props.cart.status == 3 &&
                                    (
                                        <View>
                                            <Text style={styles.listItem}>Thông tin chi tiết</Text>
                                            <View style={{ backgroundColor: '#fff' }}>
                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                    <Text style={styles.textSubf}>Mã:</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>#THTP_{data?.bill_id}</Text>
                                                </View>
                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                    <Text style={styles.textSubf}>Phụ thu:</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.phuthu).toLocaleString()}</Text>
                                                </View>
                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                    <Text style={styles.textSubf}>Phụ chi:</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.phuchi)?.toLocaleString()}</Text>
                                                </View>
                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                    <Text style={styles.textSubf}>Khách trả:</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.tienmat)?.toLocaleString()}</Text>
                                                </View>
                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                    <Text style={styles.textSubf}>Chuyển khoản:</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.chuyenkhoan)?.toLocaleString()}</Text>
                                                </View>
                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                    <Text style={styles.textSubf}>Người tạo:</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>{dataThu?.user_name}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    )
                                }
                                <View style={{ backgroundColor: '#fff' }}>
                                    <Text style={styles.txtNote}>Ghi chú : {data?.ghi_chu ? data?.ghi_chu : 'chưa có ghi chú'}</Text>
                                </View>
                                {
                                    this.props.cart.status == 3 && this.props.admin.is_show_debt == 1 &&
                                    (
                                        <View>
                                            <Text style={styles.listItem}>Thông tin nợ</Text>
                                            <View style={{ backgroundColor: '#fff' }}>
                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                    <Text style={styles.textSubf}>Nợ trước đơn:</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>{dataThu?.notruocdon.toLocaleString()} đ</Text>
                                                </View>
                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                    <Text style={styles.textSubf}>Nợ sau đơn:</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.debt).toLocaleString()} đ</Text>
                                                </View>
                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                    <Text style={styles.textSubf}>Ngày hẹn nợ:</Text>
                                                    <Text style={[styles.bold, styles.textSubf]}>{dataThu?.ngaytrano}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    )
                                }
                                <Text style={styles.listItem}>Danh sách hàng</Text>
                                {
                                    data?.order_list?.map((product, index) => (
                                        <CartComponent
                                            key={index}
                                            productItem={product}
                                            data={data}
                                            reloadData={() => this.getData()}
                                            gotoQuantity={() => this.gotoEditQuantity()}
                                            gotoProductDetails={() => this.gotoProductDetails()}
                                            disableFunction={true}
                                            openDetail={true}
                                            goBack={() => this.props.navigation.pop()}
                                        >
                                        </CartComponent>
                                    ))
                                }
                            </View>


                            <View style={{ backgroundColor: "#F1F8FF" }}>
                                <View style={[styles.flexRow, styles.borderBottom]}>
                                    <Text style={styles.textSubf}>Tổng số Sp:</Text>
                                    <Text style={[styles.bold, styles.textSubf]}>{data?.soluongsp}/{data?.tongsanpham}</Text>
                                </View>
                                <View style={[styles.flexRow, styles.borderBottom]}>
                                    <Text style={styles.textSubf}>Tổng tiền:</Text>
                                    <Text style={[styles.bold, styles.textSubf]}>{data?.toltal_price} đ</Text>
                                </View>
                            </View>

                        </ViewShot>
                    </ScrollView>

                    <View>
                        {/* <TouchableOpacity>
                            <Text style={styles.btnShare}>Chia sẻ kèm link</Text>
                        </TouchableOpacity> */}
                        <View style={styles.flexRowBtn}>
                            <TouchableOpacity onPress={() => this.shareImages()}>
                                <Text style={[styles.btnShare, styles.btnShareW50]}>Chia sẻ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.saveCapturedImage}>
                                <Text style={[styles.btnShare, styles.btnShareW50]}>Lưu ảnh</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    };
};

const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
    cart: state.cart,
    color: state.color,
    size: state.size,
    customer: state.customer
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(OrderCupture)

