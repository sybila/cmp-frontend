import dataService from "services/dataService";
const service = {
  fetchExperiments,
  fetchExperiment,
  fetchExperimentNotes,
  fetchExperimentVars,
  fetchExperimentVariable
};

function fetchExperiments(): Promise<any> {
  return dataService
    .get("/experiments")
    .then((experiments: any) => experiments.data.data);
}

function fetchExperiment(id: number): Promise<any> {
  return dataService
    .get(`/experiments/${id}`)
    .then((experiment: any) => experiment.data.data[0]);
}

function fetchExperimentNotes(id: number): Promise<any> {
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
    .then((variable: any) => variable.data.data[0]);
}

export default service;
