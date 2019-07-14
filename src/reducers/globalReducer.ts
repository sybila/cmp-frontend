import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

/**
 * Main application state fingerprint
 */
const globalReducer = combineReducers({
  login: loginReducer
});

export type AppState = ReturnType<typeof globalReducer>;

export default globalReducer;
