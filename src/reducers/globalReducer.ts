import { combineReducers, AnyAction } from "redux";
import _ from "lodash";
import loginReducer from "./loginReducer";

// Updates an entity cache in response to any action with response.entities.
const entities = (state = {}, action: AnyAction) => {
  console.log(action);
  if (action.response && action.response.entities) {
    return _.merge({}, state, action.response.entities);
  }

  return state;
};

/**
 * Main application state fingerprint
 */
const globalReducer = combineReducers({
  login: loginReducer,
  entities
});

export type AppState = ReturnType<typeof globalReducer>;

export default globalReducer;
