import React, { Component } from 'react';
import {
  View,
  Vibration,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  Platform,
  PermissionsAndroid
} from 'react-native';

import Camera from 'react-native-camera';
import Header from './header';
import { connect } from 'react-redux';
import { Loading } from './../../../components';
import { setVisibleNavVendor } from '../../Sign/actions';
import { Theme } from '../../../constant';

class ScanReceipt extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `SCAN RECEIPT`,
    header: (props) => <Header {...props} />
  })

  constructor(props) {
    super(props)

    this.state = {
      scanSuccessfull: false,
      loading: false,
      isAuth: false
    }
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          isAuth: true,
          loading: false
        })
      } else {
        this.setState({ loading: false });
        this.props.navigate('Overview');
      }
    } catch (err) {
      console.warn(err)
    }
  }

  componentWillMount() {
    //hide tab bar navigation
    this.props.setVisibleNavVendor(false);
    if (Platform.OS === 'ios') {
      Camera.checkVideoAuthorizationStatus().then(isAuthorized => {
        if (isAuthorized) {
          this.setState({ isAuth: true, loading: false });
        } else {
          this.setState({ loading: false });
          this.props.navigate('Overview');
        }
      })
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(rs => {
        if (!rs) {
          this.requestCameraPermission();
        }
        else {
          this.setState({
            isAuth: true,
            loading: false
          })
        }
      })
    }
  }

  componentWillUnmount() {
    //show tab bar navigation
    this.props.setVisibleNavVendor(true);
  }

  //**QR CODE */
  navigate = (screen, data) => {
    this.props.navigate(screen, data)
  }

  //call api so get Info
  getReceipt = async (body) => {
    const fetchInfo = await this.props.postApi('scan', body,
      (err, data) => {
        if (err) {
          this.navigate('Overview');
          return;
        }
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
    const { loading, isAuth } = this.state;
    if (isAuth) {
      return (
        <View style={styles.container}>
          <Image
            source={Theme.Image.BACKGROUND_SCAN}
            style={styles.imageBackground}
            resizeMode={'stretch'}
          />
          <Camera
            style={styles.camera}
            onBarCodeRead={this.onScanner}
            type={"back"}
          />
          <Loading showTextLoading={true} loading={loading} />
        </View>
      )
    }
    else {
      return (
        <View>
          <Loading loading={loading} />
        </View>
      )
    }
  }
}

const mapDispatchToProp = dispatch => ({
  navigate: (routeName, params) => dispatch({ type: 'VendorNavigate', ...{ routeName: routeName, params: params } }),
  setVisibleNavVendor: (value) => dispatch(setVisibleNavVendor(value)),
  postApi: (endPoint, body, callback) => dispatch({ type: 'POST_TODO_DATA', endPoint: endPoint, body: body, callback })
});

export default connect(null, mapDispatchToProp)(ScanReceipt);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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