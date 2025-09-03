<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import AvailableSource from '@/components/generate/AvailableSource.vue';
import AvailableAvatar from '@/components/generate/AvailableAvatar.vue';
import AvailableVoice from '@/components/generate/AvailableVoice.vue';

const formSchema = toTypedSchema(
  z.object({
    source: z.string().min(1, 'Source is required'),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(values => {
  console.log(values);
});
</script>

<template>
  <form class="w-2/3 space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="source">
      <FormItem>
        <FormLabel>Source</FormLabel>

        <AvailableSource v-bind="componentField" />
        <FormMessage />
      </FormItem>
    </FormField>
  </form>

  <AvailableAvatar />
  <AvailableVoice />
</template>
