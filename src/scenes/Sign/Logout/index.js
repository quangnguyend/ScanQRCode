import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform
} from 'react-native';

export default class Logout extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/logout.png')}
        style={styles.iconStyle}
        resizeMode={'contain'}
      />
    ),
  }
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    width: (Platform.OS === 'ios') ? 30 : '100%',
    height: (Platform.OS === 'ios') ? 30 : '100%'
  }
})