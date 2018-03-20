import Scanner from './Scanner';
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
            title: 'TICKET SCANNER'
        }
    },
    Scanner: {
        screen: Scanner,
        navigationOptions: {
            title: 'ADMIT ENTRY'
        }
    }
})

