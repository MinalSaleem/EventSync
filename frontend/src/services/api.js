import axios from "axios";

const api = axios.create({
  baseURL: "https://eventsync-h1e7.onrender.com/api",
});

// Automatically include the token in the request headers if it is stored in localStorage.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;