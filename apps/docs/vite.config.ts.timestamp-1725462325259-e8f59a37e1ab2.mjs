// apps/docs/vite.config.ts
import analog from "file:///home/mristo/repos/ngx-block-note/node_modules/@analogjs/platform/src/index.js";
import { defineConfig, splitVendorChunkPlugin } from "file:///home/mristo/repos/ngx-block-note/node_modules/vite/dist/node/index.js";
import { nxViteTsPaths } from "file:///home/mristo/repos/ngx-block-note/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "/home/mristo/repos/ngx-block-note/apps/docs";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    root: __vite_injected_original_dirname,
    cacheDir: `../node_modules/.vite`,
    build: {
      outDir: "../dist/./apps/docs/client",
      reportCompressedSize: true,
      target: ["es2020"]
    },
    server: {
      fs: {
        allow: ["."]
      }
    },
    plugins: [
      analog(),
      nxViteTsPaths(),
      splitVendorChunkPlugin()
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default"]
    },
    define: {
      "import.meta.vitest": mode !== "production"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBwcy9kb2NzL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbXJpc3RvL3JlcG9zL25neC1ibG9jay1ub3RlL2FwcHMvZG9jc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbXJpc3RvL3JlcG9zL25neC1ibG9jay1ub3RlL2FwcHMvZG9jcy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9tcmlzdG8vcmVwb3Mvbmd4LWJsb2NrLW5vdGUvYXBwcy9kb2NzL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgYW5hbG9nIGZyb20gJ0BhbmFsb2dqcy9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIFBsdWdpbiwgc3BsaXRWZW5kb3JDaHVua1BsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgbnhWaXRlVHNQYXRocyB9IGZyb20gJ0BueC92aXRlL3BsdWdpbnMvbngtdHNjb25maWctcGF0aHMucGx1Z2luJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICByb290OiBfX2Rpcm5hbWUsXG4gICAgY2FjaGVEaXI6IGAuLi9ub2RlX21vZHVsZXMvLnZpdGVgLFxuXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogJy4uL2Rpc3QvLi9hcHBzL2RvY3MvY2xpZW50JyxcbiAgICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLFxuICAgICAgdGFyZ2V0OiBbJ2VzMjAyMCddLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBmczoge1xuICAgICAgICBhbGxvdzogWycuJ10sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuXG4gICAgICBhbmFsb2coKSxcblxuICAgICAgbnhWaXRlVHNQYXRocygpLFxuICAgICAgc3BsaXRWZW5kb3JDaHVua1BsdWdpbigpLFxuICAgIF0sXG4gICAgdGVzdDoge1xuICAgICAgZ2xvYmFsczogdHJ1ZSxcbiAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgICAgc2V0dXBGaWxlczogWydzcmMvdGVzdC1zZXR1cC50cyddLFxuICAgICAgaW5jbHVkZTogWycqKi8qLnNwZWMudHMnXSxcbiAgICAgIHJlcG9ydGVyczogWydkZWZhdWx0J10sXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgICdpbXBvcnQubWV0YS52aXRlc3QnOiBtb2RlICE9PSAncHJvZHVjdGlvbicsXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLE9BQU8sWUFBWTtBQUNuQixTQUFTLGNBQXNCLDhCQUE4QjtBQUM3RCxTQUFTLHFCQUFxQjtBQUo5QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFFVixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixzQkFBc0I7QUFBQSxNQUN0QixRQUFRLENBQUMsUUFBUTtBQUFBLElBQ25CO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixJQUFJO0FBQUEsUUFDRixPQUFPLENBQUMsR0FBRztBQUFBLE1BQ2I7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFFUCxPQUFPO0FBQUEsTUFFUCxjQUFjO0FBQUEsTUFDZCx1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsWUFBWSxDQUFDLG1CQUFtQjtBQUFBLE1BQ2hDLFNBQVMsQ0FBQyxjQUFjO0FBQUEsTUFDeEIsV0FBVyxDQUFDLFNBQVM7QUFBQSxJQUN2QjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sc0JBQXNCLFNBQVM7QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
