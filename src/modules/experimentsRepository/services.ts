import dataService from "services/dataService";

const service = {
    fetchExperiments
}

function fetchExperiments(): Promise<any> {
    return dataService.get("/experiments").then((experiments: any) => experiments.data.data);
}

export default service;