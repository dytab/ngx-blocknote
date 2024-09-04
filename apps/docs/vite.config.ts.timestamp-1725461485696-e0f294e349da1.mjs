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
      outDir: "../dist/./analog-test/client",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBwcy9kb2NzL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbXJpc3RvL3JlcG9zL25neC1ibG9jay1ub3RlL2FwcHMvZG9jc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbXJpc3RvL3JlcG9zL25neC1ibG9jay1ub3RlL2FwcHMvZG9jcy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9tcmlzdG8vcmVwb3Mvbmd4LWJsb2NrLW5vdGUvYXBwcy9kb2NzL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgYW5hbG9nIGZyb20gJ0BhbmFsb2dqcy9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIFBsdWdpbiwgc3BsaXRWZW5kb3JDaHVua1BsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgbnhWaXRlVHNQYXRocyB9IGZyb20gJ0BueC92aXRlL3BsdWdpbnMvbngtdHNjb25maWctcGF0aHMucGx1Z2luJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICByb290OiBfX2Rpcm5hbWUsXG4gICAgY2FjaGVEaXI6IGAuLi9ub2RlX21vZHVsZXMvLnZpdGVgLFxuICAgIFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6ICcuLi9kaXN0Ly4vYW5hbG9nLXRlc3QvY2xpZW50JyxcbiAgICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLCAgICBcbiAgICAgIHRhcmdldDogWydlczIwMjAnXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgZnM6IHtcbiAgICAgICAgYWxsb3c6IFsnLiddLFxuICAgICAgfSxcbiAgICB9LCAgICBcbiAgICBwbHVnaW5zOiBbXG4gICAgICBcbiAgICAgIGFuYWxvZygpLFxuICAgICAgXG4gICAgICBueFZpdGVUc1BhdGhzKCksXG4gICAgICBzcGxpdFZlbmRvckNodW5rUGx1Z2luKCksXG4gICAgXSxcbiAgICB0ZXN0OiB7XG4gICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBzZXR1cEZpbGVzOiBbJ3NyYy90ZXN0LXNldHVwLnRzJ10sXG4gICAgICBpbmNsdWRlOiBbJyoqLyouc3BlYy50cyddLFxuICAgICAgcmVwb3J0ZXJzOiBbJ2RlZmF1bHQnXSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgJ2ltcG9ydC5tZXRhLnZpdGVzdCc6IG1vZGUgIT09ICdwcm9kdWN0aW9uJyxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsT0FBTyxZQUFZO0FBQ25CLFNBQVMsY0FBc0IsOEJBQThCO0FBQzdELFNBQVMscUJBQXFCO0FBSjlCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUVWLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLHNCQUFzQjtBQUFBLE1BQ3RCLFFBQVEsQ0FBQyxRQUFRO0FBQUEsSUFDbkI7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLElBQUk7QUFBQSxRQUNGLE9BQU8sQ0FBQyxHQUFHO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUVQLE9BQU87QUFBQSxNQUVQLGNBQWM7QUFBQSxNQUNkLHVCQUF1QjtBQUFBLElBQ3pCO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixZQUFZLENBQUMsbUJBQW1CO0FBQUEsTUFDaEMsU0FBUyxDQUFDLGNBQWM7QUFBQSxNQUN4QixXQUFXLENBQUMsU0FBUztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixzQkFBc0IsU0FBUztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
