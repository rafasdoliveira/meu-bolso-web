export type Expense = {
  id: number;
  date: string;
  description: string;
  amount: string;
  installment?: string;
  item?: string;
  notes?: string;
  subcategory?: string;
  subcategory_id?: number;
  paymentType: string;
  payment_method_id?: number;
  status: string;
  is_recurrent?: boolean;
  recurrence_group_id?: string;
  invoice_date?: string;
};
