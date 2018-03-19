import {applyMiddleware, createStore, compose} from 'redux';
import AppReducer from '../reducers';


export function configureStore() {
    return createStore(AppReducer);
}