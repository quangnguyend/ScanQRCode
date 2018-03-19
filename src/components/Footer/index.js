import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    Image
} from 'react-native';

import PropTypes from 'prop-types';

export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    onPress = (e) => {
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.button} onPress={this.onPress}>
                    <View style={styles.buttonView}>
                        <Image source={require('./../../assets/images/ticket.png')} />
                        <Text>TICKET</Text>
                    </View>
                </TouchableHighlight>
                
                <TouchableHighlight style={styles.button} onPress={this.onPress}>
                    <View style={styles.buttonView}>
                        <Image source={require('./../../assets/images/logout.png')} />
                        <Text>LOGOUT</Text>
                    </View>
                </TouchableHighlight>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        width: '50%',
        alignItems: 'center'
    },
    buttonView: {
        alignItems: 'center'
    }
})


