import { UserModel } from "models/User";
import { GlobalNoticeInterface } from "reducers/GlobalNoticeReducer";
import { AppState } from "reducers/GlobalReducer";

export const hasPermission = (state: AppState, permissionLevel: number) => {
  const user: UserModel = getUser(state);
  return user ? user.type.tier <= permissionLevel : false;
};

export const getUser = (state: AppState): UserModel =>
  state.authentication.user;
export const getAuthToken = (state: AppState) => state.authentication.authToken;
export const getRefreshToken = (state: AppState) =>
  state.authentication.refreshToken;
export const getAuthError = (state: AppState) => state.authentication.error;

export const getGlobalNotices = (state: AppState): GlobalNoticeInterface[] =>
  Object.keys(state.notices).map((id) => state.notices[id]);
