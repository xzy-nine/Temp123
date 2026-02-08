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

  // 配置为多入口构建，保持文件层级
  build: {
    // 禁用库模式，使用默认的多入口构建
    lib: false,
    // 配置输出目录结构
    rollupOptions: {
      // 外部依赖，避免打包进构建产物
      external: ['react', 'react-dom'],
      output: {
        // 保持原始文件结构
        preserveModules: true,
        // 模块名使用原始文件路径
        preserveModulesRoot: 'src',
        // 为 preserveModules 设置正确的 entry signatures 选项
        preserveEntrySignatures: 'strict',
        // 为 UMD 构建提供全局变量
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    // 禁用混淆，生成可读的代码
    minify: false,
    // 配置输出目录
    outDir: 'dist',
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
