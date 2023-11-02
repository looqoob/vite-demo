import {ref, reactive} from "vue"

// 蛇蛇 hook
export default function () {
  let snakeList = reactive([
    {
      x: 14,
      y: 15
    },
    {
      x: 15,
      y: 15
    },
    {
      x: 15,
      y: 14
    }
  ])
  // 前行方向 上：0，右：1，下：2，左：3
  let direction = ref(3)
  // 初始化蛇蛇
  const initSnake = (list: number[][], fn: Function) => {
    snakeList.length = 0
    snakeList.push({
      x: 14,
      y: 15
    },
    {
      x: 15,
      y: 15
    },
    {
      x: 15,
      y: 14
    })
    newSnake(list)
    fn()
  }
  // 更新蛇的位置
  const newSnake = (list: number[][]) => {
    switch(direction.value) {
      case 0:
        snakeList.unshift({x: snakeList[0].x - 1,y: snakeList[0].y})
        break
      case 1:
        snakeList.unshift({x: snakeList[0].x,y: snakeList[0].y + 1})
        break
      case 2:
        snakeList.unshift({x: snakeList[0].x + 1,y: snakeList[0].y})
        break
      case 3:
        snakeList.unshift({x: snakeList[0].x,y: snakeList[0].y - 1})
        break
    }
    
    // 如果吃到身体
    if (list[snakeList[0].x][snakeList[0].y] == 2) {
      return 2
    }
    // 如果撞到墙
    if (snakeList[0].x > 29 || snakeList[0].x < 0 || snakeList[0].y > 29 || snakeList[0].y < 0) {
      return 3
    }
    // 如果吃到食物
    if (list[snakeList[0].x][snakeList[0].y] == 1) {
      snakeList.forEach(item => {
        list[item.x][item.y] = 2
      })
      // 蛇头
      list[snakeList[0].x][snakeList[0].y] = 3
      return 1
    } else {
      snakeList.forEach(item => {
        list[item.x][item.y] = 2
      })
      let a = snakeList.pop()
      if (a) {
        list[a.x][a.y] = 0
      }
      // 蛇头
      list[snakeList[0].x][snakeList[0].y] = 3
      return 0
    }
  }
  return {
    snakeList,
    initSnake,
    newSnake,
    direction
  }
}