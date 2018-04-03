import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Dimensions
} from 'react-native';

import { TextCustom } from './../../../components';
import Header from './header';

export default class ScanResult extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    header: (props) => <Header {...props} {...navigation.state.params} />,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/ticket.png')}
        style={styles.iconStyle}
        resizeMode={'contain'}
      />
    ),
  })

  constructor(props) {
    super(props)
    this.state = {
      typeView: null
    }
  }

  _renderView = () => {
    const { ticketName, ticketId, ticketHolderName, message, event, firstEventEnterOfDay, appError, title } = this.props.navigation.state.params;
    if (title.indexOf('INVALID') >= 0) {
      return (
        <View style={styles.container}>
          <Text style={{ color: '#FF6666', fontSize: 30, textAlign: 'center' }}>
            INVALID TICKET! ( {message})
          </Text>
        </View>
      )
    }
    if (title === 'VIEW INFO') {
      return (
        <View style={styles.container}>
          {ticketName ? <TextCustom paddingBottom={60} fontSize={25}>{ticketName.toUpperCase()}</TextCustom> : null}
          {
            !appError ?
              <Text style={{ color: '#66CC99', fontSize: 30, textAlign: 'center' }}>
                ENTRY ALLOWED!
              <Text style={{ color: '#FF6666', fontSize: 30, alignSelf: 'center' }}>
                  {' PLEASE SCAN QR CODE FOR ENTRY TO CONFIRM TICKET ADMISSION. \n'}
                </Text>
              </Text> :
              <Text style={{ color: '#FF6666', fontSize: 30, textAlign: 'center' }}>
                {message.toUpperCase()}
              </Text>
          }
          {event ? <TextCustom paddingTop={20} paddingBottom={40} styleC={{ fontWeight: 'bold'}}>PLACE ENTERED: {event}</TextCustom> : null}
          {ticketId ? <TextCustom >TICKET ID: {ticketId}</TextCustom> : null}
          {ticketHolderName ? <TextCustom >Ticket Holder: {ticketHolderName}</TextCustom> : null}
        </View>
      )
    }
    if (firstEventEnterOfDay !== undefined) {
      return (
        <View style={styles.container}>
          <TextCustom paddingBottom={60} fontSize={25}>{ticketName.toUpperCase()}</TextCustom>
          {
            !firstEventEnterOfDay ?
              <Text style={{ color: '#66CC99', fontSize: 30, textAlign: 'center' }}>
                TICKET ADMISSION SUCCESSFUL!
                <Text style={{ color: '#3377FF', fontSize: 30 }}>{' PLEASE CHECK THAT ATTENDEE HAS A BAND. \n'}</Text>
              </Text>
              :
              <Text style={{ color: '#66CC99', fontSize: 30, textAlign: 'center' }}>
                TICKET ADMISSION SUCCESSFUL FOR THE FIRST TIME TODAY!
                <Text style={{ color: '#FF9933', fontSize: 30 }}>{' PASS A WRISTBAND. \n'}</Text>
              </Text>
          }
          <TextCustom paddingTop={20} paddingBottom={40} styleC={{ fontWeight: 'bold'}}>PLACE ENTERED: {event}</TextCustom>
          <TextCustom >TICKET ID: {ticketId}</TextCustom>
          <TextCustom >Ticket Holder: {ticketHolderName}</TextCustom>
        </View>
      )
    }
    else {
      if (appError) {
        return (
          <View style={styles.container}>
            <TextCustom paddingBottom={60} fontSize={25}>{ticketName.toUpperCase()}</TextCustom>
            {
              appError == 'GOLD-EVENT' ?
                <Text style={{ color: '#FF6666', fontSize: 30, textAlign: 'center' }}>
                  TICKET ADMISSION FAILED! EVENT REQUIRES GOLD PASS
                  </Text>
                :
                <Text style={{ color: '#FF6666', fontSize: 30, textAlign: 'center' }}>
                  {message.toUpperCase()}
                </Text>
            }
            <TextCustom paddingTop={20} paddingBottom={40} styleC={{ fontWeight: 'bold'}}>PLACE ENTERED: {event}</TextCustom>
            <TextCustom >TICKET ID: {ticketId}</TextCustom>
            <TextCustom >Ticket Holder: {ticketHolderName}</TextCustom>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
            <TextCustom paddingBottom={60} fontSize={25}>{ticketName.toUpperCase()}</TextCustom>
            <TextCustom color={'#66CC99'} paddingTop={20} paddingBottom={60} fontSize={34}>{message.toUpperCase()}</TextCustom>
            <TextCustom paddingTop={20} paddingBottom={40} styleC={{ fontWeight: 'bold'}}>PLACE ENTERED: {event}</TextCustom>
            <TextCustom >TICKET ID: {ticketId}</TextCustom>
            <TextCustom >Ticket Holder: {ticketHolderName}</TextCustom>
          </View>
        )
      }
    }
  }

  render() {
    const { ticketName, ticketId, ticketHolderName, message, event } = this.props.navigation.state.params;
    const { typeView } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {this._renderView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  iconStyle: {
    width: (Platform.OS === 'ios') ? 30 : '100%',
    height: (Platform.OS === 'ios') ? 30 : '100%'
  }
})