<template>
  <header class="flex h-16 items-center justify-between border-b border-gray-800 px-6">
    <div class="flex items-center gap-3">
      <div class="h-3 w-3 animate-pulse rounded-full bg-blue-500" />
      <h1 class="text-xl font-bold tracking-wider">数据监控中心</h1>
    </div>
    <div class="flex items-center gap-6">
      <span class="font-mono text-sm text-gray-400">{{ currentTime }}</span>
      <ScreenFullscreen />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ScreenFullscreen from './fullscreen.vue';

defineOptions({ name: 'ScreenHeader' });

const currentTime = ref('');
let timer: ReturnType<typeof setInterval>;

const updateTime = () => {
  currentTime.value = new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
