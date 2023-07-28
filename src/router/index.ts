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
import NavigationBar from '@/views/navigationBar/index.vue';
import IframeCsdn from '@/views/iframe/csdn/index.vue';
import IframeVue3 from '@/views/iframe/vue3/index.vue';
import IframeBilibili from '@/views/iframe/bilibili/index.vue';
import UserManagement from '@/views/system/userManagement/index.vue';
import RoleManagement from '@/views/system/roleManagement/index.vue';
import MenuManagement from '@/views/system/menuManagement/index.vue';
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
        path: '/:cathchAll(.*)',
        component: () => import('@/views/404/index.vue')
      },
      // {
      //   path:'/layout',
      //   redirect: '/layout/home',
      //   component: Layout,
      //   children: [
      //     {
      //       path:'/layout/home',
      //       component:Home,
      //     },
      //     {
      //       path:'/layout/water',
      //       component:Water,
      //       meta: {
      //         title: '瀑布流'
      //       }
      //     },
      //     {
      //       path:'/layout/echarts',
      //       component:Echarts,
      //       meta: {
      //         title: 'Echarts图表'
      //       }
      //     },
      //     {
      //       path:'/layout/helloWorld',
      //       component:HelloWorld,
      //       meta: {
      //         title: 'helloWorld'
      //       }
      //     },
      //     {
      //       path:'/layout/printer',
      //       component:Printer,
      //       meta: {
      //         title: '打印'
      //       }
      //     },
      //     {
      //       path:'/layout/look',
      //       component:Look,
      //       meta: {
      //         title: '摄像头'
      //       }
      //     },
      //     {
      //       path:'/layout/animation',
      //       component:Animation,
      //       meta: {
      //         title: '水波动画'
      //       }
      //     },
      //     {
      //       path:'/layout/svgDemo',
      //       component:SvgDemo,
      //       meta: {
      //         title: 'svg学习'
      //       }
      //     },
      //     {
      //       path:'/layout/modelValue',
      //       component:ModelValue,
      //       meta: {
      //         title: '双向绑定'
      //       }
      //     },
      //     {
      //       path:'/layout/navigationBar',
      //       component:NavigationBar,
      //       meta: {
      //         title: '导航栏'
      //       }
      //     },
      //     {
      //       path:'/layout/iframeCsdn',
      //       component:IframeCsdn,
      //       meta: {
      //         title: 'csdn'
      //       }
      //     },
      //     {
      //       path:'/layout/iframeVue3',
      //       component:IframeVue3,
      //       meta: {
      //         title: 'Vue3官网'
      //       }
      //     },
      //     {
      //       path:'/layout/iframeBilibili',
      //       component:IframeBilibili,
      //       meta: {
      //         title: 'b站'
      //       }
      //     },
      //     {
      //       path:'/layout/userManagement',
      //       component:UserManagement,
      //       meta: {
      //         title: '用户管理'
      //       }
      //     },
      //     {
      //       path:'/layout/roleManagement',
      //       component:RoleManagement,
      //       meta: {
      //         title: '角色管理'
      //       }
      //     },
      //     {
      //       path:'/layout/menuManagement',
      //       component:MenuManagement,
      //       meta: {
      //         title: '菜单管理'
      //       }
      //     },
      //   ]
      // },
    ]
})

export const setRoutes = () => {
  const menus = JSON.parse(localStorage.getItem('menu') || '');
  if (menus) {
    const layoutRoute: any = { path:'/layout', redirect: '/layout/home', component: () => import('@/layout/index.vue'), children:[] }
    menus.forEach((item: any) => {
      if (item.path) {
        let itemMenu = { path:item.path, component: () => import(`@/views/${item.pagepath}/index.vue`), meta:{title: item.name} }
        layoutRoute.children.push(itemMenu)
      } else if(item.children && item.children.length) {
        item.children.forEach((item2: any) => {
          if (item2.path) {
            let itemMenu = { path:item2.path, component: () => import(`@/views/${item2.pagepath}/index.vue`), meta:{title: item2.name} }
            layoutRoute.children.push(itemMenu)
          }
        })
      }
    });
    console.log(layoutRoute);
    
    router.addRoute(layoutRoute)
  }
}
setRoutes()

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
        next('/layout/home')
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
