export type CreateIncomeInputDto = {
  user_id: number;
  date: string;
  source_id: number;
  amount: number;
  notes?: string;
  payment_type_id: number;
  status_id: number;
};

export type CreateIncomeOutputDto = {
  data: {
    id: number;
    user_id: number;
    date: string;
    amount: number;
    notes: string;
    incomeSources: {
        id: number;
        name: string;
    };
    paymentType: {
        id: number;
        name: string;
    };
    incomeStatus: {
        id: number;
        name: string;
    };
  };
};