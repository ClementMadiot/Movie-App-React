export const API_BASE_URL = "https://api.themoviedb.org/3";
export const ACCESS_TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN;

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};