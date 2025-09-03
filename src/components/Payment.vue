<script setup lang="ts">
import { onMounted } from 'vue';
import { usePaymentStore } from '@/stores/payment';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const paymentStore = usePaymentStore();

onMounted(() => {
  paymentStore.fetchPayments();
  console.log(paymentStore.payments);
});
</script>

<template>
  <div class="mt-10 grid grid-cols-1 md:grid-cols-2">
    <Card v-for="payment in paymentStore.payments" :key="payment.id">
      <CardHeader>
        <CardTitle>{{ payment.name }}</CardTitle>
        <CardDescription>{{ payment.description }}</CardDescription>
      </CardHeader>

      <CardContent>
        <p class="text-lg font-medium">Amount: {{ payment.amount }}</p>
        <p class="text-lg font-medium">Points: {{ payment.points }}</p>
      </CardContent>

      <CardFooter class="flex justify-between px-6 pb-6"> </CardFooter>
    </Card>
  </div>
</template>
