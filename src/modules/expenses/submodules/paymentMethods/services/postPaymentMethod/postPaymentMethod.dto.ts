import { PaymentMethodDto, PaymentMethodType } from '../getPaymentMethods/getPaymentMethods.dto';

export type CreatePaymentMethodInputDto = {
  user_id: number;
  name: string;
  type: PaymentMethodType;
  brand?: string;
  last_four_digits?: string;
  closing_day?: number;
  due_day?: number;
};

export type CreatePaymentMethodOutputDto = PaymentMethodDto;
