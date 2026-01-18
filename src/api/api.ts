import axios, { type AxiosRequestConfig, type Method } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const EXPIRED_TOKEN_STATUS_CODE = 403;
const REFRESH_URL = '/auth/refresh';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export interface AuthResponse {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === EXPIRED_TOKEN_STATUS_CODE && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const oldRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        const response = await axios.post<AuthResponse>(`${API_URL}${REFRESH_URL}`, {
          oldRefreshToken,
        });

        const { accessToken: token, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const createAPICall = <Res = unknown, Req = unknown>(method: Method, url: string) => {
  return (params?: Req) => {
    const config: AxiosRequestConfig = {
      method,
      url,
    };

    if (method.toUpperCase() == 'GET') {
      config.params = params;
    } else {
      config.data = params;
    }

    return api.request<Res>(config);
  };
};

export const processTokens = (authResponse: AuthResponse) => {
  const { accessToken, refreshToken } = authResponse;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export default api;
