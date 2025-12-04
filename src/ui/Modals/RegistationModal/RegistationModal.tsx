import { Box, Button, ButtonGroup, Flex, FormLayoutGroup, Title } from '@vkontakte/vkui';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { processTokens } from '@/api/api';
import { registerAPICall } from '@/api/calls/register';
import { closeModal, MODALS, openModal } from '@/modules/modal/modal.reducer';
import { setCurrentUser } from '@/modules/user/user.reducer';
import type { User } from '@/modules/user/user.types';
import { Credentials } from '@/ui/Modals/RegistationModal/Credentials';
import { UserInfo } from '@/ui/Modals/RegistationModal/UserInfo';
import { useInputField } from '@/utils/useFormFields';

export function RegistationModal() {
  const [activeSection, setActiveSection] = useState<'credentials' | 'userInfo'>('credentials');

  const isCredentials = activeSection === 'credentials';
  const isUserInfo = activeSection === 'userInfo';

  const goToUserInfo = () => setActiveSection('userInfo');
  const goToCredentials = () => setActiveSection('credentials');

  const [email, onEmailChange] = useInputField('');
  const [password, onPasswordChange] = useInputField('');
  const [passwordRepeat, onPasswordRepeatChange] = useInputField('');

  const [firstName, onFirstNameChange] = useInputField('');
  const [lastName, onLastNameChange] = useInputField('');
  const [middleName, onMiddleNameChange] = useInputField('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const { data } = await registerAPICall({
        login: email,
        password,
        firstName,
        lastName,
        middleName,
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
    } finally {
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
        {isCredentials && (
          <Credentials
            email={email}
            onEmailChange={onEmailChange}
            password={password}
            onPasswordChange={onPasswordChange}
            passwordRepeat={passwordRepeat}
            onPasswordRepeatChange={onPasswordRepeatChange}
          />
        )}
        {isUserInfo && (
          <UserInfo
            firstName={firstName}
            onFirstNameChange={onFirstNameChange}
            lastName={lastName}
            onLastNameChange={onLastNameChange}
            middleName={middleName}
            onMiddleNameChange={onMiddleNameChange}
          />
        )}
      </FormLayoutGroup>
      <Box padding="2xl">
        <ButtonGroup stretched gap="s" mode="vertical">
          <Button mode="primary" size="l" stretched onClick={isUserInfo ? onSubmit : goToUserInfo} loading={isLoading}>
            {isUserInfo ? 'Зарегистрироваться' : 'Далее'}
          </Button>
          {/* Вкорячить потом сюда аборт */}
          <Button mode="outline" size="l" stretched onClick={isUserInfo ? goToCredentials : onLogin} disabled={isLoading}>
            {isUserInfo ? 'Назад' : 'Уже есть аккаунт?'}
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
}
