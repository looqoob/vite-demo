<template>
  <div class="comB">
    我是comB组件
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'

</script>

<style scoped lang='less'>
.comB {
  width: 200px;
  height: 200px;
  background-color: rgb(1, 118, 79);
  color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
