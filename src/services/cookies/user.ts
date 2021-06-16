import Cookies from "js-cookie";

const AUTH_TOKEN = "authToken";
const REFRESH_TOKEN = "refreshToken";

const setAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN, token);
};

const setRefreshToken = (refrToken: string) => {
  Cookies.set(REFRESH_TOKEN, refrToken);
};

const getRefreshToken = () => Cookies.get(REFRESH_TOKEN);
const getAuthToken = () => Cookies.get(AUTH_TOKEN);

const deleteRefreshToken = () => {
  Cookies.remove(REFRESH_TOKEN);
};

const deleteAuthToken = () => {
  Cookies.remove(AUTH_TOKEN);
};

export default {
  setAuthToken,
  setRefreshToken,
  getAuthToken,
  getRefreshToken,
  deleteAuthToken,
  deleteRefreshToken,
};
