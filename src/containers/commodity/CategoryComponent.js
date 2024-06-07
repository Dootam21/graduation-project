/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import { connect } from 'react-redux';
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native';


import styles from './styles.js';

class CategoryComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: '',
        }


    }

    setIndex(opt) {
        this.setState({ index: opt });
    }



    render() {

        return (
            <View style={[styles.listCategory1]}>
                <TouchableOpacity style={styles.category} onPress={() => {
                    this.props.setCategory(this.props.id);
                    this.props.setIndex(this.props.id);
                    console.log(this.props.childList);
                }}>
                    <View style={[styles.flexRow, styles.groupItem]}>
                        <Text style={styles.txtCategory}>{this.props.name}</Text>
                        {/* <Text style={styles.txtQuantity}>(1/662)</Text> */}
                    </View>
                    {
                        this.props.id == this.props.idCategory && (
                            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M17.178 4.70819C17.5279 5.01437 17.5597 5.54778 17.2484 5.89322L8.48684 15.618C8.17397 15.9653 7.63679 15.9874 7.29648 15.667L2.22645 10.894C1.91027 10.5964 1.88 10.1004 2.15128 9.76129C2.45061 9.38713 3.00804 9.33563 3.36428 9.65604L7.29794 13.1943C7.63979 13.5018 8.1661 13.4743 8.47409 13.1329L16.0103 4.77712C16.3153 4.43899 16.8353 4.40834 17.178 4.70819Z" fill="#B8101F" />
                            </Svg>
                        )
                    }
                </TouchableOpacity>
                {

                    this.props.childList.map((child, index) => (
                        this.props.index == child.Category.parent_id && (
                            <CategoryComponent
                                key={index}
                                childList={child.children}
                                id={child.Category.id}
                                name={child.Category.title}
                                setCategory={(opt) => this.props.setCategory(opt)}
                                idCategory={this.props.idCategory}
                                setIndex={(opt) => this.setIndex(opt)}
                                index={this.state.index}
                            />

                        )
                    ))

                }
            </View>
        );
    };

};
const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent)

