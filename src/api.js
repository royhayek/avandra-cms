import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer `;
  return config;
});

export default axiosClient;
