import { combineReducers, Dispatch } from "redux";

import MainReducer, { moduleNames } from "./reducers/MainReducer";
import { addToolbarItems } from "../administration/actions";

export const Reducer = combineReducers({
  bioQuantities: MainReducer,
});

export const AfterStoreConfiguration = (dispatch: Dispatch<any>, getState) => {
  dispatch(
    // TODO: Refactor
    /* Init module toolbar */
    addToolbarItems(moduleNames.url, [
      {
        text: "EpiQuantities list",
        icon: "list",
        to: "/list",
      },
      {
        text: "EpiQuantities dashboard",
        icon: "th-large",
        to: "/dashboard",
      },
      {
        text: "EpiQuantities info",
        icon: "info-circle",
        to: "/info",
      },
    ])
  );
};
