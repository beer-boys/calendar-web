import { FormItem, Input } from '@vkontakte/vkui';

import type { OnFieldChange } from '@/utils/useFormFields';

interface CredentialsProps {
  email: string;
  onEmailChange: OnFieldChange;

  password: string;
  onPasswordChange: OnFieldChange;

  passwordRepeat: string;
  onPasswordRepeatChange: OnFieldChange;
}

export function Credentials({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  passwordRepeat,
  onPasswordRepeatChange,
}: CredentialsProps) {
  return (
    <>
      <FormItem top="Email" htmlFor="email">
        <Input id="email" name="email" type="email" value={email} onChange={onEmailChange} />
      </FormItem>
      <FormItem top="Пароль" htmlFor="password">
        <Input id="password" name="password" type="password" value={password} onChange={onPasswordChange} />
      </FormItem>
      <FormItem top="Повторите пароль" htmlFor="password">
        <Input id="passwordRepeat" name="passwordRepeat" type="password" value={passwordRepeat} onChange={onPasswordRepeatChange} />
      </FormItem>
    </>
  );
}
