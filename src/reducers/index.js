import nav from './nav';
import navVendor from './navVendor';
import userReducer from './userReducer';
import loadingIndicator from './loading';
import navTicket from './navTicket';

import { combineReducers } from 'redux';

const AppReducer = combineReducers({
  navVendor,
  nav,
  userReducer,
  loadingIndicator
});

export default AppReducer;