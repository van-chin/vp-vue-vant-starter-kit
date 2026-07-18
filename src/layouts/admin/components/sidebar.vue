<template>
  <aside
    class="flex h-screen flex-col border-r border-gray-200 bg-gray-900 text-white transition-all duration-300"
    :class="collapsed ? 'w-16' : 'w-56'"
  >
    <div class="flex h-14 items-center justify-center border-b border-gray-700">
      <span v-if="!collapsed" class="text-lg font-bold">管理后台</span>
      <span v-else class="text-lg font-bold">A</span>
    </div>
    <nav class="flex-1 space-y-1 p-2">
      <a
        href="/admin"
        class="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-800"
      >
        <span>📊</span>
        <span v-if="!collapsed">仪表盘</span>
      </a>
      <a
        href="/admin/users"
        class="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-800"
      >
        <span>👥</span>
        <span v-if="!collapsed">用户管理</span>
      </a>
      <a
        href="/admin/settings"
        class="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-800"
      >
        <span>⚙️</span>
        <span v-if="!collapsed">系统设置</span>
      </a>
    </nav>
    <div class="border-t border-gray-700 p-2">
      <button
        class="flex w-full items-center justify-center rounded-md px-3 py-2 text-sm hover:bg-gray-800"
        @click="$emit('toggle')"
      >
        {{ collapsed ? '→' : '←' }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineOptions({ name: 'AdminSidebar' });

defineProps<{
  collapsed: boolean;
}>();

defineEmits<{
  toggle: [];
}>();
</script>
