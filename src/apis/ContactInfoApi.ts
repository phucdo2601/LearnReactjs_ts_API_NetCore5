import http from "./http-common";
import { ContactModel } from '../models/ContactModel';

const getAll = () => {
  return http.get("/Contacts");
};
const get = (id : number) => {
  return http.get(`/Contacts/${id}`);
};
const create = (data : ContactModel) => {
  return http.post("/Contacts", data);
};
const update = (id : number, data : ContactModel) => {
  return http.put(`/Contacts/${id}`, data);
};
const remove = (id : number) => {
  return http.delete(`/Contacts/${id}`);
};
const removeAll = () => {
  return http.delete(`/Contacts`);
};
const findByTitle = (firstName: string) => {
  return http.get(`/Contacts/findLike?firstName=${firstName}`);
};
const ContactInfoApi = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
export default ContactInfoApi;