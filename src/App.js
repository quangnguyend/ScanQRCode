
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Vibration,
  ToastAndroid
} from 'react-native';

import {Provider} from 'react-redux'
import {configureStore} from './store/store.js';
import AppWithReduxNavigationState from './routes/reduxNavigation'

const store = configureStore();
store.subscribe(() => {
    console.log("GLOBAL STATE:", store.getState())
})
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppWithReduxNavigationState />
      </Provider>
    );
  }
}
