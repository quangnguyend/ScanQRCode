import { NavigationActions } from 'react-navigation';

import vendorStack from '../scenes/Vendor/stackVendorNav';

function nav(state, action) {
  let nextState;
  switch (action.type) {
    case 'VendorNavigate':
      console.log(action)    
      nextState = vendorStack.router.getStateForAction(
        NavigationActions.navigate({
          routeName: action.routeName,
          params: action.params
        })
      );
      break;
    case 'VendorReset':
      nextState = vendorStack.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Overview' })
          ]
        }),
        state
      );
      break;
    default:
      nextState = vendorStack.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}



export default nav;