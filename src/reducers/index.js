import nav from './nav';
import navVendor from './navVendor';
import userReducer from './userReducer';

import { combineReducers } from 'redux';

const AppReducer = combineReducers({
  navVendor,
  nav,
  userReducer
});

export default AppReducer;