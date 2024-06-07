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


// import type {Node} from 'react';
import {
    Text,
    TouchableOpacity,
    View

} from 'react-native';

import styles from './styles.js';

class CheckBoxRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleAddList = () => {
        if (this.props.listRole.some(item => item === this.props.roleKey)) {
            this.props.handleRemoveRole(this.props.roleKey);
        } else {
            this.props.handleAddRole(this.props.roleKey);
        }
    }

    render() {
        // const { } = this.props?.route?.params;
        return (
            <TouchableOpacity style={styles.checkBoxRoleItem} onPress={() => this.handleAddList()}>
                <Text style={styles.colorItem}>{this.props.roleName}</Text>
                {
                    this.props.listRole.some(item => item == this.props.roleKey) && (
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M17.5818 2.94155C17.0248 2.38389 16.1205 2.38424 15.5628 2.94155L6.47616 12.0286L2.43754 7.98996C1.87988 7.4323 0.975913 7.4323 0.418249 7.98996C-0.139416 8.54763 -0.139416 9.45159 0.418249 10.0093L5.46631 15.0573C5.74496 15.336 6.11035 15.4757 6.47578 15.4757C6.8412 15.4757 7.20694 15.3363 7.4856 15.0573L17.5818 4.96081C18.1394 4.40353 18.1394 3.49918 17.5818 2.94155Z" fill="#449604" />
                        </Svg>

                    )
                }
            </TouchableOpacity>
        );
    }
};

const mapStateToProps = state => ({
    product: state.product,
    admin: state.admin,
});

const mapDispatchToProps = dispatch => ({
    productAction: (act, data) => dispatch(productAction(act, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxRole)
