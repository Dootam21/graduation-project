/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
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
    Modal,
    Alert,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import { login, get_user_data } from '../../services/accountService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import accountAction from '../../actions/accountAction';

// import messaging from '@react-native-firebase/messaging';

// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
// });

class Login extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            pass: '',
            token: '',
            // group: ''
        }
    }

    async componentDidMount() {
        this.getData();
        // this.checkPermission();
    }

    async reg_listen(group) {
        // this.listenNotify(group);
        // await messaging()?.registerDeviceForRemoteMessages();
    }

    // async checkPermission() {

    //     const enabled = await messaging().hasPermission();
    //     if (enabled) {
    //         this.getToken();
    //     }
    //     else {
    //         this.requestPermission();
    //     }
    // }

    //Step 2: if not has permission -> process request
    // async requestPermission() {
    //     try {
    //         await messaging().requestPermission();
    //         this.getToken();
    //     } catch (error) {
    //         console.log('fcmToken suspended');
    //     }
    // }

    // async getToken() {
    //     let fcmToken = await AsyncStorage.getItem('fcmToken');

    //     if (!fcmToken) {
    //         fcmToken = await messaging().getToken();
    //         console.log('fcmToken 1: ', fcmToken);
    //         if (fcmToken) {
    //             console.log('fcmToken 2: ', fcmToken);
    //             await AsyncStorage.setItem('fcmToken', fcmToken);
    //         }
    //     }
    // }

    // async listenNotify(group) {
    //     // const group = this.state.group;
    //     console.log('listenNotify(group): ' + group);

    //     if (group != '') {
    //         const unsubscribe = messaging()?.subscribeToTopic(group)?.onMessage(async remoteMessage => {
    //             console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //         });

    //         return unsubscribe;
    //     }
    // }

    storeAppID = async (value, group) => {
        try {
            await AsyncStorage.setItem('appID', value);
            await AsyncStorage.setItem('group', group);

        } catch (e) {
            // saving error
        }
    }

    async getData() {
        var value = await AsyncStorage.getItem('appID');
        if (value) {
            // value previously stored
            this.setState({ token: value });

            const data = await get_user_data(value);
            if (data) {
                if (data.status == 1) {
                    this.props.accountAction('user_info', data);
                    this.props.navigation.navigate("Home");
                }
                else {
                    Alert.alert("Thông báo", 'Tài khoản của bạn đã bị khóa!');
                    return
                }
            }
            else {
                Alert.alert("Thông báo", 'Tài khoản của bạn đã bị đăng nhập bởi thiết bị khác!');
                return
            }

            // if (data.id) {
            // }
        }
        else {
            try {
                var group = await AsyncStorage.getItem('group');
                console.log('App checkPermission group: ' + group);

                if (group !== null) {
                    // this.setState({group: group});
                    // this.reg_listen(group);
                }
                else {
                }
            }
            catch (e) {
            }
        }

    }

    async login() {
        if (this.state.user == '' || this.state.pass == '') {
            Alert.alert("Vui lòng nhập đủ thông tin");
            return;
        }

        const data = await login(this.state.user, this.state.pass);
        // console.log('usser login', data);

        if (data.id) {
            if (data.status == 1) {
                // console.log('logged done! data:');
                console.log(data);
                this.props.accountAction('user_info', data);
                this.storeAppID(data.token, data.group);
                // this.listenNotify();
                if (data.group && data.group != '')
                    this.reg_listen(data.group);

                this.props.navigation.navigate("Home");
            }
            else {
                Alert.alert("Thông báo", 'Tài khoản của bạn đã bị khóa!');
            }
        }
        else {
            Alert.alert("Thông tin đăng nhập không đúng!");
        }
    }

    gotoPage = (options) => {
        this.props.navigation.navigate(options);
    }

    setPass(txt) {
        this.setState({ pass: txt });
    }
    setUser(txt) {
        this.setState({ user: txt });
    }

    render() {
        const data = this.state.data;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollView>
                        <View>
                            <Image style={styles.thumbnail} resizeMode='cover' source={require('../../../asset/images/anh-banner.jpg')}></Image>
                        </View>
                        <View style={styles.element}>
                            <View style={styles.groupInput}>
                                <Text style={styles.txtLable}>TÀI KHOẢN</Text>
                                <TextInput
                                    style={styles.input} placeholder='Tên đăng nhập'
                                    onChangeText={(text) => this.setUser(text)}
                                />
                            </View>
                            <View style={styles.groupInput}>
                                <Text style={styles.txtLable}>MẬT KHẨU</Text>
                                <TextInput password={true} secureTextEntry={true}
                                    style={styles.input} placeholder='Mật khẩu'
                                    onChangeText={(text) => this.setPass(text)}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.login()}>
                                <Text style={styles.btnLogin}>Đăng Nhập</Text>
                            </TouchableOpacity>
                            <View style={styles.flexRowBetween}>
                                <TouchableOpacity>
                                    <Text style={styles.txtLink}></Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.txtLink}>Hotline: </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    accountAction: (act, data) => dispatch(accountAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
