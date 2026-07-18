<template>
  <div class="flex min-h-screen bg-gray-100">
    <AdminSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <div class="flex flex-1 flex-col overflow-hidden">
      <AdminNavbar @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminSidebar from './components/sidebar.vue';
import AdminNavbar from './components/navbar.vue';

defineOptions({ name: 'LayoutAdmin' });

const sidebarCollapsed = ref(false);
</script>
