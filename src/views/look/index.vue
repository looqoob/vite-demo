<template>
  <div class="look">
    <video width="640" height="480" autoplay ref="video"></video>
    <br />
    <el-button @click="action">{{ btn ? "结束" : "开始" }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

let btn = ref<boolean>(false);
const video: any = ref(null);
const action = async () => {
  btn.value = !btn.value;
  let stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.value.srcObject = stream;
};
</script>

<style scoped>
.look {
  text-align: center;
}
video {
  border-radius: 500px;
  background-color: #bebebe;
}
</style>
