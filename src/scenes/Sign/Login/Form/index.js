import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  AsyncStorage,
  Platform,
  Keyboard,
  Linking
} from 'react-native';

import { TextInputCustom, ButtonCustom, TextCustom, Loading } from './../../../../components';
import { connect } from 'react-redux';

import Service from './../../../../services/api';
import Helper from './../../../../helpers/Validattion';
import * as _ from 'lodash';

import { insertRoleInfo } from './../../actions';

const rolesAccept = ['ticketScanner', 'scanAdmin', 'vendor'];

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailInValid: false,
      passIsEmpty: false,
      emailIsEmpty: false,
      loading: false,
      errMess: null,
      isLoginOldAccount: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('USER_ACCOUNT').then(data => {
      let user_account = JSON.parse(data);
      if (user_account) {
        this.setState({
          isLoginOldAccount: true
        })
        this.callAPI(user_account);
      }
    })
  }

  setLoadingProgress = (loading) => {
    if (!loading)
      this.setState({ loading, isLoginOldAccount: false });
    else
      this.setState({ loading });
  }

  onPress = (e) => {
    let check = this.validate();
    (check) ? this.callAPI() : null;
    Keyboard.dismiss();
  }

  validate = () => {
    const { email, password } = this.state;
    const _emailInValid = Helper.isEmailValid(email);

    const _passIsEmpty = password === "";
    const _emailIsEmpty = email === "";

    this.setState({
      emailInValid: _emailInValid,
      passIsEmpty: _passIsEmpty,
      emailIsEmpty: _emailIsEmpty,
      errMess: null
    })
    if (!_emailInValid) {
      if (_passIsEmpty) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  _renderError = () => {
    const { emailInValid, passIsEmpty, emailIsEmpty, errMess } = this.state;
    return (
      <View style={{ marginTop: 10 }}>
        {!emailInValid ? null : (!emailIsEmpty ? <Text style={styles.error}>Invalid Email!</Text> : <Text style={styles.error}>Email is required!</Text>)}
        {!passIsEmpty ? null : <Text style={styles.error}>Password is required!</Text>}
        {errMess ? <Text style={styles.error}>{errMess.charAt(0).toUpperCase() + errMess.slice(1) + '!'}</Text> : null}
      </View>
    )
  }

  callAPI = (_bodyData) => {
    const { navToMain, insertRoleInfo } = this.props;

    this.setLoadingProgress(true);
    const bodyData = _bodyData ? _bodyData :
      {
        username: this.state.email,
        password: this.state.password
      }

    Service.postMethod('users/login', bodyData,
      json => {
        if (json.status === 400 || json.status === 401) {
          this.setLoadingProgress(false);
          this.setState({
            errMess: json.message
          })
          return;
        }
        Service.getMethod('users/me',
          jsonUser => {
            let currentRole = jsonUser.roles[0];
            let isRole = _.includes(rolesAccept, currentRole);

            if (isRole) {
              this.setLoadingProgress(false);
              AsyncStorage.setItem('USER_ACCOUNT', JSON.stringify(bodyData))
              insertRoleInfo(jsonUser) //use redux to manage data
              AsyncStorage.setItem('USER_ROLE', jsonUser.roles[0]);
              this.props.VendorReset();
              navToMain(jsonUser.roles[0]);
            }
            else {
              if (Platform.OS === 'android')
                this.setLoadingProgress(false);
              Alert.alert(
                'Warning!',
                'You are not authorized to access this app. Please login at fullertonconcours.com/login instead',
                [
                  {
                    text: 'Cancel', onPress: () => {
                      this.setLoadingProgress(false);
                    }
                  },
                  {
                    text: 'Link', onPress: () => {
                      this.setLoadingProgress(false);
                      Linking.openURL('https://fullertonconcours.com/login');
                    }
                  }
                ]
              )
            }
          },
          error => {
            if (Platform.OS === 'android')
              this.setLoadingBar(false);
            Service.errorNetwork(() => {
              this.setLoadingProgress(false);
            });
            return;
          });
      },
      error => {
        Service.errorNetwork(() => {
          this.setLoadingProgress(false);
        });
        if (Platform.OS === 'android')
          this.setLoadingBar(false);
      });
  }
  render() {
    const { isLoginOldAccount } = this.state;
    if (!isLoginOldAccount) {
      return (
        <View style={styles.container}>
          <Loading loading={this.state.loading} />
          <Image
            source={require('./../../../../assets/images/banner2.png')}
            style={{ paddingTop: 10, height: 50 }}
            resizeMode={'contain'}
          />
          <Image
            style={{ marginTop: 10, height: 50, width: 500 }}
            resizeMode={'contain'}
            source={require('./../../../../assets/images/bbb1.png')} />
          <TextCustom fontSize={20} paddingTop={10} paddingBottom={20}>LOGIN TO FULLERTON CONCOURS</TextCustom>
          <TextInputCustom onChangeText={(value) => this.setState({ email: value })} placeholder="EMAIL ADDRESS" />
          <TextInputCustom password={true} onChangeText={(value) => this.setState({ password: value })} placeholder="PASSWORD" />
          <ButtonCustom style={styles.button} onPress={this.onPress} title={'Login'} />
          {this._renderError()}
        </View >
      )
    } else {
      return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <Loading loading={this.state.loading} />
        </View>
      )
    }
  }
}

const mapDispatchToProp = dispatch => ({
  navToMain: (routeName) => dispatch({ type: 'Reset', routeName: routeName }),
  insertRoleInfo: (info) => dispatch(insertRoleInfo(info)),
  VendorReset: () => dispatch({ type: 'VendorReset' })
});

export default connect(null, mapDispatchToProp)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
    marginTop: (Platform.OS === 'ios') ? 50 : 0
  },
  error: {
    color: 'red'
  }
})
