<template>
  <footer class="border-t border-gray-200 bg-white py-4">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="list-switching">分类</van-tabbar-item>
      <van-tabbar-item icon="fire-o" badge="5">种草</van-tabbar-item>
      <van-tabbar-item icon="cart-o" badge="20">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact-o" badge="6">我的</van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script setup lang="ts">
defineOptions({ name: 'DefaultFooter' });

const active = ref(0);
</script>
