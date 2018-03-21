import React, { Component } from 'react';
import {
  View,
  Vibration,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

import Camera from 'react-native-camera';
import Header from './header';

import Service from '../../../services/api';


export default class ScanReceipt extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `SCAN RECEIPT`,
    header: (props) => <Header {...props} />
  })

  constructor(props) {
    super(props)

    this.state = {
      scanSuccessfull: false
    }
  }

  //**QR CODE */
  navigate = (screen, data) => {
    this.props.navigation.navigate(screen, data)
  }

  //call api so get Info
  getReceipt = async (body) => {
    const fetchInfo = await Service.postMethod('scan', body,
      data => {
        console.log(data)
        //this.navigate('ScanResult', { ...data, ...{ title: 'VIEW INFO', typeScannerCode: 2, eventCode: this.state.currentEvent.value } })
      },
      error => {
        console.log(error)
      }
    )
  }
  //**END QR CODE */

  // Has scan result
  onScanner = (e) => {
    if (!this.state.scanSuccessfull) {
      Vibration.vibrate();
      this.setState({
        scanSuccessfull: true
      })
      // if user choose ENTRY

      let body = {
        "code": e.data,
        "action": "purchaseInfo",
      }

      this.getReceipt(body)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/qr-codescreen.png')}
          style={styles.imageBackground}
          resizeMode={'stretch'}
        />
        <Camera
          style={styles.camera}
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
  },
  imageBackground: {
    width: 250,
    height: 250,
    zIndex: 1
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
});