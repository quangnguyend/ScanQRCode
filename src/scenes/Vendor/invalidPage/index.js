import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform
} from 'react-native';

import { TextCustom, ButtonCustom } from '../../../components';
import { connect } from 'react-redux';
import Header from './header';
class InvalidPage extends Component {
  static navigationOptions = {
    header: (props) => <Header {...props} />,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/ticket.png')}
        style={styles.iconStyle}
        resizeMode={'contain'}
      />
    )
  }
  constructor(props) {
    super(props)
  }

  componentDidMount() { }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text style={{ color: '#FF6666', fontSize: 30, textAlign: 'center' }}>
          INVALID RECEIPT! ( {params.message})
                    </Text>
      </View>
    )
  }
}

const mapDispatchToProp = dispatch => ({
  navToMain: () => dispatch({ type: 'Reset', routeName: 'Login' })
});

export default connect(null, mapDispatchToProp)(InvalidPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    width: (Platform.OS === 'ios') ? 30 : '100%',
    height: (Platform.OS === 'ios') ? 30 : '100%'
  }
})