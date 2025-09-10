<script setup lang="ts">
import { Card } from '@/components/ui/card';
import GenerateVideoHeygen from '@/components/generate/GenerateVideoHeygen.vue';
import GenerateVideoCustomAvatar from '@/components/generate/GenerateVideoCustomAvatar.vue';
</script>

<template>
  <Card class="p-6">
    <h2 class="text-2xl font-bold">
      Generate Video
    </h2>

    <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card class="p-6">
        <GenerateVideoHeygen />
      </Card>

      <Card class="p-6">
        <GenerateVideoCustomAvatar />
      </Card>
    </div>
  </Card>
</template>
