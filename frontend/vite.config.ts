// frontend/vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5174, // Puerto para el frontend
    strictPort: true,
    host: '0.0.0.0',  // Permite accesos desde cualquier IP
  },
});
