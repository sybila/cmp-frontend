import { AxiosPromise } from "axios";
import { ApiResponse } from "models/GenericTypes";
import {
  DatasetPartial,
  ModelCompartment,
  ModelCompartmentExtended,
  Reaction,
  ReactionItem,
  ReactionItemExtended,
  ReactionPartial,
  Species,
} from "models/Model";
import dataService from "services/dataService";

const service = {
  load,
  loadModel,
  loadCompartments,
  loadCompartmentDetail,
  loadSpecieDetail,
  loadReactions,
  loadReactionDetail,
  loadReactionItems,
  loadReactionItemDetail,
  loadDatasets,
  loadDatasetDetail,
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

function loadSpecieDetail(
  modelId: number | string,
  compartmentId: number | string,
  specieId: number | string
): AxiosPromise<ApiResponse<Species>> {
  return dataService.get(
    `/models/${modelId}/compartments/${compartmentId}/species/${specieId}`
  );
}

function loadReactions(
  modelId: number
): AxiosPromise<ApiResponse<ReactionPartial[]>> {
  return dataService.get(`/models/${modelId}/reactions`);
}

function loadReactionDetail(
  modelId: number,
  id: number
): AxiosPromise<ApiResponse<Reaction>> {
  return dataService.get(`/models/${modelId}/reactions/${id}`);
}

function loadReactionItems(
  modelId: number,
  id: number
): AxiosPromise<ApiResponse<ReactionItem[]>> {
  return dataService.get(`/models/${modelId}/reactions/${id}/reactionItems`);
}

function loadReactionItemDetail(
  modelId: number,
  reactionId: number,
  id: number
): AxiosPromise<ApiResponse<ReactionItemExtended>> {
  return dataService.get(
    `/models/${modelId}/reactions/${reactionId}/reactionItems/${id}`
  );
}

function loadDatasets(
  modelId: number
): AxiosPromise<ApiResponse<DatasetPartial[]>> {
  return dataService.get(`/models/${modelId}/datasets`);
}

function loadDatasetDetail(modelId: number, datasetId: number) {
  return dataService.get(`/models/${modelId}/${datasetId}`);
}

export default service;
