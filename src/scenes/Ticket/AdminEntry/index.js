import React, { Component } from 'react';
import {
    View,
    Vibration,
    StyleSheet,
    Image
} from 'react-native';

import Camera from 'react-native-camera';


export default class AdminEntry extends Component {
    constructor(props) {
        super(props)
    }

    onScanner = (e) => {
        Vibration.vibrate();
        console.log(e);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/images/backgroundScanner.png')}
                    style={styles.imageBackground}
                //resizeMode={'stretch'}
                />
                <Camera
                    style={{ width: 300, height: 300 }}
                    onBarCodeRead={this.onScanner}
                    type={"back"}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        //height: '100%',
        resizeMode: 'cover'
    }
});