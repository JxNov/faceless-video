import { PAYMENT_API } from '@/constants/api';
import { apiServices } from '@/services/api';

const PaymentServices = {
  paymentPackages: () => apiServices.get(PAYMENT_API.PAYMENT_PACKAGES),
  paymentCreatePayment: (params: { packageId: number }) =>
    apiServices.post(PAYMENT_API.PAYMENT_CREATE_PAYMENT, params),
};

export default PaymentServices;
