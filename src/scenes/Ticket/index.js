import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, Image } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { addListener } from '../../utils/reduxNavTicket';

import Overview from './Overview';
import Scanner from './Scanner';
import ScanResult from './ScanResult';

import { StackNavigator } from 'react-navigation';

export const TicketStack = StackNavigator({
  Overview: {
    screen: Overview
  },
  Scanner: {
    screen: Scanner
  },
  ScanResult: {
    screen: ScanResult
  }
});

class TicketNavigationState extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/ticket.png')}
        style={styles.iconStyle}
        resizeMode={'contain'}
      />
    ),
    tabBarVisible: (navigation.state.params != undefined) ? navigation.state.params.visibleNav : true
  })

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navTicket: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch, navTicket } = this.props;
    this.props.navigation
    return (
      <TicketStack
        navigation={addNavigationHelpers({
          dispatch,
          state: navTicket,
          addListener
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navTicket: state.navTicket
});

export const Ticket = connect(mapStateToProps)(TicketNavigationState);

const styles = StyleSheet.create({
  iconStyle: {
    width: (Platform.OS === 'ios') ? 30 : '100%',
    height: (Platform.OS === 'ios') ? 30 : '100%'
  }
})