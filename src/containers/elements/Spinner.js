/**
 *   React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../products/styles';



class SpinnerComponent extends Component {
    render() {
        return (
            <Spinner
                visible={this.props?.spinner}
                textContent={'Vui lòng chờ...'}
                textStyle={{ color: '#FFF' }}
            />
        )
    }
};


export default SpinnerComponent
