<template>
  <div :id="id" :style="style"></div>
</template>

<script setup lang='ts'>
  import { ref,reactive,inject,onMounted,nextTick,onBeforeUnmount,watch } from 'vue'
  import { userStore } from '../store'
  let colorStyle:any = userStore()
  const echarts:any = inject('echarts')
  let myChart: any = null;
  // ts特有定义默认值 withDefaults
  const props = defineProps<{
    id: string,
    style: any,
    option: object
  }>()
  // 重绘图表函数
  const resizeHandler = () => {
    myChart.resize();
  }
  // 设置防抖，保证无论拖动窗口大小，只执行一次获取浏览器宽高的方法
  const debounce = (fun: Function, delay: number) => {
    let timer: any;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fun();
      }, delay);
    }
  };
  const cancalDebounce = debounce(resizeHandler, 200);
  onMounted(() => {
    nextTick(function () {
      drawLine();
    });
  })
  
  const drawLine = () => {
    let dom = document.getElementById(props.id);
    if (!dom) {
      setTimeout(() => {
        drawLine();
      }, 1000);
      return;
    }
    if (colorStyle.nightShow) {
      myChart = echarts.init(dom, 'dark');
    } else {
      myChart = echarts.init(dom, 'light');
    }
    myChart.clear();
    // 自适应不同屏幕时改变图表尺寸
    window.addEventListener('resize', cancalDebounce);
    myChart.setOption(props.option, true);
  }
  // 页面销毁前，销毁事件和实例
  onBeforeUnmount(() => {
    window.removeEventListener('resize', cancalDebounce)
    myChart.dispose()
  })
  //监听图表数据时候变化，重新渲染图表
  watch(() => props.option, () => {
    myChart.setOption(props.option, true);
  }, { deep: true })
  // 当主题切换时改变ECharts主题
  watch(() => colorStyle.nightShow, () => {
    // 清除ECharts
    myChart.dispose();
    if (colorStyle.nightShow) {
      myChart = echarts.init(document.getElementById(props.id), 'dark');
    } else {
      myChart = echarts.init(document.getElementById(props.id), 'light');
    }
    myChart.setOption(props.option, true);
  })
</script>

<style scoped>

</style>
