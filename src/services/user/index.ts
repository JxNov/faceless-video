import { USER_API } from '@/constants/api';
import { apiServices } from '@/services/api';

const UserServices = {
  heygenUploadAvatar: (params: { avatar_file: File; avatar_name: string }) => {
    return apiServices.post(USER_API.HEYGEN_UPLOAD_AVATAR, params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  heygenMyCustomAvatars: () => {
    return apiServices.get(USER_API.HEYGEN_MY_CUSTOM_AVATARS);
  },
};

export default UserServices;
