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
import { connect } from 'react-redux';
// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    Image,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import Header from '../elements/Header';
import styles from './styles.js';
import CheckBoxCategory from '../elements/CheckBoxCategory';
import { add_category, get_category, get_category_settings, update_show_hide_category } from '../../services/categoryService';
import SpinnerComponent from '../elements/Spinner';

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
class SwitchCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isSelected: false,
            showhide: [],
            modalAdd: false,
            title: '',
            spinner: false,
            images: [],
            image_show: [],
            selected: 0,
            image: ''
        }
    }

    setModalAdd(opt) {
        this.setState({ modalAdd: opt });
    }

    setTitle(opt) {
        this.setState({ title: opt });
    }

    setSpinner(opt) {
        this.setState({ spinner: opt })
    }

    setStatus(id, status) {
        const d = this.state.showhide;
        var copy = new Array();
        var has = false;

        if (d.length > 0) {
            for (var i = 0; i < d.length; i++) {
                var item = d[i];

                if (item.id == id) {
                    let tmp = {};
                    tmp.id = item.id;
                    tmp.status = status;
                    copy.push(tmp);

                    has = true;
                }
                else {
                    let tmp = {};
                    tmp.id = item.id;
                    tmp.status = item.status;
                    copy.push(tmp);
                }
            }
        }

        if (has == false) {
            let tmp = {};
            tmp.id = id;
            tmp.status = status;
            copy.push(tmp);
        }

        this.setState({ showhide: copy });
    }

    async saveData(data) {
        const d = await update_show_hide_category(data);


        if (d === false)
            return false;

        this.props.closeModal();
        // this.props?.setChildId(this.props.parent_id)
    }

    componentDidMount() {
        // const d = this.props?.data;
        // this.setState({ data: d });

        // console.log('this.props?.data d');
        // console.log(d);
        this.getChildList();
    }

    async addCategory() {
        if (this.state.title === '') {
            Alert.alert('Vui lòng nhập tên danh mục')
            return true;
        }
        const data = await add_category({
            u_id: this.props.admin.uid,
            parentId: this.props?.parent_id,
            title: this.state.title,
            image: this.state.image,
        });
        this.setModalAdd(false);
        this.getChildList();
        this.setTitle('');
    }


    async getChildList() {
        this.setSpinner(true);
        const data = await get_category_settings({
            u_id: this.props.admin.uid,
        });
        if (this.props.parent_cate == 'category') {
            this.setState({ data: data });
        } else {
            data.map(cate => {
                if (cate.Category.id == this.props.parent_id) {
                    this.setState({ data: cate.children });
                }
            });
        }
        this.setSpinner(false);
    }

    async select_image() {
        const result = await launchImageLibrary(options, response => {
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
                this.setState({ image: pic.uri });
                // console.log(pic.uri);
                // console.log(this.state.image_show);
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
            this.setState(prevState => ({
                image_show: prevState.image_show.slice(1)
            }));
            // console.log('this.state.image_show');
            // console.log(this.state.image_show);
        }
        else {
            Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 ảnh");
            this.setState({ loading: 0 });
        }

    }


    render() {
        const { showhide, data, modalAdd, title, spinner, image } = this.state;

        return (
            <SafeAreaView style={styles.modalCate}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.menu} onPress={() => this.props.closeModal()}>
                                <Svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.88296 10.9989L14.5961 5.35598C14.8241 5.12893 14.967 4.80403 14.9933 4.45241C15.0197 4.1008 14.9275 3.75113 14.7368 3.47997C14.5461 3.20882 14.2725 3.03828 13.976 3.0057C13.6795 2.97312 13.3841 3.08116 13.1546 3.30615L6.40433 9.97398C6.27775 10.0993 6.17594 10.2561 6.10607 10.4332C6.03621 10.6103 6 10.8034 6 10.9989C6 11.1944 6.03621 11.3875 6.10607 11.5646C6.17594 11.7417 6.27775 11.8985 6.40433 12.0238L13.1546 18.6917C13.384 18.9177 13.6797 19.0266 13.9768 18.9945C14.2739 18.9623 14.548 18.7916 14.739 18.52C14.93 18.2484 15.0222 17.898 14.9954 17.5459C14.9686 17.1937 14.825 16.8685 14.5961 16.6418L8.88296 10.9989Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerCenter}>
                            <Text style={styles.title}>Bật/tắt danh mục</Text>
                        </View>

                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => {
                                if (this.props.admin.roles?.includes('category_add') || this.props.admin.is_admin == 1) {
                                    this.setModalAdd(true);
                                }
                                else {
                                    Alert.alert('Bạn không phép thực hiện hành động này!');
                                }
                            }}>
                                <Svg style={styles.item} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M10 20C8.02219 20 6.08879 19.4135 4.4443 18.3147C2.79981 17.2159 1.51809 15.6541 0.761209 13.8268C0.00433284 11.9996 -0.1937 9.98891 0.192152 8.0491C0.578004 6.10929 1.53041 4.32746 2.92894 2.92894C4.32746 1.53041 6.10929 0.578004 8.0491 0.192152C9.98891 -0.1937 11.9996 0.00433284 13.8268 0.761209C15.6541 1.51809 17.2159 2.79981 18.3147 4.4443C19.4135 6.08879 20 8.02219 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20ZM10 1.53847C8.32647 1.53847 6.69052 2.03473 5.29902 2.96449C3.90753 3.89426 2.823 5.21577 2.18256 6.76191C1.54213 8.30806 1.37456 10.0094 1.70105 11.6508C2.02754 13.2921 2.83343 14.7998 4.01679 15.9832C5.20016 17.1666 6.70786 17.9725 8.34924 18.299C9.99062 18.6254 11.6919 18.4579 13.2381 17.8174C14.7842 17.177 16.1057 16.0925 17.0355 14.701C17.9653 13.3095 18.4615 11.6735 18.4615 10C18.4615 7.75586 17.5701 5.60364 15.9832 4.01679C14.3964 2.42995 12.2441 1.53847 10 1.53847Z" fill="white" />
                                    <Path d="M10 15.3846C9.79599 15.3846 9.60034 15.3036 9.45608 15.1593C9.31182 15.0151 9.23077 14.8194 9.23077 14.6154V5.38462C9.23077 5.1806 9.31182 4.98495 9.45608 4.84069C9.60034 4.69643 9.79599 4.61539 10 4.61539C10.204 4.61539 10.3997 4.69643 10.5439 4.84069C10.6882 4.98495 10.7692 5.1806 10.7692 5.38462V14.6154C10.7692 14.8194 10.6882 15.0151 10.5439 15.1593C10.3997 15.3036 10.204 15.3846 10 15.3846Z" fill="white" />
                                    <Path d="M14.6154 10.7692H5.38462C5.1806 10.7692 4.98495 10.6882 4.84069 10.5439C4.69643 10.3997 4.61539 10.204 4.61539 10C4.61539 9.79599 4.69643 9.60034 4.84069 9.45608C4.98495 9.31182 5.1806 9.23077 5.38462 9.23077H14.6154C14.8194 9.23077 15.0151 9.31182 15.1593 9.45608C15.3036 9.60034 15.3846 9.79599 15.3846 10C15.3846 10.204 15.3036 10.3997 15.1593 10.5439C15.0151 10.6882 14.8194 10.7692 14.6154 10.7692Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View >

                    <Modal visible={modalAdd} animationType="slide" transparent={true}>
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Thêm danh mục</Text>
                                {
                                    this.props.parent_cate === 'category_child' &&
                                    <View style={styles.chooseIcon}>
                                        <Text style={styles.textChooseIcon}>Chọn icon</Text>
                                        <TouchableOpacity onPress={() => this.select_image()} style={styles.thumbnail}>
                                            <Image
                                                style={{ width: '100%', height: '100%' }}
                                                source={image === "" ? require('../../../asset/images/iconCategory.png') : { uri: image }}
                                            ></Image>
                                        </TouchableOpacity>
                                    </View>
                                }
                                <Text style={styles.textAdd}>Tên danh mục</Text>
                                <TextInput
                                    style={styles.inputSL}
                                    onChangeText={(text) => this.setTitle(text)}
                                    value={title}
                                // value={addCate.title}
                                />






                                <View style={styles.btnGroupConfirm}>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => this.setModalAdd(false)}>
                                        <Text style={styles.txtConfirm}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.confirmButton} onPress={() => this.addCategory()}>
                                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={() => this.setModalAdd(false)}
                            style={styles.modalBackdrop}
                        />
                    </Modal>
                    <ScrollView >
                        <View style={{ flex: 1 }}>

                            {
                                // parent_cate === 'category' ? (
                                data?.map((v, index) => (
                                    <CheckBoxCategory
                                        key={index}
                                        setStatus={(id, status) => this.setStatus(id, status)}
                                        id_status={v?.Category.status}
                                        id_cate={v?.Category.id}
                                        stt={v?.Category.home}
                                        name={v?.Category.title}
                                        reloadData={() => this.getChildList()}
                                    />
                                ))
                            }
                        </View>
                    </ScrollView>
                    <View>
                        <TouchableOpacity onPress={() => this.saveData(showhide)}>
                            <Text style={styles.btnComplete}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                    <Footer />
                </View >

                <SpinnerComponent
                    spinner={spinner}
                />
            </SafeAreaView >
        );
    };

};
const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwitchCategory)

