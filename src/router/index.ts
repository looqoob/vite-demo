import { createRouter,createWebHistory } from "vue-router";
import { userStore } from "@/store";
import Login from '../views/login/index.vue';
import Layout from '@/layout/index.vue';
import Home from '../views/home/index.vue';
import Water from '../views/water/index.vue';
import Echarts from '../views/echarts/index.vue';
import Printer from '../views/printer/index.vue';
import Look from '../views/look/index.vue';
import HelloWorld from '../views/helloWorld/index.vue';
import Animation from '../views/animation/index.vue';
import SvgDemo from '../views/svgDemo/index.vue';
import ModelValue from '../views/modelValue/index.vue';
import NavigationBar from '@/views/navigationBar/index.vue'
import { ElMessage } from 'element-plus';

const router = createRouter({
    history:createWebHistory(),
    routes:[
      {
        path: '/login',
        component: Login,
        meta: {icon: ''}
      },
      {
        path: '/',
        redirect: '/layout',
      },
      {
        path:'/layout',
        redirect: '/home',
        component: Layout,
        children: [
          {
            path:'/home',
            component:Home,
          },
          {
            path:'/water',
            component:Water,
            meta: {
              title: '瀑布流'
            }
          },
          {
            path:'/echarts',
            component:Echarts,
            meta: {
              title: 'Echarts图表'
            }
          },
          {
            path:'/helloWorld',
            component:HelloWorld,
            meta: {
              title: 'helloWorld'
            }
          },
          {
            path:'/printer',
            component:Printer,
            meta: {
              title: '打印'
            }
          },
          {
            path:'/look',
            component:Look,
            meta: {
              title: '摄像头'
            }
          },
          {
            path:'/animation',
            component:Animation,
            meta: {
              title: '水波动画'
            }
          },
          {
            path:'/svgDemo',
            component:SvgDemo,
            meta: {
              title: 'svg学习'
            }
          },
          {
            path:'/modelValue',
            component:ModelValue,
            meta: {
              title: '双向绑定'
            }
          },
          {
            path:'/navigationBar',
            component:NavigationBar,
            meta: {
              title: '导航栏'
            }
          },
        ]
      },
    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
      if (localStorage.getItem('user') === null) {
        next()
      } else {
        ElMessage({
          type: 'error',
          message: "登录状态无法前往登录页哦"
        })
        next('/home')
      }
  } else {
    if (localStorage.getItem('user') !== null) {
      // 在登录状态下前往任何页面
      const text: any = userStore();
      text.addTabData(to);
      next()
    } else {
      ElMessage({
        type: 'error',
        message: "需要登录才可访问该页面"
      })
      next('/login')
    }
  }
})

export default router;
