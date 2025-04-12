import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const access_token = JSON.parse(localStorage.getItem("user_access_token"));
  console.log("Access Token:", access_token);

  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }

  return config;
});

export const adminInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

adminInstance.interceptors.request.use(async (config) => {
  const access_token = JSON.parse(localStorage.getItem("admin_access_token"));

  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }

  return config;
});

export const authorInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

authorInstance.interceptors.request.use(async (config) => {
  const access_token = JSON.parse(localStorage.getItem("author_access_token"));

  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }

  return config;
});
