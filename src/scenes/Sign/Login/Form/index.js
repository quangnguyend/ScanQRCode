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
      email: 'scanadmin1@protege.sg',
      password: 'Q1aG5b',
      emailInValid: false,
      passIsEmpty: false,
      emailIsEmpty: false,
      loading: false,
      errMess: null,
      isLoginOldAccount: false,
      errNotAuth: false
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
      errMess: null,
      errNotAuth: false
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
    const { emailInValid, passIsEmpty, emailIsEmpty, errMess, errNotAuth } = this.state;
    return (
      <View style={{ marginTop: 10 }}>
        {!emailInValid ? null : (!emailIsEmpty ? <Text style={styles.error}>Invalid Email!</Text> : <Text style={styles.error}>Email is required!</Text>)}
        {!passIsEmpty ? null : <Text style={styles.error}>Password is required!</Text>}
        {errMess ? <Text style={styles.error}>{errMess.charAt(0).toUpperCase() + errMess.slice(1) + '!'}</Text> : null}
        {
          errNotAuth ?
            <Text style={{ color: 'red' }}>
              You are not authorized to access this app. Please login at{' '}
              <Text style={{ textDecorationLine: 'underline', color: 'blue' }} onPress={() => {
                Linking.openURL('https://fullertonconcours.com/login');
              }}>fullertonconcours.com/login</Text>
              {' '}instead
            </Text> : null
        }
      </View>
    )
  }

  callAPI = (_bodyData) => {
    const { navToMain, insertRoleInfo, postApi, getApi, VendorReset } = this.props;
    const bodyData = _bodyData ? _bodyData :
      {
        username: this.state.email,
        password: this.state.password
      }

    postApi('users/login', bodyData, (err, data) => {
      if (err && this.state.isLoginOldAccount === true) {
        this.setState({
          isLoginOldAccount: false
        })
        return;
      }
      if (data) {
        if (data.status === 400 || data.status === 401) {
          this.setState({
            errMess: data.message
          })
          return;
        }
        getApi('users/me', async (err, data) => {
          let role = null;
          await _.forEach(data.roles, item => {
            let isExist = _.includes(rolesAccept, item)
            if (isExist)
              return role = item;
          })
          if (role) {
            AsyncStorage.setItem('USER_ACCOUNT', JSON.stringify(bodyData))
            insertRoleInfo(data) //use redux to manage data
            AsyncStorage.setItem('USER_ROLE', role);
            VendorReset();
            navToMain(role);
          } else {
            this.setState({
              errNotAuth: true
            })
          }
        })
      }
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
  VendorReset: () => dispatch({ type: 'VendorReset' }),
  postApi: (endPoint, body, callback) => dispatch({ type: 'POST_TODO_DATA', endPoint: endPoint, body: body, callback }),
  getApi: (endPoint, callback) => dispatch({ type: 'GET_TODO_DATA', endPoint: endPoint, callback })
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
