<template>
  <!-- <div class="tab">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      class="mx-1"
      closable
      :type="tag.type"
      size="small"
    >
      {{ tag.name }}
    </el-tag>
  </div> -->
  <div class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <!-- <keep-alive>
          <component :is="Component" />
        </keep-alive> -->
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
// import {ref} from 'vue'
import { userStore } from "../../store";
const colorStyle: any = userStore();
// const tags = ref([
//   { name: 'Tag 1', type: '' },
//   { name: 'Tag 2', type: 'success' },
//   { name: 'Tag 3', type: 'info' },
//   { name: 'Tag 4', type: 'warning' },
//   { name: 'Tag 5', type: 'danger' },
// ])
</script>

<style lang="less" scoped>
.tab {
  background-color: white;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  .mx-1 {
    margin-right: 10px;
  }
}
.main {
  flex: 1;
  overflow: hidden;
  padding: 10px;
  background-color: v-bind("colorStyle.getBackground.background_h2");
  color: v-bind("colorStyle.getBackground.color");
  transition: all 0.3s;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s ease-in-out;
}

/* 可能为enter失效，拆分为 enter-from和enter-to */
.fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
