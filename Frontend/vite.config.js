// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // —— Add this block to enable Vitest ——
  test: {
    globals: true,                    // allow describe/it without imports
    environment: 'jsdom',             // simulate a browser DOM
    setupFiles: './src/setupTests.js',// load jest-dom matchers
    include: [
      'src/tests/App.test.jsx',
      'src/tests/CountryDetails.test.jsx',
      'src/tests/CountryList.test.jsx',
      'src/tests/Login.test.jsx',
    ],
  },
});
