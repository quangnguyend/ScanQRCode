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
        padding: PropTypes.number
    }
    static defaultProps = {
        onPress: () => { },
        width: null,
        fontSize: 14,
        padding: 15
    }
    constructor(props) {
        super(props)
    }

    onPress = (e) => {
        this.props.onPress(e);
    }

    render() {
        const { width, fontSize, children, padding } = this.props;
        return (
            <View>
                <TouchableHighlight style={[styles.button, { width: width, padding: padding }]} onPress={this.onPress}>
                    <Text style={{ fontSize: fontSize }}>{children}</Text>
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
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    }
})


