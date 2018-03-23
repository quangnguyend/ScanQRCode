import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Platform
} from 'react-native';

import moment from 'moment';

import { TextCustom, ButtonCustom } from '../../../components';
import { connect } from 'react-redux';
import Header from './header';

class Collection extends Component {
  static navigationOptions = {
    header: (props) => <Header {...props} />,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/images/ticket.png')}
        style={[{ width: '100%', height: '100%' }]}
        resizeMode={'contain'}
      />
    )
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

        {/* Title */}
        <TextCustom styleC={styles.title}>PURCHASE COLLECTED!</TextCustom>

        {/* Section 1 */}
        <TextCustom styleC={styles.infoLable}>Purchased By:
          <TextCustom styleC={{ fontStyle: 'italic' }}>
            {'  ' + info.firstName + ' ' + info.lastName}
          </TextCustom>
        </TextCustom>
        <TextCustom styleC={styles.infoLable}>Receipt ID:
        <TextCustom styleC={{ fontStyle: 'italic' }}>
            {'  ' + info.id}
          </TextCustom>
        </TextCustom>
        <TextCustom styleC={styles.infoLable}>Purchased Time:
        <TextCustom styleC={{ fontStyle: 'italic' }}>
            {'  ' + currentTime}
          </TextCustom>
        </TextCustom>

        {/* Section 2 */}
        <TextCustom styleC={styles.titleS2}>PURCHASES</TextCustom>
        <View>
          <FlatList
            style={styles.listView}
            data={params.items}
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
          <TextCustom styleC={[{ width: '30%', textAlign: 'right' }, styles.textPadding]}>{params.total}</TextCustom>
        </View>
        <TextCustom styleC={styles.labelBottom} >Bill includes 7% GST</TextCustom>
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
    padding: 10,
    marginTop: (Platform.OS === 'ios') ? 20 : 0
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
  }
})