import { ActionTypes as LoaderActionTypes } from "../reducers/loaderReducer";

const { SHOW_LOADER, HIDE_LOADER, LOADER_NAME } = LoaderActionTypes;

export const showLoader = () => ({
  type: SHOW_LOADER
});

export const loaderActionName = (action: string) => ({
  type: LOADER_NAME,
  action
});

export const hideLoader = () => ({
  type: HIDE_LOADER
});
