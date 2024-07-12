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
  define: { global: 'window' },
  resolve: {
    alias: {
      '@classroom/app':      path.resolve(__dirname, './modules/app'),
      '@classroom/protocol': path.resolve(__dirname, './modules/protocol/lib'),
    },
  },
})
