import axios from "axios";

import api from "./api";
import Config from "../config";
import { userCookies } from "./cookies";
import ApplicationStore from "../ApplicationStore";
import { logout, setTokens } from "ApplicationActions";

const dataService = axios.create({
  baseURL: Config.apiDomain,
  timeout: 10000,
  headers: { "Access-Control-Allow-Origin": "*" },
});

const apiService = axios.create({
  baseURL: Config.serviceApiDomain,
  timeout: 10000,
  headers: { "Access-Control-Allow-Origin": "*" },
});

/**
 * Interceptor which includes access token to a request
 */
const accessTokenInterceptor = (config: any) => {
  const token = userCookies.getAuthToken() as string;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * Interceptor refreshing access token
 */
const refreshTokenInterceptor = (error: any) => {
  const { config, response } = error;
  const origRequest = config;

  if (response) {
    const { data } = response;
    if (data.code === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        api.users.refreshAccessToken().then(
          (data) => {
            const { dispatch } = ApplicationStore;
            const { access_token } = data;
            isRefreshing = false;
            dispatch(setTokens(data) as any);
            onRrefreshed(access_token);
          },
          (error: any) => {
            const { dispatch } = ApplicationStore;
            dispatch(logout());
          }
        );
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
  refreshSubscribers.map((callback) => callback(token));
};

dataService.interceptors.request.use(accessTokenInterceptor);
dataService.interceptors.response.use(null, refreshTokenInterceptor);

apiService.interceptors.request.use(accessTokenInterceptor);
apiService.interceptors.response.use(null, refreshTokenInterceptor);

// START DEBUG STUFF - attach services to window object for debug purposes
(window as any).dataService = dataService;
(window as any).apiService = apiService;

const log = (payload: any) => {
  console.dir(payload);
  return payload;
};

const STORAGE_KEY_LOG_RESPONSES = "logServicesResponsesToConsole";

(window as any).logServicesResponsesToConsole = () => {
  window.sessionStorage.setItem(STORAGE_KEY_LOG_RESPONSES, "true");

  apiService.interceptors.response.use(log, log);
  dataService.interceptors.response.use(log, log);
};

if (window.sessionStorage.getItem(STORAGE_KEY_LOG_RESPONSES))
  (window as any).logServicesResponsesToConsole();
// END DEBUG STUFF

export { dataService as default, apiService };
