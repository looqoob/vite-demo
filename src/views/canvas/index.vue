<template>
  <el-card>
    <canvas ref="canvas" width="1300" height="200"></canvas>
  </el-card>
</template>

<script setup lang='ts'>
import { ref,reactive,onMounted } from 'vue'

const canvas = ref()
let myCanvas: any
onMounted(() => {
  pipo()
  aaa()
  bbb()
  requestAnimationFrame(ccc)
  ddd()
})
// 画小人
const pipo = () => {
  myCanvas = canvas.value.getContext('2d')
  myCanvas.beginPath()
  myCanvas.arc(100, 100, 50, 0, Math.PI * 2)
  myCanvas.moveTo(105, 100)
  myCanvas.arc(100, 100, 5, 0, Math.PI * 2)
  myCanvas.moveTo(130, 100)
  myCanvas.arc(100, 100, 30, 0, Math.PI)
  myCanvas.moveTo(87, 80)
  myCanvas.arc(80, 80, 7, 0, Math.PI * 2)
  myCanvas.moveTo(127, 80)
  myCanvas.arc(120, 80, 7, 0, Math.PI * 2)
  myCanvas.stroke()
  myCanvas.closePath()
}
// 画折线
const aaa = () => {
  myCanvas.beginPath()
  myCanvas.fillStyle = 'red'
  myCanvas.moveTo(200, 100)
  myCanvas.lineTo(250, 100)
  myCanvas.lineTo(225, 120)
  myCanvas.lineTo(200, 100)
  myCanvas.fill()
  myCanvas.fillStyle = '#000'
  myCanvas.closePath()
}
// 画圆弧
const bbb = () => {
  myCanvas.beginPath()
  myCanvas.moveTo(400, 100)
  myCanvas.arcTo(400, 150, 450, 150, 25)
  myCanvas.stroke()
  myCanvas.closePath()
}
// 画渐变
let index = 0
const ccc = () => {
  index += 0.0005
  if (index >= 1) {
    index = 0
  }
  myCanvas.beginPath()
  let linearGradient = myCanvas.createLinearGradient(500, 0, 800, 200)
  linearGradient.addColorStop(0, 'red')
  linearGradient.addColorStop(index, '#e600ff')
  linearGradient.addColorStop(1, '#3a00fb')
  myCanvas.fillStyle = linearGradient
  myCanvas.fillRect(500, 0, 300, 200)
  myCanvas.closePath()
  requestAnimationFrame(ccc)
}
// 画图案
const ddd = () => {
  let img = new Image()
  img.src = new URL('../../assets/vue.svg', import.meta.url).href
  img.onload = function() {
    let pattern = myCanvas.createPattern(img, 'repeat')
    myCanvas.fillStyle = pattern
    myCanvas.fillRect(900, 0, 200, 200)
  }
}
</script>

<style scoped lang='less'>
.a {
  color: #3a00fb;
}
</style>
