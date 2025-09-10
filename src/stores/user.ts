import { ref } from 'vue';
import { defineStore } from 'pinia';
import UserServices from '@/services/user';

export const useUserStore = defineStore('user', () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const uploadAvatar = async (params: { avatar_file: File; avatar_name: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await UserServices.heygenUploadAvatar(params);
      loading.value = false;
      return response.data;
    } catch (err: any) {
      loading.value = false;
      error.value = err.message || 'Failed to upload avatar';
      throw err;
    }
  };

  const fetchMyCustomAvatars = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await UserServices.heygenMyCustomAvatars();
      loading.value = false;
      return response.data;
    } catch (err: any) {
      loading.value = false;
      error.value = err.message || 'Failed to fetch custom avatars';
      throw err;
    }
  };

  return {
    loading,
    error,
    uploadAvatar,
    fetchMyCustomAvatars,
  };
});
