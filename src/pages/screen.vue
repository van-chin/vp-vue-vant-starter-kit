<template>
  <div class="grid h-full grid-cols-3 gap-4">
    <div class="rounded-lg border border-gray-700 bg-gray-900 p-4">
      <h3 class="mb-2 text-sm text-gray-400">在线用户</h3>
      <p class="text-3xl font-bold text-cyan-400">12,847</p>
    </div>
    <div class="rounded-lg border border-gray-700 bg-gray-900 p-4">
      <h3 class="mb-2 text-sm text-gray-400">今日订单</h3>
      <p class="text-3xl font-bold text-green-400">3,291</p>
    </div>
    <div class="rounded-lg border border-gray-700 bg-gray-900 p-4">
      <h3 class="mb-2 text-sm text-gray-400">系统负载</h3>
      <p class="text-3xl font-bold text-amber-400">67%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'PageScreen' });
definePage({
  meta: {
    layout: 'screen',
  },
});
</script>
