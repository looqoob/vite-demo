<template>
  <div class="layout">
    <Menu></Menu>
    <div class="layout-right">
      <Header></Header>
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'
import Header from './Header/index.vue'
import Main from './Main/index.vue'
import Menu from './Menu/index.vue'

</script>

<style lang="less" scoped>
  .layout{
    display: flex;
    height: 100vh;
    overflow: hidden;
    .layout-right{
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
