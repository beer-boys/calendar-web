import { createAPICall } from '@/api/api';

interface LinkGoogleResponse {
  connected: boolean;
  redirectUrl?: string;
}

const LINK_GOOGLE_URL = '/auth/link/google';
export const linkGoogleAPICall = createAPICall<unknown, LinkGoogleResponse>('GET', LINK_GOOGLE_URL);
