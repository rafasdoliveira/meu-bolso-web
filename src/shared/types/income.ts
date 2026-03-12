export type Income = {
  id: number;
  date: string;
  source: string;
  source_id?: number;
  amount: string;
  notes: string;
  paymentType: string;
  payment_type_id?: number;
  status: string;
  status_id?: number;
};
