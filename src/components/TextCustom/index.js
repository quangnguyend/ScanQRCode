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
        fontSize: PropTypes.number,
        paddingTop: PropTypes.number,
        paddingBottom: PropTypes.number
    }
    static defaultProps = {
        color: '#8E7631',
        fontSize: 16,
        paddingTop: null,
        paddingBotton: null
    }
    constructor(props) {
        super(props)
    }

    render() {
        const { color, fontSize, paddingBottom, paddingTop } = this.props;
        return (
            <View>
                <Text style={{ color: color, fontSize: fontSize, paddingBottom: paddingBottom, paddingTop: paddingTop, textAlign: 'center' }}>
                    {this.props.children}
                </Text>
            </View>
        )
    }
}


