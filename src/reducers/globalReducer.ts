import { combineReducers } from "redux";
import _ from "lodash";
import authenticationReducer from './authenticationReducer';
import loaderReducer from './loaderReducer';
import notificationsReducer from './notificationsReducer';
import * as Modules from '../modules';

/**
 * Main application state fingerprint
 */
const globalReducer = combineReducers({
  authentication: authenticationReducer,
  loader: loaderReducer,
  notifications: notificationsReducer,
  ...Modules.RegisteredReducers
});

export type AppState = ReturnType<typeof globalReducer>;

export default globalReducer;
