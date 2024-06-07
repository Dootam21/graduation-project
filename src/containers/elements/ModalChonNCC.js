/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import supplierAction from '../../actions/supplierAction';
import { get_all_supplier } from '../../services/supplierService';
import SpinnerComponent from '../elements/Spinner';
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
    Dimensions,
    Modal
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
import Search from './Search';
import styles from './styles';

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

class ModalChonNCC extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isModalVisible3: false,
            idSupplier: 0,
            titleSupplier: '',
            loadingMore: false,
            spinner: false,
            dataSearchInput: [],
            textSearch: '',
        }
    }
    componentDidMount() {
        from = 0;
        this.getData();
        if (this.props?.route?.params?.modal) {
            this.setModalVisible3(true);
        }
    }

    setData(data) {
        this.setState({ data: data });
    }

    setModalVisible3 = (opt) => {
        this.setState({ isModalVisible3: opt });
    }


    setIdSupplier(opt) {
        this.setState({ idSupplier: opt })
    }

    setTitleSupplier(opt) {
        this.setState({ titleSupplier: opt })
    }

    setSpinner(opt) {
        this.setState({ spinner: opt });
    }
    toggleModal3 = () => {
        this.setModalVisible3(!this.state.isModalVisible3);
    };

    handleChooseHang = (id, title) => {
        this.setIdSupplier(id);
        this.setTitleSupplier(title);
        this.props.setSuppId(id);
        this.setModalVisible3(false);
    }

    async getData() {
        this.setSpinner(true);
        const dataLog = await get_all_supplier('Mặc định', from, this.props.admin.uid);
        this.props?.supplierAction('get_list_supplier', dataLog);
        this.setSpinner(false);
        console.log(dataLog);
        from = 0 + limit;
        this.setData(dataLog);
        dataLog?.map(supplier => {
            if (supplier?.id === this?.props?.idSupp || this.props?.supplier?.id === supplier?.id) {
                this.setTitleSupplier(supplier?.title);
            }
        })
    }

    async handleOnEndReached() {
        this.setState({ loadingMore: true });//(true);

        console.log('handleOnEndReached...........');
        console.log(from);
        if (!this.state.stopFetchMore) {
            console.log('from...........');
            console.log(from);

            const newData = await get_all_supplier('Mặc định', from, this.props.admin.uid);
            from = from + limit;

            if (newData === false) {
                stopLoadData = true;
                this.setState({ loadingMore: false });
                return false;
            }
            else {
                if (newData.length > 0) {
                    this.setState({ data: [...this.state.data, ...newData] });
                }
            }
            this.setState({ stopFetchMore: true });// = true;
        }

        this.setState({ loadingMore: false });
    }

    updateStopFetchMore() {
        if (stopLoadData == true) return;
        this.setState({ stopFetchMore: false });
    }

    setDataSearch = (opt) => {
        this.setState({ dataSearchInput: opt });
    }

    setInputSearch = (opt) => {
        this.setState({ textSearch: opt })
    }

    handleInputChange = (text) => {
        this.setInputSearch(text);
        // console.log('Input Value', text);
        const filteredSuggestions = this.state.data.filter((data) => {
            const title = data?.title || '';
            const phone = data?.phone || '';

            return (
                title.toLowerCase().includes(text.toLowerCase()) ||
                phone.toLowerCase().includes(text.toLowerCase())
            );
        });
        this.setDataSearch(filteredSuggestions)
    };



    render() {
        const navigation = this.props.navigation;
        const { isModalVisible3, idSupplier, titleSupplier, loadingMore, spinner, dataSearchInput, textSearch } = this.state;
        const data = this.state.data;
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    // console.log(this.props?.checkedStatus);
                    if (this.props?.checkedStatus) {
                        return
                    } else {
                        from = 0;
                        this.getData();
                        this.setModalVisible3(true);
                    }
                    // console.log(this.props?.openModal);
                }}>
                    <Text style={styles.listItem}>{titleSupplier ? titleSupplier : 'Chọn nhà cung cấp'}</Text>
                </TouchableOpacity>
                <Modal visible={isModalVisible3} animationType="slide" transparent={true}>
                    <View style={styles.modalContainer2}>

                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <TouchableOpacity style={styles.menu} onPress={() => this.setModalVisible3(false)}>
                                    <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headerCenter}>
                                <Text style={styles.title}>Chọn nhà cung cấp</Text>
                            </View>
                            <View style={styles.headerRight}>
                            </View>
                        </View >

                        <View style={{ backgroundColor: "#f5f5f5" }}>
                            <View style={styles.inputGroup}>
                                <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M14.6339 12.8664L11.4607 9.69323C12.1164 8.70509 12.5001 7.52195 12.5001 6.25007C12.5001 2.80378 9.69635 0 6.25007 0C2.80378 0 0 2.80378 0 6.25007C0 9.69635 2.80378 12.5001 6.25007 12.5001C7.52195 12.5001 8.70509 12.1164 9.69323 11.4607L12.8664 14.6339C13.3539 15.122 14.1464 15.122 14.6339 14.6339C15.122 14.1458 15.122 13.3545 14.6339 12.8664ZM1.87502 6.25007C1.87502 3.83754 3.83754 1.87502 6.25007 1.87502C8.66259 1.87502 10.6251 3.83754 10.6251 6.25007C10.6251 8.66259 8.66259 10.6251 6.25007 10.6251C3.83754 10.6251 1.87502 8.66259 1.87502 6.25007Z" fill="#757575" />
                                </Svg>
                                <TextInput
                                    style={styles.inputsearch}
                                    placeholder="Tìm kiếm"
                                    value={this.state.textSearch}
                                    onChangeText={(text) => this.handleInputChange(text)}
                                />
                            </View>
                        </View>
                        <View style={styles.xxt}>
                            <ScrollView>
                                {
                                    // data?.map((d, index) => (
                                    //     <TouchableOpacity key={index} onPress={() => this.handleChooseHang(d?.id, d?.title)}>
                                    //         <View style={[styles.flexRowNCC]}>
                                    //             <Image style={[styles.thumbnail, styles.avatarCustomer1]} source={d?.image == null || d?.image === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>
                                    //             <View style={styles.textRight}>
                                    //                 <Text style={styles.txtBold}>{d?.title}</Text>
                                    //                 <Text style={styles.clBlack}>{d?.phone}</Text>
                                    //                 <Text style={styles.clBlack}>{d?.address}</Text>
                                    //             </View>
                                    //         </View>
                                    //     </TouchableOpacity>
                                    // ))


                                    <FlatList
                                        data={textSearch === '' ? data : dataSearchInput}
                                        keyExtractor={(item, index) => index}
                                        numColumns={1}
                                        renderItem={({ item }) => {
                                            let d = item;
                                            let index = item.id;
                                            if (!d.id)
                                                return;

                                            else
                                                return (
                                                    <TouchableOpacity key={index} onPress={() => this.handleChooseHang(d?.id, d?.title)}>
                                                        <View style={[styles.flexRowNCC]}>
                                                            <Image style={[styles.thumbnail, styles.avatarCustomer1]} source={d?.image == null || d?.image === "" ? require('../../../asset/images/NoImageProduct.png') : { uri: d?.image }}></Image>
                                                            <View style={styles.textRight}>
                                                                <Text style={styles.txtBold}>{d?.title}</Text>
                                                                {
                                                                    this.props.admin.is_show_phone_supp == 1 &&
                                                                    <Text style={styles.clBlack}>{d?.phone}</Text>
                                                                }
                                                                <Text style={styles.clBlack}>{d?.address}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                        }}
                                        onEndReached={() => this.handleOnEndReached()}
                                        onEndReachedThreshold={0.5}
                                        onScrollBeginDrag={() => {
                                            this.updateStopFetchMore();
                                        }}
                                        ListFooterComponent={() => loadingMore && <ListFooterComponent />}
                                    />
                                }
                                {/* <TouchableOpacity>
                                    <View style={styles.flexRowVMore}>
                                        <Svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M7.06577 6.03738L2.36331 0.959025C2.17411 0.756324 1.90336 0.629353 1.61035 0.605917C1.31733 0.582481 1.02594 0.664489 0.799977 0.833983C0.574014 1.00348 0.431898 1.24664 0.40475 1.51023C0.377602 1.77382 0.467634 2.03635 0.65513 2.24033L6.21166 8.24061C6.31612 8.35311 6.44675 8.44362 6.59433 8.50572C6.74191 8.56782 6.90285 8.60001 7.06577 8.60001C7.22868 8.60001 7.38962 8.56782 7.5372 8.50572C7.68478 8.44362 7.81541 8.35311 7.91987 8.24061L13.4764 2.24033C13.6648 2.03644 13.7555 1.7736 13.7287 1.50953C13.7019 1.24547 13.5597 1.00178 13.3334 0.832001C13.107 0.662222 12.815 0.580236 12.5216 0.604053C12.2281 0.62787 11.9571 0.755543 11.7682 0.959025L7.06577 6.03738Z" fill="#989898" />
                                        </Svg>
                                        <Text style={styles.viewMore}>Xem thêm</Text>
                                    </View>
                                </TouchableOpacity> */}
                            </ScrollView>
                            <TouchableOpacity onPress={() => {
                                if (this.props.admin.roles?.includes('supplier_add') || this.props.admin.is_admin == 1) {
                                    this.setModalVisible3(false);
                                    this.props.gotoAddSupp();
                                }
                                else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <View style={styles.btnAddItem}>
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M14.8571 6.85714H9.14286V1.14286C9.14286 0.512 8.63086 0 8 0C7.36914 0 6.85714 0.512 6.85714 1.14286V6.85714H1.14286C0.512 6.85714 0 7.36914 0 8C0 8.63086 0.512 9.14286 1.14286 9.14286H6.85714V14.8571C6.85714 15.488 7.36914 16 8 16C8.63086 16 9.14286 15.488 9.14286 14.8571V9.14286H14.8571C15.488 9.14286 16 8.63086 16 8C16 7.36914 15.488 6.85714 14.8571 6.85714Z" fill="#B8101F" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible3(false)}
                        style={styles.modalBackdrop}
                    />
                </Modal>
                <SpinnerComponent
                    spinner={spinner}
                />
            </View >
        );
    }
};


const mapStateToProps = state => ({
    supplier: state.supplier,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalChonNCC)
