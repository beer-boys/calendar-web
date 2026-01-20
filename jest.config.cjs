/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },

  testMatch: ['<rootDir>/src/**/*.(test|spec).(ts|tsx)'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp|ico)$': '<rootDir>/test/__mocks__/fileMock.cjs',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],

  transformIgnorePatterns: ['/node_modules/(?!@vkontakte/vkui)/'],
};
