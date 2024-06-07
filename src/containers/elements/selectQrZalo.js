/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { DOMAIN } from '../../constants/config';

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
// import Footer from '../elements/Footer';

import styles from '../supplier/styles';
const options = {
    title: 'Chọn ảnh',
    takePhotoButtonTitle: 'Chụp ảnh',
    chooseFromLibraryButtonTitle: 'Chọn từ Thư viện',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
    },
};

function SelectQrZalo({ ismodal, closeModal }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [images, setImages] = useState([]);
    const [image_show, setImage_show] = useState([]);
    
    useEffect(() => {
        setModalVisible(ismodal);
    }, [ismodal]);

    const handleActive = (option) => {
        setIsActive(option);
        setModalVisible(false);
    }
    const handleClose = () => {
        setModalVisible(false);
    }

    removeImage = (stt) =>
    {
        var buff = [];
        var num = 0;
        for(var i=0; i<image_show.length; i++)
        {
            if(i != stt)
            {
                buff[num] = image_show[i];
                num++;
            }
        }
        setImage_show(buff);
    }
    
    select_image = async() =>
    {
        const result = await launchImageLibrary(options, response => 
        {
            if (response.didCancel) 
            {
                console.log('User cancelled image picker');
            } 
            else if (response.error) 
            {
                console.log('ImagePicker Error: ', response.error);
            } 
            else if (response.customButton) 
            {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } 
            else 
            {
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
                // images.push(buff);
                // this.setState({
                //     images: images,
                //     selected: 1
                // });
                setImages(buff);
                upload_images(buff);
            }
        });
    }
    select_camera = async () =>
    {
        const result = await launchCamera(options, response => 
        {
            if (response.didCancel) 
            {
                console.log('User cancelled image picker');
            } 
            else if (response.error) 
            {
                console.log('ImagePicker Error: ', response.error);
            } 
            else if (response.customButton) 
            {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } 
            else 
            {
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
                // images.push(buff);
                // this.setState({
                //     images: images,
                //     selected: 1
                // });
                setImages(buff);
                console.log(buff);
                console.log(images);
                upload_images(buff);
            }
        });
    }
    upload_images = (images2upload) =>
    {
        var uploadUrl = DOMAIN + 'api/api_image/upload_image/';

        if(images2upload.filename)
        {
            var new_images = image_show;
            let picture = images2upload;
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
            .then((responseJson) => 
            {
                if(responseJson.res == 'done')
                {
                    new_images.push(responseJson.msg);
                    setImage_show(new_images);
                    
                    console.log(new_images);
                    closeModal(responseJson.msg);
                }
                else
                {
                    Alert.alert("Thông báo", "có lỗi");
                    return false;
                }
                    
            })
            .catch(err => {
                console.log(err);
            });
        }
        else
        {
            Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 ảnh");
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Cập nhật ảnh</Text>
                    <TouchableOpacity onPress={() => select_camera()}>
                        <Text style={[styles.txtFilter, isActive === 'Tên A-Z' && styles.activeCL]}>Chụp ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => select_image()}>
                        <Text style={[styles.txtFilter, isActive === 'Tên Z-A' && styles.activeCL]}>Thư viện ảnh</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.centeredView1}>
                <TouchableOpacity onPress={this.Cancel}>
                    <Text style={styles.txtClose}>Hủy bỏ</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={() => handleClose()}
                style={styles.modalBackdrop}
            />
        </Modal>
    );
};

export default SelectQrZalo;
