import type { RegistrationData } from '@/modules/user/user.types';

export const emptyRegistrationData: RegistrationData = {
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  middleName: '',
};
