import axios from "axios";

import Config from "../config";
const url = Config.apiDomain;

/**
 * TODO: Create custom interceptors for authentication
 */

const dataService = axios.create({
  baseURL: url,
  timeout: 10000
});

export default dataService;
