import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';

  return {
    root,
    mode,
    base: './',
    build: {
      assetsInlineLimit: 0,
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [pluginExposeRenderer(name), react()],
    // css: {
    //   postcss: {
    //     plugins: [
    //       require('tailwindcss')({
    //         config: './tailwind.config.js'
    //       }),
    //    ],
    //   },
    // },
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
  } as UserConfig;
});
