<template>
  <div>
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">钉钉滚动</el-menu-item>
    <el-menu-item index="1">1233</el-menu-item>
  </el-menu>
  <div>
    <DingDing v-if="activeIndex === 0" />
  </div>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'
import DingDing from './dingding.vue'

let activeIndex = ref(0)
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = +key
}
</script>

<style scoped lang='less'>

</style>
