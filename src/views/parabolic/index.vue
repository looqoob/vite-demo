<template>
  <el-card class="card">
    <button class="btn" ref="btn" @click="btnClick">添加购物车</button>
    <div class="cart" ref="cart">
      <el-icon><ShoppingCart /></el-icon>
    </div>
    <div class="parabolic" ref="parabolic">
      <span class="item" ref="item"><Plus /></span>
    </div>
  </el-card>
</template>

<script setup lang='ts'>
import { ref,reactive,h } from 'vue'
const btn = ref()
const cart = ref()
const parabolic = ref()
const item = ref()

const btnClick = () => {
  const myParabolic = h('div',{
    class: 'parabolic',
    ref: 'parabolic',
    children: [h('span', {class: 'item', ref: 'item'})]
  })
  console.log(myParabolic);
  
  let x = btn.value.offsetLeft + btn.value.offsetWidth / 2 - parabolic.value.offsetWidth / 2
  let y = btn.value.offsetTop - parabolic.value.offsetHeight
  parabolic.value.style.transform = `translateX(${x}px) translateY(${y}px)`;
  btn.value.offsetTop
  parabolic.value.style.opacity = '1'
  parabolic.value.style.transition = '.6s';
  let newX = cart.value.offsetLeft + cart.value.offsetWidth / 2 - parabolic.value.offsetWidth / 2
  let newY = cart.value.offsetTop + cart.value.offsetWidth / 2 - parabolic.value.offsetWidth / 2
  parabolic.value.style.transform = `translateX(${newX}px)`
  console.log(item.value);
  item.value.style.transform = `translateY(${newY}px)`
}

</script>

<style scoped lang='less'>
  .card {
    height: 100%;
    position: relative;
    .cart {
      width: 60px;
      height: 60px;
      border: 2px rgb(80, 80, 80) solid;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      border-radius: 30px;
      background-color: antiquewhite;
      position: absolute;
      left: 20px;
      bottom: 20px;
    }
    .btn {
      position: absolute;
      background-color: rgb(109, 109, 249);
      color: white;
      right: 20px;
      top: 40px;
    }
    .parabolic {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      opacity: 0;
      box-sizing: border-box;
      z-index: 9999;
      .item {
        width: 20px;
        height: 20px;
        border: 2px rgb(169, 6, 6) solid;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        border-radius: 10px;
        background-color: rgb(29, 255, 206);
        color: rgb(158, 91, 91);
        transition: .6s cubic-bezier(.4,-0.62,1,.41);
      }
    }
  }
</style>
