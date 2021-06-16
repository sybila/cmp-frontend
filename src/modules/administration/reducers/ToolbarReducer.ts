import { Action } from "redux";

import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

export const actionsPrefix = "toolbar";

export interface ToolbarItem {
  text: string;
  icon: string;
  to: string;
  permission?: number;
}

export interface ToolbarAction extends Action {
  id: string;
  items: ToolbarItem[];
}

interface ToolbarState {
  [key: string]: {
    id: string;
    items: ToolbarItem[];
  };
}

export const ActionTypes = {
  MERGE_TOOLBAR_ITEMS: typeGenerator(actionsPrefix, "MERGE_TOOLBAR_ITEMS"),
};

const initialState: ToolbarState = {};

const actionHandler = {
  [`${ActionTypes.MERGE_TOOLBAR_ITEMS}`]: (
    state: ToolbarState,
    action: ToolbarAction
  ) => ({
    ...state,
    [`${action.id}`]: {
      id: action.id,
      items: action.items,
    },
  }),
};

const ToolbarReducer = reducerGenerator(
  actionsPrefix,
  actionHandler,
  initialState
);

export default ToolbarReducer;
