<template>
  <div>我是主页</div>
  <div class="text"></div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'
import { userStore } from '../../store'
const text:any = userStore()
</script>

<style scoped>
  .text{
    width: 200px;
    height: 200px;
    background-color: v-bind("text.getBackground.background_h1");
    transition: all 0.3s;
  }
</style>
