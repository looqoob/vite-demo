<template>
  <div>
    <iframe
      src="https://www.bilibili.com/"
      ref="box"
      style="width: 100%; height: 83vh"
      frameborder="0"
    ></iframe>
    <el-icon class="iframeBtn" @click="isScreenFull"><Rank /></el-icon>
  </div>
</template>

<script setup lang="ts">
import screenfull from "screenfull";
import { Rank } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
const box = ref();
//全屏方法
const isScreenFull = () => {
  screenfull.toggle(box.value);
};
</script>

<style scoped lang="less">
.iframeBtn {
  position: absolute;
  right: 25px;
  top: 75px;
  z-index: 100;
}
</style>
