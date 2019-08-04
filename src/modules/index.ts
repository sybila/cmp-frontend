import { Dispatch, Reducer } from "redux";

import * as ModelsModule from "./modelsRepository/module";

/**
 * Loose interface for application modules.
 */
interface Module {
  Reducer?: Reducer<any>;
  SetPermissions?: (
    dispatch: Dispatch<any>,
    getState,
    permissionLevel: number
  ) => any;
  ModuleActions?: (dispatch: Dispatch<any>, getState) => any;
  [key: string]: any;
}

export const RegisteredModules = {
  models: ModelsModule
};

export const RegisteredReducers = {
  module_models: ModelsModule.Reducer
};
