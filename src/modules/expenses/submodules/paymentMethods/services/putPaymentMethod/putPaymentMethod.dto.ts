import { PaymentMethodDto, PaymentMethodType } from '../getPaymentMethods/getPaymentMethods.dto';

export type UpdatePaymentMethodInputDto = {
  id: number;
  name?: string;
  type?: PaymentMethodType;
  brand?: string;
  last_four_digits?: string;
  closing_day?: number;
  due_day?: number;
};

export type UpdatePaymentMethodOutputDto = PaymentMethodDto;
