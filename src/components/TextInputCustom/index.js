import React, { Component } from 'react';
import {
    TextInput,
    View,
    StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

export default class TextInputCustom extends Component {
    static propTypes = {
        onChangeText: PropTypes.func,
        placeholder: PropTypes.string,
        password: PropTypes.bool
    }
    static defaultProps = {
        onChangeText: () => { },
        placeholder: '',
        password: false
    }
    constructor(props) {
        super(props)
    }

    onChangeText = (e) => {
        this.props.onChangeText(e);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput} secureTextEntry={this.props.password} onChangeText={this.onChangeText} underlineColorAndroid="transparent" placeholder={this.props.placeholder} placeholderTextColor={'#B6B5B5'} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        borderWidth: 1.5,
        borderTopColor: '#8E7631',
        borderBottomColor: '#8E7631',
        borderLeftColor: '#8E7631',
        borderRightColor: '#8E7631',
        borderRadius: 5,
        marginBottom: 10
    },
    container: {
        width: '100%'
    }
})


