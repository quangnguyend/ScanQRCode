import React, { Component } from 'react';
import {
  View,
  Vibration,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
  Alert
} from 'react-native';

import Camera from 'react-native-camera';
import Header from './header';
import { Loading } from '../../../components';
import Service from '../../../services/api';
import { connect } from 'react-redux';


class Scanner extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
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
    this.setLoadingBar(false);
  }

  navigate = (screen, data) => {
    const { params } = this.props.navigation.state;
    this.props.navigate(screen, { ...params, ...data })
  }

  //call api
  getData = async (body) => {
    const { userInfo } = this.props;
    const role = userInfo.roles[0];
    const routeName = (role === 'scanAdmin') ? 'ScanResultAdmin' : 'ScanResult';

    const { actionScan } = this.props;
    const fetchInfo = await Service.postMethod('scan', body,
      data => {
        switch (actionScan) {
          case 'ticketEnter':
            if (data.appError) {

              //if ENTRY REJECTED
              this.navigate(routeName, { ...data, title: 'ENTRY REJECTED' })
            } else {
              //if ENTRY ACCEPTED
              if (data.status && data.status === 400) {
                this.navigate(routeName, { ...data, title: 'INVALID TICKET' })
              }
              else {
                this.navigate(routeName, { ...data, title: 'ENTRY ACCEPTED' })
              }
            }
            break;
          case 'ticketInfo':
            if (data.message === 'Ticket code invalid') {
              this.navigate(routeName, { ...data, title: 'INVALID TICKET' })
            } else this.navigate(routeName, { ...data, title: 'VIEW INFO' })
            break;
        }
      },
      error => {
        this.setLoadingBar(false);  
        Service.errorNetwork(() => {
          this.setLoadingBar(false);
          this.setState({
            scanSuccessfull: false
          })
        });
      }
    )
  }

  setLoadingBar(value) {
    this.setState({
      loading: value
    })
  }

  // Has scan result
  onScanner = (e) => {
    const { actionScan } = this.props;
    const { eventCode } = this.props.navigation.state.params;
    if (!this.state.scanSuccessfull) {
      Vibration.vibrate();
      this.setState({
        scanSuccessfull: true,
        loading: true
      })
      // if user choose ENTRY

      let body = {
        "code": e.data,
        "action": actionScan,
        "event": eventCode
      }

      this.getData(body)
    }
  }

  render() {
    if (this.state.isAuth) {
      return (
        <View style={styles.container}>
          <Loading showTextLoading={true} loading={this.state.loading} />
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
    else {
      return (
        <View>
          <Loading loading={this.state.loading} />
        </View>
      )
    }
  }
}

const mapStateToProps = state => ({
  actionScan: state.userReducer.activeScan,
  userInfo: state.userReducer.info
});

const mapDispatchToProp = dispatch => ({
  navigate: (routeName, params) => dispatch({ type: 'navigate', ...{ routeName: routeName, params: params } })
});

export default connect(mapStateToProps, mapDispatchToProp)(Scanner);

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