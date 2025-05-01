import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

import { HttpAdapter,HttpError } from "./";
import type { MessageResponse } from "infrastructure/interfaces";

interface Options {
  baseURL: string;
  params?: Record<string, string>;
  headers?: Record<string, string | boolean>;
}

export class AxiosAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseURL,
      params: options.params,
      headers: options.headers,
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      if (config.headers?.Authorization) {
        return config;
      }

      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axiosInstance.get<T>(url, options);
      return data;
    } catch (error) {
      const serverError = error as AxiosError;
      const errorMessage = serverError.response?.data as MessageResponse;
      if (errorMessage?.statusCode === 401) {
        throw new Error("Unauthorized");
      }
      // console.log(errorMessage);
      throw new Error(serverError.message);
    }
  }

  async post<T>(
    url: string,
    body: Record<string, unknown>,
    options?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await this.axiosInstance.post<T>(url, body, options);
      return data;
    } catch (error) {
      const serverError = error as AxiosError;
      const errorMessage = serverError.response?.data as MessageResponse;
      // console.log(errorMessage);

      if (serverError.response) {
        throw new HttpError(
          errorMessage?.message || "Unknown error",
          errorMessage.statusCode
        );
      }
      throw new HttpError(serverError.message, 500);
    }
  }

  async put<T>(
    url: string,
    body: Record<string, unknown>,
    options?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const { data } = await this.axiosInstance.put<T>(url, body, options);
      return data;
    } catch (error) {
     const serverError = error as AxiosError;
     const errorMessage = serverError.response?.data as MessageResponse;
     // console.log(errorMessage);

     if (serverError.response) {
       throw new HttpError(
         errorMessage?.message || "Unknown error",
         errorMessage.statusCode
       );
     }
     throw new HttpError(serverError.message, 500);
    }
  }

  async delete<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axiosInstance.delete<T>(url, options);
      return data;
    } catch (error) {
      const serverError = error as AxiosError;
      const errorMessage = serverError.response?.data as MessageResponse;
      // console.log(errorMessage);

      if (serverError.response) {
        throw new HttpError(
          errorMessage?.message || "Unknown error",
          errorMessage.statusCode
        );
      }
      throw new HttpError(serverError.message, 500);
    }
  }
}
