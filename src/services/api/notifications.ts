import dataService from "../dataService";

const notificationService = {
  load
};

// REVIEW: Refactor based on API
function load(id: number): Promise<any> {
  return dataService.post("", { id }).then((notification: any) => notification);
}

export default notificationService;
