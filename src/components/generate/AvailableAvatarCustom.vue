<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
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

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchMyCustomAvatars();
});
</script>

<template>
  <Select v-model="modelValue">
    <SelectTrigger>
      <SelectValue placeholder="Avatar">
        <img v-if="modelValue" :src="userStore.avatarCustoms.find((avatar: { heygen_avatar_id: string | undefined; }) => avatar.heygen_avatar_id === modelValue)
          ?.preview_url
          " alt="Selected Avatar" class="inline-block h-6 w-6 rounded-full object-cover" />

        <span v-if="modelValue" class="ml-2">
          {{
            userStore.avatarCustoms.find((avatar: { heygen_avatar_id: string | undefined; }) => avatar.heygen_avatar_id
              === modelValue)?.heygen_avatar_id ||
            'Select an Avatar'
          }}
        </span>
      </SelectValue>
    </SelectTrigger>

    <SelectContent>
      <SelectGroup>
        <SelectLabel>Avatar</SelectLabel>

        <SelectItem v-for="avatar in userStore.avatarCustoms" :key="avatar.heygen_avatar_id"
          :value="avatar.heygen_avatar_id">
          <img :src="avatar.preview_url" alt="Avatar Thumbnail"
            class="inline-block h-6 w-6 rounded-full object-cover" />

          {{ avatar.id }} - {{ avatar.gender }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
