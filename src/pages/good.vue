<template>
  <van-button type="primary">主要按钮</van-button>
  <van-button type="success">成功按钮</van-button>

  <div class="bd-red h-1000">good 234</div>

  <Department></Department>
  <div class="px-2">
    <div class="bd-red">bottom</div>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    layout: 'default',
    showHeader: false,
    showFooter: true,
  },
});
</script>

<style scoped></style>
