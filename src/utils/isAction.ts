import type { Action } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isReduxAction = (action: any): action is Action => {
  return 'type' in action && typeof action.type === 'string';
};
