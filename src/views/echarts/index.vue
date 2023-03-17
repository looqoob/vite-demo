<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <div class="echartsBox">
        <Echarts id="aaa" :style="style" :option="option1"></Echarts>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="echartsBox">
        <Echarts id="bbb" :style="style" :option="option2"></Echarts>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="echartsBox">
        <Echarts id="ccc" :style="style" :option="option3"></Echarts>
      </div>
    </el-col>
  </el-row>
  <el-button @click="aaa">添加数据</el-button>
</template>

<script setup lang='ts'>
  import { ref,reactive } from 'vue'
  import Echarts from '../../components/Echarts.vue'
  import { userStore } from '../../store'
  let colorStyle:any = userStore()
  const style = {
    width: "100%",
    height: "300px",
    display: "flex",
    justifyContent: "center",
  }
  const option1 = reactive({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  })
  const option2 = reactive({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  })
  const option3 = reactive({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  })
  const aaa = () => {
    option1.series[0].data.push({ value: 500, name: '测试添加' })
  }
</script>

<style scoped>
  .echartsBox{
    height: 300px;
    background-color: v-bind('colorStyle.getBackground.background_h1');
    border-radius: 8px;
  }
</style>
