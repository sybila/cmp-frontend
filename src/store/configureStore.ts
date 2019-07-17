import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import globalReducer from "../reducers/globalReducer";
import { showLoader, hideLoader } from "../actions/loaderActions";

/**
 * Custom loader middleware, displays spinner for actionst widt:
 * '_REQUEST' ending, hides on '_SUCCESS' or '_FAILURE'
 */
// TODO: display after 200ms to prevent flicking
const loaderMiddleware = (store: any) => (next: any) => (action: any) => {
  const { show, actionName } = store.getState().loader;
  if (show) {
    const name = action.type.split(actionName);
    console.log(name);
    !name[0] && store.dispatch(hideLoader());
  }

  const request = "_REQUEST";
  if (action.type.indexOf(request) !== -1) {
    const name = action.type.split(request);
    !name[1] && store.dispatch(showLoader(name[0]));
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
