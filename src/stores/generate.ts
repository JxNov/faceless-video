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
  };
});
