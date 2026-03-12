import { Invoice } from '@shared/types/invoice';

export type PayInvoiceInputDto = {
  id: number;
  paid_amount: number;
};

export type PayInvoiceOutputDto = Invoice;
