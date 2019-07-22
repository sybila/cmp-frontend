import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import _ from "lodash";

import globalReducer from "./reducers/globalReducer";
import {
  showLoader,
  hideLoader,
  loaderActionName
} from "./actions/loaderActions";

/**
 * Custom loader middleware, displays spinner (after 200ms) for actions width:
 * '_REQUEST' ending, hides on '_SUCCESS' or '_FAILURE'
 */
const loaderMiddleware = (store: any) => (next: any) => (action: any) => {
  const { show, actionName } = store.getState().loader;
  if (show || actionName) {
    const name = action.type.split(actionName);
    !name[0] && store.dispatch(hideLoader());
  }

  const request = "_REQUEST";
  if (action.type.indexOf(request) !== -1) {
    const name = action.type.split(request);
    if (!name[1]) {
      store.dispatch(loaderActionName(name[0]));
      _.delay(
        () =>
          store.getState().loader.actionName && store.dispatch(showLoader()),
        200
      );
    }
  }

  return next(action);
};

export default function configureStore(preloadedState = undefined) {
  return createStore(
    globalReducer,
    preloadedState,
    compose(
      applyMiddleware(thunkMiddleware, loaderMiddleware),
      (window as any).devToolsExtension
        ? (window as any).devToolsExtension()
        : (f: any) => f
    )
  );
}
