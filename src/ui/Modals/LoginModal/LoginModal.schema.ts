import * as z from 'zod';

export const LoginSchema = z.object({
  login: z.string().nonempty('Укажите логин'),
  password: z.string().nonempty('Укажите пароль'),
});
