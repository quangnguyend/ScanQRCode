import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native';
import { TextCustom, TextInputCustom, ButtonCustom, Loading } from './../../../components';
import Service from '../../../services/api';
import Header from './header';
import { connect } from 'react-redux';

class VendorOverview extends Component {

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
      manuallyCode: '',
      loading: false
    }
  }

  onReceipt = () => {
    this.navigate('ScanReceipt', null);
  }

  //**QR CODE */
  navigate = (screen, data) => {
    this.props.navigate(screen, data);
  }

  //call api so get Info
  getReceipt = async (body) => {
    this.setLoadingBar(true);
    const fetchInfo = await Service.postMethod('scan', body,
      data => {
        if (data.status === 400) {
          this.navigate('InvalidPage', data)
        } else {
          this.navigate('ComfirmCollection', data)
        }
      },
      error => {
        console.log(error);
        this.setLoadingBar(true);
      }
    )
  }
  //**END QR CODE */

  // Has scan result
  onScannerManually = () => {
    // if user choose ENTRY
    const { manuallyCode } = this.state;
    let body = {
      "code": manuallyCode,
      "action": "purchaseInfo"
    }

    this.getReceipt(body)
  }

  setLoadingBar = (value) => {
    this.setState({
      loading: value
    })
  }

  onChangeTextCode = (text) => {
    this.setState({
      manuallyCode: text
    })
  }

  componentWillUnmount() {
    console.log('Overview Unmount');
    this.setLoadingBar(false);
  }

  render() {
    const { manuallyCode, loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextCustom paddingBottom={20} textAlign={'left'}>SCAN RECEIPT QR CODE</TextCustom>
          <View style={styles.row} >
            <ButtonCustom width={100} onPress={this.onReceipt} title={'SCAN'} />
          </View>
          <TextCustom paddingBottom={20} textAlign={'left'}>IF RECEIPT SCANNING FAILS, TYPE THE RECEIPT ID HERE</TextCustom>
          <TextInputCustom onChangeText={this.onChangeTextCode} />

          <View style={styles.floatRight} pointerEvents={manuallyCode === '' ? 'none' : 'auto'}>
            <ButtonCustom onPress={this.onScannerManually} disable={manuallyCode === '' ? true : false} title={'SUBMIT'} />
          </View>
        </View>
        <Loading loading={loading} />
      </View >
    )
  }
}

const mapDispatchToProp = dispatch => ({
  navigate: (routeName, params) => dispatch({ type: 'navigate', ...{ routeName: routeName, params: params } })
});

export default connect(null, mapDispatchToProp)(VendorOverview);

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