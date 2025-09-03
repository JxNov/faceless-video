import { PAYMENT_API } from '@/constants/api';
import { apiServices } from '@/services/api';

const PaymentServices = {
  paymentPackages: () => apiServices.get(PAYMENT_API.PAYMENT_PACKAGES),
};

export default PaymentServices;
