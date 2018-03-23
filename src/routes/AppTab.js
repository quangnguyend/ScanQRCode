import React, { Component } from 'react';
import {
  Alert,
  Image,
  View,
  Text,
  AsyncStorage
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import TicketScreen from '../scenes/Ticket/Overview';
import ReceiptScreen from '../scenes/Vendor/Overview';
import Logout from '../scenes/Sign/Logout';
import ScanResult from '../scenes/Ticket/ScanResult';
import ComfirmCollection from '../scenes/Vendor/ComfirmCollection';
import Collection from '../scenes/Vendor/Collection';
import InvalidPage from '../scenes/Vendor/invalidPage';

const tabBarOptions = {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: true,
    style: {
      backgroundColor: '#FFFFFF',
    },
    labelStyle: {
      color: '#8E7631'
    }
  }
}

const logoutTab = {
  screen: Logout     // Empty screen, useless in this specific case
  , navigationOptions: ({ navigation }) => ({
    title: 'Logout',
    tabBarOnPress: (scene, jumpToIndex) => {
      return Alert.alert(   // Shows up the alert without redirecting anywhere
        'Confirmation required'
        , 'Do you really want to logout?'
        , [
          {
            text: 'Yes', onPress: () => {
              navigation.dispatch({ type: 'Reset', routeName: 'Login' })
              AsyncStorage.removeItem('SCANNER_DATA');
              AsyncStorage.removeItem('CURRENT_EVENT');
              AsyncStorage.removeItem('DATE_EVENT');
              AsyncStorage.removeItem('USER_ROLE');
            }
          },
          { text: 'No' }
        ]
      );
    },
  })
}

export const TicketNavigator = TabNavigator({
  Ticket: {
    screen: TicketScreen,
    navigationOptions: {
      title: 'TICKET SCANNER',
      tabBarLabel: 'TICKET',
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const TicketResulttNavigator = TabNavigator({
  ScanResult: {
    screen: ScanResult,
    navigationOptions: {
      tabBarLabel: 'TICKET',
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const tabBarComfirmCollection = TabNavigator({
  ComfirmCollection: {
    screen: ComfirmCollection,
    navigationOptions: {
      tabBarLabel: 'RECEIPT',
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const tabBarCollected = TabNavigator({
  Collection: {
    screen: Collection,
    navigationOptions: {
      tabBarLabel: 'RECEIPT',
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const tabBarInvalidPage = TabNavigator({
  InvalidPage: {
    screen: InvalidPage,
    navigationOptions: {
      tabBarLabel: 'RECEIPT',
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const ReceiptNavigator = TabNavigator({
  Receipt: {
    screen: ReceiptScreen,
    navigationOptions: {
      title: 'RECEIPT SCANNER',
      tabBarLabel: 'RECEIPT',
      headerLeft: null
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const AdminNavigator = TabNavigator({
  Ticket: {
    screen: TicketScreen,
    navigationOptions: {
      title: 'TICKET SCANNER',
      tabBarLabel: 'TICKET',
    }
  },
  Receipt: {
    screen: ReceiptScreen,
    navigationOptions: {
      title: 'RECEIPT SCANNER',
      tabBarLabel: 'RECEIPT',
      headerLeft: null
    }
  },
  Logout: logoutTab
}, tabBarOptions)