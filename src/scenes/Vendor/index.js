import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, Image } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { addListener } from '../../utils/reduxNavVendor';
import VendorStack from './stackVendorNav';
import { Theme } from '../../constant';

class VendorNavigationState extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={Theme.Image.QR_CODE}
        style={styles.iconStyle}
        resizeMode={'contain'}
      />
    ),
    tabBarVisible: (navigation.state.params != undefined) ? navigation.state.params.visibleNav : true
  })

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navVendor: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    //visibleNav === true is show Nav, === false is hide
    if (nextProps.isShowNav !== this.props.isShowNav) {
      this.props.navigation.setParams({ visibleNav: nextProps.isShowNav });
    }
    return true;
  }

  render() {
    const { dispatch, navVendor } = this.props;
    this.props.navigation
    return (
      <VendorStack
        navigation={addNavigationHelpers({
          dispatch,
          state: navVendor,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navVendor: state.navVendor,
  isShowNav: state.userReducer.showNavVendor
});

export default connect(mapStateToProps)(VendorNavigationState);

const styles = StyleSheet.create({
  iconStyle: {
    width: (Platform.OS === 'ios') ? 30 : '100%',
    height: (Platform.OS === 'ios') ? 30 : '100%'
  }
})
