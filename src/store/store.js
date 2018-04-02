import { applyMiddleware, createStore, compose } from 'redux';
import AppReducer from '../reducers';
import apiServices from '../services/apiServices';


export function configureStore() {
  return createStore(AppReducer, {}, applyMiddleware(apiServices));
}