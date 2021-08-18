import dataService from "../dataService";

// TODO: Add group models
const getAllGroups = () => {
  return dataService.get(`/userGroups`);
};

export default {
  getAllGroups,
};
