/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Footer from '../elements/Footer';
import { connect } from 'react-redux';
import cartAction from '../../actions/cartAction';
import supplierAction from '../../actions/supplierAction';
import customerAction from '../../actions/customerAction';

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
    Modal,
    Button,
    ActivityIndicator,
    DeviceEventEmitter,
    NativeEventEmitter,
    PermissionsAndroid,
    ToastAndroid,
    Platform,
} from 'react-native';

import styles from './styles.js';

import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import {
    PERMISSIONS,
    requestMultiple,
    RESULTS,
} from 'react-native-permissions';

class ConnectPrinter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pairedDevices: [],
            foundDs: [],
            bleOpend: false,
            loading: true,
            name: '',
            boundAddress: '',

        }
    }

    // componentDidMount() {
    //     // Initialize the Bluetooth manager
    //     BluetoothManager.start();
    // }

    // discoverDevices = () => {
    //     // Discover nearby devices
    //     BluetoothManager.discoverDevices()
    //         .then((devices) => {
    //             this.setState({ devices, isDeviceModalVisible: true });
    //         })
    //         .catch((error) => {
    //             console.error('Error discovering devices', error);
    //         });
    // };

    // connectToSelectedDevice = () => {
    //     if (this.state.selectedDevice) {
    //         // Connect to the selected printer
    //         BluetoothManager.connect(this.state.selectedDevice.address)
    //             .then(() => {
    //                 // Printer is connected, you can send print commands here
    //                 BluetoothEscposPrinter.text('Hello, Bluetooth Printer!\n')
    //                     .then(() => {
    //                         // Send the print job
    //                         BluetoothEscposPrinter.flush()
    //                             .then(() => {
    //                                 console.log('Print job sent successfully');
    //                             })
    //                             .catch((error) => {
    //                                 console.error('Error flushing print job', error);
    //                             });
    //                     })
    //                     .catch((error) => {
    //                         console.error('Error printing text', error);
    //                     });
    //             })
    //             .catch((error) => {
    //                 console.error('Error connecting to printer', error);
    //             });
    //     } else {
    //         console.error('No printer selected');
    //     }
    // };

    componentDidMount() {
        BluetoothManager.isBluetoothEnabled()
            .then((enabled) => {
                this.setState({ bleOpend: Boolean(enabled), loading: false });
            })
            .catch((err) => {
                console.error(err);
            });

        if (Platform.OS === 'ios') {
            let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
            bluetoothManagerEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
                (rsp) => {
                    this.deviceAlreadPaired(rsp);
                }
            );
            bluetoothManagerEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_FOUND,
                (rsp) => {
                    this.deviceFoundEvent(rsp);
                }
            );
            bluetoothManagerEmitter.addListener(
                BluetoothManager.EVENT_CONNECTION_LOST,
                () => {
                    this.setState({ name: '', boundAddress: '' });
                }
            );
        } else if (Platform.OS === 'android') {
            DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
                (rsp) => {
                    this.deviceAlreadPaired(rsp);
                }
            );
            DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_FOUND,
                (rsp) => {
                    this.deviceFoundEvent(rsp);
                }
            );
            DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_CONNECTION_LOST,
                () => {
                    this.setState({ name: '', boundAddress: '' });
                }
            );
            DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
                () => {
                    ToastAndroid.show('Device Not Support Bluetooth !', ToastAndroid.LONG);
                }
            );
        }

        if (this.state.pairedDevices.length < 1) {
            this.scan();
            console.log('scanning...');
        } else {
            const firstDevice = this.state.pairedDevices[0];
            console.log('length  :' + this.state.pairedDevices.length);
            console.log(firstDevice);
            this.connect(firstDevice);
        }
    }

    deviceAlreadPaired = (rsp) => {
        var ds = null;
        if (typeof rsp.devices === 'object') {
            ds = rsp.devices;
        } else {
            try {
                ds = JSON.parse(rsp.devices);
            } catch (e) { }
        }
        if (ds && ds.length) {
            let pared = this.state.pairedDevices;
            if (pared.length < 1) {
                pared = pared.concat(ds || []);
            }
            this.setState({ pairedDevices: pared });
        }
    };

    deviceFoundEvent = (rsp) => {
        var r = null;
        try {
            if (typeof rsp.device === 'object') {
                r = rsp.device;
            } else {
                r = JSON.parse(rsp.device);
            }
        } catch (e) {
            // ignore error
        }

        if (r) {
            let found = this.state.foundDs || [];
            if (found.findIndex) {
                let duplicated = found.findIndex(function (x) {
                    return x.address == r.address;
                });
                if (duplicated == -1) {
                    found.push(r);
                    this.setState({ foundDs: found });
                }
            }
        }
    };


    connect = async (row) => {
        try {
            this.setState({ loading: true });
            await BluetoothManager.connect(row.address);
            this.setState({
                loading: false,
                boundAddress: row.address,
                name: row.name || 'UNKNOWN',
            });
            console.log('Connected to device:', row);
            this.props.navigation.goBack();
            this.props.cartAction('get_printer_name', row.name);
        } catch (e) {
            this.setState({ loading: false });
            alert(e);
        }
    };



    scanDevices = async () => { // Make sure to declare it as an arrow function
        this.setState({ loading: true });
        BluetoothManager.scanDevices()
            .then((s) => {
                var found = s.found;
                try {
                    found = JSON.parse(found); //@FIX_it: the parse action too weired..
                } catch (e) {
                    //ignore
                }
                var fds = this.state.foundDs;
                if (found && found.length) {
                    fds = found;
                }
                this.setState({ foundDs: fds, loading: false });
                console.log(fds);
            })
            .catch((er) => {
                this.setState({ loading: false });
                // ignore
            });
    };


    scan = async () => {
        try {
            const permissions = {
                title: 'HSD bluetooth meminta izin untuk mengakses bluetooth',
                message:
                    'HSD bluetooth memerlukan akses ke bluetooth untuk proses koneksi ke bluetooth printer',
                buttonNeutral: 'Lain Waktu',
                buttonNegative: 'Tidak',
                buttonPositive: 'Boleh',
            };

            const bluetoothConnectGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                permissions
            );
            if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
                const bluetoothScanGranted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    permissions
                );
                if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.scanDevices();
                }
            } else {
                // ignore akses ditolak
            }
        } catch (err) {
            console.warn(err);
        }
    };


    scanBluetoothDevice = async () => {
        this.setState({ loading: true });
        try {
            const request = await requestMultiple([
                PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
                PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ]);

            if (request['android.permission.ACCESS_FINE_LOCATION'] === RESULTS.GRANTED) {
                this.scanDevices();
                this.setState({ loading: false });
            } else {
                this.setState({ loading: false });
            }

            
            if (Platform.OS === 'ios') {
                this.scanDevices();
                this.setState({ loading: false });
            }
        } catch (err) {
            this.setState({ loading: false });
        }
    };


