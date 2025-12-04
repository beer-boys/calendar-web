import { createAPICall } from '@/api/api';

interface MeAPICallResponse {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  middleName: string;
  roles: string[];
}

const ME_URL = '/me';
export const meAPICall = createAPICall<unknown, MeAPICallResponse>('GET', ME_URL);
