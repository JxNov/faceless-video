import { ref } from 'vue';
import { defineStore } from 'pinia';
import UserServices from '@/services/user';

export const useUserStore = defineStore('user', () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const avatarCustoms = ref<any[]>([]);
  const balance = ref<number>(0);

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
      avatarCustoms.value = response.data.data.custom_avatars;
      return avatarCustoms.value;
    } catch (err: any) {
      loading.value = false;
      error.value = err.message || 'Failed to fetch custom avatars';
      throw err;
    }
  };

  const getBalance = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await UserServices.authBalance();
      loading.value = false;
      balance.value = response.data.data.balance;
      return balance.value;
    } catch (err: any) {
      loading.value = false;
      error.value = err.message || 'Failed to fetch balance';
      throw err;
    }
  };

  return {
    loading,
    error,
    avatarCustoms,
    balance,
    uploadAvatar,
    fetchMyCustomAvatars,
    getBalance,
  };
});
