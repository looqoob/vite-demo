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
        <template v-for="(item, index) in data.menuList" :key="item.id">
          <el-sub-menu
            :index="index + ''"
            v-if="(item.path == null || item.path == '') && item.pid == 0"
          >
            <template #title>
              <el-icon>
                <component v-if="item.icon" :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="(item2, index2) in item.children"
              :key="item2.id"
              :index="item2.path"
              >{{ item2.name }}</el-menu-item
            >
          </el-sub-menu>
          <el-menu-item v-else :index="item.path">
            <el-icon>
              <component v-if="item.icon" :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><Watermelon /></el-icon>
            <span>组件分类一</span>
          </template>
          <el-menu-item index="/layout/water">瀑布流</el-menu-item>
          <el-menu-item index="/layout/echarts">ECharts图表</el-menu-item>
          <el-menu-item index="/layout/printer">打印</el-menu-item>
          <el-menu-item index="/layout/look">摄像头</el-menu-item>
          <el-menu-item index="/layout/navigationBar">导航栏</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Pear /></el-icon>
            <span>组件分类二</span>
          </template>
          <el-menu-item index="/layout/helloWorld">helloWorld</el-menu-item>
          <el-menu-item index="/layout/modelValue">model父子双绑</el-menu-item>
          <el-menu-item index="/layout/animation">动画-水波纹</el-menu-item>
          <el-menu-item index="/layout/svgDemo">svg学习</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Mug /></el-icon>
            <span>外部页面</span>
          </template>
          <el-menu-item index="/layout/iframeCsdn">csdn</el-menu-item>
          <el-menu-item index="/layout/iframeVue3">vue3官网</el-menu-item>
          <el-menu-item index="/layout/iframeBilibili">b站</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/layout/userManagement">用户管理</el-menu-item>
          <el-menu-item index="/layout/roleManagement">角色管理</el-menu-item>
          <el-menu-item index="/layout/menuManagement">菜单管理</el-menu-item>
        </el-sub-menu> -->
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
import { ref, reactive, onMounted } from "vue";
import { userStore } from "../../store";
import { useRouter } from "vue-router";
import { getAdminMenuListByRole } from "@/api/role/index";

const router = useRouter();
const isCollapse = ref(false);
const data: any = reactive({
  menuList: [],
});
const editIsCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
let colorStyle: any = userStore();
const goHome = () => {
  console.log(data.menuList);
  router.push({ path: "/layout/home" });
};
onMounted(() => {
  getMenuList();
});
const getMenuList = () => {
  getAdminMenuListByRole({
    id: JSON.parse(localStorage.getItem("user") || "").role,
  }).then((res) => {
    data.menuList = res.data.data;
    console.log(data.menuList);
    
    localStorage.setItem("menu", JSON.stringify(res.data.data));
  });
};
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
