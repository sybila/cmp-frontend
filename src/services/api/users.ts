import dataService from "../dataService";
import { userCookies } from "../cookies";
import { LoginResponse, RegisterPayload } from "models/User";
import { AxiosResponse, AxiosPromise } from "axios";
import Config from "../../config";

const userService = {
  login,
  refreshAccessToken,
  attemptLoginWithToken,
  register,
  confirmEmail,
  getCurrentUser,
};

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
        userCookies.setAuthToken(user.data.access_token);
      }

      return user;
    });
}

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
        userCookies.setAuthToken(access_token);
        userCookies.setRefreshToken(refresh_token);
      }
      return data;
    });
}

export default userService;

// TODO: Refactor token login
function attemptLoginWithToken(token: string) {
  return dataService.post("/user");
}

function register(values: RegisterPayload) {
  let parsed: any = { ...values };
  delete parsed.firstname;
  parsed.isPublic = values.isPublic ? 1 : 0;
  parsed.name = values.firstname;
  return dataService.post("/users", parsed);
}

function confirmEmail(email: string, id: string) {
  return dataService.get(`/users/${email}/${id}`);
}
function getCurrentUser() {
  return dataService.get("/user");
}
