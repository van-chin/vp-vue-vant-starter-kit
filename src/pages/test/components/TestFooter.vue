<template>
  <footer class="border-t border-cyan-200 bg-cyan-50" style="height: 100px">
    <div class="flex items-center justify-around py-3">
      <button class="flex flex-col items-center gap-1 text-cyan-600" @click="toggleShowHeader">
        <span class="text-lg">{{ showHeader ? '🙈' : '👁️' }}</span>
        <span class="text-xs">Header {{ showHeader ? '已隐藏' : '已显示' }}</span>
      </button>

      <div class="h-8 w-px bg-cyan-200" />

      <button class="flex flex-col items-center gap-1 text-rose-500">
        <span class="text-lg">❤️</span>
        <span class="text-xs">自定义 Footer</span>
      </button>

      <div class="h-8 w-px bg-cyan-200" />

      <button class="flex flex-col items-center gap-1 text-cyan-600" @click="toggleShowFooter">
        <span class="text-lg">{{ showFooter ? '🙈' : '👁️' }}</span>
        <span class="text-xs">Footer {{ showFooter ? '已隐藏' : '已显示' }}</span>
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useLayoutConfig } from '@/composables/useLayoutConfig';

defineOptions({ name: 'TestFooter' });

const route = useRoute();
const router = useRouter();

const { showHeader, showFooter } = useLayoutConfig();

const toggleShowHeader = () => {
  router.replace({
    query: {
      ...route.query,
      showHeader: showHeader.value ? '0' : '1',
    },
  });
};

const toggleShowFooter = () => {
  router.replace({
    query: {
      ...route.query,
      showFooter: showFooter.value ? '0' : '1',
    },
  });
};
</script>
