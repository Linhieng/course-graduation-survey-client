import './assets/style/index.scss'
import 'element-plus/dist/index.css'
// 使用 mock 模拟请求得到的数据
import './mock'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './locale'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
