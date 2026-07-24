<template>
  <div class="index">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-nav-bar title="seed" />
    <div class="bd-red">cart</div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <div class="bd-red h-200">index</div>

    <Department></Department>
    <div class="">
      <div class="bd-red">11bottom</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    // layout: 'default',
    showHeader: true,
    showFooter: true,
  },
});
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
