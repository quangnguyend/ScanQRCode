import React, { Component } from 'react';
import {
    View,
    Vibration,
    StyleSheet
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});