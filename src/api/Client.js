import axios from "axios";
import { env } from "../config/env";

export const TOKEN_KEY = "thinklogics_token";

const api = axios.create({
  baseURL: env.apiBase,
});

// Attach the JWT to every request when one is stored.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const errorMessage = (err, fallback = "Something went wrong") =>
  err?.response?.data?.message ||
  err?.response?.data?.error ||
  err?.message ||
  fallback;

export default api;