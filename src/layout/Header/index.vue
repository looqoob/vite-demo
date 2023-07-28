<template>
  <div class="header">
    <span class="headerTitle">vue3测试项目</span>
    <el-icon class="icon" @click="fullScreen"><FullScreen /></el-icon>
    <div class="theme-list">
      <!--  v-model 绑定 themeConfig.isDark-->
      <el-switch
        v-model="text.nightShow"
        inline-prompt
        active-value="ture"
        active-icon="Sunny"
        inactive-icon="Moon"
        @change="editNightShow"
        style="
          --el-switch-on-color: #000;
          --el-switch-off-color: #dcdfe6;
          --el-switch-border-color: #fff;
        "
      />
    </div>
    <div class="headerImg" ref="headerImg" @mouseover="mousemove">
      <!-- <el-dropdown>
        <img src="../../assets/路飞.jpg" style="width: 40px; height: 40px;">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
      <img src="../../assets/路飞.jpg" style="width: 40px; height: 40px" />
      <div class="div">
        <div class="userName">{{ user.name }}</div>
        <el-button @click="logout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import screenfull from "screenfull";
import { FullScreen } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { userStore } from "../../store";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter();

let text: any = userStore();

const fullScreen = () => {
  screenfull.toggle();
};

const editNightShow = (val: any) => {
  text.editNightShow(val);
};

const logout = () => {
  ElMessageBox.confirm("是否要退出登录？", "Warning", {
    confirmButtonText: "退出",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "退出成功",
      });
      localStorage.removeItem("user");
      router.push({ path: "/login" });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消退出",
      });
    });
};

const headerImg = ref("");
const mousemove = () => {
};
const user = reactive(JSON.parse(localStorage.getItem('user') as any))
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #ccc;
  background-color: v-bind("text.getBackground.background_h1");
  color: v-bind("text.getBackground.color");
  .headerTitle {
    position: relative;
    left: 75px;
  }
  transition: all 0.3s;
  .headerImg {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
    line-height: 40px;
    transition: all 0.5s;
    position: relative;
    top: 0;
    right: 0;
    z-index: 99;
    img {
      border-radius: 15px;
      border: 2px white solid;
      transition: all 0.5s;
      position: relative;
      z-index: 30;
    }
    .div {
      width: 200px;
      height: 400px;
      background-color: #ffffff;
      position: absolute;
      bottom: -390px;
      right: -60px;
      border-radius: 10px;
      box-sizing: border-box;
      padding-top: 40px;
      transition: all 0.3s;
      font-size: 12px;
      display: none;
      z-index: 1;
      background: linear-gradient(145deg, #fbf9f9, #f0f0f0);
      box-shadow: 5px 5px 8px #b5b5b5, -5px -5px 8px #ffffff;
      .userName {
        font-size: 20px;
      }
    }
    &:hover img {
      transform: scale(2);
      border-radius: 50px;
      transform-origin: right top;
    }
    &:hover .div {
      display: block;
    }
  }
}
.theme-list {
  float: right;
  margin-right: 20px;
}
:deep(.switch) {
  border: 1px solid #ffffff;
}
.icon {
  float: right;
  margin-top: 21px;
  margin-right: 20px;
}
</style>
