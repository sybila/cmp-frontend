import dataService from "../dataService";
import { userCookies } from "../cookies";

const userService = {
  login,
  refreshAccessToken,
  logout,
  attemptLoginWithToken
};

// TODO: Error handling
function login(username: string, password: string): Promise<any> {
  return dataService
    .post("/authorize", { grant_type: "password", username, password })
    .then((user: any) => {
      if (user.token) {
        userCookies.setAuthToken(JSON.stringify(user.token));
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
