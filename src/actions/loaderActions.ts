import { ActionTypes as LoaderActionTypes } from "../reducers/loaderReducer";

const { SHOW_LOADER, HIDE_LOADER } = LoaderActionTypes;

export const showLoader = () => ({
  type: SHOW_LOADER
});

export const hideLoader = () => ({
  type: HIDE_LOADER
});
