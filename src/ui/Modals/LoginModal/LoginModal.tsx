import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, ButtonGroup, Flex, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { processTokens } from '@/api/api';
import { loginAPICall } from '@/api/calls/login';
import { closeModal, MODALS, openModal } from '@/modules/modal/modal.reducer';
import { LoginSchema } from '@/modules/user/user.schemas';
import { getFieldStatus } from '@/utils/formField';

export function LoginModal() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: isSubmitted ? 'onChange' : 'onSubmit',
  });

  const login = register('login');
  const password = register('password');

  const loginError = errors.login?.message;
  const passwordError = errors.password?.message;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(
    async (formData) => {
      setIsSubmitted(true);
      setIsLoading(true);

      try {
        const { data } = await loginAPICall(formData);
        processTokens(data);

        dispatch(closeModal());
        navigate('/');
      } catch {
        setError('login', { type: 'server', message: 'Неверный логин или пароль' });
      } finally {
        setIsLoading(false);
      }
    },
    /** При инвалидных данных фиксируем попытку засабмитить формы  */
    () => setIsSubmitted(true),
  );

  const onRegistation = () => {
    dispatch(openModal({ modalId: MODALS.registration }));
  };

  return (
    <Flex direction="column">
      <Box padding="2xl">
        <Title level="2">Войти</Title>
      </Box>
      <FormLayoutGroup>
        <FormItem top="Email" htmlFor={login.name} bottom={loginError} status={getFieldStatus(isSubmitted, loginError)}>
          <Input id={login.name} type="email" {...login} />
        </FormItem>
        <FormItem top="Пароль" htmlFor={password.name} bottom={passwordError} status={getFieldStatus(isSubmitted, passwordError)}>
          <Input id={password.name} type="password" {...password} />
        </FormItem>
      </FormLayoutGroup>
      <Box padding="2xl">
        <ButtonGroup stretched gap="s" mode="vertical">
          <Button mode="primary" size="l" stretched onClick={onSubmit} loading={isLoading}>
            Войти
          </Button>
          <Button mode="outline" size="l" stretched onClick={onRegistation} disabled={isLoading}>
            Зарегистрироваться
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
}
