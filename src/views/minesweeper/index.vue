<template>
  <el-card class="card">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-select v-model="difficulty" placeholder="Select" size="large" style="margin-left: 40px;">
          <el-option
            v-for="item in difficultyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <div class="main">
          <div class="haeder">
            <div class="header_l">
              <img src="./images/time/d0.svg" ref="numThree">
              <img src="./images/time/d0.svg" ref="numTwo">
              <img src="./images/time/d0.svg" ref="numOne">
            </div>
            <div class="header_c">
              <img v-if="gameState == 1" src="./images/face_unpressed.svg" @click="setState()">
              <img v-else-if="gameState == 0" src="./images/face_lose.svg" @click="setState()">
              <img v-else src="./images/face_win.svg" @click="setState()">
            </div>
            <div class="header_r">
              <img src="./images/time/d0.svg" ref="timeThree">
              <img src="./images/time/d0.svg" ref="timeTwo">
              <img src="./images/time/d0.svg" ref="timeOne">
            </div>
          </div>
          <div class="content">
            <div class="arrRow" v-for="(item, index) in arr" :key="index">
              <div v-for="(item2, index2) in item" :key="index2" style="display: inline-block;">
                <img v-show="typeArr[index][index2] == 0" src="./images/closed.svg" @click="open(index, index2)" @contextmenu.prevent="setFlag(index, index2)">
                <img v-show="typeArr[index][index2] == 2" src="./images/flag.svg" @contextmenu.prevent="setFlag(index, index2)">
                <img v-show="typeArr[index][index2] == 1 && arr[index][index2] != -1" :ref="el => imgDom(el, index, index2)" src="">
                <img v-show="typeArr[index][index2] == 1 && arr[index][index2] == -1" src="./images/mine.svg" @click="open(index, index2)">
                <img v-show="typeArr[index][index2] == 3 && arr[index][index2] == -1" src="./images/mine_red.svg" @click="open(index, index2)">
              </div>
            </div>
          </div>
          <div class="content_l"></div>
          <div class="content_r"></div>
          <div class="content_t"></div>
          <div class="content_b"></div>
          <div class="content_l_t"></div>
          <div class="content_r_t"></div>
          <div class="content_l_b"></div>
          <div class="content_r_b"></div>
          <div class="header_bg_l"></div>
          <div class="header_bg_r"></div>
          <div class="header_bg_t"></div>
          <div class="header_bg_t_l"></div>
          <div class="header_bg_t_r"></div>
        </div>
      </el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
  </el-card>
</template>

<script setup lang='ts'>
import { ref, reactive, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getMine, addMine } from '@/api/game/mine'

// 困难度
let difficulty = ref(1)
const difficultyList = [
  {
    value: 0,
    label: '简单',
  },
  {
    value: 1,
    label: '普通',
  },
  {
    value: 2,
    label: '困难',
  }
]

// 基础数据
let data = reactive({
  height: 16,
  width: 16,
  mine: 40
})

// 当困难度变化
watch(difficulty, (newValue, oldValue) => {
  if (newValue == 0) {
    data.height = 9
    data.width = 9
    data.mine = 20
  } else if (newValue == 1) {
    data.height = 16
    data.width = 16
    data.mine = 40
  } else if (newValue == 2) {
    data.height = 30
    data.width = 30
    data.mine = 99
  }
  initGame()
})

// 初始化
let gameState = ref(0)  // 游戏开始与否
let arr = ref<any[][]>([])
let typeArr = ref<any[][]>([])
let mine = ref(0)  //  雷的数量
let time = ref(0)  //  耗时
const numThree = ref<HTMLImageElement | null>()
const numTwo = ref<HTMLImageElement | null>()
const numOne = ref<HTMLImageElement | null>()
const timeThree = ref<HTMLImageElement | null>()
const timeTwo = ref<HTMLImageElement | null>()
const timeOne = ref<HTMLImageElement | null>()
let timer = ref()
onMounted(() => {
  if (numThree.value) {
    numThree.value.src = new URL(`./images/time/d${Math.floor(mine.value / 100)}.svg`, import.meta.url).href
  }
  if (numTwo.value) {
    numTwo.value.src = new URL(`./images/time/d${Math.floor(mine.value / 10 % 10)}.svg`, import.meta.url).href
  }
  if (numOne.value) {
    numOne.value.src = new URL(`./images/time/d${Math.floor(mine.value % 10)}.svg`, import.meta.url).href
  }
  getWinList()
})

