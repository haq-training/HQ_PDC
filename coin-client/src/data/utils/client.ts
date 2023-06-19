import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import axios, { AxiosInstance } from 'axios';

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const responseBody = (response: AxiosResponse) => response.data;

// Xác thực token
Axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = Axios;
  }

  get<T>(endpoint: string, query?: any): Promise<T> {
    return this.axiosInstance.get(endpoint, { params: query }).then(responseBody);
  }
  post<T>(endpoint: string, body: any): Promise<T> {
    return this.axiosInstance.post(endpoint, body).then(responseBody);
  }
  put<T>(endpoint: string, body: any): Promise<T> {
    return this.axiosInstance.put(endpoint, body).then(responseBody);
  }
  delete<T>(endpoint: string): Promise<T> {
    return this.axiosInstance.delete(endpoint).then(responseBody);
  }
}

export default new HttpClient();
