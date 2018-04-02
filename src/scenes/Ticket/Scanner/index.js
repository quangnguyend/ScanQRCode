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
    this.setLoadingBar(true);
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
    this.setLoadingBar(false);
  }

  navigate = (screen, data) => {
    const { params } = this.props.navigation.state;
    this.props.navigate(screen, { ...params, ...data })
  }

  //call api
  getData = async (body) => {
    const { actionScan } = this.props;
    const fetchInfo = await postApi('scan', body,
      (err, data) => {
        if (err) {
          this.navigate('Overview');
          return;
        }
        switch (actionScan) {
          case 'ticketEnter':
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
            break;
          case 'ticketInfo':
            if (data.message === 'Ticket code invalid') {
              this.navigate('ScanResult', { ...data, title: 'INVALID TICKET' })
            } else this.navigate('ScanResult', { ...data, title: 'VIEW INFO' })
            break;
        }
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
  actionScan: state.userReducer.activeScan
});

const mapDispatchToProp = dispatch => ({
  navigate: (routeName, params) => dispatch({ type: 'TicketNavigate', ...{ routeName: routeName, params: params } }),
  postApi: (endPoint, body, callback) => dispatch({ type: 'POST_TODO_DATA', endPoint: endPoint, body: body, callback })
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