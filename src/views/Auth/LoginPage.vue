<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import type { TUsers } from '@/types/user.types';

const auth = useAuthStore();

const formState = reactive({
  username: '',
  password: '',
});

const onFinish = async (values: TUsers) => {
  if (values.username === '') {
    auth.error = 'Username không được để trống!';
    return;
  }

  if (values.password === '') {
    auth.error = 'Password không được để trống!';
    return;
  }

  await auth.login({ ...values });
};
</script>

<template>
  <div class="w-full max-w-sm p-6 mx-auto bg-white rounded shadow border border-gray-200">
    <h1 class="text-2xl font-bold text-center">Login</h1>

    <div v-if="auth.error" class="text-center mt-4 text-red-500">
      {{ auth.error }}
    </div>

    <form class="mt-4" @submit.prevent="onFinish(formState)">
      <div class="mb-4">
        <label for="username" class="block mb-2">Username</label>
        <input
          type="username"
          id="username"
          class="w-full p-2 border border-gray-300 rounded"
          :class="{ 'opacity-50 cursor-not-allowed': auth.loading }"
          v-model="formState.username"
          :disabled="auth.loading"
        />
      </div>

      <div class="mb-4">
        <label for="password" class="block mb-2">Password</label>
        <input
          type="password"
          id="password"
          class="w-full p-2 border border-gray-300 rounded"
          :class="{ 'opacity-50 cursor-not-allowed': auth.loading }"
          v-model="formState.password"
          :disabled="auth.loading"
        />
      </div>

      <button
        type="submit"
        class="w-full p-2 bg-blue-500 text-white rounded"
        :class="auth.loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
        :disabled="auth.loading"
      >
        Login
      </button>
    </form>
  </div>
</template>
