import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native';
import { TextCustom, TextInputCustom, ButtonCustom } from './../../../components';
import Service from '../../../services/api';
import Header from './header'

export default class VendorOverview extends Component {

  static navigationOptions = {
    header: (props) => <Header {...props} />,
    headerLeft: null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/ticket.png')}
        style={[{ width: '100%', height: '100%' }]}
        resizeMode={'contain'}
      />
    ),
    headerStyle: { backgroundColor: '#635339' },
    headerTitleStyle: { color: '#FFFFFF', textAlign: 'center' }
  }

  constructor(props) {
    super(props)
    this.state = {
      manuallyCode: ''
    }
  }

  onReceipt = () => {
    this.props.navigation.navigate('ScanReceipt');
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
  onScannerManually = (typeScannerCode) => {
    // if user choose ENTRY
    const { manuallyCode } = this.state;
    let body = {
      "code": manuallyCode,
      "action": "purchaseInfo"
    }

    this.getReceipt(body)
  }

  onChangeTextCode = (text) => {
    this.setState({
      manuallyCode: text
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextCustom paddingBottom={20} textAlign={'left'}>SCAN RECEIPT QR CODE</TextCustom>
          <View style={styles.row} >
            <ButtonCustom width={100} onPress={this.onReceipt}>SCAN</ButtonCustom>
          </View>
          <TextCustom paddingBottom={20} textAlign={'left'}>IF RECEIPT SCANNING FAILS, TYPE THE RECEIPT ID HERE</TextCustom>
          <TextInputCustom onChangeText={this.onChangeTextCode} />

          <View style={styles.floatRight}>
            <ButtonCustom onPress={this.onScannerManually}>SUBMIT</ButtonCustom>
          </View>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 50,
    paddingTop: 10,
    justifyContent: 'center'
  },
  floatRight: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingTop: 10
  }
})