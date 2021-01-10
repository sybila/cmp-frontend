import { AxiosPromise } from "axios";
import { ApiResponse } from "models/GenericTypes";
import { ModelCompartment, ModelCompartmentExtended } from "models/Model";
import dataService from "services/dataService";

const service = {
  load,
  loadModel,
  loadCompartments,
  loadCompartmentDetail,
};

// REVIEW: Refactor based on API
function load(): Promise<any> {
  return dataService.get("/models").then((models: any) => models.data.data);
}

function loadModel(id: number): Promise<any> {
  return dataService.get(`/models/${id}`).then((model: any) => model.data.data);
}

function loadCompartments(
  modelId: number
): AxiosPromise<ApiResponse<ModelCompartment[]>> {
  return dataService.get(`/models/${modelId}/compartments`);
}

function loadCompartmentDetail(
  modelId: number | string,
  compartmentId: number | string
): AxiosPromise<ApiResponse<ModelCompartmentExtended>> {
  return dataService.get(`/models/${modelId}/compartments/${compartmentId}`);
}

export default service;
