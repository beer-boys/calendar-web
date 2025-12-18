import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, ButtonGroup, Flex, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { type RefObject, useState } from 'react';
import { useForm } from 'react-hook-form';

import { UserInfoSchema } from '@/modules/user/user.schemas';
import type { RegistrationData } from '@/modules/user/user.types';
import { getFieldStatus } from '@/utils/formField';

interface UserInfoProps {
  registrationData: RefObject<RegistrationData>;
  isLoading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export function UserInfo({ registrationData, isLoading, onSubmit, onCancel }: UserInfoProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserInfoSchema),
    mode: isSubmitted ? 'onChange' : 'onSubmit',
  });

  const firstNameError = errors.firstName?.message;
  const lastNameError = errors.lastName?.message;
  const middleNameError = errors.middleName?.message;

  const firstName = register('firstName');
  const lastName = register('lastName');
  const middleName = register('middleName');

  const onSubmitClick = handleSubmit(
    (data) => {
      registrationData.current = { ...registrationData.current, ...data };
      onSubmit();
    },
    /** При инвалидных данных фиксируем попытку засабмитить формы  */
    () => setIsSubmitted(true),
  );

  return (
    <Flex direction="column">
      <Box padding="2xl">
        <Title level="2">Создать аккаунт</Title>
      </Box>
      <FormLayoutGroup>
        <FormItem top="Имя" id={firstName.name} bottom={firstNameError} status={getFieldStatus(isSubmitted, firstNameError)}>
          <Input id={firstName.name} {...firstName} />
        </FormItem>
        <FormItem top="Фамилия" htmlFor={lastName.name} bottom={lastNameError} status={getFieldStatus(isSubmitted, lastNameError)}>
          <Input id={lastName.name} {...lastName} />
        </FormItem>
        <FormItem top="Отчество" htmlFor={middleName.name} bottom={middleNameError} status={getFieldStatus(isSubmitted, middleNameError)}>
          <Input id={middleName.name} {...middleName} />
        </FormItem>
      </FormLayoutGroup>
      <Box padding="2xl">
        <ButtonGroup stretched gap="s" mode="vertical">
          <Button mode="primary" size="l" stretched onClick={onSubmitClick} loading={isLoading}>
            Зарегистрироваться
          </Button>
          <Button mode="outline" size="l" stretched onClick={onCancel} disabled={isLoading}>
            Назад
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
}