renderPrintItem(e) 
{
    if(e.name)
    {
        return (
            <TouchableOpacity onPress={() => this.connect(e)}>
                <Text style={styles.bluetoothDevices}>{e.name || 'UNKNOWN'}</Text>
            </TouchableOpacity>
        );
    }
    else return false;
}


    render() {
        const { foundDs, pairedDevices, boundAddress, loading } = this.state;
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

                        <Text style={styles.title}>Chi tiết toa nhập</Text>

                        <View style={[styles.headerRight]}>

                        </View>
                    </View >

                    <ScrollView>
                        <View style={{ flex: 1, backgroundColor: '#d9d9d9' }}>
                            <Text style={styles.titleBluetoothDevice}>Các thiết bị đã ghép đôi</Text>
                            {
                                pairedDevices.map((e) => (
                                    <TouchableOpacity onPress={() => this.connect(e)}>
                                        <Text style={styles.bluetoothDevices}>{e.name || 'UNKNOWN'}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            <Text style={styles.titleBluetoothDevice}>Các thiết bị tìm được</Text>
                            {
                                loading ?
                                    (
                                        <View style={{ backgroundColor: '#fff', padding: 20 }}>
                                            <ActivityIndicator />
                                        </View>
                                    ) :
                                    (
                                        foundDs.map((e) => (
                                            this.renderPrintItem(e)
                                        ))
                                    )
                            }


                        </View>
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.btnFindBluetooth}
                        onPress={() => {
                            this.scanBluetoothDevice();
                        }} >
                        <Text style={styles.textBtnFindBluetooth}>Quét</Text>
                    </TouchableOpacity>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    product: state.product,
    color: state.color,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    cartAction: (act, data) => dispatch(cartAction(act, data)),
    supplierAction: (act, data) => dispatch(supplierAction(act, data)),
    customerAction: (act, data) => dispatch(customerAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectPrinter);
