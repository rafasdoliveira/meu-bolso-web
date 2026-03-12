import { baseURL } from '../configs/path';
import axios from 'axios';

function httpClientBuilder() {
  const client = axios.create({ baseURL, withCredentials: true });

  let isRefreshing = false;

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/auth/refresh')
      ) {
        if (isRefreshing) {
          throw error;
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await client.post('/auth/refresh');
          isRefreshing = false;
          return client(originalRequest);
        } catch {
          isRefreshing = false;
          localStorage.clear();
          window.location.href = '/';
          throw error;
        }
      }

      throw error;
    },
  );

  return client;
}

const http = httpClientBuilder();
export { http };
