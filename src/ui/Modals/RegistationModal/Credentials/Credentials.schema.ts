import * as z from 'zod';

export const CredentionalsSchema = z
  .object({
    login: z.email({ error: 'Укажите валидный email' }),
    password: z.string().min(8, 'Минимум 8 символов'),
    passwordRepeat: z.string().nonempty('Повторите пароль'),
  })
  .refine(
    (data) => {
      return data.password === data.passwordRepeat;
    },
    {
      message: 'Пароли не совпадают',
      path: ['passwordRepeat'],
    },
  );
