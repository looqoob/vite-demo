<template>
  <div>
    <el-card class="card" style="overflow: auto">
      <span class="span">项目状态统计</span>
      <div class="list">
        <div class="listItem">
          <img class="listItemImg" src="./images/vue.png" />
          <div class="listItemImg2">
            <span>123123</span>
          </div>
        </div>
        <div class="listItem">
          <img class="listItemImg" src="./images/git.png" />
          <div class="listItemImg2">
            <span>123123</span>
          </div>
        </div>
        <div class="listItem">
          <img class="listItemImg" src="./images/javaScript.png" />
          <div class="listItemImg2">
            <span>123123</span>
          </div>
        </div>
        <div class="listItem">
          <img class="listItemImg" src="./images/shoppingDemo.png" />
          <div class="listItemImg2">
            <span>123123</span>
          </div>
        </div>
      </div>
    </el-card>
    <div style="margin-top: 10px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card>
            <p class="echartsTitle">图表1</p>
            <Echarts id="aaa" :style="style" :option="option1"></Echarts>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <p class="echartsTitle">图表2</p>
            <Echarts id="bbb" :style="style" :option="option2"></Echarts>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { userStore } from "../../store";
import Echarts from "@/components/Echarts.vue";
let colorStyle: any = userStore();
const style = {
  width: "100%",
  height: "50vh",
  display: "flex",
  justifyContent: "center",
};
const option1 = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
});
const option2 = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
});
</script>

<style lang="less" scoped>
:deep(.el-card__body) {
  background-color: v-bind("colorStyle.getBackground.background_h1");
  color: v-bind("colorStyle.getBackground.color");
  padding: 0;
}
.span {
  display: inline-block;
  margin-top: 8px;
  margin-left: 16px;
  height: 5vh;
  line-height: 5vh;
}
.list {
  height: 25vh;
  margin-top: 4px;
  display: flex;
  justify-content: space-around;
  position: relative;
  background-color: v-bind("colorStyle.getBackground.background_h1");
  .listItem {
    height: 22vh;
    width: 23%;
    line-height: 22vh;
    border-radius: 5px;
    text-align: center;
    color: aliceblue;
    position: relative;
    .listItemImg,
    .listItemImg2 {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      position: absolute;
      top: 0;
      left: 0;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      transition: all 1s;
    }
    .listItemImg2 {
      transform: rotateY(180deg);
      background-color: #4dafff;
      span {
        transform: translateZ(150px);
      }
    }
    &:hover .listItemImg {
      transform: rotateY(-180deg);
    }
    &:hover .listItemImg2 {
      transform: rotateY(0);
    }

    &:nth-child(1) > .listItemImg2 {
      background-color: #4dafff;
    }
    &:nth-child(2) > .listItemImg2 {
      background-color: #f4ff1b;
      color: #3f73ff;
    }
    &:nth-child(3) > .listItemImg2 {
      background-color: #ff4df3;
    }
    &:nth-child(4) > .listItemImg2 {
      background-color: #526fff;
    }
  }
}
.echartsTitle {
  margin-top: 20px;
  text-align: center;
}
</style>
