import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, Image } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { addListener } from '../../utils/reduxNavVendor';
import VendorStack from './stackVendorNav';

class VendorNavigationState extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/ticket.png')}
        style={styles.iconStyle}
        resizeMode={'contain'}
      />
    )
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navVendor: PropTypes.object.isRequired,
  };

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
});

export default connect(mapStateToProps)(VendorNavigationState);

const styles = StyleSheet.create({
  iconStyle: {
    width: (Platform.OS === 'ios') ? 30 : '100%',
    height: (Platform.OS === 'ios') ? 30 : '100%'
  }
})
