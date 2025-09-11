<script setup lang="ts">
import { RouterView } from 'vue-router';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/sidebar/Header.vue';
import AppSidebar from '@/components/sidebar/AppSidebar.vue';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <Header />

      <div class="min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6 bg-orange-100/50">
        <RouterView />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
