import dataService from "./dataService";

const userService = {
  login,
  refreshAccessToken,
  logout,
  attemptLoginWithToken
};

// TODO: Error handling
function login(username: String, password: String): Promise<any> {
  return dataService
    .post("/authorize", { grant_type: "password", username, password })
    .then((user: any) => {
      if (user.token) {
        localStorage.setItem("user", JSON.stringify(user.token));
      }

      return user;
    });
}

// TODO: Refresh access token refactor when endpoint is known
function refreshAccessToken(): Promise<any> {
  return dataService.post("/refreshToken").then((data: any) => {
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data.token));
    }
    return data;
  });
}

function logout() {
  localStorage.removeItem("user");
}

export default userService;

// TODO: Refactor token login
function attemptLoginWithToken(token: String) {
  return dataService.post("");
}
