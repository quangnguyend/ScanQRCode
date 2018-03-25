
'use strict';

import React, { Component } from 'react';
import {
	Container,
	Spinner
} from 'native-base';
import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';

import {connect} from 'react-redux';
class Splash extends Component {
	static navigationOptions = ({navigation}) => ({
   header: null
  })
  componentDidMount(){
    const {  navToLogin, navToMain } = this.props;
    AsyncStorage.getItem('USER_ROLE', (err, result) => {
      result !== null ? navToMain(result) : navToLogin();
    });
  }

  render() {
  return (
    <Container>
      <View style={styles.container}>
        <Spinner size="small" color="#000000" />
      </View>
    </Container>
    );
  }
}


const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		flex: 1,
	},
});

const mapDispatchToProp = dispatch =>({
  navToMain: (routeName) => dispatch({ type: 'Reset', routeName: routeName }),
	navToLogin: () => dispatch({type: 'Reset', routeName:'Login'})
})

export default connect(null, mapDispatchToProp)(Splash) ;