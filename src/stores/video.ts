import { ref } from 'vue';
import { defineStore } from 'pinia';
import VideoServices from '@/services/video';

export const useVideoStore = defineStore('video', () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const heygenVideos = ref<any>([]);

  const fetchHeygenVideos = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await VideoServices.heygenMyVideos();
      heygenVideos.value = response.data.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch sources';
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    heygenVideos,
    fetchHeygenVideos,
  };
});
