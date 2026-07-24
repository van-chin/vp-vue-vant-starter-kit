<template>
  <footer>
    <!--
      :fixed="false"：van-tabbar 默认 position:fixed 脱离文档流。
      当前布局为 h-screen flex-col，footer 固定在视口底部，
      无需 fixed，回归正常流让 flex 自动分配空间，清除 padding-bottom hack。
    -->
    <van-tabbar v-model="active" :fixed="false" @change="onChange">
      <van-tabbar-item icon="home-o" name="home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="list-switching" name="category" to="/categories">分类</van-tabbar-item>
      <van-tabbar-item icon="fire-o" badge="5" name="seed" to="/seed">种草</van-tabbar-item>
      <van-tabbar-item icon="cart-o" badge="20" name="cart" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact-o" badge="6" name="my" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script setup lang="ts">
defineOptions({ name: 'DefaultFooter' });

const active = ref(0);
const onChange = (key: string) => {
  console.info('onChange => key', key);
};
</script>
