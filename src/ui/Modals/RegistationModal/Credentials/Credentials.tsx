import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, ButtonGroup, Flex, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { type RefObject, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CredentionalsSchema } from '@/ui/Modals/RegistationModal/Credentials/Credentials.schema';
import type { RegistrationData } from '@/ui/Modals/RegistationModal/RegistationModal.types';
import { getFieldStatus } from '@/utils/formField';

interface CredentialsProps {
  registrationData: RefObject<RegistrationData>;
  onSubmit: () => void;
  onCancel: () => void;
}

export function Credentials({ registrationData, onSubmit, onCancel }: CredentialsProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CredentionalsSchema),
    mode: isSubmitted ? 'onChange' : 'onSubmit',
  });

  const loginError = errors.login?.message;
  const passwordError = errors.password?.message;
  const passwordRepeatError = errors.passwordRepeat?.message;

  const login = register('login');
  const password = register('password');
  const passwordRepeat = register('passwordRepeat');

  const onSubmitClick = handleSubmit(
    (data) => {
      /** Не используем ..., чтобы не докидывать в объект passwordRepeat */
      registrationData.current = {
        ...registrationData.current,
        login: data.login,
        password: data.password,
      };

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
        <FormItem top="Email" htmlFor={login.name} bottom={loginError} status={getFieldStatus(isSubmitted, loginError)}>
          <Input id={login.name} type="email" {...login} />
        </FormItem>
        <FormItem top="Пароль" htmlFor={password.name} bottom={passwordError} status={getFieldStatus(isSubmitted, passwordError)}>
          <Input id={password.name} type="password" {...password} />
        </FormItem>
        <FormItem
          top="Повторите пароль"
          htmlFor={passwordRepeat.name}
          bottom={passwordRepeatError}
          status={getFieldStatus(isSubmitted, passwordRepeatError)}
        >
          <Input id={passwordRepeat.name} type="password" {...passwordRepeat} />
        </FormItem>
      </FormLayoutGroup>
      <Box padding="2xl">
        <ButtonGroup stretched gap="s" mode="vertical">
          <Button mode="primary" size="l" stretched onClick={onSubmitClick}>
            Далее
          </Button>
          <Button mode="outline" size="l" stretched onClick={onCancel}>
            Уже есть аккаунт?
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
}
