<template>
  <button
    class="rounded-md px-3 py-1 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
    @click="toggleFullscreen"
  >
    {{ isFullscreen ? '退出全屏' : '全屏' }}
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineOptions({ name: 'ScreenFullscreen' });

const isFullscreen = ref(false);

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const onFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

onMounted(() => {
  document.addEventListener('fullscreenchange', onFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFullscreenChange);
});
</script>
