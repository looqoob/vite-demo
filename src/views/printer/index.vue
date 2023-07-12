<template>
  <div>
    <div id="printId">12131414141</div>
    <button @click="printDOM">打印</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const printDOM = () => {
  // 获取局部html，也就是打印的区域
  const printHTML = document.querySelector("#printId")!.innerHTML;
  // 将打印的区域赋值给新窗口body，进行打印
  const newWindow = window.open("", "");
  newWindow!.document.write(printHTML);
  newWindow!.window.print();
  newWindow!.window.close(); // 打印完成后关闭后新窗口
};
</script>

<style scoped>
#printId {
  color: red;
}
</style>

<style type="text/css" media="print">
#printId {
  color: red;
}
</style>
