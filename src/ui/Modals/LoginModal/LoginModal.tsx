import { Box, Button, ButtonGroup, Flex, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';

import { MODALS, openModal } from '@/modules/modal/modal.reducer';
import { useInputField } from '@/utils/useFormFields';

export function LoginModal() {
  const [email, onEmailChange] = useInputField('');
  const [password, onPasswordChange] = useInputField('');

  const dispatch = useDispatch();

  const onSubmit = () => {};

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
          <Button mode="primary" size="l" stretched onClick={onSubmit}>
            Войти
          </Button>
          <Button mode="outline" size="l" stretched onClick={onRegistation}>
            Зарегистрироваться
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
}
