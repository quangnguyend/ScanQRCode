import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';

import moment from 'moment';

import { TextCustom, ButtonCustom } from '../../../components';
import { connect } from 'react-redux';
import Header from './header';

class Collection extends Component {
  static navigationOptions = {
    header: (props) => <Header {...props} />
  }
  constructor(props) {
    super(props)
    this.state = {
      currentTime: ''
    }
  }

  componentWillMount() {
    let dateTime = new Date();
    this.setState({
      currentTime: moment(dateTime).format('Do MMMM YYYY HH:mm').toString()
    })
    console.log(dateTime)
  }

  render() {
    const { currentTime } = this.state;
    const { info } = this.props;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <TextCustom fontSize={30}>PURCHASE COLLECTED!</TextCustom>
        <TextCustom styleC={styles.infoLable}>Purchased Time: {currentTime}</TextCustom>
        <TextCustom styleC={styles.infoLable}>Receipt ID: {info.id}</TextCustom>
        <TextCustom styleC={styles.infoLable}>Purchased By: {info.firstName + ' ' + info.lastName}</TextCustom>
        <TextCustom>PURCHASES</TextCustom>
        <View>
          <FlatList
            style={styles.listView}
            data={params.items}
            renderItem={({ item }) =>
              <View style={{ flexDirection: 'row' }}>
                <TextCustom styleC={{ width: '70%' }}>{item.details}</TextCustom>
                <TextCustom styleC={{ width: '30%', textAlign: 'right' }}>{item.subtotal}</TextCustom>
              </View>
            }
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextCustom styleC={{ width: '70%' }}>TOTAL CHARGED</TextCustom>
          <TextCustom styleC={{ width: '30%', textAlign: 'right' }}>{params.total}</TextCustom>
        </View>
        <TextCustom styleC={{ textAlign: 'right' }} >Bill includes 7% GST</TextCustom>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  info: state.userReducer.info
});

export default connect(mapStateToProps)(Collection);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: 'center'
  },
  listView: {
    borderBottomColor: '#8E7631',
    borderWidth: 2,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent'
  },
  infoLable: {
    textAlign: 'left'
  }
})