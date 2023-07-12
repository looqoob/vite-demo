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
    <div class="barBg" ref="barBg1"></div>
    <div class="barBg" ref="barBg2"></div>
    <div class="barBg" ref="barBg3"></div>
    <div class="barBg" ref="barBg4"></div>
    <div class="barBg" ref="barBg5"></div>
  </div>
</template>

<script setup lang="ts">
import { Reading, Collection, House, View, User } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
let barIndex = ref(-1);
const barBg1 = ref();
const barBg2 = ref();
const barBg3 = ref();
const barBg4 = ref();
const barBg5 = ref();
onMounted(() => {
  barBg2.value.style.marginLeft = '20.5%'
  barBg3.value.style.marginLeft = '40.5%'
  barBg4.value.style.marginLeft = '60.5%'
  barBg5.value.style.marginLeft = '80.5%'
  setBarIndex(0)
})
const barList = ["书架", "精选", "主页", "发现", "我"];
const setBarIndex = (index: number) => {
  if (index != barIndex.value) {
    barBg1.value.style.bottom = -35 + 'px'
    barBg1.value.classList.remove('animation')
    barBg2.value.style.bottom = -35 + 'px'
    barBg2.value.classList.remove('animation')
    barBg3.value.style.bottom = -35 + 'px'
    barBg3.value.classList.remove('animation')
    barBg4.value.style.bottom = -35 + 'px'
    barBg4.value.classList.remove('animation')
    barBg5.value.style.bottom = -35 + 'px'
    barBg5.value.classList.remove('animation')
    barIndex.value = index;
    if (index == 0) {
      barBg1.value.classList.add('animation')
      barBg1.value.style.bottom = 20 + 'px';
    } else if (index == 1) {
      barBg2.value.classList.add('animation')
      barBg2.value.style.bottom = 20 + 'px';
    }else if (index == 2) {
      barBg3.value.classList.add('animation')
      barBg3.value.style.bottom = 20 + 'px';
    }else if (index == 3) {
      barBg4.value.classList.add('animation')
      barBg4.value.style.bottom = 20 + 'px';
    }else if (index == 4) {
      barBg5.value.classList.add('animation')
      barBg5.value.style.bottom = 20 + 'px';
    }
  }
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
    bottom: -35px;
    transition: all 0.3s;
    z-index: 3;
    filter: blur(10px);
  }
  .barBg2 {
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
.animation {
  animation: bar 1s ease;
}
@keyframes bar {
  0%{
    bottom: 140px;
  }
  20%{
    bottom: 15px;
  }
  30%{
    bottom: 40px;
  }
  40%{
    bottom: 17px;
  }
  60%{
    bottom: 30px;
  }
  80%{
    bottom: 19px;
  }
  90%{
    bottom: 22px;
  }
  100%{
    bottom: 20px;
  }
}
</style>
