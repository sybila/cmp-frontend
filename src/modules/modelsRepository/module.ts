import { combineReducers, Dispatch } from "redux";

import MainReducer, { moduleNames } from "./reducers/MainReducer";
import { addToolbarItems } from "../administration/actions";

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
        to: "/",
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
      },
    ])
  );
};
