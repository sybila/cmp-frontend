import { AppState } from "reducers/GlobalReducer";

export const getUser = (state: AppState) => state.authentication.user;
export const getAuthToken = (state: AppState) => state.authentication.authToken;
export const getRefreshToken = (state: AppState) => state.authentication.refreshToken;
export const getAuthError = (state: AppState) => state.authentication.error;
