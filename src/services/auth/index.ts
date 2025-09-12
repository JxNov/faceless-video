import { AUTH_API } from '@/constants/api';
import type { ValueOptions } from '@/types/common.types';
import { apiServices } from '@/services/api';

const AuthServices = {
  login(options?: ValueOptions) {
    return apiServices.post(AUTH_API.LOGIN, options?.params);
  },
  logout(options?: ValueOptions) {
    return apiServices.post(AUTH_API.LOGOUT, options?.params);
  },
  register(options?: ValueOptions) {
    return apiServices.post(AUTH_API.REGISTER, options?.params);
  },
};

export default AuthServices;
