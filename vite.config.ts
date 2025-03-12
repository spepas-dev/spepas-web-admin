import {resolve} from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig , loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'


// https://vite.dev/config/
export default ({mode}: {mode: string}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  const config = {
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      host: 'localhost', 
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
          configure: (proxy: any, options: any) => {
            proxy.on('proxyReq', (proxyReq: any, req: any, res: any) => {
              console.log('Proxy Request:', {
                method: req.method,
                url: req.url,
                headers: req.headers
              });
            });
            proxy.on('proxyRes', (proxyRes: any, req: any, res: any) => {
              console.log('Proxy Response:', {
                statusCode: proxyRes.statusCode,
                headers: proxyRes.headers
              });
            });
          }
        },
      },
    },
  }

  return defineConfig(config)
}
