<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { onMounted } from 'vue';

const userStore = useUserStore();

const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
const user = {
  name: userStorage.username || 'Guest',
  email: userStorage.email || '',
  avatar: userStorage.avatar || '',
};

onMounted(async () => {
  await userStore.getBalance();
});
</script>

<template>
  <Card class="bg-gray-200">
    <CardContent>
      <div class="flex flex-col items-center space-y-4">
        <img :src="user.avatar" :alt="user.name" class="h-24 w-24 rounded-full object-cover" />
        <div class="text-center">
          <h2 class="text-lg font-medium">Username: {{ user.name }}</h2>
          <p class="text-sm text-muted-foreground">Email: {{ user.email }}</p>
          <p class="text-sm text-muted-foreground">Balance: {{ userStore.balance }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
