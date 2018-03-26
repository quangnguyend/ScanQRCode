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

import Service from '../../../services/api';
import { connect } from 'react-redux';
import { Loading } from './../../../components';


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
    const { userInfo } = this.props;
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
        this.props.navigate(userInfo.roles[0]);
      }
    } catch (err) {
      console.warn(err)
    }
  }

  componentWillMount() {
    const { userInfo } = this.props;
    this.setLoadingBar(true);
    if (Platform.OS === 'ios') {
      Camera.checkVideoAuthorizationStatus().then(isAuthorized => {
        if (isAuthorized) {
          this.setState({ isAuth: true, loading: false });
        } else {
          this.setState({ loading: false });
          this.props.navigate(userInfo.roles[0]);
        }
      })
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(rs => {
        console.log(rs)
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
    console.log('Scan Unmount');
    this.setLoadingBar(false);
  }

  setLoadingBar = (value) => {
    this.setState({
      loading: value
    })
  }

  //**QR CODE */
  navigate = (screen, data) => {
    this.props.navigate(screen, data)
  }

  //call api so get Info
  getReceipt = async (body) => {
    const { userInfo } = this.props;
    const role = userInfo.roles[0];

    this.setLoadingBar(true);
    const fetchInfo = await Service.postMethod('scan', body,
      data => {
        console.log(data)
        if (data.status === 400) {
          this.navigate((role === 'scanAdmin') ? 'InvalidPageAdmin' : 'InvalidPage', data)
        } else {
          this.navigate((role === 'scanAdmin') ? 'ComfirmCollectionAdmin' : 'ComfirmCollection', data)
        }
      },
      error => {
        this.setLoadingBar(false);
        Service.errorNetwork(() => {
          this.setState({
            scanSuccessfull: false
          })
        });
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
            source={require('../../../assets/images/qr-codescreen.png')}
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

const mapStateToProps = state => ({
  userInfo: state.userReducer.info
});

const mapDispatchToProp = dispatch => ({
  navigate: (routeName, params) => dispatch({ type: 'navigate', ...{ routeName: routeName, params: params } })
});

export default connect(mapStateToProps, mapDispatchToProp)(ScanReceipt);

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