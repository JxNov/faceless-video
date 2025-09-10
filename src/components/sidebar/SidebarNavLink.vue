<script setup lang="ts">
import type { SidebarMenuButtonVariants } from '@/components/ui/sidebar';
import type { NavLink } from '@/types/nav';
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useAppStore } from '@/stores/app';

withDefaults(
  defineProps<{
    item: NavLink;
    size?: SidebarMenuButtonVariants['size'];
    activeId: string;
  }>(),
  {
    size: 'default',
    activeId: '',
  }
);

const { setOpenMobile } = useSidebar();
const store = useAppStore();

const scrollTo = (id: string, offset = 60) => {
  const cleanId = id.replace('#', '');
  const el = document.getElementById(cleanId);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });

  store.setActiveId(cleanId);

  setOpenMobile(false);
};
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton as-child :tooltip="item.title" :size="size" :class="{
        'bg-gray-200': activeId === item.link.replace('#', '')
      }">
        <button type="button" @click="scrollTo(item.link)">
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
