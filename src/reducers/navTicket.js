import { NavigationActions } from 'react-navigation';

import { TicketStack } from '../scenes/Ticket';

function nav(state, action) {
  let nextState;
  switch (action.type) {
    case 'TicketGoBack':
      nextState = TicketStack.router.getStateForAction(
        NavigationActions.back({ key: null })
      );
      break;
    case 'TicketNavigate':
      nextState = TicketStack.router.getStateForAction(
        NavigationActions.navigate({
          routeName: action.routeName,
          params: action.params
        })
      );
      break;
    case 'TicketReset':
      nextState = TicketStack.router.getStateForAction(
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
      nextState = TicketStack.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}



export default nav;