import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Platform
} from 'react-native';

import moment from 'moment';

import { TextCustom, ButtonCustom, Loading } from '../../../components';
import { connect } from 'react-redux';
import Header from './header';

class Collection extends Component {
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
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    console.log(this.props)
    let body = {
      "code": params.code,
      "action": "purchaseCollect"
    }
    this.props.postApi('scan', body, (err, data) => {
      if (err) {
        this.props.goBack();
        return;
      }
      this.setState({
        data: data
      })
    })
  }

  render() {
    const { data } = this.state;
    const { params } = this.props.navigation.state;
    if (!data) {
      return (
        <View></View>
      )
    } else
      return (
        <View style={styles.container}>

          {/* Title */}
          <TextCustom styleC={styles.title}>PURCHASE COLLECTED!</TextCustom>

          {/* Section 1 */}
          <TextCustom styleC={styles.infoLable}>Purchased By:
          <TextCustom styleC={{ fontStyle: 'italic' }}>
              {'  ' + data.purchasedBy.toString()}
            </TextCustom>
          </TextCustom>
          <TextCustom styleC={styles.infoLable}>Receipt ID:
        <TextCustom styleC={{ fontStyle: 'italic' }}>
              {'  ' + params.code}
            </TextCustom>
          </TextCustom>
          <TextCustom styleC={styles.infoLable}>Purchased Time:
        <TextCustom styleC={{ fontStyle: 'italic' }}>
              {'  ' + data.purchaseTime.toString()}
            </TextCustom>
          </TextCustom>

          {/* Section 2 */}
          <TextCustom styleC={styles.titleS2}>PURCHASES</TextCustom>
          <View>
            <FlatList
              style={styles.listView}
              data={data.items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <View style={{ flexDirection: 'row' }}>
                  <TextCustom styleC={[{ width: '70%', textAlign: 'left' }, styles.textPadding]}>{item.details}</TextCustom>
                  <TextCustom styleC={[{ width: '30%', textAlign: 'right' }, styles.textPadding]}>{item.subtotal}</TextCustom>
                </View>
              }
            />
          </View>

          {/* Section 3 */}
          <View style={{ flexDirection: 'row' }}>
            <TextCustom styleC={[{ width: '70%', textAlign: 'left' }, styles.textPadding]}>TOTAL CHARGED</TextCustom>
            <TextCustom styleC={[{ width: '30%', textAlign: 'right' }, styles.textPadding]}>{data.total}</TextCustom>
          </View>
          <TextCustom styleC={styles.labelBottom} >Bill includes 7% GST</TextCustom>
        </View>
      )
  }
}

const mapDispatchToProp = dispatch => ({
  postApi: (endPoint, body, callback) => dispatch({ type: 'POST_TODO_DATA', endPoint: endPoint, body: body, callback }),
  goBack: () => dispatch({ type: 'VendorGoBack' })
});

export default connect(null, mapDispatchToProp)(Collection);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  titleS2: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10
  },
  textPadding: {
    paddingTop: 5,
    paddingBottom: 5
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
    borderRightColor: 'transparent',
    paddingBottom: 10,
    marginBottom: 20
  },
  infoLable: {
    textAlign: 'left',
    paddingTop: 5,
    paddingBottom: 5
  },
  title: {
    fontSize: 33,
    color: '#66CC99',
    marginTop: 10,
    marginBottom: 10
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