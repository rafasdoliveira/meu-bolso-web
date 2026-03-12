export type PaymentMethodType = 'credit_card' | 'debit_card' | 'pix' | 'cash';

export type PaymentMethodDto = {
  id: number;
  name: string;
  type: PaymentMethodType;
  brand?: string;
  last_four_digits?: string;
  closing_day?: number;
  due_day?: number;
  is_protected: boolean;
};

export type GetPaymentMethodsOutputDto = PaymentMethodDto[];
