import { AxiosAdapter } from "./http";

export const apiFetcher = new AxiosAdapter({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});