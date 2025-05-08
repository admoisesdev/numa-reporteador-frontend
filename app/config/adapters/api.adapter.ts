import { AxiosAdapter } from "./http";

export const apiFetcher = new AxiosAdapter({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "http://34.71.107.222:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
console.log("API URL: ", import.meta.env.VITE_BACKEND_URL);