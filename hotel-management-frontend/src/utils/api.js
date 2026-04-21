import axios from "axios";

const API = axios.create({
  baseURL:"https://sample-3-pf1p.onrender.com/api"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ must include Bearer
  }
  return config;
});

export default API;
