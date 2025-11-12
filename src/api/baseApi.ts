import axios, { type AxiosRequestConfig } from "axios";

export type ApiClient = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
};

export const createApi = (): ApiClient => {
  const instance = axios.create({
    baseURL: "https://swapi.dev/api/",
    timeout: 5_000,
  });

  instance.interceptors.response.use((response) => response.data);

  return {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      instance.get(url, config) as unknown as Promise<T>,
  };
};

export const api = createApi();
