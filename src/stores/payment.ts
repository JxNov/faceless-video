import { ref } from 'vue';
import { defineStore } from 'pinia';
import PaymentServices from '@/services/payment';

export const usePaymentStore = defineStore('payment', () => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const payments = ref<any>([]);

  const fetchPayments = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await PaymentServices.paymentPackages();
      payments.value = response.data.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch sources';
    } finally {
      loading.value = false;
    }
  };

  const createPayment = async (packageId: number) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await PaymentServices.paymentCreatePayment({ packageId });
      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to create payment';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    payments,
    fetchPayments,
    createPayment,
  };
});
