import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';

import { TextInputCustom, ButtonCustom, TextCustom } from './../../../../components';
import {connect} from 'react-redux';

import Service from './../../../../services/api';
import { isEmail, isEmpty } from './../../../../utils/Validattion';

import {insertRoleInfo} from './../../actions';

class LoginScreen extends Component {
  static navigationOptions = ({navigation}) => ({
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
      isvalidEmail: true,
      invalidPassword: false
    }
  }

  onPress = async (e) => {
    const {email, password} = this.state;

    const {navToMain, insertRoleInfo} = this.props;
    let isValidEmail = isEmail(email);
    let isValidPass = isEmpty(password);

    console.log(isValidPass, isValidEmail)

    if(!isValidEmail) {
      this.setState({
        isvalidEmail: isValidEmail
      })
      return;
    } 
    if(isValidPass){
      this.setState({
        invalidPassword: isValidPass
      })
      return;
    }
    
    // const bodyData = {
    //   username: email,
    //   password: password
    // }
    // const fetchLogin = await Service.postMethod('users/login', bodyData,
    //   json => {
    //     console.log(json)
    //     Service.getMethod('users/me',
    //       jsonUser => {
    //        console.log(jsonUser);
    //        // save data to redux
    //        //insertRoleInfo(jsonUser)
    //         navToMain(jsonUser.roles[0]);
    //       },
    //       error => {
    //         console.log(error);
    //       });
    //   },
    //   error => {
    //     console.log('///////ERROR://///////');
    //     console.log(error);
    //   });

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

  _renderError = () => {
    const { isvalidEmail, invalidPassword } = this.state;
    console.log(isvalidEmail)
    if(!isvalidEmail){
      return(
        <Text style={styles.error}>Invalid Email!</Text>
      )
    }
    
    if(invalidPassword){
      return (
        <Text style={styles.error}>Password is not empty!</Text>
      )
    }
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

  const mapDispatchToProp = dispatch =>({
    navToMain: (routeName) => dispatch({type: 'Reset', routeName: routeName}),
    insertRoleInfo: (info) => dispatch(insertRoleInfo(info))
  });

  export default connect(null, mapDispatchToProp)(LoginScreen);
