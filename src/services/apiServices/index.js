import config from '../api/config';
import { Alert } from 'react-native';
import Services from '../api';

const dataService = store => next => action => {
  /*
  Pass all actions through by default
  */
  next(action)
  switch (action.type) {
    case 'POST_TODO_DATA':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      Services.postMethod(action.endPoint, action.body,
        async data => {
          await action.callback(null, data);
          return next({
            type: 'GET_TODO_DATA_RECEIVED'
          })
        },
        async error => {
          await Alert.alert(
            'NETWORK ERROR',
            'Network request failed. Please recheck connection!',
            [
              {
                text: 'Cancel', onPress: () => {
                  if (action.comfirm) {
                    action.comfirm(true)
                  }
                }
              }
            ]
          )
          await next({
            type: 'GET_TODO_DATA_ERROR'
          })

          return action.callback(error, null);
        }
      )
      break
    case 'GET_TODO_DATA':
      /*
      In case we receive an action to send an API request, send the appropriate request
      */
      Services.getMethod(action.endPoint,
        async data => {
          await action.callback(null, data);
          return next({
            type: 'GET_TODO_DATA_RECEIVED'
          })
        },
        async error => {
          await Alert.alert(
            'NETWORK ERROR',
            'Network request failed. Please recheck connection!',
            [
              {
                text: 'Cancel', onPress: () => {
                  if (action.comfirm) {
                    action.comfirm(true)
                  }
                }
              }
            ]
          )
          await next({
            type: 'GET_TODO_DATA_ERROR'
          })
          return action.callback(error, null);
        }
      )
      break
    /*
    Do nothing if the action does not interest us
    */
    default:
      break
  }

};

export default dataService