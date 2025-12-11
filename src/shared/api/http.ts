import { baseURL } from '../configs/path';
import axios from 'axios';
import { toast } from 'sonner';

function httpClientBuilder() {
  const client = axios.create({ baseURL });

  client.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('@access_token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const response = error.response;

      if (response?.status === 401) {
        const data = response.data;

        if (
          data?.erro === 'token_expired' ||
          data?.mensagem === 'Token expirado'
        ) {
          toast.error('Sessão expirada. Faça login novamente.');
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = '/auth/login';
          return Promise.reject(error);
        }

        window.location.href = '/auth/login';
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );

  return client;
}

const http = httpClientBuilder();
export { http };