// 获取胜利记录
const getWinList = () => {
  let userid = JSON.parse(localStorage.getItem('user') || "").id
  getMine(userid).then(res => {
    console.log(res);
  })
}

// 初始化棋盘
const initGame = () => {
  gameState.value = 1
  time.value = 0
  clearInterval(timer.value)
  timer.value = null
  arr.value = []
  typeArr.value = []
  mine.value = data.mine
  for (let index = 0; index < data.height; index++) {
    let arrRow: Array<number> = []
    for (let index = 0; index < data.width; index++) {
      arrRow.push(0)
    }
    arr.value.push(arrRow)
    typeArr.value.push(JSON.parse(JSON.stringify(arrRow)))
  }
  
  // 随机雷的位置
  let mineList = ref<number[]>([])
  while (mineList.value.length < mine.value) {
    let myMine = +(Math.random()*data.height * data.width).toFixed()
    if (!mineList.value.some(item => item === myMine)) {
      mineList.value.push(myMine)
    }
  }

  let count = 0
  // 将雷放入格子
  mineList.value.forEach((item, index) => {
    for (let i = 0; i < data.height; i++) {
      for (let j = 0; j < data.width; j++) {
        if (i * data.height + (j + 1) == item) {
          arr.value[i][j] = -1
          count++
          // 将有雷的格子附近加 1
          if (i - 1 != -1 && j - 1 != -1 && arr.value[i - 1][j - 1] != -1) arr.value[i - 1][j - 1]++
          if (i - 1 != -1 && arr.value[i - 1][j] != -1) arr.value[i - 1][j]++
          if (i - 1 != -1 && j + 1 != data.width && arr.value[i - 1][j + 1] != -1) arr.value[i - 1][j + 1]++
          if (j - 1 != -1 && arr.value[i][j - 1] != -1) arr.value[i][j - 1]++
          if (j + 1 != data.width && arr.value[i][j + 1] != -1) arr.value[i][j + 1]++
          if (i + 1 != data.height && j - 1 != -1 && arr.value[i + 1][j - 1] != -1) arr.value[i + 1][j - 1]++
          if (i + 1 != data.height && arr.value[i + 1][j] != -1) arr.value[i + 1][j]++
          if (i + 1 != data.height && j + 1 != data.width && arr.value[i + 1][j + 1] != -1) arr.value[i + 1][j + 1]++
        }
      }
    }
  });
  console.log(count);
}

initGame()

// 点击格子
const open = (x: number, y: number) => {
  if (timer.value == null) {
    timer.value = setInterval(() => {
      if (time.value < 999) {
        time.value++
      }
    }, 1000)
  }
  if (!gameState.value) {
    return
  }
  typeArr.value[x][y] = 1
  if(arr.value[x][y] == 0) {
    zero(x, y)
  }
  // 如果点到了雷，游戏结束
  if(arr.value[x][y] == -1) {
    gameOver(x, y)
  }
}

// 插旗
const setFlag = (x: number, y: number) => {
  if (!gameState.value) {
    return
  }
  if (typeArr.value[x][y] == 0 && mine.value > 0) {
    typeArr.value[x][y] = 2
    mine.value--
  } else if(typeArr.value[x][y] == 2) {
    typeArr.value[x][y] = 0
    mine.value++
  }
}

