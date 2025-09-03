<script setup lang="ts">
import { onMounted } from 'vue';
import { useGenerateStore } from '@/stores/generate';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const modelValue = defineModel<string>();

const generateStore = useGenerateStore();

onMounted(async () => {
  await generateStore.fetchHeygenSources();
});
</script>

<template>
  <Select v-model="modelValue">
    <SelectTrigger>
      <SelectValue placeholder="Source" />
    </SelectTrigger>

    <SelectContent>
      <SelectGroup>
        <SelectLabel>Source</SelectLabel>

        <SelectItem
          v-for="source in generateStore.heygenSources.sources"
          :key="source.value"
          :value="source.value"
        >
          {{ source.name }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
