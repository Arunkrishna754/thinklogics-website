const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export const env = {
  apiUrl,              // http://localhost:5000
  apiBase: `${apiUrl}/api`, // http://localhost:5000/api
  isProd: import.meta.env.PROD,
};