<template>
  <div>
    <Animation></Animation>
    <div class="from red"></div>
    <div class="from blue"></div>
    <div class="from mainFrom">
      <div class="header">
        <img src="./images/路飞.jpg" alt="" width="80px" />
        <div class="headerContent">
          <span class="name">小小路飞</span>
          <span class="title">海贼王我当定了！</span>
        </div>
      </div>
      <div class="inputs">
        <el-input v-model="from.email" placeholder="请输入账号">
          <template #prepend>账号:</template>
        </el-input>
        <el-input v-model="from.password" placeholder="请输入密码">
          <template #prepend>密码:</template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Animation from "@/components/animation.vue";

let from = reactive({
  email: '',
  password: ''
})
</script>

<style scoped lang="less">
.from {
  width: 300px;
  height: 400px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: calc(50% - 200px);
  left: calc(50% - 150px);
  border-radius: 10px;
}
.mainFrom {
  box-shadow: 1.1px 2px 2.2px rgba(0, 0, 0, 0.02),
    2.6px 4.7px 5.3px rgba(0, 0, 0, 0.028),
    4.9px 8.9px 10px rgba(0, 0, 0, 0.035),
    8.7px 15.9px 17.9px rgba(0, 0, 0, 0.042),
    16.3px 29.7px 33.4px rgba(0, 0, 0, 0.05), 39px 71px 80px rgba(0, 0, 0, 0.07);
  z-index: 3;
  .header {
    overflow: hidden;
    display: flex;
    img {
      border-radius: 40px;
      margin: 20px 0 0 20px;
      border: 2px solid red;
      float: left;
    }
    .headerContent {
      float: left;
      height: 60px;
      flex: 1;
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      span {
        flex: 1;
        padding-left: 30px;
        display: flex;
        align-items: center;
        font-size: 16px;
      }
      .name {
        font-weight: 700;
      }
      .title {
        font-size: 12px;
        color: #9e9e9e;
      }
    }
  }
  .inputs {
    margin: 20px;
    .el-input {
      margin-bottom: 15px;
    }
  }
}
.red {
  background-color: red;
  z-index: 2;
  transform: rotate(-3deg);
  border-radius: 25px;
}
.blue {
  background-color: blue;
  z-index: 1;
  transform: rotate(3deg);
  border-radius: 25px;
}
</style>
