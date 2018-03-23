import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import SplashScreen from '../scenes/Splash';
import LoginScreen from '../scenes/Sign/Login/Form';
import EntryScreen from '../scenes/Ticket/Scanner';
import ScanResult from '../scenes/Ticket/ScanResult';
import LogoutScreen from '../scenes/Sign/Logout';
import ScanReceipt from '../scenes/Vendor/ScanReceipt';
import ComfirmCollection from '../scenes/Vendor/ComfirmCollection';
import Collection from '../scenes/Vendor/Collection';
import InvalidPage from '../scenes/Vendor/invalidPage';

import { addListener } from '../utils/redux';

import { TicketNavigator, ReceiptNavigator, AdminNavigator } from './AppTab';


const AppNavigator = StackNavigator({
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  ticketScanner: { screen: TicketNavigator },
  vendor: { screen: ReceiptNavigator },
  scanAdmin: { screen: AdminNavigator },
  LogoutScreen: { screen: LogoutScreen },
  ScanResult: { screen: ScanResult },
  Entry: { screen: EntryScreen },
  ScanReceipt: { screen: ScanReceipt },
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
});
export default AppNavigator;
