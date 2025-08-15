import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import GenerateServices from '@/services/generate';

type TVideoParts = {
  videoPath: string;
  lipsyncModel: string;
  id: number;
  status: string;
};

export const useGenerateStore = defineStore('generate', () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const stepActive = ref<string>('headline');
  const steps = reactive({
    headline: {
      status: 'pending',
    },
    article: {
      status: 'pending',
    },
    videos: {
      status: 'pending',
    },
    merge: {
      status: 'pending',
    },
  });

  const headline = ref<string>('');
  const articleId = ref<number | null>(null);
  const videoParts = ref<TVideoParts[]>([]);
  const videoIds = ref<number[]>([]);

  const getHeadline = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await GenerateServices.getHeadline();

      if (!response) throw new Error('No response from server');

      headline.value = response.data.headline;
      steps.headline.status = 'completed';
    } catch {
      error.value = 'Failed to fetch headline';
      steps.headline.status = 'error';
    } finally {
      loading.value = false;
    }
  };

  const generateArticle = async (payload: { headline: string }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await GenerateServices.generateArticle({ params: payload });

      if (!response) throw new Error('No response from server');

      articleId.value = response.data.articleId;
      stepActive.value = 'article';
      steps.article.status = 'completed';
    } catch {
      error.value = 'Failed to generate article';
      steps.article.status = 'error';
    } finally {
      loading.value = false;
    }
  };

  const generateVideos = async (payload: { articleId: number }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await GenerateServices.generateVideos({ params: payload });

      if (!response) throw new Error('No response from server');

      videoParts.value = response.data.videoParts;
      videoIds.value = videoParts.value.map(part => part.id);
      stepActive.value = 'videos';
      steps.videos.status = 'completed';
    } catch {
      error.value = 'Failed to generate videos';
      steps.videos.status = 'error';
    } finally {
      loading.value = false;
    }
  };

  const mergeVideos = async (payload: { videoIds: number[] }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await GenerateServices.mergeVideos({ params: payload });

      if (!response) throw new Error('No response from server');

      stepActive.value = 'merge';
      steps.merge.status = 'completed';
    } catch {
      error.value = 'Failed to merge videos';
      steps.merge.status = 'error';
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    stepActive,
    steps,
    headline,
    articleId,
    videoParts,
    videoIds,
    getHeadline,
    generateArticle,
    generateVideos,
    mergeVideos,
  };
});
