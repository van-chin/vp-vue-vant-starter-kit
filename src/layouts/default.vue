<template>
  <div class="layout-default bd-red box-border flex min-h-screen flex-col bg-gray-50">
    <DefaultHeader />
    hot-update-vv
    <main class="bd-red min-h-10 flex-1 px-2">
      <router-view />
    </main>
    <DefaultFooter />
  </div>
</template>

<script setup lang="ts">
import DefaultHeader from './default/components/header.vue';
import DefaultFooter from './default/components/footer.vue';

defineOptions({ name: 'LayoutDefault' });
</script>
