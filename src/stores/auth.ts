import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import AuthServices from '@/services/auth';
import { ROUTES } from '@/constants/routers';
import type { TUsers } from '@/types/user.types';

type User = {
  balance: number;
  email: string;
  id: number;
  username: string;
};

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const login = async (payload: TUsers) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await AuthServices.login({ params: payload });

      if (response.data.success) {
        user.value = response.data.user;
        router.push(ROUTES.HOME);
      }
    } catch {
      error.value = 'Đăng nhập thất bại!';
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    router.push(ROUTES.AUTH_LOGIN);
    // call api logout
  };

  return {
    loading,
    error,
    login,
    logout,
  };
});
