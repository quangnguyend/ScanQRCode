import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

import PropTypes from 'prop-types';

export default class TextCustom extends Component {
    static propTypes = {
        color: PropTypes.string,
        fontSize: PropTypes.number
    }
    static defaultProps = {
        color: '#8E7631',
        fontSize: 16
    }
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text style={{color: this.props.color, fontSize: this.props.fontSize}}>
                    {this.props.children}
                </Text>
            </View>
        )
    }
}


