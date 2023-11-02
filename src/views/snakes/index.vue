<template>
  <el-card class="card">
    <el-row :gutter="20">
      <el-col :span="6">
        
      </el-col>
      <el-col :span="12">
        <div class="game">
          <div class="main">
            <div class="arrRow" v-for="(item, index) in gameList" :key="index">
              <div class="item" :class="{food: item2 == 1, snake: item2 == 2, snakeHerder: item2 == 3,}" v-for="(item2, index2) in item" :key="index2">

              </div>
            </div>
          </div>
          <div class="footer">
            <span>积分：{{foodNum}}</span>
            <el-button @click="begin">开始游戏</el-button>
            <span>难度：困难</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'
import food from "./hook/food"
import game from "./hook/game"
import snake from "./hook/snake"
import { ElMessage } from 'element-plus'

let { initGameList, gameBegin } = game()
let { initFoodList, addFood } = food()
let { snakeList, initSnake, newSnake, direction } = snake()

// 地图 0：空，1：食物，2：蛇身，3：蛇头
let gameList = reactive<number[][]>([])

// 真实行动的方向
let direction2 = ref(3)

let timer: any = null

// 吃到食物的数量
let foodNum = ref(0)

// 点击开始游戏
const begin = () => {
  // 开始游戏
  gameBegin(() => {
    foodNum.value = 0
    // 初始化地图
    initGameList(gameList)
    // 放入食物
    initFoodList(gameList)
    // 蛇蛇出场，参数：地图， 移动事件
    initSnake(gameList, () => {
      if (timer) {
        clearInterval(timer)
      }
      timer = setInterval(() => {
        direction2.value = direction.value
        //isFood ==> 0: 没吃到, 1: 吃到了 2：咬到身体 3：撞墙
        let isFood = newSnake(gameList)
        if (isFood == 1) {
          foodNum.value++
          addFood(snakeList, gameList)
        } else if(isFood == 2) {
          over()
        } else if(isFood == 3) {
          over()
        }
      }, 300)
      // 添加键盘事件改变蛇蛇方向
      document.addEventListener('keydown', (e) => {
        switch(e.key) {
          case 'ArrowUp':
            if (direction2.value != 2) {
              direction.value = 0
            }
            break
          case 'ArrowRight':
            if (direction2.value != 3) {
              direction.value = 1
            }
            break
          case 'ArrowDown':
            if (direction2.value != 0) {
              direction.value = 2
            }
            break
          case 'ArrowLeft':
            if (direction2.value != 1) {
              direction.value = 3
            }
            break
        }
      })
    })
  })
}
// 游戏结束
const over = () => {
  clearInterval(timer)
  ElMessage({
    type: 'error',
    message: '游戏失败',
  })
}

</script>

<style scoped lang='less'>
  .card {
    height: 100%;
    overflow-y: scroll;
    .game {
      margin: 50px auto;
      width: 400px;
      height: 460px;
      border: 5px rgb(238, 105, 105) solid;
      border-radius: 7px;
      position: relative;
      .main {
        width: 100%;
        height: 400px;
        background-color: rgb(118, 218, 251);
        .arrRow {
          height: calc(400px / 30);
          .item {
            width: calc(400px / 30);
            height: calc(400px / 30);
            display: inline-block;
          }
          .food {
            background-color: yellow;
            border-radius: 10px;
          }
          .snake {
            background-color: black;
            box-sizing: border-box;
            border: 1px white solid;
          }
          .snakeHerder {
            background-color: rgb(34, 118, 33);
            box-sizing: border-box;
            border: 1px white solid;
          }
        }
      }
      .footer {
        width: 400px;
        height: 60px;
        line-height: 60px;
        position: absolute;
        bottom: 0;
        background-color: rgb(238, 105, 105);
        border-top: 5px solid rgb(238, 105, 105);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        color: aliceblue;
        font-size: 18px;
        .el-button {
          margin-top: 13px;
        }
      }
    }
  }
</style>
