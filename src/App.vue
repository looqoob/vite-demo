<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang='ts'>
import { provide } from 'vue'
import * as echarts from 'echarts'
provide('echarts',echarts)

</script>

<style scoped>

</style>
