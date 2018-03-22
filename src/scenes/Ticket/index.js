import Scanner from './Scanner';
import Overview from './Overview';
import ScanResult from './ScanResult';

import React, { Component } from 'react';
import {
    View,
    Vibration
} from 'react-native';

import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

export default StackNavigator({
    Overview: {
        screen: Overview
    },
    Scanner: {
        screen: Scanner
    },
    ScanResult: {
        screen: ScanResult
    }
})

