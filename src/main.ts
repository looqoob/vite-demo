import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import "./assets/style/reset.less"

// pinia大菠萝引入
import {createPinia} from 'pinia'

// 饿了么ui引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'

const pinia = createPinia()
createApp(App).use(router).use(ElementPlus).use(pinia).mount('#app')
