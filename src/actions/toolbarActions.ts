import {
  ActionTypes as MainActionTypes,
  ToolbarItem
} from "../reducers/toolbarReducer";

// REVIEW: Too short for separate file :(

export const addToolbarItems = (id: string, items: ToolbarItem[]) => ({
  type: MainActionTypes.MERGE_TOOLBAR_ITEMS,
  id,
  items
});
