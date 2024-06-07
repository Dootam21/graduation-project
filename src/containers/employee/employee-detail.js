/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import { connect } from 'react-redux';
import Footer from '../elements/Footer';
import Header from '../elements/Header';

import { get_user_detail, update_nhanvien } from '../../services/accountService';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Switch,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

class EmployeeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                fullname: '',
                group_title: '',
                quanly: '',
                username: '',
                group_id: '',
            },
            isEnabled: false,
            isPhone: false,
            isSuppPhone: false,
            isDebt: false,
        }
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'focus',
            () => {
                // const d = this.props.admin;
                // const dt = this.state.data;
                // dt.fullname = d.nv_edit_fullname != '' ? d.nv_edit_fullname : dt.fullname;
                // dt.quanly = d.nv_edit_quanly != '' ? d.nv_edit_quanly : dt.quanly;
                // dt.group_title = d.nv_edit_chucvu != '' ? d.nv_edit_chucvu : dt.group_title;

                // dt.nv_edit_fullname = d.nv_edit_fullname;
                // dt.nv_edit_pass = d.nv_edit_pass;
                // dt.nv_edit_quanly = d.nv_edit_quanly;
                // dt.nv_edit_chucvu = d.nv_edit_chucvu;
                // dt.nv_edit_status = this.state.isEnabled == true ? 1 : 0;
                // dt.nv_edit_showphone = this.state.isPhone == true ? 1 : 0;

                // console.log(dt);
                // this.setState({data: dt});
                this.getData();
                this.setIsShowEdit(true);
            }
        );
        this.getData();
    }

    async getData() {
        const active_uid = this.props.admin.active_uid;
        const d = await get_user_detail({
            id: active_uid,
            u_id: this.props.admin.uid,
        });


        if (d !== false) {
            var isEnabled = d?.status && d.status == 1 ? true : false;
            var isPhone = d?.is_show_phone_cus && d.is_show_phone_cus == 1 ? true : false;
            var isSuppPhone = d?.is_show_phone_supp && d.is_show_phone_supp == 1 ? true : false;
            var isDebt = d?.is_show_debt && d.is_show_debt == 1 ? true : false;
            this.setState({ data: d, isEnabled: isEnabled, isPhone: isPhone, isSuppPhone: isSuppPhone, isDebt: isDebt });
        }

        console.log('this.props.admin');
        console.log(this.props.admin);
        console.log(d);
    }

    toggleState = async (key, b) => {
        // this.setState((prevState) => ({
        //     [key]: !prevState[key],
        // }));

        // this

        if (key == 'isEnabled') {
            var s = b == true ? 1 : 0;
            this.setState({ isEnabled: b });

            var update = {
                id: this.props.admin.active_uid,
                field: 'status',
                data: s,
            };
        }

        if (key == 'isPhone') {
            var s = b == true ? 1 : 0;
            this.setState({ isPhone: b });
            var update = {
                id: this.props.admin.active_uid,
                field: 'is_show_phone_cus',
                data: s,
                u_id: this.props.admin.uid,
            };
        }

        if (key == 'isSuppPhone') {
            var s = b == true ? 1 : 0;
            this.setState({ isSuppPhone: b });
            var update = {
                id: this.props.admin.active_uid,
                field: 'is_show_phone_supp',
                data: s,
                u_id: this.props.admin.uid,
            };
        }


        if (key == 'isDebt') {
            var s = b == true ? 1 : 0;
            this.setState({ isDebt: b });
            var update = {
                id: this.props.admin.active_uid,
                field: 'is_show_debt',
                data: s,
                u_id: this.props.admin.uid,
            };
        }

        const data = await update_nhanvien(update);
    }

    setIsShowEdit = (opt) => {
        this.setState({ isShowEdit: opt });
    }

    showItem = () => {
        this.setIsShowEdit(!this.state.isShowEdit)
    }

    gotoPage = (name, value) => {
        this.props.navigation.navigate(name, value);
    }

    setName(txt) {
        const d = this.state.data;
        d.fullname = txt;
        this.setState({ data: d });
    }

    setMK(txt) {
        const d = this.state.data;
        d.edit_pass = txt;
        this.setState({ data: d });
    }

    setChucvu(txt) {
        const d = this.state.data;
        d.group_title = txt;
        this.setState({ data: d });
    }

    setQuanLy(txt) {
        const d = this.state.data;
        d.quanly = txt;
        this.setState({ data: d });
    }

    render() {
        const navigation = this.props.navigation;
        const { data, isEnabled, isPhone, isSuppPhone, isDebt } = this.state;
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

                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>Chi tiết nhân viên</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => this.showItem()}>
                                <Text style={styles.btnTextHeader}>Sửa</Text>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}
                        {/* <Text style={styles.text4}>Không còn dữ liệu...</Text> */}

                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Họ và tên</Text>
                            <Text style={styles.txtValue}>{data.fullname}</Text>
                        </View>
                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Tên đăng nhập</Text>
                            <Text style={styles.txtValue}>{data.username}</Text>
                        </View>
                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Chức vụ</Text>
                            <Text style={styles.txtValue}>{data.group_title}</Text>
                        </View>
                        <View style={styles.groupInput}>
                            <Text style={styles.textAttr}>Quản lý</Text>
                            <Text style={styles.txtValue}>{data.quanly}</Text>
                        </View>
                        <View style={styles.groupSwitch}>
                            <Text style={styles.attrName}>Trạng thái(Đóng/ Mở)</Text>
                            <Switch style={styles.cSwitch}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.toggleState('isEnabled', !isEnabled)}
                                value={isEnabled}
                            />
                        </View>
                        {
                            data.is_admin == 1 || data.group_id == 4 ? (
                                <></>
                            ) : (
                                <>
                                    {
                                        data.group_id == 1 ?
                                            <>
                                                <View style={styles.groupSwitch}>
                                                    <Text style={styles.attrName}>Hiển thị số điện thoại khách hàng</Text>
                                                    <Switch style={styles.cSwitch}
                                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                                        thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={() => this.toggleState('isPhone', !isPhone)}
                                                        value={isPhone}
                                                    />
                                                </View>
                                                <View style={styles.groupSwitch}>
                                                    <Text style={styles.attrName}>Hiển thị số điện thoại nhà cung cấp</Text>
                                                    <Switch style={styles.cSwitch}
                                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                                        thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={() => this.toggleState('isSuppPhone', !isSuppPhone)}
                                                        value={isSuppPhone}
                                                    />
                                                </View>
                                                <View style={styles.groupSwitch}>
                                                    <Text style={styles.attrName}>Hiển thị công nợ</Text>
                                                    <Switch style={styles.cSwitch}
                                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                                        thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={() => this.toggleState('isDebt', !isDebt)}
                                                        value={isDebt}
                                                    />
                                                </View>
                                            </> :
                                            data.group_id == 2 ?
                                                <>
                                                    <View style={styles.groupSwitch}>
                                                        <Text style={styles.attrName}>Hiển thị số điện thoại khách hàng</Text>
                                                        <Switch style={styles.cSwitch}
                                                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                                                            thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                                            ios_backgroundColor="#3e3e3e"
                                                            onValueChange={() => this.toggleState('isPhone', !isPhone)}
                                                            value={isPhone}
                                                        />
                                                    </View>
                                                </> :
                                                data.group_id == 3 ?
                                                    <>
                                                        <View style={styles.groupSwitch}>
                                                            <Text style={styles.attrName}>Hiển thị số điện thoại khách hàng</Text>
                                                            <Switch style={styles.cSwitch}
                                                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                                                thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                                                ios_backgroundColor="#3e3e3e"
                                                                onValueChange={() => this.toggleState('isPhone', !isPhone)}
                                                                value={isPhone}
                                                            />
                                                        </View>
                                                        <View style={styles.groupSwitch}>
                                                            <Text style={styles.attrName}>Hiển thị công nợ</Text>
                                                            <Switch style={styles.cSwitch}
                                                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                                                thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
                                                                ios_backgroundColor="#3e3e3e"
                                                                onValueChange={() => this.toggleState('isDebt', !isDebt)}
                                                                value={isDebt}
                                                            />
                                                        </View>
                                                    </> : <></>
                                    }

                                </>
                            )
                        }


                        {
                            this.state.isShowEdit && (
                                <View style={styles.btnGroupShow}>
                                    <TouchableOpacity style={styles.mb10} onPress={() => this.gotoPage('EditHoTen')}>
                                        <View style={styles.btnEditView}>
                                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M11.9627 10.5602L9.87774 11.0777C9.6837 11.1252 9.48488 11.1504 9.28517 11.1527C8.96426 11.1532 8.64643 11.0898 8.35026 10.9662C8.05409 10.8425 7.7855 10.6612 7.56016 10.4327C7.26524 10.1343 7.05177 9.76522 6.94016 9.36084C6.82854 8.95637 6.82251 8.53006 6.92265 8.12263L7.44766 6.0376C7.57977 5.51017 7.85186 5.02819 8.23517 4.64256L11.3777 1.5H3.00006C2.2044 1.5 1.44132 1.81608 0.878698 2.3787C0.316077 2.94131 0 3.7044 0 4.50006V15.0003C0 15.7959 0.316077 16.559 0.878698 17.1216C1.44132 17.6842 2.2044 18.0003 3.00006 18.0003H13.5002C14.2959 18.0003 15.059 17.6842 15.6217 17.1216C16.1843 16.559 16.5004 15.7959 16.5004 15.0003V6.6226L13.3578 9.76513C12.9726 10.1507 12.4907 10.4253 11.9627 10.5602Z" fill="white" />
                                                <Path d="M17.4703 0.969837L17.0308 0.530327C16.8627 0.362193 16.6631 0.228822 16.4434 0.137828C16.2238 0.0468341 15.9883 0 15.7506 0C15.5128 0 15.2773 0.0468341 15.0576 0.137828C14.838 0.228822 14.6384 0.362193 14.4703 0.530327L9.29515 5.70544C9.10299 5.89766 8.96659 6.13849 8.90065 6.4022L8.38014 8.48499C8.34082 8.64188 8.34281 8.80628 8.38593 8.96216C8.42905 9.11803 8.51184 9.26006 8.6262 9.37445C8.74057 9.48884 8.88262 9.57165 9.03846 9.61476C9.19434 9.65787 9.35878 9.65985 9.51565 9.62052L11.5985 9.10003C11.8622 9.03406 12.103 8.89771 12.2952 8.7055L17.4703 3.53039C17.6384 3.36227 17.7718 3.16267 17.8628 2.943C17.9538 2.72332 18.0007 2.48789 18.0007 2.25011C18.0007 2.01234 17.9538 1.7769 17.8628 1.55723C17.7718 1.33756 17.6384 1.13796 17.4703 0.969837Z" fill="white" />
                                            </Svg>
                                            <Text style={styles.txtEditView}>Sửa họ và tên</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.mb10} onPress={() => this.gotoPage('EditMatKhau')}>
                                        <View style={styles.btnEditView}>
                                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M11.9627 10.5602L9.87774 11.0777C9.6837 11.1252 9.48488 11.1504 9.28517 11.1527C8.96426 11.1532 8.64643 11.0898 8.35026 10.9662C8.05409 10.8425 7.7855 10.6612 7.56016 10.4327C7.26524 10.1343 7.05177 9.76522 6.94016 9.36084C6.82854 8.95637 6.82251 8.53006 6.92265 8.12263L7.44766 6.0376C7.57977 5.51017 7.85186 5.02819 8.23517 4.64256L11.3777 1.5H3.00006C2.2044 1.5 1.44132 1.81608 0.878698 2.3787C0.316077 2.94131 0 3.7044 0 4.50006V15.0003C0 15.7959 0.316077 16.559 0.878698 17.1216C1.44132 17.6842 2.2044 18.0003 3.00006 18.0003H13.5002C14.2959 18.0003 15.059 17.6842 15.6217 17.1216C16.1843 16.559 16.5004 15.7959 16.5004 15.0003V6.6226L13.3578 9.76513C12.9726 10.1507 12.4907 10.4253 11.9627 10.5602Z" fill="white" />
                                                <Path d="M17.4703 0.969837L17.0308 0.530327C16.8627 0.362193 16.6631 0.228822 16.4434 0.137828C16.2238 0.0468341 15.9883 0 15.7506 0C15.5128 0 15.2773 0.0468341 15.0576 0.137828C14.838 0.228822 14.6384 0.362193 14.4703 0.530327L9.29515 5.70544C9.10299 5.89766 8.96659 6.13849 8.90065 6.4022L8.38014 8.48499C8.34082 8.64188 8.34281 8.80628 8.38593 8.96216C8.42905 9.11803 8.51184 9.26006 8.6262 9.37445C8.74057 9.48884 8.88262 9.57165 9.03846 9.61476C9.19434 9.65787 9.35878 9.65985 9.51565 9.62052L11.5985 9.10003C11.8622 9.03406 12.103 8.89771 12.2952 8.7055L17.4703 3.53039C17.6384 3.36227 17.7718 3.16267 17.8628 2.943C17.9538 2.72332 18.0007 2.48789 18.0007 2.25011C18.0007 2.01234 17.9538 1.7769 17.8628 1.55723C17.7718 1.33756 17.6384 1.13796 17.4703 0.969837Z" fill="white" />
                                            </Svg>
                                            <Text style={styles.txtEditView}>Đổi mật khẩu</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.mb10} onPress={() => this.gotoPage('EditChucVu')}>
                                        <View style={styles.btnEditView}>
                                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M11.9627 10.5602L9.87774 11.0777C9.6837 11.1252 9.48488 11.1504 9.28517 11.1527C8.96426 11.1532 8.64643 11.0898 8.35026 10.9662C8.05409 10.8425 7.7855 10.6612 7.56016 10.4327C7.26524 10.1343 7.05177 9.76522 6.94016 9.36084C6.82854 8.95637 6.82251 8.53006 6.92265 8.12263L7.44766 6.0376C7.57977 5.51017 7.85186 5.02819 8.23517 4.64256L11.3777 1.5H3.00006C2.2044 1.5 1.44132 1.81608 0.878698 2.3787C0.316077 2.94131 0 3.7044 0 4.50006V15.0003C0 15.7959 0.316077 16.559 0.878698 17.1216C1.44132 17.6842 2.2044 18.0003 3.00006 18.0003H13.5002C14.2959 18.0003 15.059 17.6842 15.6217 17.1216C16.1843 16.559 16.5004 15.7959 16.5004 15.0003V6.6226L13.3578 9.76513C12.9726 10.1507 12.4907 10.4253 11.9627 10.5602Z" fill="white" />
                                                <Path d="M17.4703 0.969837L17.0308 0.530327C16.8627 0.362193 16.6631 0.228822 16.4434 0.137828C16.2238 0.0468341 15.9883 0 15.7506 0C15.5128 0 15.2773 0.0468341 15.0576 0.137828C14.838 0.228822 14.6384 0.362193 14.4703 0.530327L9.29515 5.70544C9.10299 5.89766 8.96659 6.13849 8.90065 6.4022L8.38014 8.48499C8.34082 8.64188 8.34281 8.80628 8.38593 8.96216C8.42905 9.11803 8.51184 9.26006 8.6262 9.37445C8.74057 9.48884 8.88262 9.57165 9.03846 9.61476C9.19434 9.65787 9.35878 9.65985 9.51565 9.62052L11.5985 9.10003C11.8622 9.03406 12.103 8.89771 12.2952 8.7055L17.4703 3.53039C17.6384 3.36227 17.7718 3.16267 17.8628 2.943C17.9538 2.72332 18.0007 2.48789 18.0007 2.25011C18.0007 2.01234 17.9538 1.7769 17.8628 1.55723C17.7718 1.33756 17.6384 1.13796 17.4703 0.969837Z" fill="white" />
                                            </Svg>
                                            <Text style={styles.txtEditView}>Sửa chức vụ</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.mb10} onPress={() => this.gotoPage('EditQuanLy', { data: data })}>
                                        <View style={styles.btnEditView}>
                                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M11.9627 10.5602L9.87774 11.0777C9.6837 11.1252 9.48488 11.1504 9.28517 11.1527C8.96426 11.1532 8.64643 11.0898 8.35026 10.9662C8.05409 10.8425 7.7855 10.6612 7.56016 10.4327C7.26524 10.1343 7.05177 9.76522 6.94016 9.36084C6.82854 8.95637 6.82251 8.53006 6.92265 8.12263L7.44766 6.0376C7.57977 5.51017 7.85186 5.02819 8.23517 4.64256L11.3777 1.5H3.00006C2.2044 1.5 1.44132 1.81608 0.878698 2.3787C0.316077 2.94131 0 3.7044 0 4.50006V15.0003C0 15.7959 0.316077 16.559 0.878698 17.1216C1.44132 17.6842 2.2044 18.0003 3.00006 18.0003H13.5002C14.2959 18.0003 15.059 17.6842 15.6217 17.1216C16.1843 16.559 16.5004 15.7959 16.5004 15.0003V6.6226L13.3578 9.76513C12.9726 10.1507 12.4907 10.4253 11.9627 10.5602Z" fill="white" />
                                                <Path d="M17.4703 0.969837L17.0308 0.530327C16.8627 0.362193 16.6631 0.228822 16.4434 0.137828C16.2238 0.0468341 15.9883 0 15.7506 0C15.5128 0 15.2773 0.0468341 15.0576 0.137828C14.838 0.228822 14.6384 0.362193 14.4703 0.530327L9.29515 5.70544C9.10299 5.89766 8.96659 6.13849 8.90065 6.4022L8.38014 8.48499C8.34082 8.64188 8.34281 8.80628 8.38593 8.96216C8.42905 9.11803 8.51184 9.26006 8.6262 9.37445C8.74057 9.48884 8.88262 9.57165 9.03846 9.61476C9.19434 9.65787 9.35878 9.65985 9.51565 9.62052L11.5985 9.10003C11.8622 9.03406 12.103 8.89771 12.2952 8.7055L17.4703 3.53039C17.6384 3.36227 17.7718 3.16267 17.8628 2.943C17.9538 2.72332 18.0007 2.48789 18.0007 2.25011C18.0007 2.01234 17.9538 1.7769 17.8628 1.55723C17.7718 1.33756 17.6384 1.13796 17.4703 0.969837Z" fill="white" />
                                            </Svg>
                                            <Text style={styles.txtEditView}>Sửa quản lý</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }


                    </ScrollView>

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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail)


