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
  AfterStoreConfiguration?: (dispatch: Dispatch<any>, getState) => any;
  [key: string]: any;
}

export const RegisteredModules = {
  models: ModelsModule
};

export const RegisteredReducers = {
  module_models: ModelsModule.Reducer
};

/**
 * Called after store configuration, used for init
 */
export const AfterStoreConfiguration = (dispatch: Dispatch<any>, getState) => {
  Each(Module => {
    if (Module.AfterStoreConfiguration)
      Module.AfterStoreConfiguration(dispatch, getState);
  });
};

/**
 * Calls specified function for each module.
 */
export const Each = (Callback: (Module: Module, Name?: string) => void) => {
  Object.keys(RegisteredModules).forEach(module => {
    Callback(RegisteredModules[module], module);
  });
};
