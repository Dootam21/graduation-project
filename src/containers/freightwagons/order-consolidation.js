/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import Search from '../elements/Search';
import Swipeout from 'react-native-swipeout';
import ModalFW from '../elements/ModalFW';
import { connect } from 'react-redux';
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
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import OrderDetail from '../cart/order-details';
import DatePickerComponent from '../elements/DatePickerComponent';
import { get_wagons, get_wagons_history } from '../../services/cartService';

var from = 0;
const limit = 10;
var stopLoadData = false;

const ListFooterComponent = () => (
    <Text
        style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingTop: 0,
            paddingBottom: 15,
            marginTop: 15
        }}
    >
        Đang Tải ...
    </Text>
);

class OrderConsolidation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedButton: null,
            selectedDate: '',
            modalFilterFW: false,
            dataSearch: [],
            textSearch: '',
            loadingMore: false,
            stopFetchMore: true,
        }
    }


    componentDidMount() {
        from = 0;
        this.getData(this.props.customer.id);
        this.props.navigation.addListener(
            'focus',
            () => {
                from = 0;
                this.getData(this.props.customer.id);
            }
        );
    }

    setSelectedButton = (opt) => {
        this.setState({ selectedButton: opt });
    }

    setSelectedDate = (opt) => {
        this.setState({ selectedDate: opt });
    }

    setModalFilterFW = (opt) => {
        this.setState({ modalFilterFW: opt });
    }

    handleButtonPress = (buttonName) => {
        this.setSelectedButton(buttonName);
    };

    handleDateChange = (date) => {
        this.setSelectedDate(date);
    };

    gotoPage = (name) => {
        this.props.navigation.navigate(name);
    }

    // listBill = () => {
    //     var items = new Array();
    //     for (var i = 0; i < 2; i++) {
    //         items.push(
    //             <Swipeout key={i} right={[
    //                 {
    //                     text: 'Coppy',
    //                     onPress: () => {
    //                         // Xử lý hành động xóa
    //                     },
    //                     backgroundColor: 'grey',
    //                     color: 'white',
    //                 },
    //                 {
    //                     text: 'Xóa',
    //                     onPress: () => {
    //                         // Xử lý hành động chỉnh sửa
    //                     },
    //                     backgroundColor: 'red',
    //                     color: 'white',
    //                 },
    //             ]} >
    //                 <TouchableOpacity onPress={() => this.gotoPage("OrderDetail")}>
    //                     <View style={styles.cardItem}>
    //                         <View style={styles.cardLeft}>
    //                             <Text style={styles.customer}>Khách mời</Text>
    //                             <Text style={styles.txt}>12 sản phẩm</Text>
    //                             <Text style={styles.txt}>#01052023_KXCF</Text>
    //                             <Text style={{ color: "#DE110E" }}>Note: A cong</Text>
    //                         </View>
    //                         <View style={styles.cardRight}>
    //                             <Text style={styles.price}>4.200.000 đ</Text>
    //                             <View style={[styles.status, styles.pending]}>
    //                                 <Text style={styles.textStatus}>Chờ xác nhận</Text>
    //                             </View>
    //                             <Text style={styles.author}>Nhặt bời Minh | Tạo bởi Cuong 1/5 lúc 18:45</Text>
    //                         </View>
    //                     </View>
    //                 </TouchableOpacity>
    //             </Swipeout>
    //         )
    //     }

    //     return items;
    // }


    async getData(customer_id) {
        if (this.props?.route?.params?.getHistory) {
            const dataLog = await get_wagons_history({
                u_id: this.props.admin.uid,
                customer_id: customer_id,
                id: this.props.product.id,
                from: from,
                nhat_tai_cua_hang: 1,
            });
            this.setState({ data: dataLog?.data });
            // console.log(dataLog);

        }
        else {
            if (this.props.admin.roles?.includes('order_list') || this.props.admin.is_admin == 1) {
                const dataLog = await get_wagons({
                    u_id: this.props.admin.uid,
                    customer_id: customer_id,
                    from: from,
                    nhat_tai_cua_hang: 1,
                });
                this.setState({ data: dataLog?.data });
                // console.log(dataLog);
            }
            else {
                Alert.alert('Bạn không phép thực hiện hành động này!');
            }

        }
        from = 0 + limit;
    }

    async handleOnEndReached() {
        this.setState({ loadingMore: true });//(true);
        var dataFrom = '';
        var dataTo = '';
        if (this.state.dayFrom !== "") {
            dataFrom = new Date(this.state.dayFrom).toISOString().split('T')[0];
        }
        if (this.state.dayTo !== "") {
            dataTo = new Date(this.state.dayTo).toISOString().split('T')[0];
        }

        console.log('handleOnEndReached...........');
        console.log(from);
        if (!this.state.stopFetchMore) {
            console.log('from...........');
            console.log(from);

            var newData = [];
            if (this.props?.route?.params?.getHistory) {
                newData = await get_wagons_history({
                    u_id: this.props.admin.uid,
                    customer_id: this.props?.customer?.id,
                    id: this.props.product.id,
                    from: from,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    user_id: this.state.user_id,
                    nhat_tai_cua_hang: 1,
                });
            }
            else {
                newData = await get_wagons({
                    u_id: this.props.admin.uid,
                    customer_id: this.props?.customer?.id,
                    from: from,
                    status: this.state.status,
                    day_from: dataFrom,
                    day_to: dataTo,
                    user_id: this.state.user_id,
                    nhat_tai_cua_hang: 1,
                });
            }

            from = from + limit;

            if (newData === false) {
                stopLoadData = true;
                this.setState({ loadingMore: false });
                return false;
            }
            else {
                if (newData.data.length > 0) {
                    this.setState({ data: [...this.state.data, ...newData.data] });
                }
            }
            this.setState({ stopFetchMore: true });// = true;
        }

        this.setState({ loadingMore: false });
    }

    setInputSearch = (opt) => {
        this.setState({ textSearch: opt })
    }
    setDataSearch = (opt) => {
        this.setState({ dataSearch: opt })
    }

    handleInputChange = (text) => {
        this.setInputSearch(text);
        var phone = '';
        const filteredSuggestions = this.state.data.filter((data) => {
            const fullName = data?.customer_fullname || 'Khách mới';
            const code = data?.code || '';
            const ghi_chu = data?.ghi_chu || '';
            if (this.props.admin.is_show_phone_cus == 1) {
                phone = data?.customer_phone || '';
            } else {
                phone = '';
            }

            return (
                fullName.toLowerCase().includes(text.toLowerCase()) ||
                phone.toLowerCase().includes(text.toLowerCase()) ||
                code.toLowerCase().includes(text.toLowerCase()) || 
                ghi_chu.toLowerCase().includes(text.toLowerCase())
            );
        });

        this.setDataSearch(filteredSuggestions);
    };

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }


    render() {
        const { data, loadingMore, dataSearch, textSearch } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft2}>
                            <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.goBack()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title2} >Tổng hợp đơn nhặt tại cửa hàng</Text>

                        <View style={styles.headerRight2}>
                            <TouchableOpacity onPress={() => this.gotoPage('AddProduct')}>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8 1V15" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M1 8H15" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View >
                    <View>
                        <TextInput
                            style={[styles.item111, styles.search]}
                            placeholder="Tìm kiếm..."
                            placeholderTextColor="#C5C4C9"
                            onChangeText={(text) => this.handleInputChange(text)}
                        />
                        <Svg style={styles.iconSearch} width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M20.043 18.3752L14.9047 13.2369C15.9367 11.8587 16.5553 10.1532 16.5553 8.29915C16.5553 3.73938 12.8589 0.0429688 8.29915 0.0429688C3.73938 0.0429688 0.0429688 3.73938 0.0429688 8.29915C0.0429688 12.8589 3.73938 16.5553 8.29915 16.5553C10.1532 16.5553 11.8587 15.9367 13.2369 14.9047L18.3752 20.043L20.043 18.3752ZM2.40188 8.29915C2.40188 5.04739 5.04739 2.40188 8.29915 2.40188C11.5509 2.40188 14.1964 5.04739 14.1964 8.29915C14.1964 11.5509 11.5509 14.1964 8.29915 14.1964C5.04739 14.1964 2.40188 11.5509 2.40188 8.29915Z" fill="#848484" />
                        </Svg>
                    </View>
                    <View style={styles.containerFluid}>
                        <View style={styles.cardGroup}>
                            <FlatList
                                data={textSearch === '' ? data : dataSearch}
                                keyExtractor={(item, index) => index}
                                numColumns={1}
                                renderItem={({ item }) => {
                                    let d = item;
                                    // console.log(d?.code, d?.c_type == 3);
                                    if (!d.id)
                                        return;
                                    else
                                        if (textSearch === '')

                                            return (
                                                <Swipeout right={[
                                                    {
                                                        text: 'Sao chép',
                                                        onPress: () => {
                                                            if (this.props.admin.roles?.includes('order_copy') || this.props.admin.is_admin == 1) {
                                                                this.handleOpenConfirmCopy(d?.id);
                                                            }
                                                            else {
                                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                                            }
                                                        },
                                                        backgroundColor: 'grey',
                                                        color: 'white',
                                                    },
                                                    {
                                                        text: 'Xóa',
                                                        onPress: () => {
                                                            if (this.props.admin.roles?.includes('order_delete') || this.props.admin.is_admin == 1) {
                                                                this.handleOpenConfirmDelete(d?.id);
                                                            }
                                                            else {
                                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                                            }
                                                        },
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                    },
                                                ]} >
                                                    <TouchableOpacity onPress={() => {
                                                        if (this.props.admin.roles?.includes('order_detail') || this.props.admin.is_admin == 1) {
                                                            this.gotoDetail(d?.id, d?.customer_id, d?.thu_id, d?.status, d);
                                                        }
                                                        else {
                                                            Alert.alert('Bạn không phép thực hiện hành động này!');
                                                        }
                                                    }}>
                                                        <View style={styles.cardItem}>
                                                            <View style={styles.cardLeft}>
                                                                <Text style={styles.customer}>{d?.customer_fullname ? d?.customer_fullname : 'Khách mới'}</Text>
                                                                {
                                                                    this.props.admin.is_show_phone_cus == 1 &&
                                                                    <Text style={styles.txt}>{d?.customer_phone}</Text>
                                                                }
                                                                <Text style={styles.txt}>{d?.totle_quan ? d?.totle_quan : 0} sản phẩm</Text>
                                                                <Text style={styles.txt}>{d?.code}</Text>
                                                                {
                                                                    d?.ghi_chu != null &&
                                                                    <Text style={{ color: "#DE110E" }}>Note: {d?.ghi_chu}</Text>
                                                                }
                                                            </View>


                                                            <View style={styles.cardRight}>
                                                                <Text style={styles.price}>{d?.totle_price} đ</Text>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                                    {
                                                                        d?.nhat_lai == 1 && (
                                                                            <View style={{ marginRight: 10 }}>
                                                                                <Svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <Path d="M9.66473 1.76843L0.541165 17.5698C0.376361 17.8551 0.289581 18.1788 0.289551 18.5083C0.28952 18.8379 0.37624 19.1616 0.540991 19.447C0.705742 19.7323 0.942718 19.9693 1.2281 20.1341C1.51347 20.2988 1.8372 20.3856 2.16672 20.3855H20.4124C20.7419 20.3856 21.0656 20.2988 21.351 20.1341C21.6364 19.9693 21.8734 19.7323 22.0381 19.447C22.2029 19.1616 22.2896 18.8379 22.2896 18.5083C22.2895 18.1788 22.2027 17.8551 22.0379 17.5698L12.9153 1.76843C12.7506 1.48313 12.5137 1.24622 12.2284 1.08151C11.9431 0.916793 11.6195 0.830078 11.29 0.830078C10.9606 0.830078 10.637 0.916793 10.3517 1.08151C10.0664 1.24622 9.82946 1.48313 9.66473 1.76843Z" fill="#EE404C" />
                                                                                    <Path d="M11.4093 6.64062H11.1713C10.5853 6.64062 10.1104 7.11562 10.1104 7.70156V12.7726C10.1104 13.3586 10.5853 13.8336 11.1713 13.8336H11.4093C11.9952 13.8336 12.4702 13.3586 12.4702 12.7726V7.70156C12.4702 7.11562 11.9952 6.64062 11.4093 6.64062Z" fill="#FFF7ED" />
                                                                                    <Path d="M11.2903 17.8559C11.9419 17.8559 12.4702 17.3277 12.4702 16.676C12.4702 16.0244 11.9419 15.4961 11.2903 15.4961C10.6386 15.4961 10.1104 16.0244 10.1104 16.676C10.1104 17.3277 10.6386 17.8559 11.2903 17.8559Z" fill="#FFF7ED" />
                                                                                </Svg>
                                                                            </View>
                                                                        )
                                                                    }
                                                                    {d?.status == 0 ?
                                                                        <View style={{ ...styles.status, ...styles.pending }}>
                                                                            <Text style={styles.textStatus}>Chờ xác nhận</Text>
                                                                        </View> :
                                                                        d?.status == 1 ?
                                                                            <View style={{ ...styles.status, backgroundColor: 'black' }}>
                                                                                <Text style={styles.textStatus}>Chờ nhặt hàng
                                                                                    {/* {
                                                                                    d?.c_type == 3 && (
                                                                                        <Text style={styles.textRed}>(Đặt cọc)</Text>
                                                                                    )
                                                                                } */}
                                                                                </Text>
                                                                            </View> :
                                                                            d?.status == 2 ?
                                                                                <View style={{ ...styles.status, backgroundColor: '#F1C40F' }}>
                                                                                    <Text style={styles.textStatus}>Đã nhặt
                                                                                        {/* {
                                                                                        d?.c_type == 3 && (
                                                                                            <Text style={styles.textRed}>(Đặt cọc)</Text>
                                                                                        )
                                                                                    } */}
                                                                                    </Text>
                                                                                    <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                                </View> :
                                                                                d?.status == 3 ?
                                                                                    <View style={{ ...styles.status, backgroundColor: 'green' }}>
                                                                                        <Text style={styles.textStatus}>Hoàn tất</Text>
                                                                                        <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                                    </View> :
                                                                                    d?.status == 5 ?
                                                                                        <View style={{ ...styles.status, backgroundColor: 'grey' }}>
                                                                                            <Text style={styles.textStatus}>Toa nháp</Text>
                                                                                            <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                                        </View> : <></>
                                                                    }
                                                                </View>

                                                                <Text style={styles.author}>Tạo bởi {d?.user_name} </Text>
                                                                <Text style={styles.author}>{d?.created} </Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </Swipeout>
                                            )
                                        else
                                            return (
                                                <Swipeout right={[
                                                    {
                                                        text: 'Sao chép',
                                                        onPress: () => {
                                                            if (this.props.admin.roles?.includes('order_copy') || this.props.admin.is_admin == 1) {
                                                                this.handleOpenConfirmCopy(d?.id);
                                                            }
                                                            else {
                                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                                            }
                                                        },
                                                        backgroundColor: 'grey',
                                                        color: 'white',
                                                    },
                                                    {
                                                        text: 'Xóa',
                                                        onPress: () => {
                                                            if (this.props.admin.roles?.includes('order_delete') || this.props.admin.is_admin == 1) {
                                                                this.handleOpenConfirmDelete(d?.bill_id);
                                                            }
                                                            else {
                                                                Alert.alert('Bạn không phép thực hiện hành động này!');
                                                            }
                                                        },
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                    },
                                                ]} >
                                                    <TouchableOpacity onPress={() => {
                                                        if (this.props.admin.roles?.includes('order_detail') || this.props.admin.is_admin == 1) {
                                                            this.gotoDetail(d?.id, d?.customer_id, d?.thu_id, d?.status, d)
                                                        }
                                                        else {
                                                            Alert.alert('Bạn không phép thực hiện hành động này!');
                                                        }
                                                    }}>
                                                        <View style={styles.cardItem}>
                                                            <View style={styles.cardLeft}>
                                                                <Text style={styles.customer}>{d?.customer_fullname != '' ? d?.customer_fullname : 'Khách mới'}</Text>
                                                                {
                                                                    this.props.admin.is_show_phone_cus == 1 &&
                                                                    <Text style={styles.txt}>{d?.customer_phone}</Text>
                                                                }
                                                                <Text style={styles.txt}>{d?.totle_quan} sản phẩm</Text>
                                                                <Text style={styles.txt}>{d?.code}</Text>
                                                                <Text style={{ color: "#DE110E" }}>Note: {d?.ghi_chu}</Text>
                                                            </View>
                                                            <View style={styles.cardRight}>
                                                                <Text style={styles.price}>{d?.totle_price} đ</Text>
                                                                {d?.status == 0 ?
                                                                    <View style={{ ...styles.status, ...styles.pending }}>
                                                                        <Text style={styles.textStatus}>Chờ xác nhận</Text>
                                                                    </View> :
                                                                    d?.status == 1 ?
                                                                        <View style={{ ...styles.status, backgroundColor: 'black' }}>
                                                                            <Text style={styles.textStatus}>Chờ nhặt hàng
                                                                                {/* {
                                                                                    d?.c_type == 3 && (
                                                                                        <Text style={styles.textRed}>(Đặt cọc)</Text>
                                                                                    )
                                                                                } */}
                                                                            </Text>
                                                                        </View> :
                                                                        d?.status == 2 ?
                                                                            <View style={{ ...styles.status, backgroundColor: '#F1C40F' }}>
                                                                                <Text style={styles.textStatus}>Đã nhặt
                                                                                    {/* {
                                                                                        d?.c_type == 3 && (
                                                                                            <Text style={styles.textRed}>(Đặt cọc)</Text>
                                                                                        )
                                                                                    } */}
                                                                                </Text>
                                                                                <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                            </View> :
                                                                            d?.status == 3 ?
                                                                                <View style={{ ...styles.status, backgroundColor: 'green' }}>
                                                                                    <Text style={styles.textStatus}>Hoàn tất</Text>
                                                                                    <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                                </View> :
                                                                                d?.status == 5 ?
                                                                                    <View style={{ ...styles.status, backgroundColor: 'grey' }}>
                                                                                        <Text style={styles.textStatus}>Toa nháp</Text>
                                                                                        <Text style={{ fontSize: 12, color: "#fff" }}>{d?.modified}</Text>
                                                                                    </View> : <></>
                                                                }

                                                                <Text style={styles.author}>Tạo bởi {d?.user_name} lúc {d?.created}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </Swipeout>
                                            )
                                }}
                                onEndReached={() => this.handleOnEndReached()}
                                onEndReachedThreshold={0.5}
                                onScrollBeginDrag={() => {
                                    this.updateStopFetchMore();
                                }}
                                ListFooterComponent={() => loadingMore && <ListFooterComponent />}
                            />

                            {/* {this.listBill()} */}

                        </View>
                    </View>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    product: state.product,
    customer: state.customer,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderConsolidation)
