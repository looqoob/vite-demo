import {ref, reactive} from "vue"

// 食物 hook
export default function () {
  
  let food = ref<number[]>([])
  // 初始化食物数组
  const initFoodList = (foodList: number[][]) => {
    // 清空食物数组
    food.value = []
    // 随机食物的位置
    while (food.value.length < 5) {
      let myFood = +(Math.random()*30 * 30).toFixed()
      if (!food.value.some(item => item === myFood) && myFood !== 435 && myFood !== 436 && myFood !== 465 && myFood !== 466) {
        food.value.push(myFood)
      }
    }
    // 将食物放入食物数组
    food.value.forEach((item, index) => {
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
          if (i * 30 + j + 1 == item) {
            foodList[i][j] = 1
            console.log(item);
          }
        }
      }
    })
  }
  // 添加一个食物
  const addFood = (snake: any[], foodList: number[][]) => {
    // 删除被吃掉的食物
    let delFood = food.value.indexOf(snake[0].x * 30 + snake[0].y + 1)
    food.value.splice(delFood, 1)
    // 随机食物的位置
    while (food.value.length < 5) {
      let myFood = +(Math.random()*30 * 30).toFixed()
      if (!food.value.some(item => item === myFood) && !snake.some(item => item.x * 30 + item.y + 1 === myFood)) {
        food.value.push(myFood)
      }
    }
    // 将食物放入食物数组
    food.value.forEach((item, index) => {
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
          if (i * 30 + j + 1 == item) {
            foodList[i][j] = 1
          }
        }
      }
    })
  }
  return {
    initFoodList,
    addFood
  }
}