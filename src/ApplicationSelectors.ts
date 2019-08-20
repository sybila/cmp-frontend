import { AppState } from "reducers/GlobalReducer";

export const getUser = (state: AppState) => state.authentication.user;
export const getError = (state: AppState) => state.authentication.error;
