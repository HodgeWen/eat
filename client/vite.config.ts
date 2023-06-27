import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {
  Vuetify3Resolver
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [Vuetify3Resolver()],
      dts: true,
      include: [/\.vue$/]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url))
    }
  },

  server: {
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:2000'
      }
    }
  }
})
