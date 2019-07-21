import { combineReducers } from "redux";
import _ from "lodash";
import authenticationReducer from "./authenticationReducer";
import loaderReducer from "./loaderReducer";

/**
 * Main application state fingerprint
 */
const globalReducer = combineReducers({
  authentication: authenticationReducer,
  loader: loaderReducer
});

export type AppState = ReturnType<typeof globalReducer>;

export default globalReducer;
