import { UserModel } from "models/User";
import { AppState } from "reducers/GlobalReducer";

// export const hasPermission = (state: AppState, permissionLevel: number) => {
//   const user: UserModel = getUser(state);
//   return user.type.tier <= permissionLevel;
// };

export const getUser = (state: AppState): UserModel =>
  state.authentication.user;
export const getAuthToken = (state: AppState) => state.authentication.authToken;
export const getRefreshToken = (state: AppState) =>
  state.authentication.refreshToken;
export const getAuthError = (state: AppState) => state.authentication.error;
