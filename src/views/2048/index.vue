<template>
  <div>
    <el-card class="card">
      <el-row :gutter="20">
        <el-col :span="6"> </el-col>
        <el-col :span="12">
          <div class="game">
            <div class="main">
              <div class="arrRow" v-for="(item, index) in gameList" :key="index">
                <div class="item" v-for="(item2, index2) in item" :key="index2"></div>
              </div>
            </div>
            <div class="footer">
              <span>积分：0</span>
              <el-button @click="begin">开始游戏</el-button>
              <span>难度：0</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6"> </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

let gameList = ref<number[][]>([]);
gameList.value = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
]
const begin = () => {};
</script>

<style scoped lang="less">
@bg: rgb(238, 105, 105);

.card {
  height: 100%;
  overflow-y: scroll;
  .game {
    margin: 50px auto;
    width: 400px;
    height: 460px;
    border: 5px @bg solid;
    border-radius: 7px;
    position: relative;
    .main {
      width: 100%;
      height: 400px;
      background-color: rgb(215, 229, 234);
      .arrRow {
        height: calc(400px / 4);
        .item {
          width: calc(400px / 4);
          height: calc(400px / 4);
          display: inline-block;
          background-color: rgb(239, 255, 228);
          border: 5px white solid;
          box-sizing: border-box;
        }
      }
    }
    .footer {
      width: 400px;
      height: 60px;
      line-height: 60px;
      position: absolute;
      bottom: 0;
      background-color: @bg;
      border-top: 5px solid @bg;
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
