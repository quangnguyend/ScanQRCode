import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { TextCustom } from './../../../components';
import Header from './header';

export default class ScanResult extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    header: (props) => <Header {...props} {...navigation.state.params} />
  })

  constructor(props) {
    super(props)
    this.state = {
      typeView: null
    }
  }

  componentDidMount() {
  }

  _renderView = () => {
    const { ticketName, ticketId, ticketHolderName, message, event, firstEventEnterOfDay, appError, title } = this.props.navigation.state.params;
    if (title.indexOf('INVALID') >= 0) {
      return (
        <View style={styles.container}>
          <Text style={{ color: '#FF6666', fontSize: 30, textAlign: 'center' }}>
            INVALID TICKET! ( {message.toUpperCase()})
                    </Text>
        </View>
      )
    }
    if (title === 'VIEW INFO') {
      console.log(appError)
      return (
        <View style={styles.container}>
          <TextCustom paddingBottom={60}>{ticketName}</TextCustom>
          <Text style={{ color: '#FF6666', fontSize: 30, textAlign: 'center' }}>
            {message.toUpperCase()}
          </Text>
          <TextCustom paddingTop={20} paddingBottom={40}>PLACE ENTERED: {event}</TextCustom>
          <TextCustom >TICKET ID: {ticketId}</TextCustom>
          <TextCustom >Ticket Holder: {ticketHolderName}</TextCustom>
        </View>
      )
    }
    if (firstEventEnterOfDay !== undefined) {
      if (firstEventEnterOfDay) {
        return (
          <View style={styles.container}>
            <TextCustom paddingBottom={60}>{ticketName}</TextCustom>
            <Text style={{ color: '#66CC99', fontSize: 30, textAlign: 'center' }}>
              {message.toUpperCase()}
              <Text style={{ color: '#3377FF', fontSize: 30 }}>PLEASE CHECK THAT ATTENDEE HAS A BAND</Text>
            </Text>
            <TextCustom paddingTop={20} paddingBottom={40}>PLACE ENTERED: {event}</TextCustom>
            <TextCustom >TICKET ID: {ticketId}</TextCustom>
            <TextCustom >Ticket Holder: {ticketHolderName}</TextCustom>
          </View>
        )
      }
      else {
        return (
          <View style={styles.container}>
            <TextCustom paddingBottom={60}>{ticketName}</TextCustom>
            <Text style={{ color: '#66CC99', fontSize: 30, textAlign: 'center' }}>
              TICKET ADMISSION SUCCESSFUL FOR THE FIRST TIME TODAY!
                            <Text style={{ color: '#FF9933', fontSize: 30 }}>PASS A WRISTBAND.</Text>
            </Text>
            <TextCustom paddingTop={20} paddingBottom={40}>PLACE ENTERED: {event}</TextCustom>
            <TextCustom >TICKET ID: {ticketId}</TextCustom>
            <TextCustom >Ticket Holder: {ticketHolderName}</TextCustom>
          </View>
        )
      }
    }
    else {
      if (appError) {
        if (appError == 'GOLD-EVENT') {
          return (
            <View style={styles.container}>
              <TextCustom paddingBottom={60}>{ticketName}</TextCustom>
              <Text style={{ color: '#FF6666', fontSize: 30, textAlign: 'center' }}>
                TICKET ADMISSION FAILED! EVENT REQUIRES GOLD PASS
                        </Text>
              <TextCustom paddingTop={20} paddingBottom={40}>PLACE ENTERED: {event}</TextCustom>
              <TextCustom >TICKET ID: {ticketId}</TextCustom>
              <TextCustom >Ticket Holder: {ticketHolderName}</TextCustom>
            </View>
          )
        }
      } else {
        return (
          <View style={styles.container}>
            <TextCustom paddingBottom={60}>{ticketName}</TextCustom>
            <TextCustom color={'#66CC99'} paddingTop={20} paddingBottom={60} fontSize={34}>{message.toUpperCase()}</TextCustom>
            <TextCustom paddingTop={20} paddingBottom={40}>PLACE ENTERED: {event}</TextCustom>
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
        {/* <TextCustom paddingBottom={60}>{ticketName}</TextCustom>
                <TextCustom color={'#66CC99'} paddingTop={20} paddingBottom={60} fontSize={34}>{message}</TextCustom>
                <TextCustom paddingTop={20} paddingBottom={40}>PLACE ENTERED: {event}</TextCustom>
                <TextCustom >TICKET ID: {ticketId}</TextCustom>
                <TextCustom >Ticket Holder: {ticketHolderName}</TextCustom> */}
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
    alignItems: 'center'
  },
  message: {

  }
})