import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import { TextCustom, ButtonCustom } from '../../../components';

export default class ComfirmCollection extends Component {
  static navigationOptions = {
    headerLeft: null
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() { }

  render() {
    return (
      <View>
        <TextCustom>PURCHASES ON RECEIPT</TextCustom>
        <View style={styles.row}>
          <ButtonCustom width={100} onPress={this.onEntry}>ENTRY</ButtonCustom>
          <ButtonCustom width={100} onPress={this.onViewInfo}>VIEW INFO</ButtonCustom>
        </View>
      </View>
    )
  }
}

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