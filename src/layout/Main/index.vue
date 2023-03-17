<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script setup lang='ts'>
  import { userStore } from '../../store'
  const colorStyle: any = userStore()
</script>

<style lang="less" scoped>
  .main{
    flex: 1;
    overflow: auto;
    padding: 20px;
    background-color: v-bind('colorStyle.getBackground.background_h2');
    color: v-bind('colorStyle.getBackground.color');
    transition: all 0.3s;
  }
</style>
