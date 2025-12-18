import { FormItem, Input } from '@vkontakte/vkui';

import type { OnFieldChange } from '@/utils/useFormFields';

interface UserInfoProps {
  firstName: string;
  onFirstNameChange: OnFieldChange;

  lastName: string;
  onLastNameChange: OnFieldChange;

  middleName: string;
  onMiddleNameChange: OnFieldChange;
}

export function UserInfo({ firstName, onFirstNameChange, lastName, onLastNameChange, middleName, onMiddleNameChange }: UserInfoProps) {
  return (
    <>
      <FormItem top="Имя" htmlFor="firstName">
        <Input id="firstName" name="firstName" value={firstName} onChange={onFirstNameChange} />
      </FormItem>
      <FormItem top="Фамилия" htmlFor="lastName">
        <Input id="lastName" name="lastName" value={lastName} onChange={onLastNameChange} />
      </FormItem>
      <FormItem top="Отчество" htmlFor="lastName">
        <Input id="middleName" name="middleName" value={middleName} onChange={onMiddleNameChange} />
      </FormItem>
    </>
  );
}
