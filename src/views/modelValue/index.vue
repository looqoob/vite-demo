<template>
  <div>
    <h2>父组件数据：{{money}}</h2>
    <!-- <sun :modelValue="money" @update:modelValue="aaa"></sun> -->
    <sun v-model="money" ref="hello"></sun>
  </div>
</template>

<script setup lang='ts'>
import sun from './sun/index.vue'
import { ref,reactive } from 'vue'
let money = ref(10000)
// const aaa = (num: number) => {
//   money.value = num
// }
let hello = ref()
setTimeout(() => {
  console.log(hello.value.name);
}, 1000)

</script>

<style scoped>

</style>
