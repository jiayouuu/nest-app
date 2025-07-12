import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-oxc'
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_PUBLIC_PATH,
    build: {
      outDir: 'html',
    },
    plugins: [
      react(),
    ],
    css: {
      modules: {
        // 让 className 导出为 camelCase
        localsConvention: 'camelCaseOnly',
        // 自定义生成的 class 名
        // 格式：[原始类名]___[哈希]
        generateScopedName: '[local]-[hash:base64:10]',
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
