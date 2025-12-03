import type { RootState } from '@/modules/store';

const getUserState = (state: RootState) => state.user;

export const getCurrentUser = (state: RootState) => getUserState(state).currentUser;
