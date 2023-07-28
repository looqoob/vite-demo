import { createApp, Directive } from 'vue'
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
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局自定义指令
import * as directives from '@/directives'
 
const pinia = createPinia()
const app = createApp(App).use(router).use(ElementPlus,{locale: zhCn}).use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
Object.keys(directives).forEach(key => {  //Object.keys() 返回一个数组，值是所有可遍历属性的key名
  app.directive(key, (directives as { [key: string ]: Directive })[key])  //key是自定义指令名字；后面应该是自定义指令的值，值类型是string
})
app.mount('#app')
