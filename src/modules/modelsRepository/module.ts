import { combineReducers, Dispatch } from "redux";

import MainReducer, { modelNames } from "./reducers/MainReducer";
import { addToolbarItems } from "../administration/actions";

export const Reducer = combineReducers({
  models: MainReducer
});

export const AfterStoreConfiguration = (dispatch: Dispatch<any>, getState) => {
  dispatch(
    // TODO: Refactor

    /* Init module toolbar */
    addToolbarItems(modelNames.url, [
      {
        text: "Published models",
        icon: "globe",
        to: "/published-models"
      },
      {
        text: "Unpublished models",
        icon: "lock",
        to: "/unpublished-models"
      },
      {
        text: "Your models",
        icon: "user",
        to: "/your-models"
      },
      {
        text: "Group models",
        icon: "user-friends",
        to: "/group-models"
      }
    ])
  );
};
