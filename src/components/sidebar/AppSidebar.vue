<script setup lang="ts">
import { ref } from 'vue';
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

function resolveNavItemComponent(item: NavLink | NavGroup | NavSectionTitle): any {
  if ('children' in item) return LayoutSidebarNavGroup;
  return LayoutSidebarNavLink;
}

const userStorage = JSON.parse(localStorage.getItem('user') || '{}');

const user: {
  name: string;
  email: string;
} = {
  name: userStorage.username || 'Guest',
  email: userStorage.email || '',
};

const sidebar = ref({
  collapsible: 'offcanvas',
  side: 'left',
  variant: 'sidebar',
} as const);
</script>

<template>
  <Sidebar :collapsible="sidebar.collapsible" :side="sidebar.side" :variant="sidebar.variant">
    <SidebarContent>
      <SidebarGroup v-for="(nav, indexGroup) in navMenu" :key="indexGroup">
        <SidebarGroupLabel v-if="nav.heading">
          {{ nav.heading }}
        </SidebarGroupLabel>
        <component
          :is="resolveNavItemComponent(item)"
          v-for="(item, index) in nav.items"
          :key="index"
          :item="item"
        />
      </SidebarGroup>

      <SidebarGroup class="mt-auto">
        <component
          :is="resolveNavItemComponent(item)"
          v-for="(item, index) in navMenuBottom"
          :key="index"
          :item="item"
          size="sm"
        />
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <LayoutSidebarNavFooter :user="user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
