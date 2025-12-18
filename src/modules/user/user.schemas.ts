import * as z from 'zod';

export const UserSchema = z.object({
  email: z.email(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  middleName: z.string().nonempty(),
  roles: z.array(z.string()),
});

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

export const UserInfoSchema = z.object({
  firstName: z.string().nonempty('Укажите имя'),
  lastName: z.string().nonempty('Укажите фамилию'),
  middleName: z.string().nonempty('Укажите отчество'),
});

export const LoginSchema = z.object({
  login: z.string().nonempty('Укажите логин'),
  password: z.string().nonempty('Укажите пароль'),
});
