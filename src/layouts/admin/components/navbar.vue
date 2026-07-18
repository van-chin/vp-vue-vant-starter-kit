<template>
  <header class="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
    <button class="text-gray-600 hover:text-gray-900" @click="$emit('toggle-sidebar')">☰</button>
    <div class="flex items-center gap-4">
      <span class="text-sm text-gray-600">管理员</span>
      <div class="h-8 w-8 rounded-full bg-gray-300" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineOptions({ name: 'AdminNavbar' });

defineEmits<{
  toggleSidebar: [];
}>();
</script>
