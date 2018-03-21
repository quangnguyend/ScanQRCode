import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert
} from 'react-native';

import _ from 'lodash';
import { TextInputCustom, ButtonCustom, TextCustom } from './../../../../components';
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
      emailIsEmpty: false
    }
  }

  onPress = (e) => {
    const { email, password, emailIsEmpty } = this.state;

    const { navToMain, insertRoleInfo } = this.props;

    let _emailInValid = Helper.isEmailValid(email.value);
    let _passIsEmpty = _.isEmpty(password.value);
    let _emailIsEmpty = _.isEmpty(email.value);

    this.setState({
      emailInValid: _emailInValid,
      passIsEmpty: _passIsEmpty,
      emailIsEmpty: _emailIsEmpty
    })

    if (!_emailInValid) {
      if (_passIsEmpty) {
        return;
      }
    } else {
      return
    }

    const bodyData = {
      username: email,
      password: password
    }
    Service.postMethod('users/login', bodyData,
      json => {
        if (json.status === 400) {
          Alert.alert(json.message);
          return;
        }
        Service.getMethod('users/me',
          jsonUser => {
            console.log(jsonUser);
            // save data to redux
            //insertRoleInfo(jsonUser)
            // navToMain(jsonUser.roles[0]);
          },
          error => {
            console.log(error);
          });
      },
      error => {
        console.log('///////ERROR://///////');
        console.log(error);
      });
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

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./../../../../assets/images/banner1.png')} />
        <Image source={require('./../../../../assets/images/bbb.png')} />
        <TextCustom fontSize={20}>LOGIN TO FULLERTON CONCOURS</TextCustom>
        <TextInputCustom onChangeText={(value) => this.setState({ email: { value } })} placeholder="EMAIL ADDRESS" />
        <TextInputCustom onChangeText={(value) => this.setState({ password: { value } })} />
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
