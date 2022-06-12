import http from "./http-common";

const getAll = () => {
  return http.get("/Contacts");
};
const get = (id) => {
  return http.get(`/Contacts/${id}`);
};
const create = (data) => {
  return http.post("/Contacts", data);
};
const update = (id, data) => {
  return http.put(`/Contacts/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/Contacts/${id}`);
};
const removeAll = () => {
  return http.delete(`/Contacts`);
};
const findByTitle = (firstName) => {
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
