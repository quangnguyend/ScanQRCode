import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  "vendor",
  state => state.navVendor,
);
const addListener = createReduxBoundAddListener("vendor");

export {
  middleware,
  addListener,
};
