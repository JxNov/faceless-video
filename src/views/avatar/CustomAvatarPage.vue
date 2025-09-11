<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const userStore = useUserStore();
const showModalUpload = ref(false);
const avatarName = ref('');
const avatarFile = ref<File | null>(null);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    avatarFile.value = target.files[0];
  } else {
    avatarFile.value = null;
  }
};

const handleUpload = async () => {
  if (!avatarName.value || !avatarFile.value) return;

  console.log('Uploading', avatarName.value, avatarFile.value);

  try {
    await userStore.uploadAvatar({
      avatar_name: avatarName.value,
      avatar_file: avatarFile.value,
    });

    showModalUpload.value = false;
    avatarName.value = '';
    avatarFile.value = null;

    await userStore.fetchMyCustomAvatars();
  } catch (error) {
    console.error('Upload failed', error);
  }
};

onMounted(async () => {
  await userStore.fetchMyCustomAvatars();
});
</script>

<template>
  <Card class="p-6">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-bold">My Custom Avatars</h1>

      <Button variant="outline" @click="showModalUpload = true">Upload</Button>
    </div>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card class="w-[350px]" v-for="avatar in userStore.avatarCustoms" :key="avatar.id">
        <CardHeader>
          <CardTitle>{{ avatar.avatar_name }}</CardTitle>
        </CardHeader>

        <CardContent>
          <img :src="avatar.preview_url" :alt="avatar.avatar_name" />
        </CardContent>
      </Card>
    </div>

    <Dialog v-model:open="showModalUpload">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload avatar</DialogTitle>
          <DialogDescription class="text-xs text-muted-foreground">
            To upload a custom avatar.
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="handleUpload" enctype="multipart/form-data">
          <div class="mb-4">
            <Label for="avatar_name" class="block mb-2 font-medium">Avatar Name</Label>
            <Input type="text" id="avatar_name" v-model="avatarName" required :disabled="userStore.loading" />
          </div>

          <div class="mb-4">
            <Label for="avatar_file" class="block mb-2 font-medium">Avatar File</Label>
            <Input type="file" id="avatar_file" accept="image/*" class="w-full" @change="handleChange" required
              :disabled="userStore.loading" />
          </div>

          <div class="flex justify-end">
            <Button type="submit" :disabled="userStore.loading">Upload</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </Card>
</template>

<style scoped></style>
