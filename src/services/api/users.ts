import dataService from "../dataService";
import { userCookies } from "../cookies";
import { LoginResponse } from "models/User";
import { AxiosResponse, AxiosPromise } from "axios";

const userService = {
  login,
  refreshAccessToken,
  logout,
  attemptLoginWithToken,
};

// TODO: Error handling
function login(
  username: string,
  password: string
): AxiosPromise<LoginResponse> {
  return dataService
    .post("/authorize", {
      client_id: "frontend",
      grant_type: "password",
      username,
      password,
    })
    .then((user: AxiosResponse<LoginResponse>) => {
      if (user.data.access_token) {
        userCookies.setAuthToken(JSON.stringify(user.data.access_token));
      }

      return user;
    });
}

// TODO: Refresh access token refactor when endpoint is known
function refreshAccessToken(): Promise<any> {
  return dataService.post("/refreshToken").then((data: any) => {
    if (data.token) {
      userCookies.setAuthToken(JSON.stringify(data.token));
    }
    return data;
  });
}

function logout() {
  userCookies.deleteAuthToken();
  userCookies.deleteRefreshToken();
}

export default userService;

// TODO: Refactor token login
function attemptLoginWithToken(token: string) {
  return dataService.post("");
}
