import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/consulting-outreach-tracker/',
  plugins: [react()],
});
