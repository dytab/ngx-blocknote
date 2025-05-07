/// <reference types='vitest' />
import angular from '@analogjs/vite-plugin-angular';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/ngx-blocknote',
  plugins: [
    angular(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.app.json'),
    }),
  ],
  resolve: {
    mainFields: ['module'],
  },
  css: {
    postcss: './postcss.config.js', // Stellt sicher, dass PostCSS korrekt verwendet wird
  },
  build: {
    target: ['esnext'],
    outDir: '../../dist/libs/ngx-blocknote/',
    emptyOutDir: false,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      cssFileName: 'themes/styles',
      fileName: `fesm2022/dytab-ngx-blocknote`,
      name: 'ngx-blocknote',
      formats: ['es' as const],
    },
    rollupOptions: {
      external: [
        /^@angular\/.*/,
        /^@blocknote\/.*/,
        /^@floating-ui\/.*/,
        'rxjs',
        'rxjs/operators',
      ],
      output: {
        preserveModules: false,
      },
    },
    cssCodeSplit: false,
    cssMinify: true,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    pool: 'threads',
    poolOptions: {},
    watch: false,
    cacheDir: `../../node_modules/.vite`,
    coverage: {
      reportsDirectory: '../../coverage/libs/ngx-blocknote',
      provider: 'v8' as const,
    },
  },
}));
