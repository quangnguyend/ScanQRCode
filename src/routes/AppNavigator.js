import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import SplashScreen from '../scenes/Splash';
import LoginScreen from '../scenes/Sign/Login/Form';
import EntryScreen from '../scenes/Ticket/Scanner';
import LogoutScreen from '../scenes/Sign/Logout';
import ScanReceipt from '../scenes/Vendor/ScanReceipt';
import { addListener } from '../utils/redux';

import {
  TicketNavigator,
  ReceiptNavigator,
  AdminNavigator,
  TicketResulttNavigator,
  tabBarComfirmCollection,
  tabBarCollected,
  tabBarInvalidPage
} from './AppTab';


const AppNavigator = StackNavigator({
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  ticketScanner: { screen: TicketNavigator },
  vendor: { screen: ReceiptNavigator },
  scanAdmin: { screen: AdminNavigator },
  LogoutScreen: { screen: LogoutScreen },
  ScanResult: { screen: TicketResulttNavigator },
  Entry: { screen: EntryScreen },
  ScanReceipt: { screen: ScanReceipt },
  ComfirmCollection: {
    screen: tabBarComfirmCollection,
    navigationOptions: {
      title: 'CONFIRM COLLECTION'
    }
  },
  Collection: {
    screen: tabBarCollected,
    navigationOptions: {
      title: 'COLLECTION'
    }
  },
  InvalidPage: {
    screen: tabBarInvalidPage,
    navigationOptions: {
      title: 'INVALID RECEIPT'
    }
  }
});
export default AppNavigator;
