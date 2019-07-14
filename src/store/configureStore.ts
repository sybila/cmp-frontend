import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import api from "../middleware/api";

import globalReducer from "../reducers/globalReducer";

export default function configureStore(preloadedState = undefined) {
  return createStore(
    globalReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, api)
  );
}
