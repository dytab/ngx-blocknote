import { getJestProjectsAsync } from '@nx/jest';

export default {
  ...async () => ({
    projects: await getJestProjectsAsync(),
  }),
  transform: {
    '^.+\\.(cjs|ts|tsx|js|jsx|mjs)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: true,
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.cjs$|@blocknote)'],
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
  },
};
