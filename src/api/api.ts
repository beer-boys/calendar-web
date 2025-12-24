import axios, { type Method } from 'axios';

/** Временный костыль – починить как переедем на один домен */
export const AUTH_URL = 'http://calendar.dws-dev.ru:8080';

const API_URL = 'http://calendar.dws-dev.ru:8080/api/v1';
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

export const createAPICall = <Req = unknown, Res = unknown>(method: Method, url: string) => {
  return (data?: Req) =>
    api.request<Res>({
      method,
      url,
      data,
    });
};

export const processTokens = (authResponse: AuthResponse) => {
  const { accessToken, refreshToken } = authResponse;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export default api;
