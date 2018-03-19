import nav from './nav';
import userReducer from './userReducer';

import { combineReducers } from 'redux';

const AppReducer = combineReducers({
  nav,
  userReducer
});

export default AppReducer;