import { combineReducers } from "redux";
import _ from "lodash";
import authenticationReducer from "./authenticationReducer";

/**
 * Main application state fingerprint
 */
const globalReducer = combineReducers({
  user: authenticationReducer
});

export type AppState = ReturnType<typeof globalReducer>;

export default globalReducer;
