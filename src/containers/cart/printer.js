/**
 * React Native App
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
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import RNFetchBlob from 'rn-fetch-blob';


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
    Modal,
    FlatListComponent,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
import { get_list_cart_bill_id, get_thu_detail } from '../../services/cartService';
import { get_infomation } from '../../services/infoShopService';

class Printer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isModalVisibleEdit: false,
            dataThu: {},
            customerName: '',
            dataDetail: this.props.cart.order_detail,
            tableData: [],
            image: '',
            infoShop: {},
        }


    }

    componentDidMount() {
        this.getData();
    }



    setModalVisibleEdit(opt) {
        this.setState({ isModalVisibleEdit: opt });
    }

    btnConfirm = () => {
        this.setModalVisibleEdit(false);
    };

    tableHead = ['Mã sp', 'Giá SP', 'Số lượng', 'Thành tiền'];

    async getData() {
        const dataLog = await get_list_cart_bill_id({
            u_id: this.props.admin.uid,
            bill_id: this.props.cart.bill_id,
        });
        // console.log('orderlist', dataLog);
        // console.log(dataLog?.data.order_list);
        dataLog?.data.order_list.map(d => {
            const data = [];
            data.push(d.product.code, d.product.price, d.product.quantity, d.product.totle_price);
            this.state.tableData.push(data);
        })
        this.setState({ data: dataLog.data });
        // const newColorList = this.props.color.listAllColor?.filter(color =>
        //     this.state.data?.data?.order_list?.map((order) => {
        //         order?.list_quantity?.some(quantity => quantity.color_id === color.id);
        //     })
        // );
        // this.setState({ colorList: newColorList });
        // if (this.props?.customer?.id != 0) {
        const getThuDetail = await get_thu_detail({
            u_id: this.props.admin.uid,
            thu_id: this.props?.cart?.thu_id,
        });
        this.setState({ dataThu: getThuDetail?.data });
        // this.viewShotRef.current.capture().then(async (uri) => {
        //     this.imageToBase64Jpg(uri)
        //         .then((base64Image) => {
        //             if (base64Image) {
        //                 this.setState({ image: base64Image.replace(/^data:image\/jpeg;base64,/, '') });
        //             }
        //         });
        // });

        const infoShop = await get_infomation();
        this.setState({ infoShop: infoShop })
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
            console.log(uri);
            this.setState({ image: uri });
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
            Share.open(options)
        });
    }

    imageToBase64Jpg = async (imageFilePath) => {
        try {
            const response = await RNFetchBlob.fs.readFile(imageFilePath, 'base64');
            const base64Image = `data:image/jpeg;base64,${response}`;
            return base64Image;
        } catch (error) {
            console.error('Error converting image to base64:', error);
            return null;
        }
    };

    render() {
        const navigation = this.props.navigation;
        const { data, dataDetail, dataThu, tableData, image, infoShop } = this.state;

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

                        <Text style={styles.title}>In</Text>

                        <View style={[styles.headerRight]} >
                            <TouchableOpacity onPress={this.saveCapturedImage} style={{ marginLeft: 20 }} >
                                <Svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M0 4C0 2.9 0.9 2 2 2H5L7 0H13L15 2H18C18.5304 2 19.0391 2.21071 19.4142 2.58579C19.7893 2.96086 20 3.46957 20 4V14C20 14.5304 19.7893 15.0391 19.4142 15.4142C19.0391 15.7893 18.5304 16 18 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14V4ZM10 14C11.3261 14 12.5979 13.4732 13.5355 12.5355C14.4732 11.5979 15 10.3261 15 9C15 7.67392 14.4732 6.40215 13.5355 5.46447C12.5979 4.52678 11.3261 4 10 4C8.67392 4 7.40215 4.52678 6.46447 5.46447C5.52678 6.40215 5 7.67392 5 9C5 10.3261 5.52678 11.5979 6.46447 12.5355C7.40215 13.4732 8.67392 14 10 14ZM10 12C9.60603 12 9.21593 11.9224 8.85195 11.7716C8.48797 11.6209 8.15726 11.3999 7.87868 11.1213C7.6001 10.8427 7.37913 10.512 7.22836 10.1481C7.0776 9.78407 7 9.39397 7 9C7 8.60603 7.0776 8.21593 7.22836 7.85195C7.37913 7.48797 7.6001 7.15726 7.87868 6.87868C8.15726 6.6001 8.48797 6.37913 8.85195 6.22836C9.21593 6.0776 9.60603 6 10 6C10.7956 6 11.5587 6.31607 12.1213 6.87868C12.6839 7.44129 13 8.20435 13 9C13 9.79565 12.6839 10.5587 12.1213 11.1213C11.5587 11.6839 10.7956 12 10 12Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View >
                    <View style={styles.client}>
                        <View style={styles.customer}>
                            <Text style={styles.txtPrinter}>Máy in: <Text style={styles.txtPrinterStatus}>{this.props.cart.printerName ? this.props.cart.printerName : 'Chưa kết nối'}</Text></Text>
                            <View style={styles.groupIcon}>
                                <TouchableOpacity onPress={() => navigation.navigate('ConnectPrinter')}>
                                    <Text style={styles.btnPrinter}>Chọn máy in</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <ScrollView>
                        <ViewShot ref={this.viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                            <View style={styles.felxRowOder}>
                                <View style={styles.viewOrder}>
                                    <Text style={styles.nameCustomer}>{dataDetail?.user_name}</Text>
                                    <Text style={styles.txtOrder}>-Địa chỉ: {infoShop.address}</Text>
                                    <Text style={[styles.txtOrder, styles.txtOrderTitle]}>ĐƠN HÀNG</Text>
                                    <View style={styles.flexRowPrint}>
                                        <Text style={styles.txtOrder}>Mã đơn hàng:</Text>
                                        <Text style={styles.txtOrder}>{dataDetail.code}</Text>
                                    </View>
                                    <View style={styles.flexRowPrint}>
                                        <Text style={styles.txtOrder}>Trạng thái:</Text>
                                        <Text style={styles.txtOrder}>{
                                            dataDetail?.status == 0 ? 'Chờ xác nhận' :
                                                dataDetail?.status == 1 ? 'Chờ nhặt hàng' :
                                                    dataDetail?.status == 2 ? 'Đã nhặt' :
                                                        dataDetail?.status == 3 ? 'Hoàn tất' :
                                                            dataDetail?.status == 5 ? 'Toa nháp' : ''
                                        }</Text>
                                    </View>
                                    <View style={styles.flexRowPrint}>
                                        <Text style={styles.txtOrder}>Thời gian:</Text>
                                        <Text style={styles.txtOrder}>{dataDetail?.modified}</Text>
                                    </View>
                                    <View style={styles.flexRowPrint}>
                                        <Text style={styles.txtOrder}>Tên khách hàng:</Text>
                                        <Text style={styles.txtOrder}>{dataDetail?.customer_fullname}</Text>
                                    </View>
                                    <View style={styles.flexRowPrint}>
                                        <Text style={styles.txtOrder}>Người tạo:</Text>
                                        <Text style={styles.txtOrder}>{dataDetail?.user_name}</Text>
                                    </View>
                                    <Table borderStyle={{ borderWidth: 1 }}>
                                        <Row data={this.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={[styles.txtOrder, styles.txtCenter]} />
                                        <TableWrapper style={styles.wrapper}>
                                            <Rows data={tableData} flexArr={[1, 1, 1, 1]} style={styles.row} textStyle={[styles.txtOrder, styles.txtCenter]} />
                                        </TableWrapper>
                                    </Table>

                                    {
                                        this.props.customer.id != 0 && this.props.admin.is_show_debt == 1 && this.props.cart.status == 3 ?
                                            (
                                                <View>
                                                    {/* <Text style={styles.listItem}>Thông tin nợ</Text> */}
                                                    <View>
                                                        {
                                                            dataThu?.chuyenkhoan != 0 &&
                                                            <View style={[styles.flexRow, styles.borderBottom]}>
                                                                <Text style={styles.textSubf}>Chuyển khoản:</Text>
                                                                <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.chuyenkhoan).toLocaleString()} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.tienmat != 0 &&
                                                            <View style={[styles.flexRow, styles.borderBottom]}>
                                                                <Text style={styles.textSubf}>Trả tiền mặt:</Text>
                                                                <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.tienmat).toLocaleString()} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.phuthu != 0 &&
                                                            <View style={[styles.flexRow, styles.borderBottom]}>
                                                                <Text style={styles.textSubf}>Phu thu:</Text>
                                                                <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.phuthu).toLocaleString()} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.phuchi != 0 &&
                                                            <View style={[styles.flexRow, styles.borderBottom]}>
                                                                <Text style={styles.textSubf}>Phu chi:</Text>
                                                                <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.phuchi).toLocaleString()} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.notruocdon != 0 &&
                                                            <View style={[styles.flexRow, styles.borderBottom]}>
                                                                <Text style={styles.textSubf}>Nợ trước đơn:</Text>
                                                                <Text style={[styles.bold, styles.textSubf]}>{dataThu?.notruocdon_txt} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.debt != 0 &&
                                                            <View style={[styles.flexRow, styles.borderBottom]}>
                                                                <Text style={styles.textSubf}>Nợ sau đơn:</Text>
                                                                <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.debt).toLocaleString()} đ</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.ngaytrano &&
                                                            <View style={[styles.flexRow, styles.borderBottom]}>
                                                                <Text style={styles.textSubf}>Ngày hẹn nợ:</Text>
                                                                <Text style={[styles.bold, styles.textSubf]}>{dataThu?.ngaytrano}</Text>
                                                            </View>
                                                        }
                                                        {
                                                            dataThu?.ghi_chu != '' && dataThu?.ghi_chu != null &&
                                                            <View style={[styles.flexRow, styles.borderBottom]}>
                                                                <Text style={styles.textSubf}>Ghi chú:</Text>
                                                                <Text style={[styles.bold, styles.textSubf]}>{dataThu?.ghi_chu}</Text>
                                                            </View>
                                                        }
                                                    </View>
                                                </View>

                                            ) :
                                            this.props.customer.id != 0 && this.props.admin.is_show_debt == 1 && this.props.cart.status != 3 ?
                                                (
                                                    <View>
                                                        {/* <Text style={styles.listItem}>Thông tin nợ</Text> */}
                                                        <View>
                                                            {
                                                                dataThu?.chuyenkhoan != 0 &&
                                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                                    <Text style={styles.textSubf}>Chuyển khoản:</Text>
                                                                    <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.chuyenkhoan).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.tienmat != 0 &&
                                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                                    <Text style={styles.textSubf}>Trả tiền mặt:</Text>
                                                                    <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.tienmat).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.phuthu != 0 &&
                                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                                    <Text style={styles.textSubf}>Phu thu:</Text>
                                                                    <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.phuthu).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.phuchi != 0 &&
                                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                                    <Text style={styles.textSubf}>Phu chi:</Text>
                                                                    <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.phuchi).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.notruocdon > 0 &&
                                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                                    <Text style={styles.textSubf}>Nợ cũ:</Text>
                                                                    <Text style={[styles.bold, styles.textSubf]}>{dataThu?.notruocdon_txt} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.debt > 0 &&
                                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                                    <Text style={styles.textSubf}>Tổng nợ:</Text>
                                                                    <Text style={[styles.bold, styles.textSubf]}>{Number(dataThu?.debt).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.ngaytrano &&
                                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                                    <Text style={styles.textSubf}>Ngày hẹn nợ:</Text>
                                                                    <Text style={[styles.bold, styles.textSubf]}>{dataThu?.ngaytrano}</Text>
                                                                </View>
                                                            }
                                                            {
                                                                (dataThu?.ghi_chu != "" && dataThu?.ghi_chu != null) &&
                                                                <View style={[styles.flexRow, styles.borderBottom]}>
                                                                    <Text style={styles.textSubf}>Ghi chú:</Text>
                                                                    <Text style={[styles.bold, styles.textSubf]}>{dataThu?.ghi_chu}</Text>
                                                                </View>
                                                            }
                                                        </View>
                                                    </View>

                                                ) :
                                                (
                                                    <View>
                                                        {/* <Text style={styles.listItem}>Thông tin nợ</Text> */}
                                                        <View>
                                                            {
                                                                dataThu?.chuyenkhoan != 0 &&
                                                                <View style={styles.flexRowPrint}>
                                                                    <Text style={styles.txtOrder}>Chuyển khoản:</Text>
                                                                    <Text style={styles.txtOrder}>{Number(dataThu?.chuyenkhoan).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.tienmat != 0 &&
                                                                <View style={styles.flexRowPrint}>
                                                                    <Text style={styles.txtOrder}>Trả tiền mặt:</Text>
                                                                    <Text style={styles.txtOrder}>{Number(dataThu?.tienmat).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.phuthu != 0 &&
                                                                <View style={styles.flexRowPrint}>
                                                                    <Text style={styles.txtOrder}>Phu thu:</Text>
                                                                    <Text style={styles.txtOrder}>{Number(dataThu?.phuthu).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.phuchi != 0 &&
                                                                <View style={styles.flexRowPrint}>
                                                                    <Text style={styles.txtOrder}>Phu chi:</Text>
                                                                    <Text style={styles.txtOrder}>{Number(dataThu?.phuchi).toLocaleString()} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                this.props.cart.status != 3 &&
                                                                <View style={styles.flexRowPrint}>
                                                                    <Text style={styles.txtOrder}>Tổng nợ:</Text>
                                                                    <Text style={styles.txtOrder}>{dataThu?.totle_money} đ</Text>
                                                                </View>
                                                            }
                                                            {
                                                                dataThu?.ghi_chu != '' && dataThu?.ghi_chu != null &&
                                                                <View style={styles.flexRowPrint}>
                                                                    <Text style={styles.txtOrder}>Ghi chú:</Text>
                                                                    <Text style={styles.txtOrder}>{dataThu?.ghi_chu}</Text>
                                                                </View>
                                                            }
                                                        </View>
                                                    </View>


                                                    // <View style={styles.flexRowPrint}>
                                                    //     <Text style={styles.txtOrder}>Tổng tiền</Text>
                                                    //     <Text style={styles.txtOrder}>{dataDetail.totle_price} đ</Text>
                                                    // </View>
                                                )
                                    }

                                    <Text style={[styles.txtOrder, styles.txtCenter]}>Xin chân thành cảm ơn quý khách!</Text>
                                </View>
                            </View>
                        </ViewShot>
                    </ScrollView>

                    <View style={[styles.flexRowPrin]}>
                        {/* <TouchableOpacity >
                            <Text style={[styles.btnPrin, styles.btnPrin1]}>IN NHANH (không dấu)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setModalVisibleEdit(true)}>
                            <Text style={[styles.btnPrin, styles.btnPrin2]}>IN CHẬM (có dấu)</Text>
                        </TouchableOpacity> */}
                        <Modal visible={this.state.isModalVisibleEdit} animationType="slide" transparent={true}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalContent}>
                                    <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chưa chọn máy in</Text>
                                    <View style={styles.btnGroupConfirm}>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisibleEdit(false)}>
                                            <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.confirmButton} onPress={() => this.btnConfirm()}>
                                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisibleEdit(false)}
                                style={styles.modalBackdrop}
                            />
                        </Modal>
                        <TouchableOpacity onPress={() => this.shareImages()}>
                            <Text style={[styles.btnPrin, styles.btnPrin2]}>Chia sẻ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ImagePrinter');
                        }}>
                            <Text style={[styles.btnPrin, styles.btnPrin1]}>In</Text>
                        </TouchableOpacity>

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
    size: state.size,
    color: state.color,
    customer: state.customer
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withNavigation(Main));
export default connect(mapStateToProps, mapDispatchToProps)(Printer)


