import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import { TextCustom, ButtonCustom } from '../../../components';

export default class InvalidPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() { }

  render() {
    return (
      <View>
        <TextCustom>INVALID PAGE</TextCustom>
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