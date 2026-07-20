<template>
  <div class="layout-default flex h-screen flex-col overflow-hidden bg-gray-50">
    <!-- 头部区域，固定顶部 -->
    <DefaultHeader v-if="showHeader" />
    <!-- 主要内容区域，内部滚动 -->
    <main class="flex-1 overflow-y-auto px-2" :class="{ 'pb-tabbar': showFooter }">
      <router-view />
    </main>
    <!-- 底部区域，van-tabbar 自身 position: fixed 固定到底部 -->
    <DefaultFooter v-if="showFooter" />
  </div>
</template>

<script setup lang="ts">
import DefaultHeader from './default/components/header.vue';
import DefaultFooter from './default/components/footer.vue';

defineOptions({ name: 'LayoutDefault' });

const { showHeader, showFooter } = useLayoutConfig();
</script>

<style scoped>
/*
  van-tabbar 默认 position: fixed，脱离文档流。
  给 main 添加等高的 padding-bottom，避免内容被 tabbar 遮挡。
*/
.pb-tabbar {
  padding-bottom: var(--van-tabbar-height, 50px);
}
</style>
