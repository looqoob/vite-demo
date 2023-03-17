<template>
  <div class="header">
    vue3测试项目
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
           style="--el-switch-on-color: #000; --el-switch-off-color: #dcdfe6; --el-switch-border-color: #fff"
         />
     </div>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'
import screenfull from 'screenfull'
import {
  FullScreen,
} from '@element-plus/icons-vue'
import { userStore } from '../../store'
// 1. 引入useDark 
// import { useDark } from '@vueuse/core';

// 2. 使用useDark 
// const isDark = useDark()

// 3. 主题配置
// const themeConfig = reactive({
//   isDark: isDark,
// });

let text: any = userStore()

const fullScreen = () => {
  screenfull.toggle()
}

const editNightShow = (val: any) => {
  text.editNightShow(val)
}

</script>

<style lang="less" scoped>
  .header{
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid #ccc;
    background-color: v-bind("text.getBackground.background_h1");
    color: v-bind("text.getBackground.color");
    transition: all 0.3s;
  }
  .theme-list{
    float: right;
    margin-right: 20px;
  }
  :deep(.switch){
    border: 1px solid #ffffff;
  }
  .icon{
    float: right;
    margin-top: 21px;
    margin-right: 20px;
  }
</style>
