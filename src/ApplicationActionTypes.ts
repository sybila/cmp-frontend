import { typeGenerator } from "utils/reduxGenerators";

const APP_NAMESPACE = "app";
const LOADER_NAMESPACE = "loader";

export const ActionTypes = {
  LOGIN: typeGenerator(APP_NAMESPACE, "LOGIN"),
  SET_USER: typeGenerator(APP_NAMESPACE, "SET_USER"),
  LOGOUT: typeGenerator(APP_NAMESPACE, "LOGOUT"),
  TOKEN_LOGIN: typeGenerator(APP_NAMESPACE, "TOKEN_LOGIN"),

  SHOW_LOADER: typeGenerator(LOADER_NAMESPACE, "SHOW_LOADER"),
  HIDE_LOADER: typeGenerator(LOADER_NAMESPACE, "HIDE_LOADER"),
  LOADER_NAME: typeGenerator(LOADER_NAMESPACE, "LOADER_NAME"),
};
