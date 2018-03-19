import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

import { TextInputCustom, ButtonCustom, TextCustom } from './../../../../components';
import {connect} from 'react-redux';

import Service from './../../../../services/api';

import {insertRoleInfo} from './../../actions';

class LoginScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null
  })
  constructor(props) {
    super(props)
    this.state = {
      email: 'ticketscanner1@protege.sg',
      password: 'Q1aG5b'
    }
  }

  onPress = async (e) => {
    const {email, password} = this.state;
    const {navToMain, insertRoleInfo} = this.props;

    const bodyData = {
      username: email,
      password: password
    }
    const fetchLogin = await Service.postMethod('users/login', bodyData,
      json => {
        Service.getMethod('users/me',
          jsonUser => {
           console.log(jsonUser);
           // save data to redux
           //insertRoleInfo(jsonUser)
           navToMain();
          },
          error => {
            console.log(error);
          });
      },
      error => {
        console.log('///////ERROR://///////');
        console.log(error);
      });

    // const fetchUser = await Service.getMethod('users/me',
    //   json => {
    //     console.log('after fetchLogin' + fetchLogin);
    //    console.log(json);
    //   },
    //   error => {
    //     console.log('///////ERROR://///////');
    //     console.log(error);
    //   });
    //
  }
  render() {
    return (
      <View style={styles.container}>
      <Image source={require('./../../../../assets/images/banner1.png')} />
      <Image source={require('./../../../../assets/images/bbb.png')} />
      <TextCustom fontSize={20}>LOGIN TO FULLERTON CONCOURS</TextCustom>
      <TextInputCustom onChangeText={ (value) => this.setState({email: {value}})} placeholder="EMAIL ADDRESS" />
      <TextInputCustom onChangeText={ (value) => this.setState({password: {value}})} />
      <ButtonCustom style={styles.button} onPress={this.onPress}>
      Login
      </ButtonCustom>
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
    }
  })

  const mapDispatchToProp = dispatch =>({
    navToMain: () => dispatch({type: 'Reset', routeName:'Admin'}),
    insertRoleInfo: (info) => dispatch(insertRoleInfo(info))
  });

  export default connect(null, mapDispatchToProp)(LoginScreen);
