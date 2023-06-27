<template>
  <div>
    <h2>子组件数据：{{modelValue}}</h2>
    <button @click="aaa">加1000(父子绑定)</button>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'
let props = defineProps(['modelValue'])
let emit = defineEmits(['update:modelValue'])
let name = ref('儿子')
const aaa = () => {
  emit('update:modelValue',props.modelValue + 1000)
}

defineExpose({
  name
})
</script>

<style scoped>

</style>
