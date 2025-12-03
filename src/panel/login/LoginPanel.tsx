import { Button, Flex, Panel } from '@vkontakte/vkui';

import { Logo } from '@/ui/Logo/Logo';

import styles from './LoginPanel.module.css';

interface LoginPanelProps {
  id: string;
}

export function LoginPanel({ id }: LoginPanelProps) {
  return (
    <Panel id={id}>
      <Flex className={styles.wrapper} direction="column" justify="center" align="center">
        <Flex className={styles.content} direction="column" align="stretch" gap="l">
          <Flex direction="column" align="center">
            <Logo />
          </Flex>
          <Button mode="primary">Войти</Button>
          <Button mode="outline">Зарегистрироваться</Button>
        </Flex>
      </Flex>
    </Panel>
  );
}
