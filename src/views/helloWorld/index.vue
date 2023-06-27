<template>
  <div>
    <HelloWorld title="乔冰小商城" @on-click="lalala"></HelloWorld>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue';

const lalala = (e: any) => {
  console.log(e);
}
</script>

<style scoped>

</style>
