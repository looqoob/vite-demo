<template>
  <div class="tab">
    <TransitionGroup name="list">
      <el-check-tag
        class="mx-1"
        :checked="item.path === router.currentRoute.value.fullPath"
        effect="Plain"
        @click="tabClick(item, index)"
        @mouseup="mouseup($event, index)"
        v-for="(item, index) in tabData"
        :key="item.path">
        <span>{{ item.meta.title }}</span>
        <el-icon v-if="index !== 0" class="icon" @click.stop="delTabData(index)">
          <Close/>
        </el-icon>
      </el-check-tag>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { userStore } from "../../store";
import { useRouter } from "vue-router";
import { Close } from "@element-plus/icons-vue";

const store: any = userStore();
const router = useRouter();
let tabData = reactive(store.tabData);

const tabClick = (item: any, index: number) => {
  router.push({ path: item.path });
};

const mouseup = (e: any, index: number) => {
  e.preventDefault();
  if (e.button == 1) {
    delTabData(index)
  }
}
const delTabData = (index: number) => {
  // 删除的是否为当前页面
  if (tabData[index].path == router.currentRoute.value.fullPath) {
    store.delTabData(index);
    if (index >= tabData.length) {
      router.push({ path: tabData[tabData.length - 1].path });
    } else {
      router.push({ path: tabData[index].path });
    }
  } else {
    store.delTabData(index);
  }
};
</script>

<style scoped lang="less">
.tab {
  height: 40px;
  line-height: 40px;
  background-color: rgb(255, 255, 255);
  padding-left: 12px;
}
.mx-1 {
  margin-right: 5px;
  &:nth-child(1) {
    height: 16.8px;
    position: relative;
    bottom: 2.8px;
    span {
      position: relative;
      top: 2.8px;
    }
  }
}
.icon {
  position: relative;
  top: 2.5px;
  left: 7px;
  background-color: rgb(241, 62, 62);
  color: aliceblue;
  border-radius: 10px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.list-leave-active {
  position: absolute;
}
</style>
