/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {  Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Footer from '../elements/Footer';
import { connect } from 'react-redux';
import customerAction from '../../actions/customerAction';
import { get_detail_customer, edit_detail_customer } from '../../services/customerSevice';
import { Rating, RatingInput } from 'react-native-stock-star-rating';
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
    CheckBox
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import login from '../account/login';

class EditCustomer extends Component {
    // const { productId } = route.params;
    constructor(props) {
        super(props);
        this.state = {
            data: [
            ],
            selectedGender: '',
            views: [],
            lastAddedIndex: -1,
        };
    }

    setSelectedGender = (opt) => {
        this.setState({ selectedGender: opt });
        this.setState({ data: { ...this.state.data, gioitinh: opt } })
    }



    setViews = (opt) => {
        this.setState({ views: opt });
    }

    setLastAddedIndex = (opt) => {
        this.setState({ lastAddedIndex: opt });
    }

    handleToggleCheckbox = (gender) => {
        this.setSelectedGender(gender);
    };

    componentDidMount() {
        this.getData()
    }

    setData = (opt) => {
        this.setState({
            data: opt
        })
    }

    setName = (opt) => {
        this.setState({ data: { ...this.state.data, fullname: opt } })

    }
    setAddress = (opt) => {
        this.setState({ data: { ...this.state.data, address: opt } })

    }
    setContent = (opt) => {
        this.setState({ data: { ...this.state.data, content: opt } })

    }

    async getData() {
        let data = await get_detail_customer({
            id: this.props.customer.id,
            u_id: this.props.admin.uid
        });
        this.setData(data);
        if (this.state.data.gioitinh !== '') {
            this.setSelectedGender(this.state.data.gioitinh);
        }
    }

    async editData() {
        let data = await edit_detail_customer({
            ...this.state.data,
            u_id: this.props.admin.uid,
        });
        this.setData(data);
        this.props.navigation.goBack();
    }

    setRate = (opt) => {
        this.setState({ data: { ...this.state.data, rate: opt } })
    }

    handleRating = (value) => {
        // console.log(value);
        this.setRate(value);

    };



    render() {
        const { selectedGender, views, lastAddedIndex } = this.state;
        const data = this.state.data;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.goBack()}>
                            <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>Sửa thông tin khách hàng</Text>
                        </View>

                        <View style={styles.headerRight}>

                        </View>
                    </View >

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        <View style={styles.attr}>
                            <Text style={styles.attrName}>Họ và tên</Text>
                            <TextInput
                                style={styles.address1}
                                placeholder="Họ và tên..."
                                value={data.fullname}
                                onChangeText={(text) => this.setName(text)}
                            />
                        </View>
                        <View style={styles.groupStart}>
                            <RatingInput
                                rating={data.rate}
                                setRating={this.handleRating}
                                size={50}
                                maxStars={5}
                                bordered={false}
                            />
                        </View>

                        <View style={styles.Gender}>
                            <TouchableOpacity
                                style={[styles.checkbox, selectedGender === 'male' && styles.checkboxChecked]}
                                onPress={() => this.handleToggleCheckbox('male')}
                            >
                                <View style={styles.boxGender}>
                                    <View style={styles.checkGender}>
                                        {selectedGender === 'male' && <Text style={styles.checkmark}></Text>}
                                    </View>
                                    <Text style={styles.checkboxText}>Nam</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.checkbox, selectedGender === 'female' && styles.checkboxChecked]}
                                onPress={() => this.handleToggleCheckbox('female')}
                            >
                                <View style={styles.boxGender}>
                                    <View style={styles.checkGender}>
                                        {selectedGender === 'female' && <Text style={styles.checkmark}></Text>}
                                    </View>
                                    <Text style={styles.checkboxText}>Nữ</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={styles.sectionHeader}>Đổi địa chỉ</Text>
                            <View style={styles.listAttr}>
                                <View style={styles.attr}>
                                    <Text style={styles.attrName}>Nhập địa chỉ</Text>
                                    <TextInput
                                        style={styles.address1}
                                        placeholder="Nhập địa chỉ.."
                                        value={data?.address}
                                        onChangeText={(text) => this.setAddress(text)}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.ghichu}>
                            <TextInput
                                style={styles.inputGhichu}
                                placeholder="Ghi chú..."
                                multiline={true}
                                numberOfLines={4}
                                value={data?.content}
                                onChangeText={(text) => this.setContent(text)}
                            />
                        </View>
                    </ScrollView>
                    <View>
                        <TouchableOpacity onPress={() => this.editData()}>
                            <View style={[styles.btnAddCustomer]}>
                                <Text style={[styles.txtAddCustomer]}>
                                    Lưu
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    customer: state.customer,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer)
