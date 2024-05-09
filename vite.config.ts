import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { SFCFluentPlugin } from 'unplugin-fluent-vue/vite'

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    SFCFluentPlugin({
      blockType: 'fluent',
      checkSyntax: true,
    }),
    legacy()
  ],
  define: {global: 'window'},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@protocol': path.resolve(__dirname, './submodules/protocol/lib'),
      '@framework': path.resolve(__dirname, './submodules/framework/lib'),
    },
  },
})
