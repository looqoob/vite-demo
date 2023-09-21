<template>
  <el-form-item v-if="type == 'input'" :label="label">
    <el-input v-model="value" />
  </el-form-item>
  <el-form-item v-if="type == 'select'" :label="label">
    <!-- <el-select v-model="value" placeholder="请选择用户的角色">
      <el-option
        v-for="(item, index) in data"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      />
    </el-select> -->
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
defineProps<
  [
    {
      label: string;
      type: "input" | "select";
      value: string | number;
      selectData: [{
        id: number

      }]
    }
  ]
>();
</script>

<style scoped lang="less"></style>
