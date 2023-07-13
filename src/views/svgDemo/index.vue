<template>
  <div class="svgDemo">
    <el-button @click="myClick">请求测试</el-button>
  </div>
</template>

<script setup lang="ts">
import {getRoleList} from '@/api/role'
import { ref, reactive } from "vue";

const myClick = () => {
  getRoleList({query:''}).then(res => {
    console.log(res);
  })
}
</script>

<style scoped>
.svgDemo{
  height: 100%;
}
</style>
