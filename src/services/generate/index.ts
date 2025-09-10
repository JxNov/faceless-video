import { GENERATE_API } from '@/constants/api';
import { apiServices } from '@/services/api';

const GenerateServices = {
  heygenSources: () => apiServices.get(GENERATE_API.HEYGEN_SOURCES),
  heygenAvatars: () => apiServices.get(GENERATE_API.HEYGEN_AVATARS),
  heygenVoices: () => apiServices.get(GENERATE_API.HEYGEN_VOICES),

  heygenGetHeadline: (params: { sourceType: string }) =>
    apiServices.post(GENERATE_API.HEYGEN_GET_HEADLINE, params),

  heygenGenerateArticleEnhanced: (params: {
    keyword_id: number;
    min_words: number;
    max_words: number;
  }) => apiServices.post(GENERATE_API.HEYGEN_GENERATE_ARTICLE_ENHANCED, params),

  heygenGenerateVideo: (params: { article_id: number; avatar_id: string; voice_id: string }) =>
    apiServices.post(GENERATE_API.HEYGEN_GENERATE_VIDEO, params),

  heygenGenerateVideoCustom: (params: {
    source: string;
    article_id: number;
    use_workflow: boolean;
    custom_avatar_id: string;
    voice_id: string;
    target_chars: number;
    min_words: number;
    max_words: number;
    use_enhanced_ai: boolean;
    natural_level: string;
    talking_style: string;
    expression: string;
    super_resolution: boolean;
    emotion: string;
    speed: number;
    avatar_style: string;
  }) => apiServices.post(GENERATE_API.HEYGEN_GENERATE_VIDEO_CUSTOM, params),
};

export default GenerateServices;
