import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import { TextCustom, ButtonCustom } from '../../../components';

export default class Collection extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() { }

  render() {
    return (
      <View>
        <TextCustom>COLLECTION PAGE</TextCustom>
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