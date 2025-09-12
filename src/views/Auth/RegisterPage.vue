<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthSignUp from '@/components/auth/SignUp.vue';
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 bg-muted p-6 min-h-svh md:p-10">
    <div class="max-w-sm w-full flex flex-col gap-6">
      <div class="flex flex-col gap-6">
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-xl">
              New to know Faceless Video?
            </CardTitle>
            <CardDescription>
              Create an account to get started!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AuthSignUp />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
