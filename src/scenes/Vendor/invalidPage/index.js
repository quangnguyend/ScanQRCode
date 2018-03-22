import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import { TextCustom, ButtonCustom } from '../../../components';
import { connect } from 'react-redux';
import Header from './header';
class InvalidPage extends Component {
  static navigationOptions = {
    header: (props) => <Header {...props} />
  }
  constructor(props) {
    super(props)
  }

  componentDidMount() { }

  render() {
    return (
      <View>
        <TextCustom>INVALID PAGE</TextCustom>
        <ButtonCustom onPress={() => this.props.navToMain()}></ButtonCustom>
      </View>
    )
  }
}

const mapDispatchToProp = dispatch => ({
  navToMain: () => dispatch({ type: 'Reset', routeName: 'Login' })
});

export default connect(null, mapDispatchToProp)(InvalidPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: 'center'
  }
})