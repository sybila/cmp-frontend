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
        text: "BioQuantities homepage",
        icon: "home",
        to: "/",
      },
    ])
  );
};
