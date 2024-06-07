/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import Footer from '../elements/Footer';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Header from '../elements/Header';
import { get_categories, get_category_settings } from '../../services/categoryService';
import styles from './styles.js';

import categoryAction from '../../actions/categoryAction';
import ChildCate from './ChildCate';
import SwitchCategory from './SwitchCategory';

class SettingCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectedButton: 0,
            childList: [],
            childId: '',
            modalCate: false,
            modalPCate: false,
        }

    }

    componentDidMount() {
        // this.getData();

        this.props.navigation.addListener(
            'focus',
            () => {
                this.getData();
            }
        );
    }

    setSelectedButton(opt) {
        this.setState({ selectedButton: opt });
    }

    handleButtonPress = (buttonName, childList, childId) => {
        this.setSelectedButton(buttonName);
        this.setState({ childList: childList })
        this.setState({ childId: childId });
    };

    async getData() {
        const data = await get_category_settings({
            u_id: this.props.admin.uid,
        });
        this.setState({ data: data });
        if (this.state.childId == 0) {
            this.setState({ childId: data[0].Category.id });
        }
        this.setState({ childList: data[0].children })
    }

    // async getChildList(id) {
    //     console.log(id);
    //     const data = await get_category_settings({
    //         u_id: this.props.admin.uid,
    //     });
    //     this.setState({ data: data });
    //     data.map(cate => {
    //         if (cate.Category.id == id) {
    //             console.log(cate.children);
    //             this.setState({ childList: cate.children });
    //         }
    //     });
    // }



    render() {
        const navigation = this.props.navigation;
        const data = this.state.data;
        const { childList, childId, modalCate, modalPCate } = this.state

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={'Cài đặt Danh mục'} />

                    <View style={{ flex: 1 }}>
                        <View style={styles.GroupCategory}>
                            <View style={styles.listCategory}>
                                <ScrollView>
                                    <View>
                                        {
                                            data?.map((category, index) => (
                                                <TouchableOpacity key={index} onPress={() => this.handleButtonPress(index, category?.children, category?.Category?.id)}>
                                                    <Text style={[styles.txtCategoryName, this.setState.selectedButton === index && styles.tabActive]}>{category?.Category?.title}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View >
                                </ScrollView >
                            </View >

                            <ScrollView>
                                <View style={styles.listChildCategory}>
                                    {
                                        data?.map((data, index) => (
                                            data?.children?.map((child, indexChild) => (
                                                console.log(child),
                                                this.state.selectedButton === index && (
                                                    <ChildCate
                                                        key={indexChild}
                                                        title={child.Category.title}
                                                        children={child.children}
                                                        id={child.Category.id}
                                                        reloadData={() => this.getData()}
                                                        image={child.Category.image}
                                                    ></ChildCate>
                                                )
                                            ))
                                        ))
                                    }
                                </View>
                            </ScrollView>
                        </View >
                    </View >

                    <View style={styles.groupBtn1}>
                        <View style={styles.groupBtn}>
                            <View style={styles.btnEdit}>
                                <TouchableOpacity onPress={() => {
                                    // navigation.navigate('SwitchCategories', { parent_cate: 'category', data: data, parent_id: '' })
                                    this.setState({ modalPCate: true })
                                }}>
                                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M13.2916 11.7334L10.975 12.3084C10.7594 12.3612 10.5385 12.3891 10.3166 12.3917C9.96004 12.3923 9.60691 12.3218 9.27784 12.1845C8.94877 12.0471 8.65034 11.8456 8.39997 11.5917C8.07229 11.2602 7.83511 10.8501 7.7111 10.4008C7.58708 9.9514 7.58038 9.47774 7.69164 9.02505L8.27497 6.7084C8.42176 6.12238 8.72407 5.58686 9.14997 5.1584L12.6416 1.66675H3.33332C2.44927 1.66675 1.60143 2.01794 0.976307 2.64306C0.351188 3.26817 0 4.11602 0 5.00007L0 16.6667C0 17.5507 0.351188 18.3986 0.976307 19.0237C1.60143 19.6488 2.44927 20 3.33332 20H14.9999C15.884 20 16.7318 19.6488 17.357 19.0237C17.9821 18.3986 18.3333 17.5507 18.3333 16.6667V7.35839L14.8416 10.85C14.4137 11.2784 13.8782 11.5835 13.2916 11.7334Z" fill="#B8101F" />
                                        <Path d="M19.4107 1.07757L18.9224 0.589238C18.7356 0.402427 18.5138 0.25424 18.2697 0.153138C18.0257 0.0520366 17.7641 0 17.4999 0C17.2357 0 16.9741 0.0520366 16.73 0.153138C16.486 0.25424 16.2642 0.402427 16.0774 0.589238L10.3274 6.33922C10.1139 6.55279 9.96235 6.82038 9.88908 7.11338L9.31075 9.42754C9.26706 9.60185 9.26928 9.78451 9.31719 9.95771C9.3651 10.1309 9.45708 10.2887 9.58415 10.4158C9.71122 10.5429 9.86905 10.6349 10.0422 10.6828C10.2154 10.7307 10.3981 10.7329 10.5724 10.6892L12.8866 10.1109C13.1796 10.0376 13.4472 9.8861 13.6607 9.67254L19.4107 3.92256C19.5975 3.73576 19.7457 3.51399 19.8468 3.26992C19.9479 3.02584 20 2.76425 20 2.50006C20 2.23588 19.9479 1.97428 19.8468 1.73021C19.7457 1.48614 19.5975 1.26437 19.4107 1.07757Z" fill="#B8101F" />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnEdit}>
                                <TouchableOpacity onPress={() => {
                                    // navigation.navigate('SwitchCategories', { parent_cate: 'category_child', data: childList, parent_id: childId })
                                    this.setState({ modalCate: true })
                                }}>
                                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M13.2916 11.7334L10.975 12.3084C10.7594 12.3612 10.5385 12.3891 10.3166 12.3917C9.96004 12.3923 9.60691 12.3218 9.27784 12.1845C8.94877 12.0471 8.65034 11.8456 8.39997 11.5917C8.07229 11.2602 7.83511 10.8501 7.7111 10.4008C7.58708 9.9514 7.58038 9.47774 7.69164 9.02505L8.27497 6.7084C8.42176 6.12238 8.72407 5.58686 9.14997 5.1584L12.6416 1.66675H3.33332C2.44927 1.66675 1.60143 2.01794 0.976307 2.64306C0.351188 3.26817 0 4.11602 0 5.00007L0 16.6667C0 17.5507 0.351188 18.3986 0.976307 19.0237C1.60143 19.6488 2.44927 20 3.33332 20H14.9999C15.884 20 16.7318 19.6488 17.357 19.0237C17.9821 18.3986 18.3333 17.5507 18.3333 16.6667V7.35839L14.8416 10.85C14.4137 11.2784 13.8782 11.5835 13.2916 11.7334Z" fill="#B8101F" />
                                        <Path d="M19.4107 1.07757L18.9224 0.589238C18.7356 0.402427 18.5138 0.25424 18.2697 0.153138C18.0257 0.0520366 17.7641 0 17.4999 0C17.2357 0 16.9741 0.0520366 16.73 0.153138C16.486 0.25424 16.2642 0.402427 16.0774 0.589238L10.3274 6.33922C10.1139 6.55279 9.96235 6.82038 9.88908 7.11338L9.31075 9.42754C9.26706 9.60185 9.26928 9.78451 9.31719 9.95771C9.3651 10.1309 9.45708 10.2887 9.58415 10.4158C9.71122 10.5429 9.86905 10.6349 10.0422 10.6828C10.2154 10.7307 10.3981 10.7329 10.5724 10.6892L12.8866 10.1109C13.1796 10.0376 13.4472 9.8861 13.6607 9.67254L19.4107 3.92256C19.5975 3.73576 19.7457 3.51399 19.8468 3.26992C19.9479 3.02584 20 2.76425 20 2.50006C20 2.23588 19.9479 1.97428 19.8468 1.73021C19.7457 1.48614 19.5975 1.26437 19.4107 1.07757Z" fill="#B8101F" />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.txtChuY}>Lưu ý: Chọn lại từ danh mục cấp 1 để thấy thay đổi khi thêm sửa xóa danh mục</Text>
                    </View>
                    <Footer />
                </View >
                {
                    modalCate &&
                    <SwitchCategory
                        closeModal={() => {
                            this.setState({ modalCate: false });
                            this.getData();
                        }}
                        parent_cate={'category_child'}
                        parent_id={childId}
                    // setChildId={(opt) => this.setState({ childId: opt })}
                    // data={childList}
                    // reloadData={() => this.getChildList(childId)}
                    ></SwitchCategory>
                }

                {
                    modalPCate &&
                    <SwitchCategory
                        closeModal={() => {
                            this.setState({ modalPCate: false });
                            this.getData();
                        }}
                        parent_id={''}
                        parent_cate={'category'}
                    // data={childList}
                    // reloadData={() => this.getChildList(childId)}
                    ></SwitchCategory>
                }
            </SafeAreaView >
        );
    };

};
const mapStateToProps = state => ({
    category: state.category,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    categoryAction: (act, data) => dispatch(categoryAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingCategory)

