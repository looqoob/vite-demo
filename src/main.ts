import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import "./assets/style/reset.less"

// pinia大菠萝引入
import {createPinia} from 'pinia'

// 饿了么ui引入
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
// 国际化
// import { zhCn } from "element-plus/dist/locale/zh-cn.mjs"; ,{locale: zhCn}

// 暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'

const pinia = createPinia()
createApp(App).use(router).use(ElementPlus,{locale: zhCn}).use(pinia).mount('#app')
