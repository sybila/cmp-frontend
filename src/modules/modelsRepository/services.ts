import dataService from "services/dataService";

const service = {
  load,
  loadModel
};

// REVIEW: Refactor based on API
function load(): Promise<any> {
  return dataService.get("/models").then((models: any) => models.data.data);
}

function loadModel(id: number): Promise<any> {
  return dataService.get(`/models/${id}`).then((model: any) => model.data.data);
}

export default service;
