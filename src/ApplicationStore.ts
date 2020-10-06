import thunkMiddleware from "redux-thunk";
import promise, { ActionType } from "redux-promise-middleware";
import { createStore, applyMiddleware, compose } from "redux";
import _ from "lodash";

import GlobalReducer from "reducers/GlobalReducer";
import { showLoader, hideLoader, addRequest } from "ApplicationActions";
import {
  registerObservers,
  constructInitialStore,
} from "./services/storageCache";
import * as Modules from "./modules";

/**
 * Custom loader middleware, displays spinner (after 200ms) for actions width:
 * '_PENDING' ending, hides on '_FULFILLED' or '_REJECTED' (from promise middleware)
 */

// REVIEW: Review the implementation, I think it may cause issues in the future, also a lot of REDUX calls

const loaderMiddleware = (store: any) => (next: any) => (action: any) => {
  const { show } = store.getState().loader;
  const pending = `_${ActionType.Pending}`;
  const fulfiled = `_${ActionType.Fulfilled}`;

  if (action.type.indexOf(fulfiled) !== -1) {
    const name = action.type.split(fulfiled);
    store.dispatch(hideLoader(name[0]));
  }

  if (action.type.indexOf(pending) !== -1) {
    const name = action.type.split(pending);
    store.dispatch(addRequest(name[0]));
    _.delay(
      () =>
        store.getState().loader.pending[`${name[0]}`] &&
        store.dispatch(showLoader()),
      200
    );
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

constructInitialStore(ApplicationStore);
registerObservers(ApplicationStore);

export default ApplicationStore;
