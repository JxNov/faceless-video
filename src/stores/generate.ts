import { ref } from 'vue';
import { defineStore } from 'pinia';
import GenerateServices from '@/services/generate';

export const useGenerateStore = defineStore('generate', () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const heygenSources = ref<any>([]);
  const heygenAvatars = ref<any>([]);
  const heygenVoices = ref<any>([]);

  const fetchHeygenSources = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await GenerateServices.heygenSources();
      heygenSources.value = response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch sources';
    } finally {
      loading.value = false;
    }
  };

  const fetchHeygenAvatars = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await GenerateServices.heygenAvatars();
      heygenAvatars.value = response.data.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch avatars';
    } finally {
      loading.value = false;
    }
  };

  const fetchHeygenVoices = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await GenerateServices.heygenVoices();
      heygenVoices.value = response.data.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch voices';
    } finally {
      loading.value = false;
    }
  };

  const heygenGetHeadline = async (params: { sourceType: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await GenerateServices.heygenGetHeadline(params);
      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to get headline';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const heygenGenerateArticleEnhanced = async (params: {
    keyword_id: number;
    min_words?: number;
    max_words?: number;
  }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await GenerateServices.heygenGenerateArticleEnhanced({
        keyword_id: params.keyword_id,
        min_words: params.min_words || 250,
        max_words: params.max_words || 300,
      });

      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to generate article';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const heygenGenerateVideo = async (params: {
    article_id: number;
    avatar_id: string;
    voice_id: string;
  }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await GenerateServices.heygenGenerateVideo(params);
      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to generate video';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const heygenGenerateVideoCustom = async (params: {
    source: string;
    article_id: number;
    use_workflow?: boolean;
    custom_avatar_id: string;
    voice_id: string;
    target_chars?: number;
    min_words?: number;
    max_words?: number;
    use_enhanced_ai?: boolean;
    natural_level?: string;
    talking_style?: string;
    expression?: string;
    super_resolution?: boolean;
    emotion?: string;
    speed?: number;
    avatar_style?: string;
  }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await GenerateServices.heygenGenerateVideoCustom({
        source: params.source,
        article_id: params.article_id,
        use_workflow: params.use_workflow || true,
        custom_avatar_id: params.custom_avatar_id,
        voice_id: params.voice_id,
        target_chars: params.target_chars || 350,
        min_words: params.min_words || 130,
        max_words: params.max_words || 150,
        use_enhanced_ai: params.use_enhanced_ai || true,
        natural_level: params.natural_level || 'enhanced',
        talking_style: params.talking_style || 'expressive',
        expression: params.expression || 'happy',
        super_resolution: params.super_resolution || true,
        emotion: params.emotion || 'Friendly',
        speed: params.speed || 1.1,
        avatar_style: params.avatar_style || 'closeUp',
      });
      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to generate video with custom avatar';
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    heygenSources,
    heygenAvatars,
    heygenVoices,
    fetchHeygenSources,
    fetchHeygenAvatars,
    fetchHeygenVoices,
    heygenGetHeadline,
    heygenGenerateArticleEnhanced,
    heygenGenerateVideo,
    heygenGenerateVideoCustom,
  };
});
