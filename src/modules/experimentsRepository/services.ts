import dataService, { apiService } from "services/dataService";
import { AxiosPromise } from "axios";
import {
  AnalysisPrescription,
  AnalysisResult,
  AnalysisTypesEnumeration,
} from "models/Analysis";
import { ApiResponse } from "models/GenericTypes";
const service = {
  fetchExperiments,
  fetchExperiment,
  fetchExperimentNotes,
  fetchExperimentVars,
  fetchExperimentVariable,
  fetchExperimentVariableDetailed,
  fetchExperimentVisualizerData,
  fetchAnalysis,
  fetchAnalysePrescription,
  executeAnalysis
};

function fetchExperiments(): Promise<any> {
  return dataService
    .get("/experiments")
    .then((experiments: any) => experiments.data.data);
}

function fetchExperiment(id: number): Promise<any> {
  return dataService
    .get(`/experiments/${id}`)
    .then(({ data }: any) => data.data);
}

function fetchExperimentNotes(id: number | string): Promise<any> {
  return dataService
    .get(`/experiments/${id}/notes`)
    .then((notes: any) => notes.data.data);
}

function fetchExperimentVars(id: number): Promise<any> {
  return dataService
    .get(`/experiments/${id}/variables`)
    .then((vars: any) => vars.data.data);
}

function fetchExperimentVariable(
  id: number | string,
  varId: number | string
): Promise<any> {
  return dataService
    .get(`/experiments/${id}/variables/${varId}`)
    .then((variable: any) => variable.data.data);
}

function fetchExperimentVariableDetailed(id: number | string): Promise<any> {
  return dataService.get(`/experimentvalues/${id}`).then(({ data }) => {
    return data.data.variables;
  });
}

function fetchExperimentVisualizerData(id: number | string): Promise<any> {
  return apiService.get(`/visualizer/0/${id}`).then(({ data }) => {
    return data;
  });
}

function fetchAnalysis(): AxiosPromise<ApiResponse<AnalysisTypesEnumeration>> {
  return apiService.get(`/analysis`);
}

function fetchAnalysePrescription(name: string): AxiosPromise<ApiResponse<AnalysisPrescription>> {
  return apiService
    .get(`/analysisPrescription/${name}`);
}

function executeAnalysis(
  analysis: string,
  inputs: Array<Record<string, unknown>>
): AxiosPromise<ApiResponse<AnalysisResult>> {
  return apiService.post(`/runAnalysis/${analysis}`, { inputs });
}

export default service;
