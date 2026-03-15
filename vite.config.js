import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => {
  const isSingle = mode === 'single';
  return {
    plugins: [
      react(),
      ...(isSingle ? [viteSingleFile()] : []),
    ],
    base: './',
    build: {
      // Inline all assets up to 10MB when building single-file
      assetsInlineLimit: isSingle ? 10 * 1024 * 1024 : 4096,
    },
  };
});
