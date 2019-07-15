import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import globalReducer from "../reducers/globalReducer";

export default function configureStore(preloadedState = undefined) {
  return createStore(
    globalReducer,
    preloadedState,
    compose(
      applyMiddleware(thunkMiddleware),
      (window as any).devToolsExtension
        ? (window as any).devToolsExtension()
        : (f: any) => f
    )
  );
}
