import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Platform,
  ScrollView
} from 'react-native';

import moment from 'moment';

import { TextCustom, ButtonCustom, Loading } from '../../../components';
import { connect } from 'react-redux';
import Header from './header';
import Services from '../../../services/api';

export default class Collection extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (props) => <Header {...props} />,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/ticket.png')}
        style={styles.iconStyle}
        resizeMode={'contain'}
      />
    ),
    title: navigation.state.params.title ? navigation.state.params.title : 'COLLECTION'
  })

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      title: 'PURCHASE COLLECTED!',
      titleColor: '#66CC99'
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    switch (params.appError) {
      case 'PURCHASE-COLLECTED':
        this.props.navigation.setParams({ title: 'COLLECTED' })
        this.setState({ title: 'PURCHASE IS COLLECTED', titleColor: 'red' })
        break;
      case 'PURCHASE-REFUNDED':
        this.props.navigation.setParams({ title: 'REFUNDED' })
        this.setState({ title: 'PURCHASE IS REFUNDED',  titleColor: 'red' })
        break;
    }
    let body = {
      "code": params.code,
      "action": "purchaseCollect"
    }
    Services.postMethod('scan', body, data => {
      this.setState({
        data: data
      })
    }, error => {
      Service.errorNetwork(() => {
        this.props.navigation.goBack(null);
      });
    })
  }

  render() {
    const { currentTime, data, title, titleColor } = this.state;
    const { params } = this.props.navigation.state;
    if (!data) {
      return (
        <View>
          <Loading loading={!data ? true : false} />
        </View>
      )
    } else
      return (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Title */}
            <TextCustom styleC={[styles.title, { color: titleColor}]}>{title}</TextCustom>

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
                    <TextCustom styleC={[{ width: '70%', textAlign: 'left' }, styles.textPadding]}>{item.details.trim()}</TextCustom>
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
          </ScrollView>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
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