import React, { Component } from 'react';
import {
  View,
  Vibration,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  AsyncStorage,
  Platform
} from 'react-native';
import { connect } from 'react-redux';

class HeaderCustom extends Component {
  constructor(props) {
    super(props)
  }

  onBack = () => {
    this.props.navToMain('Overview');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount SCANNER RECEIPT')
  }

  render() {
    const { getScreenDetails, scene } = this.props;
    const details = getScreenDetails(scene)
    return (
      <View style={styles.header}>
        <TouchableHighlight underlayColor={'transparent'} style={styles.btnBack} onPress={this.onBack}>
          <View style={styles.btnBackView}>
            <Image
              source={require('../../../assets/images/back-icon.png')}
            />
            <Text style={[styles.headerText, { paddingLeft: 5 }]}>Scanner</Text>
          </View>
        </TouchableHighlight>
        <Text style={[styles.headerText, { fontSize: 17, fontWeight: 'bold' }]}>{details.options.title}</Text>
      </View>
    )
  }
}

const mapDispatchToProp = dispatch => ({
  navToMain: (routeName) => dispatch({ type: 'VendorReset' })
});

export default connect(null, mapDispatchToProp)(HeaderCustom);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: (Platform.OS === 'ios') ? 20 : 0
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
  }
});