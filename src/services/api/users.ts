import dataService from "../dataService";
import { userCookies } from "../cookies";
import { LoginResponse } from "models/User";
import { AxiosResponse, AxiosPromise } from "axios";
import Config from "../../config";

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
      client_id: Config.authorization.clientName,
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
  const refreshToken = userCookies.getRefreshToken();
  return dataService
    .post("/authorize", {
      client_id: Config.authorization.clientName,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    })
    .then(({ data }: AxiosResponse<LoginResponse>) => {
      if (data.access_token) {
        const { access_token, refresh_token } = data;
        userCookies.setAuthToken(JSON.stringify(access_token));
        userCookies.setRefreshToken(JSON.stringify(refresh_token));
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
  return dataService.post("/user");
}
