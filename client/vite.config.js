import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180, // Ensure this matches your access URL
    strictPort: true, // Fail if the port is already in use
    open: true, // Automatically open the browser
  },
});
