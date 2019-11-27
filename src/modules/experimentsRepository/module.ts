import { combineReducers, Dispatch } from "redux";

import MainReducer, { moduleNames } from "./reducers/MainReducer";
import { addToolbarItems } from "../administration/actions";

export const Reducer = combineReducers({
  models: MainReducer
});

export const AfterStoreConfiguration = (dispatch: Dispatch<any>, getState) => {
  console.log(true);
  dispatch(
    // TODO: Refactor
    /* Init module toolbar */
    addToolbarItems(moduleNames.url, [
      {
        text: "Experiments repository",
        icon: "globe",
        to: "/repository"
      },
    ])
  );
};
