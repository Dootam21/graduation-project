/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import Footer from '../elements/Footer';

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
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';

function Message({ navigation }) {
    // const [appID, setAppId] = useState('');
    // // navigation.openDrawer();

    // const storeAppID = async (value) => {
    //     try {
    //     await AsyncStorage.setItem('appID', value);

    //     } catch (e) {
    //     // saving error
    //     }
    // }

    // const getAppID = async () => {
    //     try {
    //         var value = await AsyncStorage.getItem('appID');

    //         if(value !== null) {
    //             // value previously stored
    //             setAppId(value);
    //         }
    //         else
    //         {
    //             var resp = await fetch(Config.get_app_id_api_url, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             const appdata = await resp.json();
    //             storeAppID(appdata.appid);
    //             setAppId(appdata.appid);
    //         }
    //     } catch(e) {
    //     // error reading value
    //     }
    // }

    // useEffect(() => {
    //     getAppID();
    //  }, []); 

    // useEffect(() => {
    //     global.appID = appID;
    //  }, [appID]); 


    // const toggleMenu = () => {
    //     navigation.toggleDrawer();
    // }

    // const goNewsList = (cid) => {
    //     navigation.navigate({
    //         name: 'NewsList',
    //         params: { cid: cid, from: 0 },
    //     });
    // }

    // const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
    //     <View>
    //         <View style={styles.homeList}>
    //             <Text>Sản phẩm mới</Text>
    //             <TouchableOpacity onPress={onPress} style={styles.btnViewMore}>
    //                 <Text>Xem tất cả</Text>
    //             </TouchableOpacity>
    //         </View>
    //         <Swiper style={styles.homeSlide}>
    //             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //                 <Text>Slide 1</Text>
    //             </View>
    //             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //                 <Text>Slide 2</Text>
    //             </View>
    //             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //                 <Text>Slide 3</Text>
    //             </View>
    //         </Swiper>
    //     </View>
    // );


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>

                    <TouchableOpacity style={styles.headerLeft} onPress={()=>{}}>
                        {/* <Image style={styles.btnCart} source={require('./../../../asset/images/cart1.png')}></Image> */}
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        {/* <Image style={styles.iconSearch} source={require('./../../../asset/images/search.png')}></Image> */}
                        <TextInput
                            style={styles.inputsearch}
                            placeholder="Tìm kiếm"
                        />
                    </View>

                    <TouchableOpacity style={styles.headerRight} onPress={()=>{}}>
                        <Text style={styles.btnText}>{`Giá \n buôn`}</Text>
                    </TouchableOpacity>
                </View >

                <ScrollView>
                    <Text>Xin chao</Text>
                </ScrollView>

                <Footer />
            </View >
        </SafeAreaView >
    );
};

export default Message;
