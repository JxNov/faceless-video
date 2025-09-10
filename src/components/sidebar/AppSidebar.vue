<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { NavGroup, NavLink, NavSectionTitle } from '@/types/nav';
import { navMenu, navMenuBottom } from '@/constants/menus';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarRail,
} from '@/components/ui/sidebar';
import LayoutSidebarNavFooter from '@/components/sidebar/SidebarNavFooter.vue';
import LayoutSidebarNavGroup from '@/components/sidebar/SidebarNavGroup.vue';
import LayoutSidebarNavLink from '@/components/sidebar/SidebarNavLink.vue';
import { useAppStore } from '@/stores/app';

function resolveNavItemComponent(item: NavLink | NavGroup | NavSectionTitle): any {
  if ('children' in item) return LayoutSidebarNavGroup;
  return LayoutSidebarNavLink;
}

const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
const user = {
  name: userStorage.username || 'Guest',
  email: userStorage.email || '',
  avatar: userStorage.avatar || '',
};

const sidebar = ref({
  collapsible: 'offcanvas',
  side: 'left',
  variant: 'sidebar',
} as const);

const store = useAppStore();
let observer: IntersectionObserver;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          store.setActiveId(entry.target.id);
        }
      });
    },
    { threshold: 0.5 }
  );

  const allNavs = [...navMenu, { items: navMenuBottom }];
  allNavs.forEach((nav) => {
    nav.items.forEach((item: any) => {
      if (item.link) {
        const id = item.link.replace('#', '');
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    });
  });
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <Sidebar :collapsible="sidebar.collapsible" :side="sidebar.side" :variant="sidebar.variant">
    <SidebarContent>
      <SidebarGroup v-for="(nav, indexGroup) in navMenu" :key="indexGroup">
        <SidebarGroupLabel v-if="nav.heading">
          {{ nav.heading }}
        </SidebarGroupLabel>
        <component :is="resolveNavItemComponent(item)" v-for="(item, index) in nav.items" :key="index" :item="item"
          :active-id="store.activeId" />
      </SidebarGroup>

      <SidebarGroup class="mt-auto">
        <component :is="resolveNavItemComponent(item)" v-for="(item, index) in navMenuBottom" :key="index" :item="item"
          size="sm" :active-id="store.activeId" />
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <LayoutSidebarNavFooter :user="user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
