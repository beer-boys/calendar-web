import '@vkontakte/vkui/dist/vkui.css';

import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { Router } from '@/app/Router.tsx';

import { store } from './modules/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <ReduxProvider store={store}>
            <Router />
          </ReduxProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  </StrictMode>,
);
