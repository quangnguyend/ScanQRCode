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
            text: 'Accept', onPress: () => {
              navigation.dispatch({ type: 'Reset', routeName: 'Login' })
              AsyncStorage.removeItem('SCANNER_DATA');
              AsyncStorage.removeItem('CURRENT_EVENT');
              AsyncStorage.removeItem('DATE_EVENT');
              AsyncStorage.removeItem('USER_ROLE');
            }
          },
          { text: 'Cancel' }
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
      tabBarLabel: 'Ticket',
    }
  },
  Logout: logoutTab
},
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      style: {
        backgroundColor: '#FFFFFF',
        height: 70,
        paddingBottom: 5,
        paddingTop: 5
      },
      labelStyle: {
        color: '#8E7631',
        fontSize: 15
      }
    }
  })

export const ReceiptNavigator = TabNavigator({
  Receipt: {
    screen: ReceiptScreen,
    navigationOptions: {
      title: 'RECEIPT SCANNER',
      tabBarLabel: 'Receipt',
      headerLeft: null
    }
  },
  Logout: logoutTab
},
  {
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
  })

export const AdminNavigator = TabNavigator({
  Ticket: {
    screen: TicketScreen,
    navigationOptions: {
      title: 'TICKET SCANNER',
      tabBarLabel: 'Ticket',
    }
  },
  Receipt: {
    screen: ReceiptScreen,
    navigationOptions: {
      title: 'RECEIPT SCANNER',
      tabBarLabel: 'Receipt',
      headerLeft: null
    }
  },
  Logout: logoutTab
},
  {
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
  })