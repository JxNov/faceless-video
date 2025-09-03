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
  await generateStore.fetchHeygenAvatars();
});
</script>

<template>
  <Select v-model="modelValue">
    <SelectTrigger>
      <SelectValue placeholder="Avatar">
        <img
          v-if="modelValue"
          :src="
            generateStore.heygenAvatars.avatars.find(avatar => avatar.id === modelValue)
              ?.previewImage
          "
          alt="Selected Avatar"
          class="inline-block h-6 w-6 rounded-full object-cover"
        />

        <span v-if="modelValue" class="ml-2">
          {{
            generateStore.heygenAvatars.avatars.find(avatar => avatar.id === modelValue)?.id ||
            'Select an Avatar'
          }}
        </span>
      </SelectValue>
    </SelectTrigger>

    <SelectContent>
      <SelectGroup>
        <SelectLabel>Avatar</SelectLabel>

        <SelectItem
          v-for="avatar in generateStore.heygenAvatars.avatars"
          :key="avatar.id"
          :value="avatar.id"
        >
          <img
            :src="avatar.previewImage"
            alt="Avatar Thumbnail"
            class="inline-block h-6 w-6 rounded-full object-cover"
          />

          {{ avatar.id }} - {{ avatar.gender }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
