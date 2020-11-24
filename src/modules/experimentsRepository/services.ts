import dataService from "services/dataService";

const service = {
  fetchExperiments,
  fetchExperiment,
  fetchExperimentNotes,
  fetchExperimentVars,
  fetchExperimentVariable,
  fetchExperimentVariableDetailed,
  fetchExperimentVisualizerData,
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
  // TEMP: Do globall dataservice for service api

  return dataService
    .get(`https://service.e-cyanobacterium.org/visualizer/0/${id}`)
    .then(({ data }) => {
      return data;
    });
}

export default service;
