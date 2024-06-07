/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';
import Header from '../elements/Header';
import thuchiAction from '../../actions/thichiAction';

// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePickerComponent from '../elements/DatePickerComponent';
import { connect } from 'react-redux';
import { add_thu, add_chi } from '../../services/thuchiService';
import ImagePicker from 'react-native-image-crop-picker';

import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native';

import { DOMAIN } from '../../constants/config';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const options = {
    title: 'Chọn ảnh',
    takePhotoButtonTitle: 'Chụp ảnh',
    chooseFromLibraryButtonTitle: 'Chọn từ Thư viện',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
    },
};
import styles from './styles.js';

class PhieuThu extends Component {
    // const { productId } = route.params;
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible2: false,
            phuthu: '',
            phuchi: '',
            tienmat: '',
            chuyenkhoan: '',
            ghichu: '',
            images: [],
            image_show: [],
            selected: 0,
            tongTien: 0,
        }
    }

    setModalVisible2 = (opt) => {
        this.setState({ isModalVisible2: opt })
    }

    setPhuThu = (opt) => {
        this.setState({ phuthu: opt })
    }
    setPhuChi = (opt) => {
        this.setState({ phuchi: opt })
    }
    setTienMat = (opt) => {
        this.setState({ tienmat: opt })
    }
    setChuyenKhoan = (opt) => {
        this.setState({ chuyenkhoan: opt })
    }
    setTongTien = (opt) => {
        this.setState({ tongTien: opt })
    }
    setGhiChu = (opt) => {
        this.setState({ ghichu: opt })
    }

    async btnConfirm() {

        if (this.props?.route?.params?.thu) {
            const dataLog = await add_thu({
                u_id: this.props.admin.uid,
                phuthu: this.state.phuthu?.replace(/,/g, ''),
                phuchi: this.state.phuchi?.replace(/,/g, ''),
                tienmat: this.state.tienmat?.replace(/,/g, ''),
                chuyenkhoan: this.state.chuyenkhoan?.replace(/,/g, ''),
                images: this.state.image_show,
                ghichu: this.state.ghichu,
                source_id: this.props.thuchi.source_id,
            })
        }
        else if (this.props?.route?.params?.chi) {
            const dataLog = await add_chi({
                u_id: this.props.admin.uid,
                phuthu: this.state.phuthu?.replace(/,/g, ''),
                phuchi: this.state.phuchi?.replace(/,/g, ''),
                tienmat: this.state.tienmat?.replace(/,/g, ''),
                chuyenkhoan: this.state.chuyenkhoan?.replace(/,/g, ''),
                images: this.state.image_show,
                ghichu: this.state.ghichu,
                source_id: this.props.thuchi.source_id,
            })
        }
        this.setModalVisible2(false);
        this.props.navigation.goBack();
    };

    btnCancel() {
        this.props.navigation.goBack();
    }

    setTotal() {
        const newTong = 0;
        const newTongTien = newTong + Number(this.state?.tienmat?.replace(/,/g, '')) + Number(this.state?.chuyenkhoan?.replace(/,/g, ''));
        this.setTongTien(newTongTien);
    }


    removeImage(stt) {
        var image_show = this.state.image_show;
        var buff = [];
        var num = 0;
        for (var i = 0; i < image_show.length; i++) {
            if (i != stt) {
                buff[num] = image_show[i];
                num++;
            }
        }
        this.setState({ image_show: buff });
    }


    renderListItem(image_show) {
        // console.log('imtam', image_show);
        var d = new Array();
        if (image_show.length > 0) {
            for (var i = 0; i < image_show.length; i++) {
                let stt = i;
                var item = image_show[stt];

                d.push(
                    <View style={styles.boxUploadImage} key={i}>
                        <Image style={styles.uploadImage} source={{ uri: item }}></Image>
                        <TouchableOpacity onPress={() => this.removeImage(stt)}>
                            <View style={styles.deleteImage}>
                                <Svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M14.4293 22.4282H3.57217C2.61979 22.4282 1.95312 21.6663 1.95312 20.8092V6.52344H16.0484V20.7139C16.0484 21.6663 15.2865 22.4282 14.4293 22.4282Z" stroke="#DFDEDE" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M17 5.95238V4.2381C17 3.57143 16.4286 3 15.7619 3H12.2381L11.8571 1.57143C11.6667 1.19048 11.381 1 10.9048 1H7.09524C6.71429 1 6.33333 1.19048 6.14286 1.57143L5.76191 2.90476H2.2381C1.57143 2.90476 1 3.47619 1 4.14286V5.95238C1 6.2381 1.28571 6.52381 1.57143 6.52381H16.4286C16.8095 6.52381 17 6.2381 17 5.95238Z" stroke="#DFDEDE" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M5.95312 9.95264V19.0003" stroke="#DFDEDE" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M9 9.95166V18.9993" stroke="#DFDEDE" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M12.0488 9.95166V18.9993" stroke="#DFDEDE" strokeWidth="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            }
        }
        return d;
    }

    select_image = async () => {
        try {
            const results = await ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeExif: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
            });

            if (results && results.length > 0) {
                const images = results.map((image, index) => (
                    {
                        id: index + 1,
                        filename: image.path.split('/')[11],
                        path: 'file://' + image.path,
                        uri: image.path, // Use 'path' or 'sourceURL' depending on your use case
                        stt: index,
                        type: image.mime,
                    }));

                // Update the selected photos state
                this.setState({
                    images: images,
                    selected: 1
                });
                this.upload_images();
            }
        } catch (error) {
            console.log('ImagePicker Error: ', error);
        }
    };
    async select_camera() {
        const result = await launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            }
            else {
                var images = this.state.images;
                let n = images.length;
                let buff = {};
                buff.id = images.length + 1;
                var image_data = response.assets[0];
                buff.filename = image_data.fileName;
                buff.path = 'file://' + image_data.uri;
                buff.uri = image_data.uri;
                buff.stt = n;
                buff.type = image_data.type;
                // buff.type = 'image/jpeg';
                // buff.uploaded_image_link = '';
                images.push(buff);
                this.setState({
                    images: images,
                    selected: 1
                });
                this.upload_images();
            }
        });
    }



    upload_images() {
        this.setState({ loading: 1 });
        var uploadUrl = DOMAIN + 'api/api_image/upload_image/';
        // console.log('upload', uploadUrl);
        var images = this.state.images;
        if (images.length > 0) {
            var new_images = this.state.image_show;
            for (var i = 0; i < images.length; i++) {
                let picture = images[i];
                let pic = {
                    name: picture.filename,
                    type: picture.type,
                    uri: Platform.OS === "android" ? picture.path : picture.uri
                }
                var formData = new FormData();
                formData.append('file', pic);

                fetch(uploadUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({ loading: 0 });
                        if (responseJson.res == 'done') {

                            // console.log(responseJson);
                            // picture.uploaded_image_link = responseJson.msg;
                            // new_images.push(picture);
                            new_images.push(responseJson.msg);
                            this.setState({ image_show: new_images });
                        }
                        else {
                            Alert.alert("Thông báo", "có lỗi");
                            return false;
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            this.setState({ images: [] });
            // console.log('this.state.image_show');
            // console.log(this.state.image_show);
        }
        else {
            Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 ảnh");
            this.setState({ loading: 0 });
        }

    }


    formatWithCommas = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    handlePriceChange = (setPrice) => {
        return (value) => {
            const numericValue = value.replace(/,/g, ''); // Remove existing commas
            const formattedValue = this.formatWithCommas(numericValue);
            setPrice(formattedValue);
        };
    };

    render() {
        const { isModalVisible2, tienmat, chuyenkhoan, ghichu, image_show, tongTien } = this.state;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>


                    <Header title={`Phiếu ${this.props?.route?.params?.thu ? 'thu' : 'chi'} - ${this.props?.thuchi?.title}`} />

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        {/* <Text style={styles.emptyList}>Danh sách rỗng</Text> */}

                        <View style={[styles.flexRowPT]}>
                            <Text style={[styles.text1, styles.w50]}>Tiền mặt</Text>
                            <TextInput
                                style={[styles.input2, styles.w50]}
                                keyboardType="numeric"
                                placeholder='Tiền mặt'
                                value={tienmat}
                                onChangeText={this.handlePriceChange(this.setTienMat)}
                                onBlur={() => this.setTotal()}
                            ></TextInput>
                        </View>
                        <View style={[styles.flexRowPT]}>
                            <Text style={[styles.text1, styles.w50]}>Chuyển khoản</Text>
                            <TextInput
                                style={[styles.input2, styles.w50]}
                                keyboardType="numeric"
                                placeholder='Chuyển khoản...'
                                value={chuyenkhoan}
                                onChangeText={this.handlePriceChange(this.setChuyenKhoan)}
                                onBlur={() => this.setTotal()}
                            ></TextInput>
                        </View>
                        <Text style={styles.tongTien}>Tổng tiền: {tongTien.toLocaleString()}</Text>
                        <View style={styles.ghiChu}>
                            <TextInput style={[styles.input2, styles.textAlignVertical]} placeholder='Ghi chú...'
                                editable
                                multiline
                                numberOfLines={5}
                                value={ghichu}
                                onChangeText={(text) => this.setGhiChu(text)}
                            />
                        </View>
                        <View>
                            <View style={styles.chonImage}>
                                <Text style={styles.textImage}>Chọn ảnh:</Text>
                                <TouchableOpacity onPress={() => this.select_image()}>
                                    <View style={styles.iconImage}>
                                        <Svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M25.6576 3H6.40755C5.78871 3 5.19522 3.21071 4.75763 3.58579C4.32005 3.96086 4.07422 4.46957 4.07422 5V21.5C4.07422 22.0304 4.32005 22.5391 4.75763 22.9142C5.19522 23.2893 5.78871 23.5 6.40755 23.5H25.6576C26.2764 23.5 26.8698 23.2893 27.3075 22.9142C27.7451 22.5391 27.9909 22.0304 27.9909 21.5V5C27.9909 4.46957 27.7451 3.96086 27.3075 3.58579C26.8698 3.21071 26.2764 3 25.6576 3ZM11.2691 15.437C11.3603 15.2804 11.498 15.147 11.6682 15.0502C11.8385 14.9535 12.0354 14.8968 12.2393 14.8857C12.4432 14.8747 12.6468 14.9098 12.8299 14.9874C13.0131 15.065 13.1692 15.1824 13.2827 15.328L14.2522 16.574C14.2801 16.6099 14.3184 16.639 14.3633 16.6584C14.4082 16.6779 14.4583 16.687 14.5084 16.685C14.5587 16.683 14.6075 16.6699 14.6502 16.6469C14.6928 16.624 14.7276 16.592 14.7516 16.554L17.5947 12.027C17.6949 11.8615 17.8482 11.724 18.0364 11.6307C18.2247 11.5373 18.4402 11.492 18.6576 11.5C18.8734 11.5052 19.0833 11.5616 19.2639 11.6629C19.4445 11.7642 19.5888 11.9065 19.6807 12.074L23.8551 19.674C23.8978 19.7505 23.9171 19.8351 23.9113 19.9198C23.9053 20.0045 23.8744 20.0866 23.8213 20.1582C23.7681 20.2298 23.6948 20.2887 23.6077 20.3292C23.5208 20.3698 23.4232 20.3907 23.3242 20.39H9.32422C9.22474 20.39 9.12692 20.3682 9.04004 20.3267C8.95317 20.2851 8.88014 20.2252 8.82788 20.1527C8.77563 20.0801 8.74588 19.9973 8.74147 19.9121C8.73707 19.827 8.75815 19.7422 8.80272 19.666L11.2691 15.437ZM9.03255 9.25C9.03255 8.85444 9.1694 8.46776 9.42579 8.13886C9.68218 7.80996 10.0466 7.55362 10.473 7.40224C10.8993 7.25087 11.3685 7.21126 11.8211 7.28843C12.2737 7.3656 12.6895 7.55608 13.0158 7.83579C13.3421 8.11549 13.5644 8.47186 13.6544 8.85982C13.7444 9.24778 13.6982 9.64991 13.5215 10.0154C13.345 10.3808 13.0459 10.6932 12.6622 10.9129C12.2785 11.1327 11.8274 11.25 11.3659 11.25C10.747 11.25 10.1536 11.0393 9.71596 10.6642C9.27838 10.2891 9.03255 9.78043 9.03255 9.25Z" fill="#B8101F" />
                                            <Path d="M2.33333 19.5V2.5C2.33333 2.36739 2.39479 2.24021 2.50419 2.14645C2.61358 2.05268 2.76196 2 2.91667 2H22.75C23.0594 2 23.3562 1.89464 23.575 1.70711C23.7937 1.51957 23.9167 1.26522 23.9167 1C23.9167 0.734784 23.7937 0.48043 23.575 0.292893C23.3562 0.105357 23.0594 0 22.75 0H2.33333C1.7145 0 1.121 0.210714 0.683418 0.585786C0.245833 0.960859 0 1.46957 0 2V19.5C0 19.7652 0.122915 20.0196 0.341707 20.2071C0.560501 20.3946 0.857248 20.5 1.16667 20.5C1.47609 20.5 1.77283 20.3946 1.99163 20.2071C2.21041 20.0196 2.33333 19.7652 2.33333 19.5Z" fill="#B8101F" />
                                        </Svg>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.select_camera()}>
                                    <View style={styles.iconImage}>
                                        <Svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M12 16.6387C14.005 16.6387 15.6304 15.0133 15.6304 13.0083C15.6304 11.0033 14.005 9.37793 12 9.37793C9.99501 9.37793 8.36963 11.0033 8.36963 13.0083C8.36963 15.0133 9.99501 16.6387 12 16.6387Z" fill="#B8101F" />
                                            <Path d="M20.4833 4.03364H17.6029L15.8372 0.501743C15.7617 0.350977 15.6458 0.224185 15.5024 0.135568C15.359 0.0469507 15.1938 8.85086e-06 15.0252 0H8.97475C8.80617 8.85086e-06 8.64093 0.0469507 8.49752 0.135568C8.35412 0.224185 8.23822 0.350977 8.1628 0.501743L6.3971 4.03364H3.51712C2.58463 4.03464 1.69062 4.40552 1.03125 5.06489C0.371873 5.72426 0.00099888 6.61827 0 7.55077V18.4665C0.00110849 19.399 0.372034 20.2929 1.0314 20.9521C1.69076 21.6114 2.58471 21.9822 3.51712 21.9832H20.4834C21.4157 21.9821 22.3096 21.6112 22.9688 20.952C23.6281 20.2927 23.9989 19.3989 24 18.4665V7.55077C23.999 6.61835 23.6282 5.72439 22.969 5.06502C22.3097 4.40566 21.4158 4.03474 20.4833 4.03364ZM12 18.4537C10.923 18.4537 9.8702 18.1344 8.97472 17.536C8.07925 16.9377 7.38131 16.0872 6.96917 15.0922C6.55702 14.0972 6.44919 13.0024 6.65929 11.9461C6.8694 10.8898 7.38802 9.91952 8.14956 9.15798C8.9111 8.39644 9.88136 7.87782 10.9377 7.66771C11.9939 7.4576 13.0888 7.56544 14.0838 7.97758C15.0788 8.38972 15.9293 9.08766 16.5276 9.98314C17.1259 10.8786 17.4453 11.9314 17.4453 13.0084C17.4437 14.4521 16.8694 15.8362 15.8486 16.857C14.8278 17.8779 13.4437 18.4521 12 18.4537ZM20.0673 8.87381H18.0504C17.8098 8.87381 17.579 8.7782 17.4088 8.60802C17.2386 8.43784 17.143 8.20702 17.143 7.96634C17.143 7.72567 17.2386 7.49485 17.4088 7.32467C17.579 7.15448 17.8098 7.05887 18.0504 7.05887H20.0673C20.3079 7.05887 20.5388 7.15448 20.7089 7.32467C20.8791 7.49485 20.9747 7.72567 20.9747 7.96634C20.9747 8.20702 20.8791 8.43784 20.7089 8.60802C20.5388 8.7782 20.3079 8.87381 20.0673 8.87381Z" fill="#B8101F" />
                                        </Svg>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.viewImage}>
                                {this.renderListItem(image_show)}
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this.setModalVisible2(true)}>
                                <Text style={[styles.btnConFirmPT, styles.bgGreen]}>Xác nhận</Text>
                            </TouchableOpacity>
                            <Modal visible={isModalVisible2} animationType="slide" transparent={true}>
                                <View style={styles.modalContainer2}>
                                    <View style={styles.modalContent}>
                                        <Text style={[styles.modalTitle, styles.textCenter]}>Bạn chắc chắn chứ?</Text>
                                        <View style={styles.btnGroupConfirm}>
                                            <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalVisible2(false)}>
                                                <Text style={[styles.txtConfirm, styles.borderRight]}>Hủy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmButton} onPress={() => this.btnConfirm()}>
                                                <Text style={styles.txtConfirm}>Xác nhận</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible2(false)}
                                    style={styles.modalBackdrop}
                                />
                            </Modal>
                            <TouchableOpacity onPress={() => this.btnCancel()}>
                                <Text style={[styles.btnConFirmPT, styles.bgCancle]}>Hủy</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>

                    <Footer />
                </View >
            </SafeAreaView >
        );
    }
};

const mapStateToProps = state => ({
    thuchi: state.thuchi,
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    thuchiAction: (act, data) => dispatch(thuchiAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhieuThu)
