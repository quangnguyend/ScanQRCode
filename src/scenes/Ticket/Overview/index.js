import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  AsyncStorage,
  Keyboard,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { TextCustom, TextInputCustom, ButtonCustom, Dropdown, DatePicker, Camera } from './../../../components';
import Service from '../../../services/api';
import Header from './header';
import { setActionScanner } from './../../Sign/actions';
import styles from './styles';

class Overview extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (props) => <Header {...props} />,
    headerLeft: null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/ticket.png')}
        style={styles.iconStyle}
        resizeMode={'contain'}
      />
    ),
    tabBarVisible: navigation.state.params ? navigation.state.params.tabBarVisible : true
  })

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
    if (!scannerData || Object.keys(scannerData).length === 0) {
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

  checkKeyboardOnShowHide() {
    Keyboard.addListener('keyboardDidShow', () => {
      this.props.navigation.setParams({
        tabBarVisible: false
      })
    })

    Keyboard.addListener('keyboardDidHide', () => {
      this.props.navigation.setParams({
        tabBarVisible: true
      })
    })
  }

  componentDidMount() {
    this.loadData();
    this.checkKeyboardOnShowHide();
  }

  onEntry = () => {
    this.props.setActionScanner('ticketEnter');
    this.navigate('Scanner', { eventCode: this.state.currentEvent.value });
  }

  onViewInfo = () => {
    this.props.setActionScanner('ticketInfo');
    this.navigate('Scanner', { eventCode: this.state.currentEvent.value });
  }

  //**QR CODE */
  navigate = (screen, data) => {
    this.props.navigate(screen, data)
  }

  //call api so get Info

  getInfo = async (body) => {
    const { postApi } = this.props;
    const fetchInfo = await postApi('scan', body,
      (err, data) => {
        this.props.setActionScanner('ticketInfo');
        if (data.message === 'Ticket code invalid') {
          this.navigate('ScanResult', { ...data, title: 'INVALID TICKET' })
          return;
        }
        this.navigate('ScanResult', { ...data, title: 'VIEW INFO' })
      }
    )
  }

  //call api so get Entry
  getEntry = async (body) => {
    const { postApi } = this.props;
    let prams = { eventCode: this.state.currentEvent.value }
    const fetchInfo = await postApi('scan', body,
      (err, data) => {
        this.props.setActionScanner('ticketEnter');
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
      this.props.setActionScanner('ticketEnter');
      this.getEntry(body)
    }
    if (typeScannerCode === 2) {
      // if user choose VIEW INFO

      let body = {
        "code": manuallyCode,
        "action": "ticketInfo",
        "event": currentEvent.value
      }
      this.props.setActionScanner('ticketInfo');
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

  _getEvents = () => {
    this.props.getApi('scanner-data',
      (err, data) => {
        let days = data.days;
        let events = data.events;
        AsyncStorage.setItem('SCANNER_DATA', JSON.stringify(data))
        this.setState({
          events: events,
          minDate: days[0].value,
          maxDate: days[days.length - 1].value
        })
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
    const { currentEvent, date, manuallyCode } = this.state;
    let disableBtn = false;
    if (currentEvent === null || !currentEvent.label || currentEvent === undefined) {
      disableBtn = true;
    }
    return (
      <KeyboardAwareScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <TextCustom textAlign={'left'}>EVENT YOU ARE SCANNING IN</TextCustom>
              <TextCustom textAlign={'left'}>Current Event: {!currentEvent || currentEvent === null ? 'None' : currentEvent.label}</TextCustom>

              <View style={styles.row}>
                <View style={[styles.rowItem, { paddingRight: 10 }]}>
                  {this._renderDatePicker()}
                </View>
                <View style={[styles.rowItem, { paddingLeft: 10 }]}>
                  {this._renderDopdown()}
                </View>
              </View>
              <View style={[styles.floatRight,{ paddingBottom: 40}]}>
                <ButtonCustom width={110} padding={10} fontSize={13} onPress={this.onSubmitEvent} title={'SUBMIT'} />
              </View>


              <TextCustom textAlign={'left'}>SCAN QR CODE</TextCustom>
              <View style={[styles.row, { paddingBottom: 40 }]} pointerEvents={!disableBtn ? 'auto' : 'none'}>
                <ButtonCustom width={120} padding={15} fontSize={13} onPress={this.onEntry} disable={disableBtn} styleC={{ marginRight: 10 }} title={'ENTRY'} />
                <ButtonCustom width={120} padding={15} fontSize={13} onPress={this.onViewInfo} disable={disableBtn} styleC={{ marginLeft: 10 }} title={'VIEW INFO'} />
              </View>


              <TextCustom textAlign={'left'} styleC={{ paddingBottom: 10 }}>IF TICKET SCANNING FAILS, TYPE THE TICKET ID TO ADMIT ENTRY OR VIEW INFO</TextCustom>
              <TextInputCustom onChangeText={this.onChangeTextCode} />
              <View style={[styles.floatRight, { paddingBottom: 40 }]} pointerEvents={(!disableBtn && manuallyCode != '') ? 'auto' : 'none'}>
                <ButtonCustom width={110} padding={10} fontSize={13} onPress={() => this.onScannerManually(1)} disable={(!disableBtn && manuallyCode != '') ? false : true} title={'ENTRY'} />
                <ButtonCustom width={110} padding={10} fontSize={13} styleC={{ marginLeft: 10 }} onPress={() => this.onScannerManually(2)} disable={(!disableBtn && manuallyCode != '') ? false : true} title={'VIEW INFO'} />
              </View>
            </ScrollView>
          </View>
          <Loading loading={loading} />
          <View style={{ position: 'absolute', height: 100, bottom: 0 }}>
          </View>
        </View >
      </KeyboardAwareScrollView>
    )
  }
}

const mapDispatchToProp = dispatch => ({
  navigate: (routeName, params) => dispatch({ type: 'TicketNavigate', ...{ routeName: routeName, params: params } }),
  setActionScanner: (action) => dispatch(setActionScanner(action)),
  getApi: (endPoint, callback) => dispatch({ type: 'GET_TODO_DATA', endPoint: endPoint, callback }),
  postApi: (endPoint, body, callback) => dispatch({ type: 'POST_TODO_DATA', endPoint: endPoint, body: body, callback })
});

export default connect(null, mapDispatchToProp)(Overview);