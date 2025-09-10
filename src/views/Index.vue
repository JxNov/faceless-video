<script setup lang="ts">
import HomePage from '@/views/home/HomePage.vue';
import GeneratePage from '@/views/generate/GeneratePage.vue';
import CronJobPage from '@/views/cron/CronJobPage.vue';
import CustomAvatarPage from '@/views/avatar/CustomAvatarPage.vue';
</script>

<template>
  <HomePage id="home" class="mb-10" />
  <GeneratePage id="generate" class="my-10 h-[700px]" />
  <CronJobPage id="cron-job" class="my-10 h-[700px]" />
  <CustomAvatarPage id="custom-avatar" class="mt-10 h-[700px]" />
</template>
