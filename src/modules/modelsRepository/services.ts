import dataService from "../../services/dataService";

const service = {
  load
};

// REVIEW: Refactor based on API
function load(): Promise<any> {
  return dataService.get("/models").then((models: any) => models.data.data);
}

export default service;
