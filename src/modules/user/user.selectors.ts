import type { RootState } from '@/modules/store';

const getUserState = (state: RootState) => state.user;

export const getCurrentUser = (state: RootState) => getUserState(state).currentUser;
export const getUserIsLoading = (state: RootState) => getUserState(state).isLoading;
export const getUserError = (state: RootState) => getUserState(state).error;
