import React, { Component } from 'react';
import {
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { addListener } from '../utils/redux';
import { StatusBar } from 'react-native';
import { Loading } from '../components';

import AppNavigator from './AppNavigator';

class AppWithNavigationState extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
  }

  render() {
    StatusBar.setBarStyle('light-content', true);

    const { dispatch, nav, loading } = this.props;
    this.props.navigation
    return (
      <View style={{ flex: 1 }}>
        <Loading loading={loading} />
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch,
            state: nav,
            addListener,
          })}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  loading: state.loadingIndicator
});

export default connect(mapStateToProps)(AppWithNavigationState);