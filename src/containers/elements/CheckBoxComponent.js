/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import '../categories/styles';
import { connect } from 'react-redux';
import sizeAction from '../../actions/sizeAction';
import colorAction from '../../actions/colorAction';

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

class CheckBox extends Component {

    // const navigation = useNavigation();
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }

    setChecked = (opt) => {
        this.setState({ checked: opt });
    }

    // handleAddList = (opt) => {
    //     this.setState({ list: [...this.state.list, opt] }, () => {
    //         console.log(this.state.list);
    //     });

    //     this.props.setList([...this.state.list, opt]);



    //     // console.log(opt);
    // }

    // handleRemoveList = (id) => {
    //     const newList = this.state.list.filter(item => item.id !== id);
    //     this.setState({ list: newList });
    //     this.props.setList(newList);
    //     console.log(this.state.list);
    // }


    async handleToggle() {

        const { idSize, idColor, size, color, sizeAction, colorAction, type, colorName, sizeName, selectedColor } = this.props;
        if (type === 'size') {
            if (this.props.list.some(item => item.id === idSize)) {
                // await sizeAction('remove_size_id', idSize);
                this.props.handleRemoveList(idSize);
            } else {
                // await sizeAction('list_size_id', { id: idSize, title: sizeName });
                this.props.handleAddList({
                    id: idSize,
                    title: sizeName,
                })
            }
            // console.log(size.listSize);
        } else {
            if (this.props.list.some(item => item.id === idColor)) {
                this.props.handleRemoveList(idColor);
            } else {
                this.props.handleAddList({
                    id: idColor,
                    title: colorName,
                    content: selectedColor
                })
            }
        }

    };

    render() {
        return (
            <TouchableOpacity onPress={() => this.handleToggle()} >
                <View style={[styles.flexRow, styles.spaceBetween]}>
                    <View style={[styles.flexRow, styles.border0]}>
                        <Text style={[styles.txtCategoryName, styles.border0]}>{this.props.colorName || this.props.sizeName}</Text>
                        {this.props.type === 'color' ? <Text style={{ ...styles.boxColor, ...styles.bgColor, backgroundColor: `${this.props.selectedColor}` }}></Text> : <></>}
                    </View>
                    {this.props.type === 'color' ? (
                        this.props?.list?.some(item => item.id === this.props.idColor) && (
                            <View style={[styles.checkMark, styles.checkMarkGreed]}>
                                <Text style={[styles.checkMark1, styles.clWhite]}></Text>
                            </View>
                        )
                    ) : (
                        this.props?.list?.some(item => item.id === this.props.idSize) && (
                            <View style={[styles.checkMark, styles.checkMarkGreed]}>
                                <Text style={[styles.checkMark1, styles.clWhite]}></Text>
                            </View>
                        )
                    )}

                </View>
            </TouchableOpacity>
        );

    };
}
const styles = StyleSheet.create({
    checkMarkGreed: {
        backgroundColor: "green",
        borderWidth: 0,
        paddingTop: 2,
    },
    clWhite: {
        borderColor: "white"
    },
    checkMark: {
        width: 20,
        height: 20,
        borderColor: "#2DCC70",
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: 10,
    },
    checkMark1: {
        transform: [{ rotate: '45deg' }],
        borderColor: "#2DCC70",
        borderBottomWidth: 1.5,
        borderRightWidth: 1.5,
        width: 6,
        height: 13,
        marginLeft: 7,
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
    },
    spaceBetween: {
        justifyContent: "space-between",
        paddingRight: 10,
    },
    border0: {
        borderBottomWidth: 0,
    },
    txtCategoryName: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: "#000",
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
    },
    boxColor: {
        width: 20,
        height: 20,
        backgroundColor: "#000",
        marginBottom: 10,
    },
    bgColor: {
        marginBottom: 0,
        borderRadius: 4,
    },
});


const mapStateToProps = state => ({
    size: state.size,
    color: state.color,
});

const mapDispatchToProps = dispatch => ({
    sizeAction: (act, data) => dispatch(sizeAction(act, data)),
    colorAction: (act, data) => dispatch(colorAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox)
