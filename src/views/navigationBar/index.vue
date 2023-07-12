<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card>
        <Bar1 />
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <Bar2 />
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <Bar3 />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import Bar1 from './bar1/index.vue'
import Bar2 from './bar2/index.vue'
import Bar3 from './bar3/index.vue'
import { ref, reactive } from "vue";
</script>

<style scoped lang="less">
:deep(.el-card__body) {
  padding: 0;
}
</style>
