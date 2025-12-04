import { Box, Button, ButtonGroup, Flex, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { processTokens } from '@/api/api';
import { registerAPICall } from '@/api/calls/register';
import { closeModal, MODALS, openModal } from '@/modules/modal/modal.reducer';
import { setCurrentUser } from '@/modules/user/user.reducer';
import type { User } from '@/modules/user/user.types';
import { useInputField } from '@/utils/useFormFields';

export function RegistationModal() {
  const [email, onEmailChange] = useInputField('');
  const [password, onPasswordChange] = useInputField('');
  const [passwordRepeat, onPasswordRepeatChange] = useInputField('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const { data } = await registerAPICall({
        login: email,
        password,
        firstName: 'firstName',
        lastName: 'lastName',
        middleName: 'middleName',
      });

      processTokens(data);

      const user: User = {
        email: data.login,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        roles: data.roles,
      };

      dispatch(setCurrentUser({ user }));
      dispatch(closeModal());
      navigate('/');
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const onLogin = () => {
    dispatch(openModal({ modalId: MODALS.login }));
  };

  return (
    <Flex direction="column">
      <Box padding="2xl">
        <Title level="2">Создать аккаунт</Title>
      </Box>
      <FormLayoutGroup>
        <FormItem top="Email" htmlFor="email">
          <Input id="email" name="email" type="email" value={email} onChange={onEmailChange} />
        </FormItem>
        <FormItem top="Пароль" htmlFor="password">
          <Input id="password" name="password" type="password" value={password} onChange={onPasswordChange} />
        </FormItem>
        <FormItem top="Повторите пароль" htmlFor="password">
          <Input id="passwordRepeat" name="passwordRepeat" type="password" value={passwordRepeat} onChange={onPasswordRepeatChange} />
        </FormItem>
      </FormLayoutGroup>
      <Box padding="2xl">
        <ButtonGroup stretched gap="s" mode="vertical">
          <Button mode="primary" size="l" stretched onClick={onSubmit} loading={isLoading}>
            Зарегистироваться
          </Button>
          {/* Вкорячить потом сюда аборт */}
          <Button mode="outline" size="l" stretched onClick={onLogin} disabled={isLoading}>
            Уже есть аккаунт?
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
}
