import dataService from "../dataService";

// TODO: Add group models

const getAllGroups = () => {
  return dataService.get(`/userGroups`);
};

const addGroup = (payload: any) => {
  return dataService.post(`/userGroups`, payload);
};

export default {
  getAllGroups,
  addGroup,
};
