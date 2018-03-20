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


export default class Scanner extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    header: (props) => <Header {...props} />
  })

  constructor(props) {
    super(props)

    this.state = {
      scanSuccessfull: false
    }
  }

  navigate = (screen, data) => {
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate(screen, { ...params, ...data })
  }

  //call api so get Info
  getInfo = async (body) => {
    const fetchInfo = await Service.postMethod('scan', body,
      data => {
        this.navigate('ScanResult', { ...data, title: 'VIEW INFO' })
      },
      error => {
        console.log(error)
      }
    )
  }

  //call api so get Entry
  getEntry = async (body) => {
    const fetchInfo = await Service.postMethod('scan', body,
      data => {
        if (data.appError) {

          //if ENTRY REJECTED
          this.navigate('ScanResult', { ...data, title: 'ENTRY REJECTED' })
        } else {
          //if ENTRY ACCEPTED
          if (data.status && data.status === 400) {
            this.navigate('ScanResult', { ...data, title: 'INVALID TICKET' })
          }
          else {
            this.navigate('ScanResult', { ...data, title: 'ENTRY ACCEPTED' })
          }
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  // Has scan result
  onScanner = (e) => {
    const { typeScannerCode, eventCode } = this.props.navigation.state.params;
    if (!this.state.scanSuccessfull) {
      Vibration.vibrate();
      this.setState({
        scanSuccessfull: true
      })

      if (typeScannerCode === 1) {
        // if user choose ENTRY

        let body = {
          "code": e.data,
          "action": "ticketEnter",
          "event": eventCode
        }

        this.getEntry(body)
      }
      if (typeScannerCode === 2) {
        // if user choose VIEW INFO

        let body = {
          "code": e.data,
          "action": "ticketInfo",
          "event": eventCode
        }

        this.getInfo(body)
      }
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