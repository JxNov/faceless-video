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

  return {
    loading,
    error,
    heygenSources,
    heygenAvatars,
    heygenVoices,
    fetchHeygenSources,
    fetchHeygenAvatars,
    fetchHeygenVoices,
  };
});
