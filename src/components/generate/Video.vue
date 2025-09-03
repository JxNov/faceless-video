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

const email = ref('');
const password = ref('');

function onSubmit() {
  if (!email.value || !password.value) return;

  authStore.login({ usernameOrEmail: email.value, password: password.value });
}
</script>

<template>
  <form class="grid gap-6" @submit.prevent="onSubmit">
    <div class="grid gap-2">
      <Label for="email"> Username or Email </Label>
      <Input
        id="email"
        v-model="email"
        type="text"
        placeholder="name@example.com or username"
        :disabled="authStore.loading"
        auto-capitalize="none"
        auto-complete="email"
        auto-correct="off"
      />
    </div>
    <div class="grid gap-2">
      <div class="flex items-center">
        <Label for="password"> Password </Label>
        <RouterLink to="/forgot-password" class="ml-auto inline-block text-sm underline">
          Forgot your password?
        </RouterLink>
      </div>
      <PasswordInput id="password" v-model="password" />
    </div>
    <Button type="submit" class="w-full" :disabled="authStore.loading">
      <Loader2 v-if="authStore.loading" class="mr-2 h-4 w-4 animate-spin" />
      Login
    </Button>
  </form>
  <div class="mt-4 text-center text-sm text-muted-foreground">
    Don't have an account?
    <RouterLink to="/register" class="underline"> Sign up </RouterLink>
  </div>
</template>

<style scoped></style>
