import dataService from "../../services/dataService";

const modelsService = {
  load
};

// REVIEW: Refactor based on API
function load(id: number): Promise<any> {
  return dataService.get("/models").then((models: any) => models);
}

export default modelsService;
