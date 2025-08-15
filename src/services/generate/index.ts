import { GENERATE_API } from '@/constants/api';
import type { ValueOptions } from '@/types/common.types';
import { apiServices } from '@/services/api';

const GenerateServices = {
  getHeadline: (options?: ValueOptions) => {
    return apiServices.get(GENERATE_API.GET_HEADLINE, options?.params);
  },

  generateArticle: (options?: ValueOptions) => {
    return apiServices.post(GENERATE_API.GENERATE_ARTICLE, options?.params);
  },

  generateVideos: (options?: ValueOptions) => {
    return apiServices.post(GENERATE_API.GENERATE_VIDEOS, options?.params);
  },

  mergeVideos: (options?: ValueOptions) => {
    return apiServices.post(GENERATE_API.MERGE_VIDEOS, options?.params);
  },
};

export default GenerateServices;
