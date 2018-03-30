import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SectionList,
  Image,
  Platform,
  ScrollView
} from 'react-native';

import { TextCustom, ButtonCustom } from '../../../components';
import Header from './header';
import { connect } from 'react-redux';

class ComfirmCollection extends Component {
  static navigationOptions = {
    headerLeft: null,
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

  onCancel = () => {
    this.props.navigate('Overview', null);
  }

  viewCollected = () => {
    const { params } = this.props.navigation.state;
    this.props.navigate('Collection', params);
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextCustom styleC={styles.title}>PURCHASES ON RECEIPT</TextCustom>
          <View style={styles.row}>
            <ButtonCustom width={120} styleC={{ marginRight: 10 }} onPress={this.onCancel} title={'CANCEL'} />
            <ButtonCustom width={120} styleC={{ marginLeft: 10 }} onPress={this.viewCollected} title={'COLLECTED'} />
          </View>
          <View>
            <FlatList
              style={styles.listView}
              data={params.items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View style={{ flexDirection: 'row' }}>
                  <TextCustom styleC={[{ width: '70%' }, styles.textPadding]}>{item.details}</TextCustom>
                  <TextCustom styleC={[{ width: '30%', textAlign: 'right' }, styles.textPadding]}>{item.subtotal}</TextCustom>
                </View>
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextCustom styleC={{ width: '70%', textAlign: 'left' }}>TOTAL CHARGED</TextCustom>
            <TextCustom styleC={{ width: '30%', textAlign: 'right' }}>{params.total}</TextCustom>
          </View>
          <TextCustom styleC={styles.labelBottom} >Bill includes 7% GST</TextCustom>
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProp = dispatch => ({
  navigate: (routeName, params) => dispatch({ type: 'VendorNavigate', ...{ routeName: routeName, params: params } })
});

export default connect(null, mapDispatchToProp)(ComfirmCollection);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 25,
    paddingTop: 25,
    justifyContent: 'center'
  },
  listView: {
    borderBottomColor: '#8E7631',
    borderWidth: 2,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    paddingBottom: 10,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    marginTop: 20
  },
  textPadding: {
    paddingTop: 5,
    paddingBottom: 5
  },
  labelBottom: {
    textAlign: 'right',
    marginTop: 40
  },
  iconStyle: {
    width: (Platform.OS === 'ios') ? 30 : '100%',
    height: (Platform.OS === 'ios') ? 30 : '100%'
  }
})