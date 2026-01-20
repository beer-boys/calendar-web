import { configureStore } from '@reduxjs/toolkit';
import { render, type RenderOptions } from '@testing-library/react';
import { type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { rootReducer } from '@/modules/store';

type PreloadedState = Parameters<typeof rootReducer>[0];

interface Options extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: PreloadedState;
}

export function renderWithStore(ui: React.ReactElement, { preloadedState, ...renderOptions }: Options = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
