import { Button, ButtonGroup, Flex, Panel } from '@vkontakte/vkui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { MODALS, openModal } from '@/modules/modal/modal.reducer';
import { getCurrentUser } from '@/modules/user/user.selectors';
import { Logo } from '@/ui/Logo/Logo';

import styles from './LoginPanel.module.css';

interface LoginPanelProps {
  id: string;
}

export function LoginPanel({ id }: LoginPanelProps) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const currentUser = useSelector(getCurrentUser);
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    navigate('/');
  }, [navigate, currentUser]);

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
