/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../../node_modules/.vite`,

    build: {
      outDir: '../../dist/apps/docs/client',
      reportCompressedSize: true,
      commonjsOptions: { transformMixedEsModules: true },
      target: ['esnext'],
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },
    ssr: {
      noExternal: [
        '@dytab/**',
      ],
    },
    plugins: [
      tsconfigPaths(),
      analog({
        static: true,
        prerender: {
          discover: true,
          routes: ['/'],
        },
        nitro: {
          logLevel: 3,
          hooks: {
            'prerender:generate': (route) => {
              route.fileName = route.fileName?.replace('/ngx-blocknote', '');
              return route;
            },
          },
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
