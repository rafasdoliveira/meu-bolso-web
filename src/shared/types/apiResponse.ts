type ApiResponse<T> = {
  status: 'success' | 'error';
  message: string;
  data: T;
};

export type { ApiResponse };
