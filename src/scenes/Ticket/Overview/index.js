import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native';
import { TextCustom, TextInputCustom, ButtonCustom, Dropdown, DatePicker, Camera } from './../../../components';
import Service from '../../../services/api';
import Header from './header'

export default class Overview extends Component {

  static navigationOptions = {
    header: (props) => <Header {...props} />,
    headerLeft: null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/ticket.png')}
        style={[{ width: '100%', height: '100%' }]}
        resizeMode={'contain'}
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
      currentEvent: {},
      isShowingOptions: false,
      events: {},
      minDate: null,
      maxDate: null,
      propsDropdown: {
        options: [],
        label: 'EVENT',
        animationType: 'none',
      }
    }
  }

  checkAsyncStorage = (scannerData, currentEvent, date) => {
    if (!scannerData) {
      this._getEvents();
    } else {
      let { events, days } = scannerData;
      let _propsDropdown = { ...this.state.propsDropdown };
      _propsDropdown.options = events[date];

      this.setState({
        events: events,
        minDate: days[0].value,
        maxDate: days[days.length - 1].value,
        propsDropdown: _propsDropdown,
        selectedOption: currentEvent,
        currentEvent: currentEvent,
        date: date
      })
    }
  }

  loadData = () => {
    new Promise((resolve, reject) => {
      AsyncStorage.getItem('SCANNER_DATA').then(dataS => {
        AsyncStorage.getItem('CURRENT_EVENT').then(dataE => {
          AsyncStorage.getItem('DATE_EVENT').then(dataD => {
            let _s = JSON.parse(dataS);
            let _e = JSON.parse(dataE);
            resolve({ _s, _e, dataD })
          });
        });
      });
    }).then((data) => {
      this.checkAsyncStorage(data._s, data._e, data.dataD);
    })
  }

  componentDidMount() {
    this.loadData();
  }

  onEntry = () => {
    this.props.navigation.navigate('Entry', { title: 'ADMIT ENTRY', typeScannerCode: 1, eventCode: this.state.currentEvent.value });
  }

  onViewInfo = () => {
    this.props.navigation.navigate('Entry', { title: 'VIEW INFO', typeScannerCode: 2, eventCode: this.state.currentEvent.value });
  }

  //**QR CODE */
  navigate = (screen, data) => {
    this.props.navigation.navigate(screen, data)
  }

  //call api so get Info
  getInfo = async (body) => {
    const fetchInfo = await Service.postMethod('scan', body,
      data => {
        this.navigate('ScanResult', { ...data, ...{ title: 'VIEW INFO', typeScannerCode: 2, eventCode: this.state.currentEvent.value } })
      },
      error => {
        console.log(error)
      }
    )
  }

  //call api so get Entry
  getEntry = async (body) => {
    let prams = { typeScannerCode: 2, eventCode: this.state.currentEvent.value }
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
    const { manuallyCode, currentEvent } = this.state;
    if (typeScannerCode === 1) {
      // if user choose ENTRY

      let body = {
        "code": manuallyCode,
        "action": "ticketEnter",
        "event": currentEvent.value
      }

      this.getEntry(body)
    }
    if (typeScannerCode === 2) {
      // if user choose VIEW INFO

      let body = {
        "code": manuallyCode,
        "action": "ticketInfo",
        "event": currentEvent.value
      }

      this.getInfo(body)
    }
  }

  onDateChange = (date) => {
    const { events } = this.state;
    let event = Object.keys(events).find(e => e === date)
    let _propsDropdown = { ...this.state.propsDropdown };
    _propsDropdown.options = events[event];
    AsyncStorage.setItem('DATE_EVENT', date)
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

  onSubmitEvent = () => {
    AsyncStorage.setItem('CURRENT_EVENT', JSON.stringify(this.state.selectedOption))
    this.setState({
      currentEvent: this.state.selectedOption
    })
  }

  _getEvents = async () => {
    Service.getMethod('scanner-data',
      data => {
        let days = data.days;
        let events = data.events;

        AsyncStorage.setItem('SCANNER_DATA', JSON.stringify(data))

        this.setState({
          events: events,
          minDate: days[0].value,
          maxDate: days[days.length - 1].value
        })
      },
      error => {
        console.error(error)
      }
    )
  }

  _onShow = (value) => {
    const { date } = this.state;
    if (date === null || date === '') {
      Alert.alert(
        'Warning!',
        'Please select date so list events.',
        [
          { text: 'Cancel' },
        ],
        { cancelable: false }
      )

    } else {
      this.setState({
        isShowingOptions: value,
      });
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
    return (
      <Dropdown {...this.state.propsDropdown}
        onSelect={this._onSelect.bind(this)}
        onShow={this._onShow.bind(this)}
        isShowingOptions={isShowingOptions}
        selectedOption={this.state.selectedOption}
      />
    )
  }

  _renderDatePicker = () => {
    return (
      <DatePicker
        style={{ width: '100%' }}
        date={this.state.date}
        mode="date"
        placeholder="DATE"
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
    const { currentEvent, date } = this.state;
    let disableBtn = false;
    if (currentEvent === null || !currentEvent.label || currentEvent === undefined) {
      disableBtn = true;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextCustom>SCAN QR CODE</TextCustom>
          <View style={[styles.row, { paddingBottom: 20}]} pointerEvents={!disableBtn ? 'auto' : 'none'}>
            <ButtonCustom width={100} padding={15} fontSize={13} onPress={this.onEntry} disable={disableBtn}>ENTRY</ButtonCustom>
            <ButtonCustom width={100} padding={15} fontSize={13} onPress={this.onViewInfo} disable={disableBtn}>VIEW INFO</ButtonCustom>
          </View>
          <TextCustom>IF TICKET SCANNING FAILS, TYPE THE TICKET ID TO ADMIT ENTRY OR VIEW INFO</TextCustom>
          <TextInputCustom onChangeText={this.onChangeTextCode} />
          <View style={[styles.floatRight, { paddingBottom: 20}]} pointerEvents={!disableBtn ? 'auto' : 'none'}>
            <ButtonCustom width={90} padding={10} fontSize={13} onPress={() => this.onScannerManually(1)} disable={disableBtn}>ENTRY</ButtonCustom>
            <ButtonCustom width={90} padding={10} fontSize={13} onPress={() => this.onScannerManually(2)} disable={disableBtn}>VIEW INFO</ButtonCustom>
          </View>
          <TextCustom>EVENT YOU ARE SCANNING IN</TextCustom>
          <TextCustom>Current Event: {!currentEvent || currentEvent === null ? 'None' : currentEvent.label}</TextCustom>

          <View style={styles.row}>
            <View style={[styles.rowItem, { paddingRight: 10 }]}>
              {this._renderDatePicker()}
            </View>
            <View style={[styles.rowItem, { paddingLeft: 10 }]}>
              {this._renderDopdown()}
            </View>
          </View>

          <View style={styles.floatRight}>
            <ButtonCustom onPress={this.onSubmitEvent}>SUBMIT</ButtonCustom>
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
    paddingTop: 20
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
  },
  btnDisable: {
    backgroundColor: '#CEB797'
  }
})