<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <h1 style="font-size: 16px">动态切换组件</h1>
          <el-radio-group v-model="radio" class="ml-4">
            <el-radio :label="1" size="large">组件 1</el-radio>
            <el-radio :label="2" size="large">组件 2</el-radio>
          </el-radio-group>
          <component :is="radio == 1 ? ComA : ComB"></component>
        </el-col>
        <el-col :span="12">
          <h1 style="font-size: 16px">适用于vue3动态展示图标组件</h1>
          <h1 style="font-size: 14px">  *vue3图标为组件</h1>
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio :label="1" size="large">图标 1</el-radio>
            <el-radio :label="2" size="large">图标 2</el-radio>
          </el-radio-group>
          <br />
          <el-icon style="font-size: 30px;">
            <component :is="radio1 == 1 ? 'Plus' : 'Minus'"></component>
          </el-icon>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import ComA from "./comA.vue";
import ComB from "./comB.vue";

const radio = ref(1);
const radio1 = ref(1);
</script>

<style scoped lang="less"></style>
