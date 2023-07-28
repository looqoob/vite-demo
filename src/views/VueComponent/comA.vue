<template>
  <div class="comA">
    我是comA组件
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'

</script>

<style scoped lang='less'>
.comA {
  width: 200px;
  height: 200px;
  background-color: aquamarine;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
