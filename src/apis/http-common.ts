import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const initAxios = axios.create({
  baseURL: "https://localhost:44352/api",
  headers: {
    "Content-type": "application/json",
  },
})

initAxios.interceptors.request.use(
  (config: any) => {

    return config;
  }
)

initAxios.interceptors.response.use(
  (res: AxiosResponse) => {

    console.log("responsed");
    if (res.status === 404) {
      alert("User response doesn't have permission!");
    }
    return res;
  },
  (err) => {
    if (err.request.status === 401) {
      alert("User request doesn't have permission!");
    }
  }
)

export default initAxios;
