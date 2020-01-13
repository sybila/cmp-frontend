import { combineReducers, Dispatch } from "redux";

import MainReducer, { moduleNames } from "./reducers/MainReducer";
import NotesReducer from "./reducers/NotesReducer";
import VarsReducer from "./reducers/VarsReducer";
import { addToolbarItems } from "../administration/actions";

export const Reducer = combineReducers({
  experiments: MainReducer,
  notes: NotesReducer,
  variables: VarsReducer
});

export const AfterStoreConfiguration = (dispatch: Dispatch<any>, getState) => {
  dispatch(
    // TODO: Refactor
    /* Init module toolbar */
    addToolbarItems(moduleNames.url, [
      {
        text: "Experiments homepage",
        icon: "home",
        to: "/"
      },
      {
        text: "Experiments repository",
        icon: "book",
        to: "/repository"
      },
      {
        text: "Add new experiment",
        icon: "plus",
        to: "/new"
      }
    ])
  );
};
