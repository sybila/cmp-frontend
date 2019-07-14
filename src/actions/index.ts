import { CALL_API, Schemas } from "../middleware/api";

import { ActionTypes as LoginActionTypes } from "../reducers/loginReducer";

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } = LoginActionTypes;
export const authentication = () => ({
  [CALL_API]: {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    endpoint: `/authorize`,
    params: {
      grant_type: "client_credentials",
      client_id: "",
      client_secret: ""
    },
    schema: Schemas.LOGIN
  }
});
