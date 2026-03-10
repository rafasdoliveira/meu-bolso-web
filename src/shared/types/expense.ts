export type Expense = {
  id: number;
  date: string;
  description: string;
  amount: string;
  installment?: string;
  item?: string;
  notes?: string;
  subcategory?: string;
  paymentType: string;
  status: string;
};
