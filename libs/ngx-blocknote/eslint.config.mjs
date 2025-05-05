import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          checkMissingDependencies: true,
          checkObsoleteDependencies: true,
          checkVersionMismatches: true,
          ignoredDependencies: [
            '@testing-library/angular',
            'jest-preset-angular',
            '@nx/angular',
            'vite',
            '@analogjs/vitest-angular',
            '@angular/platform-browser-dynamic',
            '@analogjs/vite-plugin-angular',
            '@spartan-ng/ui-button-helm',
            '@spartan-ng/ui-icon-helm',
            '@spartan-ng/ui-input-helm',
            '@spartan-ng/ui-tabs-helm',
            '@spartan-ng/ui-tooltip-helm',
            '@spartan-ng/ui-menu-helm',
          ],
          ignoredFiles: ['tailwind.config.js'],
          includeTransitiveDependencies: true,
          useLocalPathsForWorkspaceDependencies: true,
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
