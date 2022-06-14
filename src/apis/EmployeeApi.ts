import React from "react";
import { EmployeeModel } from "../models/EmployeeModel";
import http from "./http-common";

// const EmployeeApi = (url = "https://localhost:44336/api/Employee") => {
//   return {
//     fetchAll: () => {
//       axios.get(url);
//     },

//     create: (newRecord) => {
//       axios.post(url, newRecord);
//     },

//     update: (id, updatedRecord) => {
//       axios.put(url + id, updatedRecord);
//     },

//     delete: (id) => {
//       axios.delete(url + id);
//     },
//   };
// };

export const getAll = () => {
  return http.get("/Employee");
};
export const get = (id : number) => {
  return http.get(`/Employee/${id}`);
};
export const create = (data : EmployeeModel) => {
  return http.post("/Employee", data);
};
export const update = (id: number, data: EmployeeModel) => {
  return http.put(`/Employee/${id}`, data);
};
export const remove = (id : number) => {
  return http.delete(`/Employee/${id}`);
};

export const EmployeeApi = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default EmployeeApi;
