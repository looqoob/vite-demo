import { createRouter,createWebHistory } from "vue-router";
import Login from '../views/login/index.vue';
import Layout from '@/layout/index.vue';
import Home from '../views/home/index.vue';
import Water from '../views/water/index.vue';
import Echarts from '../views/echarts/index.vue';
import Printer from '../views/printer/index.vue';
import Look from '../views/look/index.vue';
import HelloWorld from '../views/helloWorld/index.vue';
import Animation from '../views/animation/index.vue';

const router = createRouter({
    history:createWebHistory(),
    routes:[
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/',
        redirect: '/login',
      },
      {
        path:'/layout',
        redirect: '/layout/home',
        component: Layout,
        children: [
          {
            path:'/home',
            component:Home,
          },
          {
            path:'/water',
            component:Water,
          },
          {
            path:'/echarts',
            component:Echarts,
          },
          {
            path:'/helloWorld',
            component:HelloWorld,
          },
          {
            path:'/printer',
            component:Printer,
          },
          {
            path:'/look',
            component:Look,
          },
          {
            path:'/animation',
            component:Animation,
          },
        ]
      },
    ]
})
export default router;
