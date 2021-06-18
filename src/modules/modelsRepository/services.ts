import { AxiosPromise } from "axios";
import {
  AnalysisPrescription,
  AnalysisTypesEnumeration,
  AnalysisResult,
} from "models/Analysis";
import { ApiResponse } from "models/GenericTypes";
import {
  Dataset,
  EventDetail,
  EventPartial,
  ModelCompartment,
  ModelCompartmentExtended,
  Parameter,
  ParameterDetail,
  Reaction,
  ReactionItem,
  ReactionItemExtended,
  ReactionPartial,
  Species,
} from "models/Model";
import dataService, { apiService } from "services/dataService";

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
  loadEvents,
  loadEventDetail,
  loadParameters,
  loadParameterDetail,
  loadAnalysisOptions,
  loadAnalysisPrescription,
  executeAnalysis,
  importModel,
};

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

function loadDatasets(modelId: number): AxiosPromise<ApiResponse<Dataset[]>> {
  return dataService.get(`/models/${modelId}/datasets`);
}

function loadDatasetDetail(
  modelId: number,
  datasetId: number
): AxiosPromise<ApiResponse<Dataset>> {
  return dataService.get(`/models/${modelId}/datasets/${datasetId}`);
}

function loadEvents(
  modelId: number
): AxiosPromise<ApiResponse<EventPartial[]>> {
  return dataService.get(`/models/${modelId}/events`);
}

function loadEventDetail(
  modelId: number,
  eventId: number
): AxiosPromise<ApiResponse<EventDetail>> {
  return dataService.get(`/models/${modelId}/events/${eventId}`);
}

function loadParameters(
  modelId: number
): AxiosPromise<ApiResponse<Parameter[]>> {
  return dataService.get(`/models/${modelId}/parameters`);
}

function loadParameterDetail(
  modelId: number,
  parameterId: number
): AxiosPromise<ApiResponse<ParameterDetail>> {
  return dataService.get(`/models/${modelId}/parameters/${parameterId}`);
}

function loadAnalysisOptions(): AxiosPromise<
  ApiResponse<AnalysisTypesEnumeration>
> {
  return apiService.get(`/models/copasi/analysis`);
}

function loadAnalysisPrescription(
  analysis: string
): AxiosPromise<ApiResponse<AnalysisPrescription>> {
  return apiService.get(`/models/copasi/analysisPrescription/${analysis}`);
}

// TODO: Add type for simulation result
function executeAnalysis(
  analysis: string,
  inputs: Array<Record<string, unknown>>
): AxiosPromise<ApiResponse<AnalysisResult>> {
  return apiService.post(`/models/copasi/runAnalysis/${analysis}`, { inputs });
}

function importModel(xml: string | ArrayBuffer) {
  return apiService.post(`/models/import/sbml`, xml);
}

export default service;
