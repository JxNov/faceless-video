<script setup lang="ts">
import {
  Card,
  CardContent,
} from '@/components/ui/card';

const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
const user = {
  name: userStorage.username || 'Guest',
  email: userStorage.email || '',
  avatar: userStorage.avatar || '',
};
</script>

<template>
  <Card>
    <CardContent>
      <div class="flex flex-col items-center space-y-4">
        <img :src="user.avatar" :alt="user.name" class="h-24 w-24 rounded-full object-cover" />
        <div class="text-center">
          <h2 class="text-lg font-medium">{{ user.name }}</h2>
          <p class="text-sm text-muted-foreground">{{ user.email }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
