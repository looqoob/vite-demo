<template>
  <div class="container">
    <div
      v-resize.right
      class="left"
    />
    <div class="right" />
  </div>
</template>
<style lang="less" scoped>
.container {
  width: 400px;
  height: 100px;
  > div {
    float: left;
    height: 100%;
    width: 50%;
  }
  .left {
    background-color: lightcoral;
  }
  .right {
    background-color: lightblue;
  }
}
</style>
