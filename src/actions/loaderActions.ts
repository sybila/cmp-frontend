import { ActionTypes as LoaderActionTypes } from "../reducers/loaderReducer";

const { SHOW_LOADER, HIDE_LOADER } = LoaderActionTypes;

export const showLoader = (action: String) => ({
  type: SHOW_LOADER,
  action
});

export const hideLoader = () => ({
  type: HIDE_LOADER
});
