export type InvoiceStatus = 'pending' | 'partial' | 'paid';

export type Invoice = {
  id: number;
  payment_method: {
    id: number;
    name: string;
    due_day?: number;
    last_four_digits?: string;
    brand?: string;
  };
  reference_date: string;
  due_date: string;
  total_amount: string;
  paid_amount: string;
  remaining_amount: string;
  status: InvoiceStatus;
};
