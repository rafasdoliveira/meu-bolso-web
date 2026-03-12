export type UpdateExpenseStatusInputDto = {
  id: number;
  status: 'pending' | 'paid';
};

export type UpdateExpenseStatusOutputDto = {
  id: number;
  status: 'pending' | 'paid';
};
