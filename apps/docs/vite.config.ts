/// <reference types="vitest" />

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import fs from 'fs';
import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
const links = fs
  .readFileSync('apps/docs/src/app/pages/examples/shared/examples.ts', 'utf-8')
  .split('\n')
  .filter((line: string) => line.trim().match(/url:\s*'([^']+)'/))
  .map((line: string) => line.trim().split("url: '")[1].split("'")[0]);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../../node_modules/.vite`,

    build: {
      outDir: '../../dist/apps/docs/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },
    plugins: [
      analog({
        static: true,
        prerender: {
          routes: [
            '/',
            '/overview',
            ...links.map((link: string) => `/examples/${link}`),
          ],
        },
      }),
      nxViteTsPaths(),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
      passWithNoTests: true,
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
