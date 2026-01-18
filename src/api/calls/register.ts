import { createAPICall } from '@/api/api';

interface RegisterAPICallRequest {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

interface RegisterAPICallResponse {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  middleName: string;
  roles: string[];
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
}

const REGISTER_URL = '/auth/register';
export const registerAPICall = createAPICall<RegisterAPICallResponse, RegisterAPICallRequest>('POST', REGISTER_URL);
