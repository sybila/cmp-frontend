import { combineReducers } from "redux";
import _ from "lodash";
import authenticationReducer from "./authenticationReducer";
import loaderReducer from "./loaderReducer";
import notificationsReducer from "./notificationsReducer";

/**
 * Main application state fingerprint
 */
const globalReducer = combineReducers({
  authentication: authenticationReducer,
  loader: loaderReducer,
  notifications: notificationsReducer
});

export type AppState = ReturnType<typeof globalReducer>;

export default globalReducer;
