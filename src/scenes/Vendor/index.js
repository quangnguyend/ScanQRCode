import ScanReceipt from './ScanReceipt';
import Overview from './Overview';
import ComfirmCollection from './ComfirmCollection';
import Collection from './Collection';
import InvalidPage from './invalidPage';

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
  },
  ComfirmCollection: {
    screen: ComfirmCollection,
    navigationOptions: {
      title: 'CONFIRM COLLECTION'
    }
  },
  Collection: {
    screen: Collection,
    navigationOptions: {
      title: 'COLLECTION'
    }
  },
  InvalidPage: {
    screen: InvalidPage,
    navigationOptions: {
      title: 'INVALID RECEIPT'
    }
  }
})