// 为 0 展开视野
const zero = (i: number, j: number) => {
  if (i - 1 != -1 && j - 1 != -1 && typeArr.value[i - 1][j - 1] == 0) {
    typeArr.value[i - 1][j - 1] = 1
    if(arr.value[i - 1][j - 1] == 0) {
      zero(i - 1, j - 1)
    }
  }
  if (i - 1 != -1 && typeArr.value[i - 1][j] == 0) {
    typeArr.value[i - 1][j] = 1
    if(arr.value[i - 1][j] == 0) {
      zero(i - 1, j)
    }
  }
  if (i - 1 != -1 && j + 1 != data.width && typeArr.value[i - 1][j + 1] == 0) {
    typeArr.value[i - 1][j + 1] = 1
    if(arr.value[i - 1][j + 1] == 0) {
      zero(i - 1, j + 1)
    }
  }
  if (j - 1 != -1 && typeArr.value[i][j - 1] == 0) {
    typeArr.value[i][j - 1] = 1
    if(arr.value[i][j - 1] == 0) {
      zero(i, j - 1)
    }
  }
  if (j + 1 != data.width && typeArr.value[i][j + 1] == 0) {
    typeArr.value[i][j + 1] = 1
    if(arr.value[i][j + 1] == 0) {
      zero(i, j + 1)
    }
  }
  if (i + 1 != data.height && j - 1 != -1 && typeArr.value[i + 1][j - 1] == 0) {
    typeArr.value[i + 1][j - 1] = 1
    if(arr.value[i + 1][j - 1] == 0) {
      zero(i + 1, j - 1)
    }
  }
  if (i + 1 != data.height && typeArr.value[i + 1][j] == 0) {
    typeArr.value[i + 1][j] = 1
    if(arr.value[i + 1][j] == 0) {
      zero(i + 1, j)
    }
  }
  if (i + 1 != data.height && j + 1 != data.width && typeArr.value[i + 1][j + 1] == 0) {
    typeArr.value[i + 1][j + 1] = 1
    if(arr.value[i + 1][j + 1] == 0) {
      zero(i + 1, j + 1)
    }
  }
}

// 监听剩余雷的数量，并显示在左上角
watch(mine, (newValue, oldValue) => {
  if (numThree.value) {
    numThree.value.src = new URL(`./images/time/d${Math.floor(newValue / 100)}.svg`, import.meta.url).href
  }
  if (numTwo.value) {
    numTwo.value.src = new URL(`./images/time/d${Math.floor(newValue / 10 % 10)}.svg`, import.meta.url).href
  }
  if (numOne.value) {
    numOne.value.src = new URL(`./images/time/d${Math.floor(newValue % 10)}.svg`, import.meta.url).href
  }
  if (mine.value == 0) {
    let sum = 0
    typeArr.value.forEach((item, index) => {
      item.forEach((item2, index) => {
        if (item2 != 0) {
          sum++
        }
      })
    })
    if (sum == data.height * data.width) {
      gameWin()
    }
  }
})

// 计算游戏时间，并显示在右上角
watch(time, (newValue, oldValue) => {
  if (timeThree.value) {
    timeThree.value.src = new URL(`./images/time/d${Math.floor(newValue / 100)}.svg`, import.meta.url).href
  }
  if (timeTwo.value) {
    timeTwo.value.src = new URL(`./images/time/d${Math.floor(newValue / 10 % 10)}.svg`, import.meta.url).href
  }
  if (timeOne.value) {
    timeOne.value.src = new URL(`./images/time/d${Math.floor(newValue % 10)}.svg`, import.meta.url).href
  }
})

// 获取所有格子 DOM 元素
// let imgDomList = ref<any[][]>([])
const imgDom = (el: any, x: number, y: number) => {
  if (el) {
    el.src = new URL(`./images/type${arr.value[x][y]}.svg`, import.meta.url).href
  }
}

// 游戏失败
const gameOver = (x: number, y: number) => {
  clearInterval(timer.value)
  lookMine()
  typeArr.value[x][y] = 3
  gameState.value = 0
  ElMessage({
    type: 'error',
    message: '游戏失败',
  })
}

// 显示出所有雷
const lookMine = () => {
  console.log(123);
  for (let i = 0; i < data.height; i++) {
    for (let j = 0; j < data.width; j++) {
      if (arr.value[i][j] == -1 && typeArr.value[i][j] == 0) {
        typeArr.value[i][j] = 1
      }
    }
  }
  console.log(arr.value);
}

// 游戏胜利
const gameWin = () => {
  clearInterval(timer.value)
  gameState.value = 2
  ElMessage({
    type: 'success',
    message: '🎉🎉🎉游戏胜利🎉🎉🎉',
  })
  let adminMine = {
    time: time.value,
    difficulty: difficulty.value,
    userid: JSON.parse(localStorage.getItem('user') || "").id
  }
  addMine(adminMine).then((res: any) => {
    if (res.success) {
      ElMessage({
        type: 'success',
        message: '已保存',
      })
    }
  })
}

// 重新开一把
const setState = () => {
  initGame()
}
</script>

