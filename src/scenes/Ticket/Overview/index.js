import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Alert
} from 'react-native';
import { TextCustom, TextInputCustom, ButtonCustom, Dropdown, DatePicker, Camera } from './../../../components';
import Service from '../../../services/api';

export default class Overview extends Component {

  static navigationOptions = {
    headerLeft: null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/ticket.png')}
        style={[{ resizeMode: 'cover' }]}
      />
    ),
    headerStyle: { backgroundColor: '#635339' },
    headerTitleStyle: { color: '#FFFFFF', alignSelf: 'center' }
  }

  constructor(props) {
    super(props)
    this.state = {
      date: '',
      manuallyCode: '',
      selectedOption: {},
      isShowingOptions: false,
      events: {},
      minDate: null,
      maxDate: null,
      loadSuccess: false,
      propsDropdown: {
        options: [],
        label: 'EVENT',
        animationType: 'none',
      }
    }
  }

  componentDidMount() {
    this._getEvents();
  }

  onEntry = () => {
    this.props.navigation.navigate('Entry', { title: 'ENTRY', typeScannerCode: 1, eventCode: this.state.selectedOption.value });
  }

  onViewInfo = () => {
    this.props.navigation.navigate('Entry', { title: 'VIEW INFO', typeScannerCode: 2, eventCode: this.state.selectedOption.value });
  }

  //**QR CODE */
  navigate = (screen, data) => {
    this.props.navigation.navigate(screen, data)
  }

  //call api so get Info
  getInfo = async (body) => {
    const fetchInfo = await Service.postMethod('scan', body,
      data => {
        this.navigate('ScanResult', { ...data, ...{ title: 'VIEW INFO', typeScannerCode: 2, eventCode: this.state.selectedOption.value } })
      },
      error => {
        console.log(error)
      }
    )
  }

  //call api so get Entry
  getEntry = async (body) => {
    let prams = { typeScannerCode: 2, eventCode: this.state.selectedOption.value }
    const fetchInfo = await Service.postMethod('scan', body,
      data => {
        if (data.appError) {

          //if ENTRY REJECTED
          this.navigate('ScanResult', { ...data, title: 'ENTRY REJECTED', ...prams })
        } else {
          //if ENTRY ACCEPTED
          if (data.status && data.status === 400) {
            this.navigate('ScanResult', { ...data, title: 'INVALID TICKET', ...prams })
          }
          else {
            this.navigate('ScanResult', { ...data, title: 'ENTRY ACCEPTED', ...prams })
          }
        }
      },
      error => {
        console.log(error)
      }
    )
  }
  //**END QR CODE */

  // Has scan result
  onScannerManually = (typeScannerCode) => {
    const { manuallyCode, selectedOption } = this.state;
    if (typeScannerCode === 1) {
      // if user choose ENTRY

      let body = {
        "code": manuallyCode,
        "action": "ticketEnter",
        "event": selectedOption.value
      }

      this.getEntry(body)
    }
    if (typeScannerCode === 2) {
      // if user choose VIEW INFO

      let body = {
        "code": manuallyCode,
        "action": "ticketInfo",
        "event": selectedOption.value
      }

      this.getInfo(body)
    }
  }

  onDateChange = (date) => {
    const { events } = this.state;
    let event = Object.keys(events).find(e => e === date)
    let _propsDropdown = { ...this.state.propsDropdown };
    _propsDropdown.options = events[event];
    this.setState({
      date: date,
      propsDropdown: _propsDropdown,
      selectedOption: _propsDropdown.options[0]
    })
  }

  onChangeTextCode = (text) => {
    this.setState({
      manuallyCode: text
    })
  }

  _getEvents = async () => {
    Service.getMethod('scanner-data',
      data => {
        let days = data.days;
        let events = data.events;

        this.setState({
          events: events,
          minDate: days[0].value,
          maxDate: days[days.length - 1].value
        })

        console.log(this.state)
      },
      error => {
        console.error(error)
      }
    )
  }

  _onShow = (value) => {
    if (this.state.selectedOption.label) {
      this.setState({
        isShowingOptions: value,
      });
    } else {
      Alert.alert(
        'Warning',
        'Please select date so list events!',
        [
          { text: 'Cancel' },
        ],
        { cancelable: false }
      )
    }
  }

  _onSelect = (item, isShow) => {
    this.setState({
      isShowingOptions: isShow,
      selectedOption: item,
    });
  }

  _renderDopdown = () => {
    const { isShowingOptions, selectedOption } = this.state;
    if (this.state.selectedOption !== {}) {
      return (
        <Dropdown {...this.state.propsDropdown}
          onSelect={this._onSelect.bind(this)}
          onShow={this._onShow.bind(this)}
          isShowingOptions={isShowingOptions}
          selectedOption={this.state.selectedOption}
        />
      )
    } else {
      return (
        <TextCustom>Please select date</TextCustom>
      )
    }
  }

  _renderDatePicker = () => {
    return (
      <DatePicker
        style={{ width: '100%' }}
        date={this.state.date}
        mode="date"
        placeholder="placeholder"
        format="YYYY-MM-DD"
        minDate={this.state.minDate}
        maxDate={this.state.maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconSource={require('./../../../assets/images/arrow-down.png')}
        onDateChange={this.onDateChange}
      />
    )
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextCustom>SCAN QR CODE</TextCustom>
          <View style={styles.row} pointerEvents={selectedOption.label ? 'auto' : 'none'}>
            <ButtonCustom width={100} onPress={this.onEntry}>ENTRY</ButtonCustom>
            <ButtonCustom width={100} onPress={this.onViewInfo}>VIEW INFO</ButtonCustom>
          </View>
          <TextCustom>IF TICKET SCANNING FAILS, TYPE THE TICKET ID TO ADMIT ENTRY OR VIEW INFO</TextCustom>
          <TextInputCustom onChangeText={this.onChangeTextCode} />
          <View style={styles.floatRight} pointerEvents={selectedOption.label ? 'auto' : 'none'}>
            <ButtonCustom width={90} padding={10} fontSize={13} onPress={() => this.onScannerManually(1)}>ENTRY</ButtonCustom>
            <ButtonCustom width={90} padding={10} fontSize={13} onPress={() => this.onScannerManually(2)}>VIEW INFO</ButtonCustom>
          </View>
          <TextCustom>EVENT YOU ARE SCANNING IN</TextCustom>
          <TextCustom>Current Event: {selectedOption.label ? selectedOption.label : 'None'}</TextCustom>

          <View style={styles.row}>
            <View style={[styles.rowItem, { paddingRight: 10 }]}>
              {this._renderDatePicker()}
            </View>
            <View style={[styles.rowItem, { paddingLeft: 10 }]}>
              {this._renderDopdown()}
            </View>
          </View>

          <View style={styles.floatRight}>
            <ButtonCustom>SUBMIT</ButtonCustom>
          </View>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: 'center'
  },
  floatRight: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingTop: 10
  },
  rowItem: {
    width: '50%'
  }
})