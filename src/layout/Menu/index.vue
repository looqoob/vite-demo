<template>
  <div class="menu">
    <div class="home" @click="goHome">首页</div>
    <el-row class="tac">
      <!-- :collapse-transition="false" -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :text-color="colorStyle.getBackground.color"
        :background-color="colorStyle.getBackground.background_h1"
        unique-opened
        router
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Watermelon /></el-icon>
            <span>组件分类一</span>
          </template>
          <el-menu-item index="/water">瀑布流</el-menu-item>
          <el-menu-item index="/echarts">ECharts图表</el-menu-item>
          <el-menu-item index="/printer">打印</el-menu-item>
          <el-menu-item index="/look">摄像头</el-menu-item>
          <el-menu-item index="/navigationBar">导航栏</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Pear /></el-icon>
            <span>组件分类二</span>
          </template>
          <el-menu-item index="/helloWorld">helloWorld</el-menu-item>
          <el-menu-item index="/modelValue">model父子双绑</el-menu-item>
          <el-menu-item index="/animation">动画-水波纹</el-menu-item>
          <el-menu-item index="/svgDemo">svg学习</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Mug /></el-icon>
            <span>外部页面</span>
          </template>
          <el-menu-item index="/iframeCsdn">csdn</el-menu-item>
          <el-menu-item index="/iframeVue3">vue3官网</el-menu-item>
          <el-menu-item index="/iframeBilibili">b站</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/userManagement">用户管理</el-menu-item>
          <el-menu-item index="/roleManagement">角色管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-row>
  </div>
  <div class="menuBtn" @click="editIsCollapse">
    <el-icon :size="14" color=" #73767a">
      <ArrowRightBold v-show="isCollapse" />
      <ArrowLeftBold v-show="!isCollapse" />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import {
  Pear,
  Mug,
  Watermelon,
  Setting,
  ArrowRightBold,
  ArrowLeftBold,
} from "@element-plus/icons-vue";
import { userStore } from "../../store";
import { useRouter } from 'vue-router'
const router = useRouter()
const isCollapse = ref(false);
const editIsCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
let colorStyle: any = userStore();
const goHome = () => {
  router.push({path: '/home'})
}
</script>

<style lang="less" scoped>
.menu {
  display: inline-block;
  background-color: v-bind("colorStyle.getBackground.background_h1");
  transition: all 0.3s;
  .home {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: rgb(200, 255, 255);
  }
}
.el-menu {
  border-right: 0 solid red;
}
:deep(.el-menu--inline) {
  transition: all 0.3s;
}
.menuBtn {
  display: inline-block;
  width: 15px;
  text-align: center;
  height: 100%;
  line-height: 100vh;
  background-color: v-bind("colorStyle.getBackground.background_h3");
  color: v-bind("colorStyle.getBackground.color");
  transition: all 0.3s;
}
</style>
