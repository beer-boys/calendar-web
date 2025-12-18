import { Box, Button, ButtonGroup, Flex, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { processTokens } from '@/api/api';
import { loginAPICall } from '@/api/calls/login';
import { closeModal, MODALS, openModal } from '@/modules/modal/modal.reducer';
import { useInputField } from '@/utils/formField';

export function LoginModal() {
  const [email, onEmailChange] = useInputField('');
  const [password, onPasswordChange] = useInputField('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const { data } = await loginAPICall({ login: email, password });
      processTokens(data);

      dispatch(closeModal());
      navigate('/');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegistation = () => {
    dispatch(openModal({ modalId: MODALS.registration }));
  };

  return (
    <Flex direction="column">
      <Box padding="2xl">
        <Title level="2">Войти</Title>
      </Box>
      <FormLayoutGroup>
        <FormItem top="Email" htmlFor="email">
          <Input id="email" name="email" type="email" value={email} onChange={onEmailChange} />
        </FormItem>
        <FormItem top="Пароль" htmlFor="password">
          <Input id="password" name="password" type="password" value={password} onChange={onPasswordChange} />
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
