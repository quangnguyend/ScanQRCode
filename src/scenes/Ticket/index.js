import AdminEntry from './AdminEntry';
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
            title: 'TICKET SCANNER',
            headerTitleStyle: {
                color: 'yellow'
            }
        }
    },
    AdminEntry: {
        screen: AdminEntry,
        navigationOptions: {
            title: 'ADMIT ENTRY',
            headerTitleStyle: {
                color: 'yellow'
            }
        }
    }
})

