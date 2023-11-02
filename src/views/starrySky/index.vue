<template>
  <div class="main">
    <div class="starrySky">星空</div>
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'

</script>

<style scoped lang='less'>
  .main {
    height: 97%;
    background-color: black !important;
    position: relative;
    .starrySky {
      text-align: center;
      background-image: linear-gradient( white,#38495a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 26px;
      margin-top: 300px;
    }
    .loop(3);
    @keyframes moveUp {
      100% {
        transform: translateY(-80vh);
      }
    }
    @d: 60s;
    .loop(@i) when (@i > 0) {
      .bg@{i} {
        width: @i + 0px;
        height: @i + 0px;
        //box-shadow: 10px 0 #3f73ff, 20px 0 #3f73ff, 10px 10px #3f73ff, 10px 20px #3f73ff;
        position: absolute;
        border-radius: 50%;
        top: 0;
        left: 0;
        .mixin(100);
        animation: moveUp @d - @i*15 linear infinite;
        &::after {
          content: '';
          position: fixed;left: 0;
          top: 80vh;
          width: inherit;
          height: inherit;
          border-radius: inherit;
          box-shadow: inherit;
        }
      }
      .loop(@i - 1)
    }
  }
  .mixin(@n) when(@n > 0) {
    box-shadow+ : ~`Math.round(Math.random() * 1400) + 'px' + ' ' +Math.round(Math.random() * 600) + 'px #FFF' `;
    .mixin((@n - 1));
  }
</style>
