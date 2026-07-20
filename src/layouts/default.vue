<template>
  <div class="layout-default flex h-screen flex-col overflow-hidden bg-gray-50">
    <!-- 头部区域，固定顶部。可由页面通过 useCustomHeader 替换 -->
    <component :is="activeHeader" v-if="activeHeader" />
    <!-- 主要内容区域，内部滚动 -->
    <main class="flex-1 overflow-y-auto px-2" :class="{ 'pb-tabbar': activeFooter }">
      <router-view />
    </main>
    <!-- 底部区域，van-tabbar 自身 position: fixed 固定到底部。
         可由页面通过 useCustomFooter 替换 -->
    <component :is="activeFooter" v-if="activeFooter" />
  </div>
</template>

<script setup lang="ts">
import DefaultHeader from './default/components/header.vue';
import DefaultFooter from './default/components/footer.vue';

defineOptions({ name: 'LayoutDefault' });

const { showHeader, showFooter } = useLayoutConfig();
const { activeHeader, activeFooter } = useLayoutProvider(DefaultHeader, DefaultFooter, {
  showHeader,
  showFooter,
});
</script>

<style scoped>
/*
  van-tabbar 默认 position: fixed，脱离文档流。
  给 main 添加等高的 padding-bottom，避免内容被 tabbar 遮挡。
  注意：绑定了 activeFooter 而不是 showFooter，因为自定义组件也可能需要垫高。
*/
.pb-tabbar {
  padding-bottom: var(--van-tabbar-height, 50px);
}
</style>
