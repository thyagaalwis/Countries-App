// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    // allow describe/it/globals without explicit imports
    globals: true,

    // simulate a browser DOM
    environment: 'jsdom',

    // load any setup helpers (e.g. jest-dom matchers)
    setupFiles: './src/setupTests.js',

    // include all .test. or .spec. files under src/tests with js/ts/jsx/tsx
    include: [
      'src/tests/**/*.test.{js,jsx,ts,tsx}',
      'src/tests/**/*.spec.{js,jsx,ts,tsx}'
    ],
  },
});
