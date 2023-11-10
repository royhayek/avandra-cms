import { fetchApi } from "redux/services/api";

const endpoints = {
  user: "/user",
  users: "/users",
};

export const getUserInfo = payload => fetchApi(endpoints.user, payload);
export const getUsers = payload => fetchApi(endpoints.users);
