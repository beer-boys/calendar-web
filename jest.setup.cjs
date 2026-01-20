require('@testing-library/jest-dom');

global.__VITE_API_URL__ = 'http://localhost:3000';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,

    // современные API
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),

    // старые API (некоторые либы до сих пор используют)
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }),
});
