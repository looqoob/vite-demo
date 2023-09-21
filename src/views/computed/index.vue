<template>
  <el-card style="height: 100%;">
    <h1>1、计算属性基本使用</h1>
    <div class="item">
      <el-input style="width: 50px;" v-model="data.input1"/>
      <el-input style="width: 50px; margin-left: 5px;" v-model="data.input2"/>
      <span style="margin-left: 15px;">{{value}}</span>
    </div>
  </el-card>
</template>

<script setup lang='ts'>
import { ref,reactive,computed } from 'vue'
let data = reactive({
  input1: 0,
  input2: 0
})
let value = computed(() => {
  return +data.input1 + +data.input2
})
</script>

<style scoped lang='less'>
  h1{
    font-size: 20px;
  }
  .item {
    margin: 8px 0;
    padding: 5px;
    overflow: hidden;
    min-height: 100px;
    background-color: rgb(188, 255, 255);
  }
</style>
