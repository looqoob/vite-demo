<template>
  <div class="wraps" ref="wraps">
    <div class="items" :style="{height:item.height + 'px', background:item.background, left:item.left + 'px', top:item.top + 'px'}" v-for="(item, index) in waterList" :key="index"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref,reactive,onMounted } from 'vue'

// 接收父组件传来的list
const props = defineProps<{
  list:any[]
}>()
// 最终遍历展示的数组
const waterList = reactive<any[]>([])
// 每列最大高度
const heightList:number[] = []
// 获取元素节点
const wraps = ref<any>(null)
// 初始化配置
const init = () => {
  // 定义元素宽度
  const width = 130;
  // 获取元素宽度
  const x = wraps.value.clientWidth;
  // 计算最大能放多少列并向下取整
  const column = Math.floor(x / width)
  // 遍历list数组判断元素摆放位置
  for (let i = 0; i < props.list.length; i++) {
    // 如果是第一行就距离顶部20，否则寻找最短的接到下方
    if (i < column){
      props.list[i].left = i * width;
      props.list[i].top = 0;
      waterList.push(props.list[i])
      heightList.push(props.list[i].height)
    } else {
      // 最短的列的高度
      let current = heightList[0];
      // 最短的列的下标
      let index = 0;
      heightList.forEach((h,i) => {
        if (current > h) {
          current = h;
          index = i;
        }
      })
      props.list[i].left = index * width;
      props.list[i].top = current + 20;
      waterList.push(props.list[i])
      heightList[index] = heightList[index] + props.list[i].height + 20
    }
  }
}
onMounted(() => {
  init()
  // window.addEventListener('resize',init)
})
</script>

<style lang="less" scoped>
  .wraps{
    position: relative;
    margin: 0 auto;
    .items{
      position: absolute;
      width: 120px;
    }
  }
</style>
