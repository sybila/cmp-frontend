import axios from "axios";
import { normalize, schema, Schema } from "normalizr";
import { Action } from "redux";

import Config from "../config";

type Method = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Fetches API response using axios and normalizes the result
 * JSON according to provided schema
 */

export const requestApi = (
  endpoint: string,
  schema: Schema,
  method: Method,
  params?: Object
) => {
  const API_ROOT = Config.apiDomain;
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return axios({
    method: method,
    data: params,
    url: fullUrl
  })
    .then(response => normalize(response.data, schema))
    .catch(error => Promise.reject(error));
};

const loginSchema = new schema.Entity("login");

// Sechemas for API responses
export const Schemas = {
  LOGIN: loginSchema
};

// Action key that carries API call info interpredted by this Redux middleware
export const CALL_API = "Call API";

interface ApplicationAction extends Action {
  [CALL_API]: any;
}

/**
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 */

export default (): any => (next: Function) => (action: ApplicationAction) => {
  const callApi = action[CALL_API];
  if (typeof callApi === "undefined") {
    return next(action);
  }

  let { endpoint } = callApi;
  const { schema, types } = callApi;

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }
  if (!schema) {
    throw new Error("Specify one of exported Schemas.");
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected and array of three action types");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  const actionWith = (data: any) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  /**
   * TODO: Support of other request methods
   */
  const method = callApi.params ? "POST" : "GET";

  return requestApi(
    endpoint,
    schema,
    method,
    callApi.params ? callApi.params : undefined
  ).then(
    response =>
      next(
        actionWith({
          response,
          type: successType
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          error: error.message || "Error happened"
        })
      )
  );
};
