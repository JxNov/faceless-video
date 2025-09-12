import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import AuthServices from '@/services/auth';
import { ROUTES } from '@/constants/routers';
import { toast } from 'vue-sonner';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const user = ref<any>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const isAuthenticated = ref<boolean>(!!localStorage.getItem('accessToken'));

  const login = async (payload: { usernameOrEmail: string; password: string }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await AuthServices.login({ params: payload });

      if (response.data.success) {
        user.value = response.data.data.user;

        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
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
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push(ROUTES.AUTH_LOGIN);
  };

  const register = async (payload: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await AuthServices.register({
        params: {
          username: payload.username,
          email: payload.email,
          password: payload.password,
          role: payload.role ?? 'USER',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Đăng ký thành công! Vui lòng đăng nhập.');
        router.push(ROUTES.AUTH_LOGIN);
      }
    } catch (err: any) {
      error.value = err.response.data.error.message;
      toast.error(err.response.data.error.message || 'Đăng ký thất bại!');
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };
});
