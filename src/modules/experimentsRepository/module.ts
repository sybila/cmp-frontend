import { combineReducers, Dispatch } from "redux";

import MainReducer, { moduleNames } from "./reducers/MainReducer";
import NotesReducer from "./reducers/NotesReducer";
import VarsReducer from "./reducers/VarsReducer";
import { addToolbarItems } from "../administration/actions";
import config from "config";

export const Reducer = combineReducers({
  experiments: MainReducer,
  notes: NotesReducer,
  variables: VarsReducer,
});

export const AfterStoreConfiguration = (dispatch: Dispatch<any>, getState) => {
  dispatch(
    // TODO: Refactor
    /* Init module toolbar */
    addToolbarItems(moduleNames.url, [
      {
        text: "Experiments repository",
        icon: "book",
        to: "/repository",
      },
      {
        text: "Experiments dashboard",
        icon: "th-large",
        to: "/dashboard",
      },
      {
        text: "Experiments info",
        icon: "info-circle",
        to: "/info",
      },
      {
        text: "Add new experiment",
        icon: "plus",
        to: "/new",
        permission: config.permissions.REGISTERED,
      },
    ])
  );
};
