<template>
  <div class="login flex h-full flex-col overflow-hidden bg-white">
    <van-nav-bar title="商城登录" :border="false">
      <!-- <template #left>
        <van-icon name="wap-home-o" />
      </template> -->
    </van-nav-bar>

    <div class="flex-1 p-4">
      <div class="h-10"></div>
      <div class="text-lg font-bold">手机号登录</div>
      <div class="mt-8">
        <van-cell-group inset>
          <van-field v-model="value" placeholder="请输入用户名" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    // layout: 'default',
    showHeader: false,
    showFooter: false,
  },
});
const value = ref('');
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
