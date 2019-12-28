import axios from "axios";
import _ from "lodash";

import api from "./api";
import Config from "../config";
const url = Config.apiDomain;

const dataService = axios.create({
  baseURL: url,
  timeout: 10000
});

/**
 * Interceptor which includes access token to a request
 */
const accessTokenInterceptor = (config: any) => {
  const token = JSON.parse(localStorage.getItem("user") as string);

  if (token !== null) {
    // TEMP: Uncomment while the auth is fully functional
    // config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * Interceptor refreshing access token
 */
const refreshTokenInterceptor = (error: any) => {
  const {
    config,
    response: { status }
  } = error;
  const origRequest = config;

  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      api.users.refreshAccessToken().then((newToken: any) => {
        isRefreshing = false;
        onRrefreshed(newToken);
      });
    }

    const retryOrigReq = new Promise((resolve, reject) => {
      subscribeTokenRefresh((token: any) => {
        // replace the expired token and retry
        origRequest.headers["Authorization"] = "Bearer " + token;
        resolve(axios(origRequest));
      });
    });
    return retryOrigReq;
  } else {
    return Promise.reject(error);
  }
};

let isRefreshing = false;
let refreshSubscribers: Function[] = [];

const subscribeTokenRefresh = (callback: Function) => {
  refreshSubscribers.push(callback);
};

const onRrefreshed = (token: string) => {
  refreshSubscribers.map(callback => callback(token));
};

dataService.interceptors.request.use(
  accessTokenInterceptor,
  refreshTokenInterceptor
);

export default dataService;
