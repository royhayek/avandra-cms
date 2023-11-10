import { fetchApi } from "redux/services/api";

const endpoints = {
  category: "/category",
  image: "/image",
};

export const getCategories = payload => fetchApi(endpoints.category, payload);
// export const getImage = payload => fetchApi(endpoints.image, payload);
export const createCategory = payload =>
  fetchApi(endpoints.category, payload, "post", { "content-type": "multipart/form-data" });
