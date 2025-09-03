<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Welcome to Faceless Video</h1>
    <p class="mt-2 text-muted-foreground">
      Create stunning videos with AI in minutes. No design skills needed.
    </p>
    <div class="mt-6 flex space-x-4">
      <RouterLink to="/generate">
        <Button> Get Started </Button>
      </RouterLink>

      <RouterLink to="/about">
        <Button variant="outline"> Learn More </Button>
      </RouterLink>
    </div>
  </div>
</template>
