<template>
  <div class="relative h-screen w-screen overflow-hidden bg-gray-950 text-white">
    <ScreenHeader />
    <main class="relative h-[calc(100vh-7rem)] p-4">
      <router-view />
    </main>
    <ScreenFooter />
  </div>
</template>

<script setup lang="ts">
import ScreenHeader from './components/header.vue';
import ScreenFooter from './components/footer.vue';

// defineOptions({ name: 'LayoutScreen' });
</script>
