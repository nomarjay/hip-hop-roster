import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://104.236.121.210:8086',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
