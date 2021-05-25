import { AxiosPromise } from "axios";
import { BioQuantity, BioQuantityDetail } from "models/BioQuantities";
import { ApiResponse } from "models/GenericTypes";
import dataService from "services/dataService";

export type sortType = { [key: string]: "asc" | "desc" };
export type searchType = { [key: string]: string | number };

const fetchAllBioNumbers = (
  page: number,
  perPage: number,
  search: searchType = {},
  sort: sortType = {}
): AxiosPromise<ApiResponse<BioQuantity[]>> => {
  let params: object = { page, perPage };

  if (Object.keys(sort).length > 0) {
    Object.keys(sort).forEach((key) => {
      params[`sort[${key}]`] = sort[key];
    });
  }

  if (Object.keys(search).length > 0) {
    Object.keys(search).forEach((key) => {
      params[`filter[${key}]`] = search[key];
    });
  }

  return dataService.get(`/bioquantities`, { params });
};

const fetchBioNumber = (
  id: number
): AxiosPromise<ApiResponse<BioQuantityDetail>> => {
  return dataService.get(`/bioquantities/${id}`);
};

export default {
  fetchAllBioNumbers,
  fetchBioNumber,
};
