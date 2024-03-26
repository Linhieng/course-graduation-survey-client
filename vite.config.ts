import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        viteMockServe({
            mockPath: './src/mock2/',
            enable: true,
            logger: true,
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@icon': fileURLToPath(new URL('./src/components/icons', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets/style', import.meta.url)),
        }
    },
    server: {
        // 允许局域网访问
        host: '0.0.0.0'
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import '@/assets/style/mixin.scss';`,
            },
        },
    },
})
