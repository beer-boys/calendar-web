import './index.css';
import '@vkontakte/vkui/dist/vkui.css';

import { AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <AppRoot>
        <App />
      </AppRoot>
    </ConfigProvider>
  </StrictMode>,
);
