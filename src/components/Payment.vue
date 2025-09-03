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
import { Button } from '@/components/ui/button';

const paymentStore = usePaymentStore();

onMounted(() => {
  paymentStore.fetchPayments();
});

const handlePayment = async (paymentId: number) => {
  const payment = await paymentStore.createPayment(paymentId);

  if (payment) {
    window.location.href = payment.data.paymentUrl;
  }
};
</script>

<template>
  <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-2">
    <Card v-for="payment in paymentStore.payments" :key="payment.id">
      <CardHeader>
        <CardTitle>{{ payment.name }}</CardTitle>
        <CardDescription>{{ payment.description }}</CardDescription>
      </CardHeader>

      <CardContent>
        <p class="text-lg font-medium">Amount: {{ payment.amount }}</p>
        <p class="text-lg font-medium">Points: {{ payment.points }}</p>
      </CardContent>

      <CardFooter class="flex justify-between px-6 pb-6">
        <Button @click="handlePayment(payment.id)"> Pay </Button>
      </CardFooter>
    </Card>
  </div>
</template>
