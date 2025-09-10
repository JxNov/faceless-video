<script setup lang="ts">
import { ref } from 'vue';
import { useGenerateStore } from '@/stores/generate';
import { Button } from '@/components/ui/button';
import AvailableSource from '@/components/generate/AvailableSource.vue';
import AvailableAvatarCustom from '@/components/generate/AvailableAvatarCustom.vue';
import AvailableVoice from '@/components/generate/AvailableVoice.vue';

const generateStore = useGenerateStore();

const headline = ref<any>(null);
const article = ref<any>(null);
const sourceType = ref<string>('');
const avatarId = ref<string>('');
const voiceId = ref<string>('');

const getHeygenHeadlineSource = async () => {
  if (!sourceType.value) return;
  headline.value = await generateStore.heygenGetHeadline({ sourceType: sourceType.value });
};

const generateArticle = async () => {
  if (!headline.value) return;
  article.value = await generateStore.heygenGenerateArticleEnhanced({
    keyword_id: headline.value.keywordId,
  });
};

const createVideo = async () => {
  if (!headline.value || !avatarId.value || !voiceId.value) return;
  await generateStore.heygenGenerateVideoCustom({
    source: sourceType.value,
    article_id: article.value.article_id,
    custom_avatar_id: avatarId.value,
    voice_id: voiceId.value,
  });
};
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold mb-2">Generate video with custom avatar</h2>

    <div class="space-y-2">
      <div class="flex flex-col">
        <h3 class="text-xl font-bold mb-1">Select Headline Source</h3>
        <p class="mb-2 text-gray-600">Choose a source for generating headlines</p>

        <div class="flex items-center gap-4">
          <AvailableSource v-model="sourceType" />
          <Button @click="getHeygenHeadlineSource" :disabled="!sourceType || generateStore.loading"> Get Headlines
          </Button>
        </div>
      </div>

      <div v-if="headline" class="p-4 border rounded bg-gray-50">
        <h3 class="text-xl font-semibold mb-2">
          Generated Headline: {{ headline.primaryKeyword }}
        </h3>
        <p class="text-gray-800">
          keywords: {{ headline.keywords }} <br />
          headline: {{ headline.headline }} <br />
          sourceType: {{ headline.sourceType }} <br />
          url:
          <a :href="headline.url" target="_blank" class="text-blue-500 underline">
            {{ headline.url }}
          </a>
        </p>
      </div>
    </div>

    <div class="space-y-2">
      <div class="flex flex-col">
        <p class="mb-2 text-gray-600">Generate article</p>

        <div class="flex items-center gap-4">
          <Button @click="generateArticle" :disabled="!sourceType || !headline || generateStore.loading"> Generate
            Article </Button>
        </div>
      </div>

      <div v-if="article" class="p-4 border rounded bg-gray-50">
        <h3 class="text-xl font-semibold mb-2">Article: {{ article.primary_keyword_text }}</h3>
        <p class="text-gray-800">
          keywords: {{ article.all_keywords }} <br />
          headline: {{ article.headline }} <br />
        </p>

        article_text
        <p class="text-gray-800">content: {{ article.article_text }}</p>
      </div>
    </div>

    <AvailableAvatarCustom v-model="avatarId" :disabled="!sourceType || generateStore.loading" />
    <AvailableVoice v-model="voiceId" :disabled="!sourceType || generateStore.loading" />

    <div class="mt-6">
      <Button @click="createVideo" :disabled="!headline || !avatarId || !voiceId || !article || generateStore.loading">
        Generate Video
      </Button>
    </div>
  </div>
</template>
