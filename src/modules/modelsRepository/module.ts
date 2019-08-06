import { combineReducers } from "redux";

import MainReducer from "./reducers/MainReducer";

export const Reducer = combineReducers({
  models: MainReducer
});
