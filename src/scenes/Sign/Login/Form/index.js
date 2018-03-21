import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  AsyncStorage
} from 'react-native';

import { TextInputCustom, ButtonCustom, TextCustom, Loading } from './../../../../components';
import { connect } from 'react-redux';

import Service from './../../../../services/api';
import Helper from './../../../../utils/Validattion';

import { insertRoleInfo } from './../../actions';

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../../assets/images/ticket.png')}
        style={[{ resizeMode: 'cover' }]}
        resizeMode={'cover'}
      />
    ),
  })
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailInValid: false,
      passIsEmpty: false,
      emailIsEmpty: false,
      loading: false
    }
  }

  setLoadingProgress = (loading) => {
    this.setState({ loading });
  }

  onPress = (e) => {
    let check = this.validate();
    (check) ? this.callAPI() : null;
  }

  validate = () => {
    const { email, password } = this.state;
    const _emailInValid = Helper.isEmailValid(email);

    const _passIsEmpty = password === "";
    const _emailIsEmpty = email === "";

    this.setState({
      emailInValid: _emailInValid,
      passIsEmpty: _passIsEmpty,
      emailIsEmpty: _emailIsEmpty
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
    const { emailInValid, passIsEmpty, emailIsEmpty } = this.state;
    return (
      <View>
        {!emailInValid ? null : (!emailIsEmpty ? <Text style={styles.error}>Invalid Email!</Text> : <Text style={styles.error}>Email is not empty!</Text>)}
        {!passIsEmpty ? null : <Text style={styles.error}>Password is not empty!</Text>}
      </View>
    )
  }

  callAPI = () => {
    const { navToMain, insertRoleInfo } = this.props;

    this.setLoadingProgress(true);
    const bodyData = {
      username: this.state.email,
      password: this.state.password
    }

    Service.postMethod('users/login', bodyData,
      json => {
        if (json.status === 400 || json.status === 401) {
          this.setLoadingProgress(false);
          Alert.alert(json.message);
          return;
        }
        Service.getMethod('users/me',
          jsonUser => {
            this.setLoadingProgress(false);
            //insertRoleInfo(jsonUser) //use redux to manage data
            AsyncStorage.setItem('USER_ROLE', jsonUser.roles[0])
            navToMain(jsonUser.roles[0]);
          },
          error => {
            this.setLoadingProgress(false);
            return;
          });
      },
      error => {
        this.setLoadingProgress(false);
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading loading={this.state.loading} />
        <Image source={require('./../../../../assets/images/banner1.png')} />
        <Image source={require('./../../../../assets/images/bbb.png')} />
        <TextCustom fontSize={20}>LOGIN TO FULLERTON CONCOURS</TextCustom>
        <TextInputCustom onChangeText={(value) => this.setState({ email: value })} placeholder="EMAIL ADDRESS" />
        <TextInputCustom password={true} onChangeText={(value) => this.setState({ password: value })} placeholder="PASSWORD" />
        <ButtonCustom style={styles.button} onPress={this.onPress}>
          Login
      </ButtonCustom>
        {this._renderError()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 0
  },
  error: {
    color: 'red'
  }
})

const mapDispatchToProp = dispatch => ({
  navToMain: (routeName) => dispatch({ type: 'Reset', routeName: routeName }),
  insertRoleInfo: (info) => dispatch(insertRoleInfo(info))
});

export default connect(null, mapDispatchToProp)(LoginScreen);
