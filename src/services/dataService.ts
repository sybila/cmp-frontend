import axios from "axios";

import Config from "../config";
const url = Config.apiDomain;

const dataService = axios.create({
  baseURL: url,
  timeout: 10000
});

/**
 * Interceptor which includes OAuth token in case it is stored in Local Storage
 */
dataService.interceptors.request.use(
  (config: any) => {
    const token = JSON.parse(localStorage.getItem("user") as string);

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

export default dataService;
