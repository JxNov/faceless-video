<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AvailableSource from '@/components/generate/AvailableSource.vue';
import AvailableAvatar from '@/components/generate/AvailableAvatar.vue';
import AvailableVoice from '@/components/generate/AvailableVoice.vue';
import type { DateValue } from '@internationalized/date';
import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimeFieldInput, TimeFieldRoot } from 'reka-ui';
import CronJobServices from '@/services/cron';
import { Card } from '@/components/ui/card';

const name = ref<string>('');
const sourceType = ref<string>('');
const avatarId = ref<string>('');
const voiceId = ref<string>('');
const dateValue = ref<DateValue | null>(null);
const timeValue = ref<any>(null);
const df = new DateFormatter('en-US', { dateStyle: 'long' });

const fullDate = computed<Date | null>(() => {
  if (!dateValue.value || !timeValue.value) return null;
  const d = dateValue.value.toDate(getLocalTimeZone());
  const result = new Date(d);

  result.setHours(timeValue.value.hour);
  result.setMinutes(timeValue.value.minute);
  result.setSeconds(timeValue.value.second ?? 0);
  result.setMilliseconds(timeValue.value.millisecond ?? 0);

  return result;
});

const createJob = () => {
  if (!fullDate.value) return;

  const yyyy = fullDate.value.getFullYear();
  const MM = String(fullDate.value.getMonth() + 1).padStart(2, '0');
  const dd = String(fullDate.value.getDate()).padStart(2, '0');
  const hh = String(fullDate.value.getHours()).padStart(2, '0');
  const mm = String(fullDate.value.getMinutes()).padStart(2, '0');
  const ss = String(fullDate.value.getSeconds()).padStart(2, '0');
  const formatted = `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;

  CronJobServices.cronJobTrigger({
    jobName: name.value || 'my_scheduled_job',
    executeAt: formatted,
    immediate: false,
    sourceType: sourceType.value,
    avatarId: avatarId.value,
    voiceId: voiceId.value,
  })
    .then(() => {
      alert('Cron job created successfully!');
      name.value = '';
      sourceType.value = '';
      avatarId.value = '';
      voiceId.value = '';
      dateValue.value = null;
      timeValue.value = null;
    })
    .catch(err => {
      console.error(err);
      alert('Failed to create cron job.');
    });
};
</script>

<template>
  <Card class="space-y-4 p-6">
    <h2 class="text-2xl font-bold mb-1">Cron Job</h2>
    <p class="mb-2 text-gray-600">Manually trigger cron jobs to generate videos.</p>

    <!-- <Input type="text" placeholder="Name job" class="w-52" v-model="name" /> -->

    <div class="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" :class="cn(
            'w-[280px] justify-start text-left font-normal',
            !dateValue && 'text-muted-foreground'
          )
            ">
            <CalendarIcon class="mr-2 h-4 w-4" />
            {{ dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : 'Pick a date' }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar v-model="dateValue" initial-focus />
        </PopoverContent>
      </Popover>

      <TimeFieldRoot v-model="timeValue" v-slot="{ segments }" :hour-cycle="24"
        class="w-14 flex select-none bg-white items-center rounded-lg shadow-sm text-center text-green10 border p-1 data-[invalid]:border-red-500">
        <template v-for="item in segments" :key="item.part">
          <TimeFieldInput v-if="item.part === 'literal'" :part="item.part">
            {{ item.value }}
          </TimeFieldInput>
          <TimeFieldInput v-else :part="item.part"
            class="rounded p-0.5 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9">
            {{ item.value }}
          </TimeFieldInput>
        </template>
      </TimeFieldRoot>
    </div>

    <AvailableSource v-model="sourceType" />
    <AvailableAvatar v-model="avatarId" :disabled="!sourceType" />
    <AvailableVoice v-model="voiceId" :disabled="!sourceType" />

    <div class="mt-6">
      <Button @click="createJob" :disabled="!sourceType || !avatarId || !voiceId || !fullDate">
        Start Cron Job
      </Button>
    </div>
  </Card>
</template>
