<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { GalleryVerticalEnd } from 'lucide-vue-next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthSignIn from '@/components/auth/SignIn.vue';
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 bg-muted p-6 min-h-svh md:p-10">
    <div class="max-w-sm w-full flex flex-col gap-6">
      <RouterLink to="#" class="flex items-center self-center gap-2 font-medium">
        <div
          class="h-6 w-6 flex items-center justify-center rounded-md bg-primary text-primary-foreground"
        >
          <GalleryVerticalEnd class="size-4" />
        </div>
        Acme Inc.
      </RouterLink>
      <div class="flex flex-col gap-6">
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-xl"> Welcome back </CardTitle>
            <CardDescription> Login with your Apple or Google account </CardDescription>
          </CardHeader>

          <CardContent>
            <AuthSignIn />
          </CardContent>
        </Card>
        <div
          class="text-center text-balance text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary"
        >
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  </div>
</template>
