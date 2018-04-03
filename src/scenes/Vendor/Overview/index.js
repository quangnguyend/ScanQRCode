import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Alert,
  AsyncStorage,
  Keyboard
} from 'react-native';
import { TextCustom, TextInputCustom, ButtonCustom, Loading } from './../../../components';
import Header from './header';
import { connect } from 'react-redux';

class VendorOverview extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: (props) => <Header {...props} />,
    headerLeft: null
  })

  constructor(props) {
    super(props)
    this.state = {
      manuallyCode: '',
      loading: false
    }
  }

  checkKeyboardOnShowHide() {
    Keyboard.addListener('keyboardDidShow', () => {
      this.props.navigation.setParams({
        tabBarVisible: false
      })
    })

    Keyboard.addListener('keyboardDidHide', () => {
      this.props.navigation.setParams({
        tabBarVisible: true
      })
    })
  }

  componentWillMount() {
    this.checkKeyboardOnShowHide();
    console.log(this.props)
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
    const fetchInfo = await this.props.postApi('scan', body,
      (err, data) => {
        if (data) {
          if (data.status === 400 || data.appError) {
            this.navigate('InvalidPage', data)
          } else {
            this.navigate('ComfirmCollection', { ...data, ...body })
          }
        }
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

  onChangeTextCode = (text) => {
    this.setState({
      manuallyCode: text
    })
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
  navigate: (routeName, params) => dispatch({ type: 'VendorNavigate', ...{ routeName: routeName, params: params } }),
  postApi: (endPoint, body, callback) => dispatch({ type: 'POST_TODO_DATA', endPoint: endPoint, body: body, callback })
});

export default connect(null, mapDispatchToProp)(VendorOverview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    marginTop: (Platform.OS === 'ios') ? 20 : 0
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
  },
  iconStyle: {
    width: (Platform.OS === 'ios') ? 30 : '100%',
    height: (Platform.OS === 'ios') ? 30 : '100%'
  }
})