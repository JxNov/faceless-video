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

const avatarCustom = ref<any>(null);

const userStore = useUserStore();

onMounted(async () => {
  avatarCustom.value = await userStore.fetchMyCustomAvatars();

});
</script>

<template>
  <Select v-model="modelValue">
    <SelectTrigger>
      <SelectValue placeholder="Avatar">
        <img v-if="modelValue" :src="avatarCustom?.data.custom_avatars.find(avatar => avatar.heygen_avatar_id === modelValue)
          ?.preview_url
          " alt="Selected Avatar" class="inline-block h-6 w-6 rounded-full object-cover" />

        <span v-if="modelValue" class="ml-2">
          {{
            avatarCustom?.data.custom_avatars.find(avatar => avatar.heygen_avatar_id === modelValue)?.heygen_avatar_id ||
            'Select an Avatar'
          }}
        </span>
      </SelectValue>
    </SelectTrigger>

    <SelectContent>
      <SelectGroup>
        <SelectLabel>Avatar</SelectLabel>

        <SelectItem v-for="avatar in avatarCustom?.data.custom_avatars" :key="avatar.heygen_avatar_id"
          :value="avatar.heygen_avatar_id">
          <img :src="avatar.preview_url" alt="Avatar Thumbnail"
            class="inline-block h-6 w-6 rounded-full object-cover" />

          {{ avatar.id }} - {{ avatar.gender }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
