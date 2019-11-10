import { combineReducers } from "redux";
import AuthenticationReducer from "./AuthenticationReducer";
import LoaderReducer from "./LoaderReducer";
import * as Modules from "../modules";

/**
 * Main application state fingerprint
 */
const GlobalReducer = combineReducers({
  authentication: AuthenticationReducer,
  loader: LoaderReducer,
  ...Modules.RegisteredReducers
});

export type AppState = ReturnType<typeof GlobalReducer>;

export default GlobalReducer;
