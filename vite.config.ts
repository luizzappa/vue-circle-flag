/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';
import typescript2 from 'rollup-plugin-typescript2';
import typescript from '@rollup/plugin-typescript'
import dts from "vite-plugin-dts";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true
    }),
    typescript({
      exclude: [
        "dist",
        "test/**/*.ts"
      ]
    }),
    // typescript2({
    //   check: false,
    //   include: ["src/components/**/*.vue"],
    //   tsconfigOverride: {
    //     compilerOptions: {
    //       outDir: "dist",
    //       sourceMap: true,
    //       declaration: true,
    //       declarationMap: true,
    //     },
    //   },
      // exclude: ["vite.config.ts", "src/assets/*"]
    // })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: "src/components/main.ts",
      name: 'vueCircleFlags',
      formats: ["cjs", "es"],
      fileName: format => `vue-circle-flags.${format}.js`,
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/components/main.ts")
      },
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          // if (assetInfo.name === 'main.css') return 'my-library-vue-ts.css';
          return assetInfo.name;
        },
        exports: "named",
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
