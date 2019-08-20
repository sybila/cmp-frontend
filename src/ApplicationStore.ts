import thunkMiddleware from "redux-thunk";
import promise, { ActionType } from "redux-promise-middleware";
import { createStore, applyMiddleware, compose } from "redux";
import _ from "lodash";

import GlobalReducer from "reducers/GlobalReducer";
import { showLoader, hideLoader, loaderActionName } from "ApplicationActions";
import * as Modules from "./modules";

/**
 * Custom loader middleware, displays spinner (after 200ms) for actions width:
 * '_PENDING' ending, hides on '_FULFILLED' or '_REJECTED' (from promise middleware)
 */
const loaderMiddleware = (store: any) => (next: any) => (action: any) => {
  const { show, actionName } = store.getState().loader;
  if (show || actionName) {
    const name = action.type.split(actionName);
    !name[0] && store.dispatch(hideLoader());
  }

  const request = `_${ActionType.Pending}`;
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

export function configureStore(preloadedState = undefined) {
  return createStore(
    GlobalReducer,
    preloadedState,
    compose(
      applyMiddleware(thunkMiddleware, loaderMiddleware, promise),
      (window as any).devToolsExtension
        ? (window as any).devToolsExtension()
        : (f: any) => f
    )
  );
}

const ApplicationStore = configureStore();
Modules.AfterStoreConfiguration(
  ApplicationStore.dispatch,
  ApplicationStore.getState
);

export default ApplicationStore;
