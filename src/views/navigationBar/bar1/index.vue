<template>
  <div class="barBox">
    <div class="bar"></div>
    <div class="bar2">
      <div
        class="barItem"
        v-for="(item, index) in barList"
        @click="setBarIndex(index)"
        :key="item"
      >
        <div class="fant" :class="{ barIndex: index == barIndex }">
          <el-icon class="icon" v-show="index == 0"><Reading /></el-icon>
          <el-icon class="icon" v-show="index == 1"><Collection /></el-icon>
          <el-icon class="icon" v-show="index == 2"><House /></el-icon>
          <el-icon class="icon" v-show="index == 3"><View /></el-icon>
          <el-icon class="icon" v-show="index == 4"><User /></el-icon>
          {{ item }}
        </div>
      </div>
    </div>
    <div class="barBg" ref="barBg"></div>
  </div>
</template>

<script setup lang="ts">
import { Reading, Collection, House, View, User } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
let barIndex = ref(0);
const barBg = ref();
const barList = ["书架", "精选", "主页", "发现", "我"];
const setBarIndex = (index: number) => {
  barIndex.value = index;
  barBg.value.style.marginLeft = barIndex.value * 20 + 0.5 + "%";
};
</script>

<style scoped lang="less">
.barBox {
  height: 83vh;
  position: relative;
  z-index: 99;
  background-color: aliceblue;
  filter: contrast(30);
  .bar {
    position: absolute;
    bottom: 0;
    height: 60px;
    width: 100%;
    background-color: rgb(200, 0, 10);
    filter: blur(10px);
  }
  .bar2 {
    position: absolute;
    bottom: 0;
    height: 60px;
    width: 100%;
    color: white;
    font-size: 14px;
    display: flex;
    .barItem {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(200, 0, 10);
      z-index: 10;
      .fant {
        width: 100%;
        text-align: center;
        position: relative;
        transition: all 0.3s;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          font-size: 24px;
          transition: all 0.3s;
        }
      }
      .barIndex {
        bottom: 20px;
        font-size: 24px;
        .icon {
          font-size: 42px;
        }
      }
    }
  }
  .barBg {
    position: absolute;
    width: 80px;
    height: 80px;
    background-color: rgb(200, 0, 10);
    border-radius: 40px;
    bottom: 20px;
    transition: all 0.3s;
    z-index: 3;
    filter: blur(10px);
  }
}
</style>
