<template>
  <header class="bd-red sticky top-0 z-50 bg-white text-gray-900 shadow-sm">
    <div class="flex h-12 items-center justify-between border-b border-gray-200 px-4">
      <button class="flex items-center gap-1 text-sm text-gray-600" @click="router.back()">
        <span class="text-lg leading-none">‹</span>
        <span>返回</span>
      </button>
      <h1 class="text-base font-semibold">TestHeader</h1>
      <span class="text-xs text-gray-400">自定义</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

defineOptions({ name: 'TestHeader' });

const router = useRouter();
</script>
