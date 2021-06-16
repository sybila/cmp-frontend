import { combineReducers, Dispatch } from "redux";

import NotificationReducer from "./reducers/NotificationsReducer";
import ToolbarReducer from "./reducers/ToolbarReducer";

export const Reducer = combineReducers({
  notifications: NotificationReducer,
  toolbar: ToolbarReducer
});

export const AfterStoreConfiguration = (
  dispatch: Dispatch<any>,
  getState
) => {};
