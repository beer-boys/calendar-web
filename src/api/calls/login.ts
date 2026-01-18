import type { AuthResponse } from '@/api/api';
import { createAPICall } from '@/api/api';

interface LoginAPICallRequest {
  login: string;
  password: string;
}

type LoginAPICallResponse = AuthResponse;

const LOGIN_URL = '/auth/login';
export const loginAPICall = createAPICall<LoginAPICallResponse, LoginAPICallRequest>('POST', LOGIN_URL);
