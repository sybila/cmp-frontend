import dataService from "services/dataService";
const service = {
    fetchExperiments,
    fetchExperiment
}

function fetchExperiments(): Promise<any> {
    return dataService.get("/experiments").then((experiments: any) => experiments.data.data);
}

function fetchExperiment(id: number): Promise<any> {
    return dataService.get(`/experiments/${id}`).then((experiment: any) => experiment.data.data[0]);
}

export default service;