<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Loader2 } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/auth/PasswordInput.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const username = ref('');
const email = ref('');
const password = ref('');

function onSubmit() {
  if (!email.value || !password.value || !username.value) return;

  authStore.register({ email: email.value, username: username.value, password: password.value });
}
</script>

<template>
  <form class="grid gap-6" @submit.prevent="onSubmit">
    <div class="grid gap-2">
      <Label for="email"> Email </Label>
      <Input id="email" v-model="email" type="text" placeholder="name@example.com" :disabled="authStore.loading"
        auto-capitalize="none" auto-complete="email" auto-correct="off" />
    </div>

    <div class="grid gap-2">
      <Label for="username"> Username </Label>
      <Input id="text" v-model="username" type="text" placeholder="username" :disabled="authStore.loading"
        auto-capitalize="none" auto-complete="username" auto-correct="off" />
    </div>

    <div class="grid gap-2">
      <Label for="password"> Password </Label>
      <PasswordInput id="password" v-model="password" />
    </div>

    <Button type="submit" class="w-full" :disabled="authStore.loading">
      <Loader2 v-if="authStore.loading" class="mr-2 h-4 w-4 animate-spin" />
      Sign Up
    </Button>
  </form>
  <div class="mt-4 text-center text-sm text-muted-foreground">
    Accout exists?
    <RouterLink to="/login" class="underline"> Sign in </RouterLink>
  </div>
</template>

<style scoped></style>
