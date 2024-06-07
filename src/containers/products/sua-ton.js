/**
 *   React Native App
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
import Header from '../elements/Header';
import { get_detail_product } from '../../services/productService';
import { suaton } from '../../services/kiemkhoService';

import SelectQuantity from '../elements/SelectQuantity';
import productAction from '../../actions/productAction';
import colorAction from '../../actions/colorAction';
import sizeAction from '../../actions/sizeAction';
import SpinnerComponent from '../elements/Spinner';

// import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    Alert
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from '../config.js';
// import Header from '../elements/Header';
// import Footer from '../elements/Footer';
import styles from './styles.js';
// import { Header } from 'react-native/Libraries/NewAppScreen';

class SuaTon extends Component {
    // const { productId } = route.params;

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            colorList: [],
            sizeList: [],
            quantityList: [],
            list_quantity: this.props?.product?.list_quantity,
            statusTextMap: {
                1: 'Hàng mới',
                2: 'Bán tiếp',
                3: 'Gọi lại',
                4: 'Giảm giá',
                5: 'Dứt mẫu',
                6: 'Hàng lỗi'
            },
            spinner: false,
            listQuantity: [],
            listQuantityDefaults: [],
        }
    }

    componentDidMount() {
        this.getData();
        this.props.navigation.addListener(
            'focus',
            () => {
                this.getData();
            }
        );
    }

    setListQuantity(opt) {
        this.setState({ listQuantity: opt });
    }

    setSpinner(opt) {
        this.setState({ spinner: opt });
    }

    async getData() {
        this.setSpinner(true);
        const data = await get_detail_product({
            id: this.props.product.id,
            u_id: this.props.admin.uid,
        });
        this.setState({ data: data.product })
        // , () => {
        const newColorList = this.props.color.listAllColor?.filter(color =>
            data.product?.list_quantity?.some(quantity => quantity.color_id === color.id)
        );
        this.setState({ colorList: newColorList });
        const newSizeList = this.props.size?.listAllSize?.filter(size =>
            data.product?.list_quantity?.some(quantity => quantity.size_id === size.id)
        );
        this.setState({ sizeList: newSizeList });
        this.props.productAction('add_quantity', data.product?.list_quantity);

        this.props.sizeAction('list_show_size', newSizeList);
        this.props.colorAction('list_show_color', newColorList);

        this.setListQuantity(data.product.list_quantity);

        // console.log(data.product);
        // });
        this.setSpinner(false);
    }

    async handleConfirm() {
        console.log(this.state.listQuantity);
        const d = await suaton(this.props.admin.uid, this.props.product.id, this.state.listQuantity);
        if (d === false) {
            Alert.alert("Có lỗi, vui lòng thử lại");
            return true;
        }

        this.props.navigation.pop();
    }

    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { statusTextMap, spinner, listQuantity } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title='Sửa tồn'></Header>

                    <ScrollView style={{ backgroundColor: "#fff" }}>
                        <View>

                            <View style={styles.productInfo}>
                                <Text style={styles.name}>{data?.code} - {data?.title}</Text>
                                <Text style={[styles.bgGreen, styles.status]}>{statusTextMap[data?.status]}</Text>
                            </View>

                            <Text style={styles.inventory}>Chọn số lượng ({data?.totle_buy ? Number(data?.totle_buy).toLocaleString() : 0} / {data?.totle_quan ? Number(data?.totle_quan).toLocaleString() : 0})</Text>
                            {
                                this.state.colorList?.map((color, index) => (
                                    <SelectQuantity
                                        key={index}
                                        colorName={color?.title}
                                        dataSize={this.state?.sizeList}
                                        idColor={color?.id}
                                        list_quantity={listQuantity}
                                        colorContent={color?.content}
                                        inventory={true}
                                        setListQuantity={(opt) => this.setListQuantity(opt)}
                                    />
                                ))
                            }
                        </View>

                        <View>
                            <Text style={styles.inventory}>Có thể bạn quan tâm</Text>

                        </View>
                    </ScrollView>

                    <View>
                        <TouchableOpacity>
                            <Text style={[styles.suaGhiChu]}>Ghi chú: Chưa có gi chú (Bấm để xem thêm)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (this.props.admin.roles?.includes('kiemkho_add') || this.props.admin.is_admin == 1) {
                                this.handleConfirm();
                            }
                            else {
                                Alert.alert('Bạn không phép thực hiện hành động này!');
                            }
                        }}>
                            <Text style={styles.btnLuu}>Lưu</Text>
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
    color: state.color,
    size: state.size,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
    colorAction: (act, data) => dispatch(colorAction(act, data)),
    sizeAction: (act, data) => dispatch(sizeAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuaTon)
