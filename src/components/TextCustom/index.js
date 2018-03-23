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
        paddingBottom: PropTypes.number,
        textAlign: PropTypes.string,
        styleC: PropTypes.any
    }
    static defaultProps = {
        color: '#8E7631',
        fontSize: 16,
        paddingTop: 0,
        paddingBotton: 0,
        textAlign: 'center',
        styleC: {}
    }
    constructor(props) {
        super(props)
    }

    render() {
        const { color, fontSize, paddingBottom, paddingTop, textAlign, styleC } = this.props;
        return (
            <Text style={[{ color: color, fontSize: fontSize, paddingBottom: paddingBottom, paddingTop: paddingTop, textAlign: textAlign }, styleC]}>
                {this.props.children}
            </Text>
        )
    }
}


