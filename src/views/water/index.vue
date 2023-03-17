<template>
  <div class="water">
    <Water :list="list"></Water>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'
import Water from '../../components/Water.vue'

let list:any = [
  {
    height:200,
    background:'red'
  },
  {
    height:100,
    background:'red'
  },
  {
    height:220,
    background:'red'
  },
  {
    height:300,
    background:'red'
  },
  {
    height:320,
    background:'red'
  },
  {
    height:150,
    background:'red'
  },
  {
    height:260,
    background:'red'
  },
  {
    height:310,
    background:'red'
  },
  {
    height:280,
    background:'red'
  },
  {
    height:230,
    background:'red'
  },
  {
    height:290,
    background:'red'
  },
  {
    height:340,
    background:'red'
  },
]

</script>

<style lang="less" scoped>
  .water{
    height: 100%;
  }
</style>
