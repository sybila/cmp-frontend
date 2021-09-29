import { AxiosPromise } from "axios";
import { ApiResponse } from "models/GenericTypes";
import { GroupPostPayload } from "models/Groups";
import dataService from "../dataService";

const getAllGroups = () => {
  return dataService.get(`/userGroups`);
};

const addGroup = ({
  type = 1,
  ...rest
}: GroupPostPayload): AxiosPromise<ApiResponse<void>> => {
  return dataService.post(`/userGroups`, { type: type.toString(), ...rest });
};

const deleteGroup = (id: number): AxiosPromise<ApiResponse<void>> => {
  return dataService.delete(`/userGroups/${id}`);
};

export default {
  getAllGroups,
  addGroup,
  deleteGroup,
};
