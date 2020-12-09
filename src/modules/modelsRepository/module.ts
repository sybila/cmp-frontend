import { combineReducers, Dispatch } from "redux";

import MainReducer, { moduleNames } from "./reducers/MainReducer";
import { addToolbarItems } from "../administration/actions";
import config from "config";

export const Reducer = combineReducers({
  models: MainReducer,
});

export const AfterStoreConfiguration = (dispatch: Dispatch<any>, getState) => {
  dispatch(
    // TODO: Refactor

    /* Init module toolbar */
    addToolbarItems(moduleNames.url, [
      {
        text: "Models repository",
        icon: "book",
        to: "/repository",
      },
      {
        text: "Models dashboard",
        icon: "th-large",
        to: "/dashboard",
      },
      {
        text: "Models info",
        icon: "info-circle",
        to: "/info",
      },
      {
        text: "Add new model",
        icon: "plus",
        to: "/new",
        permission: config.permissions.REGISTERED,
      },
    ])
  );
};
