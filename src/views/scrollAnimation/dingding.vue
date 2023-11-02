<template>
  <div class="card">
    <div class="bg">
      <div class="header">
        <img style="width: 50px" src="./images/O1CN01kEuOaQ1OQe6INmAUY_!!6000000001700-55-tps-180-180.svg" alt="">
        <span>乔冰最帅</span>
      </div>
    </div>
    <div class="item">
      <div style="height: 70px; width: 70px; backgroundColor: #DBA001; top: 400px; left: 420px;"></div>
      <div style="height: 30px; width: 30px; backgroundColor: #217BEB; top: 490px; left: 520px;"></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'

</script>

<style scoped lang='less'>
  .card {
    height: 560px;
    overflow-y: scroll;
    scroll-timeline: --mainTimeline y;
    position: relative;
    .bg {
      height: 1500px;
      background-color: rgb(20, 20, 19);
      display: flex;
      justify-content: center;
      align-items: center;
      .header {
        width: 100px;
        height: 100px;
        position: absolute;
        bottom: -100px;
        animation: rotateAnimation 1s;
        animation-timeline: --mainTimeline;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        span {
          font-size: 14px;
          color: #e5e5e5;
        }
      }
      
      @keyframes rotateAnimation {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        60% {
          transform: scale(3.5);
          opacity: 1;
        }
        100% {
          transform: scale(6);
          opacity: 0;
        }
      }
    }
    .item {
      position: absolute;
      top: 0;
      height: 1500px;
      z-index: 999;
      div {
        position: absolute;
        z-index: 99999;
        border-radius: 30%;
        animation: itemAnimation 1s;
        animation-timeline: --mainTimeline;
      }
    }
    @keyframes itemAnimation {
        0% {
          transform: translateX(0) translateY(0) scale(1);
          opacity: .3;
        }
        30% {
          transform: translateX(-100px) translateY(0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateX(-500px) translateY(300px) scale(1.8);
          opacity: 1;
        }
      }
  }
</style>
