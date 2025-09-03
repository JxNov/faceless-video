import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import AuthServices from '@/services/auth';
import { ROUTES } from '@/constants/routers';
import { toast } from 'vue-sonner';

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
  const isAuthenticated = ref<boolean>(!!localStorage.getItem('accessToken'));
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'));
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'));

  const login = async (payload: { usernameOrEmail: string; password: string }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await AuthServices.login({ params: payload });

      if (response.data.success) {
        user.value = response.data.user;

        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);

        accessToken.value = response.data.data.accessToken;
        refreshToken.value = response.data.data.refreshToken;
        isAuthenticated.value = true;

        router.push(ROUTES.HOME);
        toast.success(response.data.message || 'Đăng nhập thành công!');
      }
    } catch (err: any) {
      error.value = err.response.data.error.message;
      toast.error(err.response.data.error.message || 'Đăng nhập thất bại!');
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push(ROUTES.AUTH_LOGIN);
  };

  return {
    loading,
    error,
    user,
    isAuthenticated,
    accessToken,
    refreshToken,
    login,
    logout,
  };
});
