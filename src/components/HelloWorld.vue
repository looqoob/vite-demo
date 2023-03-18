<template>
  <h1>{{ title }}</h1>
  <button @click="aaa">子传父</button>
  <table border class="table">
    <thead>
      <tr>
        <td align="center">名称</td>
        <td align="center">数量</td>
        <td align="center">价格</td>
        <td align="center">操作</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td align="center">{{ item.name }}</td>
        <td align="center">
          <button @click="delSum(index)">-</button>
          {{ item.sum }}
          <button @click="addSum(index)">+</button>
        </td>
        <td align="center">
          <span v-if="item.show" @dblclick="editShow(index)">{{
            item.money
          }}</span>
          <el-input
            v-else
            ref="refInput"
            maxlength="40"
            v-model="item.money"
            @blur="editShow2(index)"
          />
        </td>
        <td align="center"><button @click="del(index)">删除</button></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">总价：{{ count }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from "vue";
import { helloWorldList } from "../components/entity/helloWorld";

//父传子
const props = defineProps({
  title: {
    type: String,
    default: "默认值",
  },
});

//子传父
let emit = defineEmits(["on-click"]);
let aaa = () => {
  emit("on-click", "子传父成功");
};
type obj = {
  name: string;
  sum: number;
  money: number;
  show: boolean;
};
let data = reactive<obj[]>(new helloWorldList().list);
let delSum = (index: number) => {
  if (data[index].sum > 1) {
    data[index].sum--;
  } else {
    alert("最少购买一件哦亲");
  }
};
let addSum = (index: number) => {
  data[index].sum++;
};
let del = (index: number) => {
  data.splice(index, 1);
};
let count = computed(() => {
  let a: number = 0;
  data.forEach((item) => {
    a += item.money * item.sum;
  });
  return a;
});

const refInput = ref();
const editShow = (index: number) => {
  data[index].show = false;
  nextTick(() => {
    // refInput.value.focus();
    console.log(refInput.value);
  });
};

const editShow2 = (index: number) => {
  data[index].show = true;
};
</script>

<style scoped>
.table {
  margin: 0 auto;
  width: 600px;
}
</style>
