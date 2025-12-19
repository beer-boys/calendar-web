import * as z from 'zod';

export const UserInfoSchema = z.object({
  firstName: z.string().nonempty('Укажите имя'),
  lastName: z.string().nonempty('Укажите фамилию'),
  middleName: z.string().nonempty('Укажите отчество'),
});