<style scoped lang='less'>
  .card {
    height: 100%;
    overflow-y: scroll;
    background-color: rgb(242, 244, 245);
    .main {
      width: 540px;
      height: 610px;
      margin: 0 auto;
      background-color: #C0C0C0;
      position: relative;
      .haeder {
        height: 70px;
        width: 100%;
        background-color: #C0C0C0;
        display: flex;
        justify-content: space-between;
        .header_l {
          margin: 5px;
          height: 40px;
          display: inline-block;
          background-color: black;
          padding: 5px;
          img {
            height: 40px;
            margin-left: 5px;
            &:nth-child(1) {
              margin-left: 0;
            }
          }
        }
        .header_c {
          margin: 5px;
          height: 50px;
          width: 50px;
          display: inline-block;
          img {
            height: 50px;
          }
        }
        .header_r {
          margin: 5px;
          height: 40px;
          display: inline-block;
          background-color: black;
          padding: 5px;
          img {
            height: 40px;
            margin-left: 5px;
            &:nth-child(1) {
              margin-left: 0;
            }
          }
        }
      }
      .content {
        margin: 5px;
        img {
          overflow: hidden;
          height: calc(530px / v-bind('data.height'));
        }
        .arrRow {
          height: calc(530px / v-bind('data.height'));
        }
      }
      .content_l {
        background: url(./images/bg/border_vert_2x.png);
        background-size: 100% 100%;
        height: 531px;
        width: 18px;
        position: absolute;
        left: -13.5px;
        bottom: 6px;
      }
      .content_r {
        background: url(./images/bg/border_vert_2x.png);
        background-size: 100% 100%;
        height: 531px;
        width: 18px;
        position: absolute;
        right: -13.5px;
        bottom: 6px;
      }
      .content_t {
        background: url(./images/bg/border_hor_2x.png);
        background-size: 100% 100%;
        width: 531px;
        height: 18px;
        position: absolute;
        left: 4px;
        top: 56.5px;
      }
      .content_b {
        background: url(./images/bg/border_hor_2x.png);
        background-size: 100% 100%;
        width: 530px;
        height: 18px;
        position: absolute;
        left: 5px;
        bottom: -13.5px;
      }
      .content_l_t {
        background: url(./images/bg/t_left_2x.png);
        background-size: 100% 100%;
        width: 18px;
        height: 18px;
        position: absolute;
        left: -13.5px;
        top: 56.5px;
      }
      .content_r_t {
        background: url(./images/bg/t_right_2x.png);
        background-size: 100% 100%;
        width: 19px;
        height: 18px;
        position: absolute;
        right: -13.5px;
        top: 56.5px;
      }
      .content_l_b {
        background: url(./images/bg/corner_bottom_left_wide_2x.png);
        background-size: 100% 100%;
        width: 18px;
        height: 19px;
        position: absolute;
        left: -13.5px;
        bottom: -13.5px;
      }
      .content_r_b {
        background: url(./images/bg/corner_bottom_right_wide_2x.png);
        background-size: 100% 100%;
        width: 18px;
        height: 19px;
        position: absolute;
        right: -13.5px;
        bottom: -13.5px;
      }
      .header_bg_l {
        background: url(./images/bg/border_vert_2x.png);
        background-size: 100% 100%;
        height: 55px;
        width: 18px;
        position: absolute;
        left: -13.5px;
        top: 2px;
      }
      .header_bg_r {
        background: url(./images/bg/border_vert_2x.png);
        background-size: 100% 100%;
        height: 55px;
        width: 18px;
        position: absolute;
        right: -13.5px;
        top: 2px;
      }
      .header_bg_t {
        background: url(./images/bg/border_hor_2x.png);
        background-size: 100% 100%;
        width: 532px;
        height: 18px;
        position: absolute;
        left: 4px;
        top: -13.5px;
      }
      .header_bg_t_l {
        background: url(./images/bg/corner_up_left_2x.png);
        background-size: 100% 100%;
        width: 18px;
        height: 18px;
        position: absolute;
        left: -13.5px;
        top: -13.5px;
      }
      .header_bg_t_r {
        background: url(./images/bg/corner_up_right_2x.png);
        background-size: 100% 100%;
        width: 18px;
        height: 18px;
        position: absolute;
        right: -13.5px;
        top: -13.5px;
      }
    }
    &::-webkit-scrollbar{
      width: 3px;
      background-color: rgb(208, 208, 208);
    }
  }
</style>
