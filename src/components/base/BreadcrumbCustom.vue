<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  links: {
    type: Array as PropType<{ title: string; href: string }[]>,
    required: true,
  },
});
</script>

<template>
  <nav class="flex items-center gap-2 text-sm text-muted-foreground">
    <template v-for="(link, index) in links" :key="index">
      <span>{{ link.title }}</span>
    </template>
  </nav>
</template>
