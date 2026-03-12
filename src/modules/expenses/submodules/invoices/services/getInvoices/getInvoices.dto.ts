import { Invoice } from '@shared/types/invoice';

export type GetInvoicesInputDto = {
  user_id: number;
  month?: number;
  year?: number;
  payment_method_id?: number;
};

export type GetInvoicesOutputDto = Invoice[];
