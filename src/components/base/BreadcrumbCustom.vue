<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ChevronRight } from 'lucide-vue-next';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface Links {
  title: string;
  href: string;
}

defineProps<{
  links: Links[];
}>();
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(link, index) in links" :key="index">
        <BreadcrumbItem>
          <BreadcrumbLink v-if="index !== links.length - 1" as-child>
            <RouterLink :to="link.href">
              {{ link.title }}
            </RouterLink>
          </BreadcrumbLink>

          <BreadcrumbPage v-else>
            {{ link.title }}
          </BreadcrumbPage>
        </BreadcrumbItem>

        <BreadcrumbSeparator v-if="index < links.length - 1">
          <slot name="separator">
            <ChevronRight class="size-4" aria-hidden="true" />
          </slot>
        </BreadcrumbSeparator>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
