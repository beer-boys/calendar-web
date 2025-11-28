import { Title } from '@vkontakte/vkui';

import styles from './Logo.module.css';

export function Logo() {
  return (
    <Title>
      <span className={styles.logoFirstLetter}>X</span>-Calendar
    </Title>
  );
}
