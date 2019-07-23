import { AppState } from "../reducers/globalReducer";

export const getUser = (state: AppState) => state.authentication.user;
export const getError = (state: AppState) => state.authentication.error;
