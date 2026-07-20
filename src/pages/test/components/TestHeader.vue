<template>
  <header class="sticky top-0 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg">
    <div class="flex h-12 items-center justify-between px-4">
      <button class="text-lg" @click="router.back()">‹ 返回</button>
      <h1 class="text-base font-bold">自定义 Header</h1>
      <span class="text-sm opacity-80">测试页</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

defineOptions({ name: 'TestHeader' });

const router = useRouter();
</script>
