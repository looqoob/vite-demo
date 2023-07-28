<template>
  <div class="layout">
    <Menu></Menu>
    <div class="layout-right">
      <Header></Header>
      <Tab></Tab>
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive, onMounted } from 'vue'
import Header from './Header/index.vue'
import Tab from './Tab/index.vue'
import Main from './Main/index.vue'
import Menu from './Menu/index.vue'

// 项目初始化需要获取的字典值
onMounted(() => {
  
})
</script>

<style lang="less" scoped>
  .layout{
    display: flex;
    height: 100vh;
    // overflow: hidden;
    .layout-right{
      flex: 1;
      display: flex;
      overflow: hidden;
      flex-direction: column;
    }
  }
</style>
