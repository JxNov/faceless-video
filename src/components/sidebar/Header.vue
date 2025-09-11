<script setup lang="ts">
import { computed } from 'vue';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import BaseBreadcrumbCustom from '@/components/base/BreadcrumbCustom.vue';
import { useAppStore } from '@/stores/app';

const store = useAppStore();

const links = computed(() => {
  if (!store.activeId || store.activeId === 'home') {
    return [{ title: 'Home', href: '/' }];
  }

  const title = store.activeId
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return [
    { title, href: `#${store.activeId}` }
  ];
});
</script>

<template>
  <header class="sticky top-0 z-10 h-[53px] flex items-center gap-4 border-b bg-orange-100 px-4 md:px-6">
    <div class="w-full flex items-center gap-4">
      <SidebarTrigger />
      <Separator orientation="vertical" class="!h-4" />
      <BaseBreadcrumbCustom :links="links" />
    </div>
    <div class="ml-auto">
      <slot />
    </div>
  </header>
</template>
