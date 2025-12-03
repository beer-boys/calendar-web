import { Button, ButtonGroup, Flex, Panel } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';

import { MODALS, openModal } from '@/modules/modal/modal.reducer';
import { Logo } from '@/ui/Logo/Logo';

import styles from './LoginPanel.module.css';

interface LoginPanelProps {
  id: string;
}

export function LoginPanel({ id }: LoginPanelProps) {
  const dispatch = useDispatch();

  const onLoginClick = () => {
    dispatch(openModal({ modalId: MODALS.login }));
  };

  const onRegistationClick = () => {
    dispatch(openModal({ modalId: MODALS.registration }));
  };

  return (
    <Panel id={id}>
      <Flex className={styles.wrapper} direction="column" justify="center" align="center">
        <Flex className={styles.content} direction="column" align="center" gap="l">
          <Logo />
          <ButtonGroup stretched gap="s" mode="vertical">
            <Button mode="primary" size="l" onClick={onLoginClick} stretched>
              Войти
            </Button>
            <Button mode="outline" size="l" onClick={onRegistationClick} stretched>
              Зарегистрироваться
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </Panel>
  );
}
