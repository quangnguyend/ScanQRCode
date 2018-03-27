import React, { Component } from 'react';
import {
  Alert,
  Image,
  View,
  Text,
  AsyncStorage,
  Platform,
  TouchableOpacity
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
      paddingBottom: 5,
      height: 60
    },
    labelStyle: {
      color: '#8E7631'
    },
    tabBarIconStyle: {
      paddingTop: 5
    },
    inactiveBackgroundColor: 'rgba(79, 102, 149, 0.1)' // this option only work on ios
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
          { text: 'Cancel' },
          {
            text: 'Yes', onPress: () => {
              AsyncStorage.removeItem('SCANNER_DATA');
              AsyncStorage.removeItem('CURRENT_EVENT');
              AsyncStorage.removeItem('DATE_EVENT');
              AsyncStorage.removeItem('USER_ROLE');
              AsyncStorage.removeItem('USER_ACCOUNT')
                .then(rs => {
                  navigation.dispatch({ type: 'Reset', routeName: 'Login' })
                })
            }
          }
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

export const TicketResulttNavigatorAdmin = TabNavigator({
  ScanResult: {
    screen: ScanResult,
    navigationOptions: {
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

export const tabBarComfirmCollection = TabNavigator({
  ComfirmCollection: {
    screen: ComfirmCollection,
    navigationOptions: {
      tabBarLabel: 'RECEIPT',
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const tabBarComfirmCollectionAdmin = TabNavigator({
  Ticket: {
    screen: TicketScreen,
    navigationOptions: {
      title: 'TICKET SCANNER',
      tabBarLabel: 'TICKET',
    }
  },
  ComfirmCollection: {
    screen: ComfirmCollection,
    navigationOptions: {
      tabBarLabel: 'RECEIPT',
    }
  },
  Logout: logoutTab
}, {
    ...tabBarOptions,
    initialRouteName: 'ComfirmCollection'
  })

export const tabBarCollected = TabNavigator({
  Collection: {
    screen: Collection,
    navigationOptions: {
      tabBarLabel: 'RECEIPT',
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const tabBarCollectedAdmin = TabNavigator({
  Ticket: {
    screen: TicketScreen,
    navigationOptions: {
      title: 'TICKET SCANNER',
      tabBarLabel: 'TICKET',
    }
  },
  Collection: {
    screen: Collection,
    navigationOptions: {
      tabBarLabel: 'RECEIPT',
    }
  },
  Logout: logoutTab
}, {
    ...tabBarOptions,
    initialRouteName: 'Collection'
  })

export const tabBarInvalidPage = TabNavigator({
  InvalidPage: {
    screen: InvalidPage,
    navigationOptions: {
      tabBarLabel: 'RECEIPT',
    }
  },
  Logout: logoutTab
}, tabBarOptions)

export const tabBarInvalidPageAdmin = TabNavigator({
  Ticket: {
    screen: TicketScreen,
    navigationOptions: {
      title: 'TICKET SCANNER',
      tabBarLabel: 'TICKET',
    }
  },
  InvalidPage: {
    screen: InvalidPage,
    navigationOptions: {
      tabBarLabel: 'RECEIPT',
    }
  },
  Logout: logoutTab
}, {
    ...tabBarOptions,
    initialRouteName: 'InvalidPage'
  })

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