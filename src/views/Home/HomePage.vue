<script setup lang="ts">
import { onMounted } from 'vue';
import { useVideoStore } from '@/stores/video';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';

const videoStore = useVideoStore();

const downloadVideo = async (videoUrl: string) => {
  try {
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading video:', error);
  }
};

onMounted(async () => {
  await videoStore.fetchHeygenVideos();
});
</script>

<template>
  <Card class="p-6 gap-4">
    <h1 class="text-2xl font-bold">Welcome to Faceless Video</h1>

    <p class="text-muted-foreground">
      Create stunning videos with AI in minutes. No design skills needed.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card class="w-[350px]" v-for="video in videoStore.heygenVideos.videos" :key="video.id">
        <CardHeader>
          <CardDescription>{{ video.status }}</CardDescription>
        </CardHeader>

        <CardContent>
          <p class="line-clamp-5">{{ video.textContent }}</p>

          <video v-if="video.videoPath" :src="video.videoPath + '?fm=mp4'" controls crossorigin="anonymous"
            class="w-full mt-2 rounded"></video>
        </CardContent>

        <CardFooter class="flex justify-between px-6 pb-6">
          <Button variant="outline" @click="downloadVideo(video.videoPath)">Download</Button>
        </CardFooter>
      </Card>
    </div>
  </Card>
</template>
