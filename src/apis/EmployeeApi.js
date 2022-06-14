import React from "react";
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
export const get = (id) => {
  return http.get(`/Employee/${id}`);
};
export const create = (data) => {
  return http.post("/Employee", data);
};
export const update = (id, data) => {
  return http.put(`/Employee/${id}`, data);
};
export const remove = (id) => {
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
