import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config = ({ mode }) => {
    return defineConfig({
        plugins: [react()],
        define: {
            'process.env.NODE_ENV': `"${mode}"`,
        },
        server: {
            port: 3000
        },
    });
};

export default config;
