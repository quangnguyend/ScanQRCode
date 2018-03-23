import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SectionList
} from 'react-native';

import { TextCustom, ButtonCustom } from '../../../components';
import Header from './header';
import { connect } from 'react-redux';

class ComfirmCollection extends Component {
  static navigationOptions = {
    headerLeft: null,
    header: (props) => <Header {...props} />
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
  }

  onCancel = () => {
    this.props.navigate('vendor', null);
  }

  viewCollected = () => {
    const { params } = this.props.navigation.state;
    this.props.navigate('Collection', params);
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <TextCustom>PURCHASES ON RECEIPT</TextCustom>
        <View style={styles.row}>
          <ButtonCustom width={120} onPress={this.onCancel}>CANCEL</ButtonCustom>
          <ButtonCustom width={120} onPress={this.viewCollected}>COLLECTED</ButtonCustom>
        </View>
        <View>
          <FlatList
            style={styles.listView}
            data={params.items}
            renderItem={({ item }) =>
              <View style={{ flexDirection: 'row' }}>
                <TextCustom style={{ width: '70%' }}>{item.details}</TextCustom>
                <TextCustom style={{ width: '30%', textAlign: 'right' }}>{item.subtotal}</TextCustom>
              </View>
            }
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextCustom style={{ width: '70%' }}>TOTAL CHARGED</TextCustom>
          <TextCustom style={{ width: '30%', textAlign: 'right' }}>{params.total}</TextCustom>
        </View>
        <TextCustom style={{ textAlign: 'right' }} >Bill includes 7% GST</TextCustom>
      </View>
    )
  }
}

const mapDispatchToProp = dispatch => ({
  navigate: (routeName, params) => dispatch({ type: 'navigate', ...{ routeName: routeName, params: params } })
});

export default connect(null, mapDispatchToProp)(ComfirmCollection);

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
  }
})