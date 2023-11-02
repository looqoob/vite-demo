import {ref, reactive} from "vue"

// 游戏 hook
export default function () {
  const initGameList = (list: number[][]) => {
    list.length = 0
    // 默认填充 0
    for (let index = 0; index < 30; index++) {
      let arrRow: Array<number> = []
      for (let index = 0; index < 30; index++) {
        arrRow.push(0)
      }
      list.push(arrRow)
    }
  }
  // 游戏开始
  const gameBegin = (fn: Function) => {
    fn()
  }
  return {
    initGameList,
    gameBegin
  }
}