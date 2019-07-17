import axios from "axios";
import _ from "lodash";

import userService from "./userServices";
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
    config.headers.Authorization = `Bearer ${token}`;
  }

  // TODO: Remove api fetch simulation
  const delay = new Promise((resolve, reject) => {
    _.delay(() => {
      console.log("Delay intercept (api communication simulation)");
      resolve(true);
    }, 500);
  });

  return delay.then(() => config);
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
      userService.refreshAccessToken().then((newToken: any) => {
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

const onRrefreshed = (token: String) => {
  refreshSubscribers.map(callback => callback(token));
};

dataService.interceptors.request.use(
  accessTokenInterceptor,
  refreshTokenInterceptor
);

export default dataService;
