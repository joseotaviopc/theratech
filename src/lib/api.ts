import axios, { AxiosError, AxiosResponse } from 'axios'
export const BASE_URL = "http://localhost:5000"
export const BASE_URL_RENDER = "https://theratec-api.onrender.com"
export const BASE_URL_RAILWAY = "https://theratec-api-production.up.railway.app"

export const api = axios.create({
  baseURL: BASE_URL_RAILWAY,

  headers: {
    'Content-Type': 'application/json'
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status } = response;
    return {
      ...response,
      message: data,
      status: status,
    };
  },
  async (error: AxiosError) => {
    return {
      message: error.message,
      status: error.response ? error.response.status : null,
      response: error.response?.data
    };
  }
);

export * from './api.auth'
export * from './api.company'
export * from './api.profissional'