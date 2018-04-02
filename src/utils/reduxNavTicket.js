import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  "ticket",
  state => state.navTicket,
);
const addListener = createReduxBoundAddListener("ticket");

export {
  middleware,
  addListener,
};
