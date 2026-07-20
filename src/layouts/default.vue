<template>
  <div class="layout-default flex h-screen flex-col overflow-hidden bg-gray-50">
    <!-- 头部区域，固定顶部。可由页面通过 useCustomHeader 替换 -->
    <component :is="activeHeader" v-if="activeHeader" />
    <!-- 主要内容区域，内部滚动 -->
    <main class="flex-1 overflow-y-auto px-2">
      <router-view />
    </main>
    <!-- 底部区域，正常流布局，flex 自动分配空间。
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
