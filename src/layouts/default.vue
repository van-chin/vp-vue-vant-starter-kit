<template>
  <div class="layout-default bd-red box-border flex min-h-screen flex-col bg-gray-50">
    <DefaultHeader v-if="showHeader" />
    <main class="bd-red min-h-10 flex-1 px-2" :class="{ 'pb-tabbar': showFooter }">
      <router-view />
    </main>
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
/* van-tabbar 默认 position: fixed，脱离文档流。
   给 main 添加等高的 padding-bottom，避免内容被 tabbar 遮挡。 */
.pb-tabbar {
  padding-bottom: var(--van-tabbar-height, 50px);
}
</style>
