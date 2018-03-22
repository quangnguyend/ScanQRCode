import React, { Component } from 'react';
import {
  View,
  Vibration,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

class HeaderCustomS extends Component {
  constructor(props) {
    super(props)
  }

  onBack = () => {
    this.props.navToMain(this.state.user_role);
  }

  componentDidMount() {
    AsyncStorage.getItem('USER_ROLE').then(data => {
      this.setState({
        user_role: data
      })
    })
  }

  onScanner = () => {
    const { title, typeScannerCode, eventCode } = this.props;
    this.props.navigation.navigate('ScanReceipt');
  }

  render() {
    const { getScreenDetails, scene } = this.props;
    const details = getScreenDetails(scene)
    return (
      <View style={styles.header}>
        <TouchableHighlight style={styles.btnBack} onPress={this.onBack}>
          <View style={styles.btnBackView}>
            <Image
              source={require('../../../assets/images/back-icon.png')}
            />
            <Text style={[styles.headerText, { paddingLeft: 5 }]}>Scanner</Text>
          </View>
        </TouchableHighlight>
        <Text style={[styles.headerText, { fontSize: 17, fontWeight: 'bold' }]}>{details.options.title}</Text>
        <TouchableHighlight style={styles.btnCam} onPress={this.onScanner}>
          <Image
            source={require('../../../assets/images/cam-icon.png')}
          />
        </TouchableHighlight>
      </View>
    )
  }
}

const mapDispatchToProp = dispatch => ({
  navToMain: (role) => dispatch({ type: 'Reset', routeName: role })
});

export default connect(null, mapDispatchToProp)(HeaderCustomS);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#635339',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  headerText: {
    color: '#FFFFFF'
  },
  btnBack: {
    position: 'absolute',
    left: 0
  },
  btnBackView: {
    flexDirection: 'row',
    paddingLeft: 10
  },
  btnCam: {
    position: 'absolute',
    right: 10
  }
});