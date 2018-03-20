import React, { Component } from 'react';
import {
	Alert,
	Image,
	View,
	Text
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import TicketScreen from '../scenes/Ticket/Overview';
import ReceiptScreen from '../scenes/Sign/Login/Form';

const logoutTab = {
		screen: ReceiptScreen     // Empty screen, useless in this specific case
		, navigationOptions: ({ navigation }) => ({
			tabBarOnPress: (scene, jumpToIndex) => {
				return Alert.alert(   // Shows up the alert without redirecting anywhere
					'Confirmation required'
					, 'Do you really want to logout?'
					, [
					{ text: 'Accept', onPress: () => { navigation.dispatch({ type: 'Reset', routeName: 'Login' }) } },
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
		swipeEnabled: true,
		tabBarOptions: {
			activeTintColor: '#e91e63',
			labelStyle: {
				fontSize: 12,
			},
			style: {
				backgroundColor: 'green',
			},
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
		swipeEnabled: true,
		tabBarOptions: {
			activeTintColor: '#e91e63',
			labelStyle: {
				fontSize: 12,
			},
			style: {
				backgroundColor: 'green',
			},
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
		swipeEnabled: true,
		tabBarOptions: {
			showIcon: true,
			style: {
				backgroundColor:'#FFFFFF',
		},
		labelStyle: {
			color: '#8E7631'
		}
	}
})