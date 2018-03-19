import React, { Component } from 'react';
import {
    View,
    Vibration,
    StyleSheet,
    Image
} from 'react-native';

import Camera from 'react-native-camera';
import Service from '../../../services/api';

export default class Scanner extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
    })

    constructor(props) {
        super(props)

        this.state = {
            scanSuccessfull: false
        }
    }

    getInfo = async (body) => {
        const fetchInfo = await Service.postMethod('scan', body,
            data => {
                console.log(data)
            },
            error => {
                console.log(error)
            }
        )
    }

    getEntry = () => {

    }

    onScanner = (e) => {
        const { typeScannerCode } = this.props.navigation.state.params;
        if (!this.state.scanSuccessfull) {
            Vibration.vibrate();
            this.setState({
                scanSuccessfull: true
            })

            if (typeScannerCode === 1) {
                // if user choose ENTRY
                console.log('ENTRY', e.data)
            }
            if (typeScannerCode === 2) {
                // if user choose VIEW INFO
                console.log('VIEW INFO', e.data)
                let body = {
                    "code": e.data,
                    "action": "ticketInfo",
                    "event": "SULTAN"
                }

                this.getInfo(body)
            }
        }
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