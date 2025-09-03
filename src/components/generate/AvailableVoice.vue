<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGenerateStore } from '@/stores/generate';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const modelValue = defineModel<string>();
const generateStore = useGenerateStore();

let audio: HTMLAudioElement | null = null;
const playingVoiceId = ref<string | null>(null);
const isPlaying = ref(false);

const previewVoice = (voiceId: string) => {
  const voice = generateStore.heygenVoices.voices.find(v => v.id === voiceId);
  if (!voice?.previewUrl) return;

  if (audio && playingVoiceId.value === voiceId) {
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          isPlaying.value = true;
        })
        .catch(err => console.error('Error playing audio:', err));
    } else {
      audio.pause();
      isPlaying.value = false;
    }
    return;
  }

  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  audio = new Audio(voice.previewUrl);
  playingVoiceId.value = voiceId;

  audio.addEventListener('play', () => {
    isPlaying.value = true;
  });
  audio.addEventListener('pause', () => {
    isPlaying.value = false;
  });
  audio.addEventListener('ended', () => {
    isPlaying.value = false;
    playingVoiceId.value = null;
  });

  audio.play().catch(err => console.error('Error playing audio:', err));
};

onMounted(async () => {
  await generateStore.fetchHeygenVoices();
});
</script>

<template>
  <div class="flex items-center gap-4">
    <Select v-model="modelValue">
      <SelectTrigger>
        <SelectValue placeholder="Voice" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Voice</SelectLabel>
          <SelectItem
            v-for="voice in generateStore.heygenVoices.voices"
            :key="voice.id"
            :value="voice.id"
          >
            {{ voice.name }} - {{ voice.gender }} ({{ voice.language }})
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Button v-if="modelValue" @click="previewVoice(modelValue)" :disabled="!modelValue">
      {{ isPlaying && playingVoiceId === modelValue ? 'Pause' : 'Play' }} Voice
    </Button>
  </div>
</template>
