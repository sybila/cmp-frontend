import { combineReducers } from "redux";
import _ from "lodash";
import authenticationReducer from "./authenticationReducer";
import loaderReducer from "./loaderReducer";
import notificationsReducer from "./notificationsReducer";
import toolbarReducer from "./toolbarReducer";
import * as Modules from "../modules";

/**
 * Main application state fingerprint
 */
const globalReducer = combineReducers({
  authentication: authenticationReducer,
  loader: loaderReducer,
  notifications: notificationsReducer,
  toolbar: toolbarReducer,
  ...Modules.RegisteredReducers
});

export type AppState = ReturnType<typeof globalReducer>;

export default globalReducer;
