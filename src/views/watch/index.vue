<template>
  <el-card style="height: 100%;">
    <h1>1、侦听器基本使用</h1>
    <div class="item">
      <el-input style="width: 40px;" v-model="input" />
      <span>旧值：{{ value.old }}</span>
      <span>新值：{{ value.new }}</span>
    </div>
  </el-card>
</template>

<script setup lang='ts'>
import { ref,reactive,watch } from 'vue'
let input = ref('')
let value = reactive({
  old: '',
  new: ''
})
watch(input, (newValue, oldValue) => {
  value.new = newValue
  value.old = oldValue
})
</script>

<style scoped lang='less'>
  h1{
    font-size: 20px;
  }
  span{
    margin-left: 10px;
  }
  .item {
    margin: 8px 0;
    padding: 5px;
    overflow: hidden;
    min-height: 100px;
    background-color: rgb(188, 255, 255);
  }
</style>
