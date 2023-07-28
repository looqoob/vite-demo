<template>
  <el-card>
    <h1>当前鼠标所点击的位置为 x: {{ point.x }}, y: {{ point.y }}</h1>
  </el-card>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'
import usePoint from '../../hooks/usePoint'

let point = usePoint()
</script>

<style scoped lang='less'>

</style>
