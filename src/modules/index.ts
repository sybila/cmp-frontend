import { Dispatch, Reducer } from "redux";

import * as ModelsModule from "./modelsRepository/module";
import * as ExperimentsModule from "./experimentsRepository/module";
import * as AdministationModule from "./administration/module";
import * as BioQuantitiesModule from "./bioQuantities/module";

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
  models: ModelsModule,
  experiments: ExperimentsModule,
  administration: AdministationModule,
  bioQuantities: BioQuantitiesModule,
};

export const RegisteredReducers = {
  module_models: ModelsModule.Reducer,
  module_administration: AdministationModule.Reducer,
  module_experiments: ExperimentsModule.Reducer,
  module_bio_quantities: BioQuantitiesModule.Reducer,
};

/**
 * Called after store configuration, used for init
 */
export const AfterStoreConfiguration = (dispatch: Dispatch<any>, getState) => {
  Each((Module) => {
    if (Module.AfterStoreConfiguration)
      Module.AfterStoreConfiguration(dispatch, getState);
  });
};

/**
 * Calls specified function for each module.
 */
export const Each = (Callback: (Module: Module, Name?: string) => void) => {
  Object.keys(RegisteredModules).forEach((module) => {
    Callback(RegisteredModules[module], module);
  });
};
