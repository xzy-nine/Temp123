import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // 配置为库模式构建
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/main.tsx'),
      name: 'Temp123Components',
      fileName: (format) => `temp123-components.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // 外部依赖，避免打包进构建产物
      external: ['react', 'react-dom'],
      output: {
        // 为 UMD 构建提供全局变量
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    // 禁用混淆，生成可读的代码
    minify: false,
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
