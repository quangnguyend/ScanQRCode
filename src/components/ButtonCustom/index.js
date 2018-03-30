import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native';

import PropTypes from 'prop-types';

export default class ButtonCustom extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        width: PropTypes.number,
        fontSize: PropTypes.number,
        padding: PropTypes.number,
        disable: PropTypes.bool,
        title: PropTypes.string,
        styleC: PropTypes.any
    }
    static defaultProps = {
        onPress: () => { },
        width: null,
        fontSize: 14,
        padding: 15,
        backgroundColor: '#8E7631',
        title: 'Buttom',
        styleC:{}
    }
    constructor(props) {
        super(props)
    }

    onPress = (e) => {
        this.props.onPress(e);
    }

    render() {
        const { width, fontSize, children, padding, disable, title, styleC } = this.props;
        let bColor = disable ? '#918B81' : '#8E7631';
        return (
            <View>
                <TouchableHighlight underlayColor={'#686156'} style={[styles.button, { width: width, padding: padding, backgroundColor: bColor }, styleC]} onPress={this.onPress}>
                    <Text style={{ fontSize: fontSize, color: '#FFFFFF' }}>{title}</Text>
                </TouchableHighlight>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#8E7631',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    }
})


