import ScanReceipt from './ScanReceipt';
import Overview from './Overview';

import React, { Component } from 'react';
import {
  View,
  Vibration
} from 'react-native';

import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

export default StackNavigator({
  Overview: {
    screen: Overview,
    navigationOptions: {
      title: 'RECEIPT SCANNER'
    }
  },
  ScanReceipt: {
    screen: ScanReceipt,
    navigationOptions: {
      title: 'SCAN RECEIPT'
    }
  }
})
