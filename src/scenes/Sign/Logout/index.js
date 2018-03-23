import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';

export default class Logout extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/logout.png')}
        style={[{ width: 30, height: 30 }]}
        resizeMode={'contain'}
      />
    ),
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { getScreenDetails, scene } = this.props;
    const details = getScreenDetails(scene)
    return (
      <View>
      </View>
    )
  }
}